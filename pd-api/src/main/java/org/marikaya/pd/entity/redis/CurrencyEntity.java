package org.marikaya.pd.entity.redis;

import lombok.Data;
import org.marikaya.pd.entity.BaseEntity;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.Date;
import java.util.Map;

@RedisHash("Currency")
@Data
public class CurrencyEntity extends BaseEntity {
    @Id
    private String key;
    private String name;
    private Date date;
    private Map<String, Double> rates;
}
