-- Survey feature schema (persons, intake_requests, surveys, survey_registrations, survey_responses, survey_results)

-- 1) 개인 기본정보 (PII)
CREATE TABLE IF NOT EXISTS persons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_number VARCHAR(32) NULL,
    full_name VARCHAR(100) NOT NULL,
    gender_code VARCHAR(16) NULL,
    phone_number VARCHAR(32) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_person_student (student_number)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- 2) 인입(신청 공통 스냅샷)
CREATE TABLE IF NOT EXISTS intake_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    person_id BIGINT NOT NULL,
    request_type VARCHAR(32) NOT NULL, -- 'survey'|'counseling'
    campus_code VARCHAR(32) NULL,
    department_name VARCHAR(100) NULL,
    status_code VARCHAR(32) NOT NULL DEFAULT 'active',
    locale VARCHAR(8) NULL, -- UI 언어 스냅샷(옵션)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP NULL,
    CONSTRAINT fk_intake_person FOREIGN KEY (person_id) REFERENCES persons (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX ix_intake_person ON intake_requests (person_id);

CREATE INDEX ix_intake_type_status ON intake_requests (request_type, status_code);

CREATE INDEX ix_intake_dept ON intake_requests (department_name);

CREATE INDEX ix_intake_locale_created ON intake_requests (locale, created_at);

-- 3) 설문 정의
CREATE TABLE IF NOT EXISTS surveys (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    survey_code VARCHAR(64) NOT NULL, -- ex) 'MMPI-2'
    survey_title VARCHAR(200) NOT NULL,
    survey_version VARCHAR(32) NOT NULL, -- ex) 'v1'
    locale VARCHAR(8) NOT NULL, -- 'ko'|'en'
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_survey_code_ver_locale (
        survey_code,
        survey_version,
        locale
    )
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX ix_survey_active_locale ON surveys (is_active, locale);

-- 4) 설문 진행(등록) - draft/submit 스냅샷
CREATE TABLE IF NOT EXISTS survey_registrations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    intake_request_id BIGINT NOT NULL,
    survey_id BIGINT NOT NULL,
    registration_status VARCHAR(16) NOT NULL DEFAULT 'draft', -- 'draft'|'submitted'|'canceled'|'expired'
    survey_version VARCHAR(32) NOT NULL,
    locale VARCHAR(8) NOT NULL, -- 진행 언어 스냅샷
    expires_at TIMESTAMP NULL,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_reg_intake FOREIGN KEY (intake_request_id) REFERENCES intake_requests (id),
    CONSTRAINT fk_reg_survey FOREIGN KEY (survey_id) REFERENCES surveys (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX ix_reg_intake ON survey_registrations (intake_request_id);

CREATE INDEX ix_reg_survey ON survey_registrations (survey_id);

CREATE INDEX ix_reg_status ON survey_registrations (registration_status);

CREATE INDEX ix_reg_locale_submitted ON survey_registrations (locale, submitted_at);

-- 5) 설문 응답(문항별)
CREATE TABLE IF NOT EXISTS survey_responses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    registration_id BIGINT NOT NULL,
    question_code VARCHAR(100) NOT NULL, -- 문항 식별자
    answer_value TEXT NULL, -- 원래 값
    answer_score DECIMAL(10, 4) NULL, -- 점수화(있으면)
    item_order INT NULL, -- 문항 순서
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resp_reg FOREIGN KEY (registration_id) REFERENCES survey_registrations (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX ix_resp_reg_question ON survey_responses (
    registration_id,
    question_code
);

-- 6) 설문 결과(요약/점수)
CREATE TABLE IF NOT EXISTS survey_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    registration_id BIGINT NOT NULL,
    total_score DECIMAL(10, 4) NULL,
    result_level VARCHAR(64) NULL, -- 해석 레벨(예: 'low'|'mid'|'high')
    summary_json JSON NULL, -- 차트/스케일/설명 등
    computed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_result_reg FOREIGN KEY (registration_id) REFERENCES survey_registrations (id),
    UNIQUE KEY uk_result_registration (registration_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- 7) CMS 조회용 뷰 (PII 마스킹)
DROP VIEW IF EXISTS v_cms_survey_registrations;

CREATE VIEW v_cms_survey_registrations AS
SELECT
    r.id AS registration_id,
    ir.id AS intake_id,
    s.survey_code,
    s.survey_title,
    r.survey_version,
    r.locale,
    r.registration_status,
    ir.department_name,
    p.gender_code,
    CONCAT(
        LEFT(p.full_name, 1),
        REPEAT (
            '*',
            GREATEST(
                0,
                CHAR_LENGTH(p.full_name) - 1
            )
        )
    ) AS masked_full_name,
    IFNULL(
        CONCAT(
            LEFT(p.student_number, 3),
            REPEAT (
                '*',
                GREATEST(
                    0,
                    CHAR_LENGTH(p.student_number) - 3
                )
            )
        ),
        NULL
    ) AS masked_student_number,
    r.started_at,
    r.submitted_at
FROM
    survey_registrations r
    JOIN intake_requests ir ON ir.id = r.intake_request_id
    JOIN persons p ON p.id = ir.person_id
    JOIN surveys s ON s.id = r.survey_id;
