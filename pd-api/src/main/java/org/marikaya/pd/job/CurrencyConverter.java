package org.marikaya.pd.job;

import lombok.experimental.UtilityClass;
import org.marikaya.pd.client.model.CurrencyResponse;
import org.marikaya.pd.entity.redis.CurrencyEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@Component
public class CurrencyConverter {

    @Value("${currency.date.format}")
    private String dateFormat;

    SimpleDateFormat simpleDateFormat;


    public CurrencyConverter() {
    }

    @PostConstruct
    public void init(){
        simpleDateFormat = new SimpleDateFormat(dateFormat);
    }

    public CurrencyEntity convert(final CurrencyResponse currencyResponse) throws ParseException {
        CurrencyEntity currencyEntity = new CurrencyEntity();
        currencyEntity.setDate(simpleDateFormat.parse(currencyResponse.getDate()));
        currencyEntity.setKey(currencyResponse.getBase());
        currencyEntity.setRates(currencyResponse.getRates());
        return currencyEntity;
    }
}
