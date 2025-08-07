package cms.board.repository;

import cms.board.domain.BbsArticleDomain;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import java.util.List;

@Repository
public interface BbsArticleRepository extends JpaRepository<BbsArticleDomain, Long> {

        @Query("SELECT a FROM BbsArticleDomain a WHERE a.bbsMaster.bbsId = :bbsId AND a.menu.id = :menuId AND a.publishState IN ('Y', 'P') ORDER BY a.noticeState DESC, a.postedAt DESC")
        @NonNull
        Page<BbsArticleDomain> findPublishedByBbsIdAndMenuId(@Param("bbsId") Long bbsId, @Param("menuId") Long menuId,
                        @NonNull Pageable pageable);

        @Query("SELECT a FROM BbsArticleDomain a WHERE a.bbsMaster.bbsId = :bbsId AND a.menu.id = :menuId ORDER BY a.noticeState DESC, a.postedAt DESC")
        @NonNull
        Page<BbsArticleDomain> findAllByBbsIdAndMenuId(@Param("bbsId") Long bbsId, @Param("menuId") Long menuId,
                        @NonNull Pageable pageable);

        @Query("SELECT a FROM BbsArticleDomain a WHERE a.bbsMaster.bbsId = :bbsId AND a.menu.id = :menuId AND a.parentArticle IS NULL AND a.publishState IN ('Y', 'P') ORDER BY a.noticeState DESC, a.postedAt DESC")
        Page<BbsArticleDomain> findRootArticlesByBbsIdAndMenuId(@Param("bbsId") Long bbsId,
                        @Param("menuId") Long menuId,
                        Pageable pageable);

        @Query("SELECT a FROM BbsArticleDomain a WHERE a.bbsMaster.bbsId = :bbsId AND a.parentArticle.nttId = :parentNttId AND a.publishState IN ('Y', 'P') ORDER BY a.createdAt ASC")
        Page<BbsArticleDomain> findRepliesByParentNttId(@Param("bbsId") Long bbsId,
                        @Param("parentNttId") Long parentNttId,
                        Pageable pageable);

        @Query("SELECT a FROM BbsArticleDomain a WHERE a.bbsMaster.bbsId = :bbsId AND a.menu.id = :menuId AND (a.title LIKE %:keyword% OR a.content LIKE %:keyword% OR a.writer LIKE %:keyword% OR FUNCTION('TO_CHAR', a.postedAt, 'YYYY-MM-DD') LIKE %:keyword%) AND a.publishState IN ('Y', 'P') ORDER BY a.noticeState DESC, a.postedAt DESC")
        Page<BbsArticleDomain> searchPublishedByKeywordAndMenuId(@Param("bbsId") Long bbsId,
                        @Param("menuId") Long menuId,
                        @Param("keyword") String keyword, Pageable pageable);

        @Query("SELECT a FROM BbsArticleDomain a WHERE a.bbsMaster.bbsId = :bbsId AND a.menu.id = :menuId AND (a.title LIKE %:keyword% OR a.content LIKE %:keyword% OR a.writer LIKE %:keyword% OR FUNCTION('TO_CHAR', a.postedAt, 'YYYY-MM-DD') LIKE %:keyword%) ORDER BY a.noticeState DESC, a.postedAt DESC")
        Page<BbsArticleDomain> searchAllByKeywordAndMenuId(@Param("bbsId") Long bbsId, @Param("menuId") Long menuId,
                        @Param("keyword") String keyword, Pageable pageable);

        @Query("SELECT a FROM BbsArticleDomain a WHERE a.bbsMaster.bbsId = :bbsId AND a.noticeState IN ('Y', 'P') ORDER BY a.postedAt DESC")
        List<BbsArticleDomain> findNoticesByBbsId(@Param("bbsId") Long bbsId);

        @Lock(LockModeType.PESSIMISTIC_WRITE)
        @Query("SELECT a FROM BbsArticleDomain a WHERE a.nttId = :nttId")
        BbsArticleDomain findByIdForUpdate(@Param("nttId") Long nttId);

