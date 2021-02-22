package org.marikaya.pd.mapper;

import org.marikaya.pd.dto.CurrencyDTO;
import org.marikaya.pd.entity.redis.CurrencyEntity;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("singleton")
public class CurrencyMapper {

    public CurrencyDTO mapToDTO(CurrencyEntity currencyEntity) {
        CurrencyDTO currencyDTO = new CurrencyDTO();
        currencyDTO.setName(currencyEntity.getName());
        currencyDTO.setKey(currencyEntity.getKey());
        currencyDTO.setDate(currencyEntity.getDate());
        currencyDTO.setRates(currencyEntity.getRates());
        return currencyDTO;
    }

    public CurrencyEntity mapToEntity(CurrencyDTO currencyDTO) {
        CurrencyEntity currencyEntity = new CurrencyEntity();
        currencyEntity.setName(currencyDTO.getName());
        currencyEntity.setKey(currencyDTO.getKey());
        currencyEntity.setDate(currencyDTO.getDate());
        currencyEntity.setRates(currencyDTO.getRates());
        return currencyEntity;
    }
}
