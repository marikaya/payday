package org.marikaya.pd.repository;

import org.marikaya.pd.dto.UserBalanceDTO;
import org.marikaya.pd.entity.UserBalanceEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBalanceRepository extends BaseRepository<UserBalanceDTO, UserBalanceEntity, Long> {

    @Query("select t from UserBalanceEntity t where t.user.id = :userId")
    List<UserBalanceEntity> findByUserId(@Param("userId") Long userId);

    @Query("select t from UserBalanceEntity t where t.user.id = :userId and t.key = :key")
    List<UserBalanceEntity> findByUserIdAndKey(@Param("userId") Long userId, @Param("key") String key);
}