        @Query("SELECT a FROM BbsArticleDomain a WHERE a.menu.id = :menuId AND a.publishState IN ('Y', 'P') ORDER BY a.noticeState DESC, a.postedAt DESC")
        Page<BbsArticleDomain> findByMenuId(@Param("menuId") Long menuId, Pageable pageable);

        @Query("SELECT a FROM BbsArticleDomain a JOIN a.categories ac WHERE a.bbsMaster.bbsId = :bbsId AND a.menu.id = :menuId AND ac.category.categoryId = :categoryId AND a.publishState IN ('Y', 'P') ORDER BY a.noticeState DESC, a.postedAt DESC")
        Page<BbsArticleDomain> findPublishedByBbsIdAndMenuIdAndCategoryId(@Param("bbsId") Long bbsId,
                        @Param("menuId") Long menuId, @Param("categoryId") Long categoryId, Pageable pageable);

        @Query("SELECT a FROM BbsArticleDomain a JOIN a.categories ac WHERE a.bbsMaster.bbsId = :bbsId AND a.menu.id = :menuId AND ac.category.categoryId = :categoryId ORDER BY a.noticeState DESC, a.postedAt DESC")
        Page<BbsArticleDomain> findAllByBbsIdAndMenuIdAndCategoryId(@Param("bbsId") Long bbsId,
                        @Param("menuId") Long menuId, @Param("categoryId") Long categoryId, Pageable pageable);

        @Query("SELECT count(a) FROM BbsArticleDomain a WHERE a.bbsMaster.bbsId = :bbsId AND a.menu.id = :menuId AND a.noticeState <> :noticeState AND a.publishState IN ('Y', 'P')")
        long countByBbsIdAndMenuIdAndNoticeStateNot(@Param("bbsId") Long bbsId, @Param("menuId") Long menuId,
                        @Param("noticeState") String noticeState);

        @Query(value = "SELECT COUNT(*) FROM bbs_article a " +
                        "WHERE a.bbs_id = :bbsId " +
                        "AND a.menu_id = :menuId " +
                        "AND a.notice_state <> 'Y' " +
                        "AND a.publish_state IN ('Y', 'P') " +
                        "AND a.posted_at > (SELECT posted_at FROM bbs_article WHERE ntt_id = :nttId)", nativeQuery = true)
        long countNonNoticeArticlesBeforeByPostedAt(@Param("bbsId") Long bbsId, @Param("menuId") Long menuId,
                        @Param("nttId") Long nttId);

        @Query(value = "SELECT COUNT(*) FROM bbs_article a " +
                        "WHERE a.bbs_id = :bbsId " +
                        "AND a.menu_id = :menuId " +
                        "AND a.notice_state <> 'Y' " +
                        "AND a.publish_state IN ('Y', 'P') " +
                        "AND a.posted_at >= (SELECT posted_at FROM bbs_article WHERE ntt_id = :nttId)", nativeQuery = true)
        long countNonNoticeArticlesAfterOrEqual(@Param("bbsId") Long bbsId, @Param("menuId") Long menuId,
                        @Param("nttId") Long nttId);

        @Query("SELECT count(a) FROM BbsArticleDomain a WHERE a.bbsMaster.bbsId = :bbsId AND a.menu.id = :menuId AND (a.title LIKE %:keyword% OR a.content LIKE %:keyword% OR a.writer LIKE %:keyword% OR FUNCTION('TO_CHAR', a.createdAt, 'YYYY-MM-DD') LIKE %:keyword%) AND a.publishState IN ('Y', 'P') AND a.noticeState <> :noticeState")
        long countByBbsIdAndMenuIdAndKeywordAndNoticeStateNot(@Param("bbsId") Long bbsId, @Param("menuId") Long menuId,
                        @Param("keyword") String keyword, @Param("noticeState") String noticeState);

        @Query("SELECT a.nttId, a.content FROM BbsArticleDomain a WHERE a.content LIKE '%/api/v1/cms/file/public/view/%' ORDER BY a.createdAt DESC")
        List<Object[]> findSampleArticlesWithImages(Pageable pageable);
}