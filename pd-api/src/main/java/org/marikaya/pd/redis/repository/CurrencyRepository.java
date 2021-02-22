package org.marikaya.pd.redis.repository;

import org.marikaya.pd.entity.redis.CurrencyEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyRepository extends CrudRepository<CurrencyEntity, Long> {

}
