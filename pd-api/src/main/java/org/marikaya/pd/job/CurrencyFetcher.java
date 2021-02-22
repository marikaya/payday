package org.marikaya.pd.job;

import lombok.extern.slf4j.Slf4j;
import org.marikaya.pd.client.CurrencyApi;
import org.marikaya.pd.client.model.CurrencyResponse;
import org.marikaya.pd.entity.redis.CurrencyEntity;
import org.marikaya.pd.redis.repository.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.ParseException;

@EnableScheduling
@Slf4j
@Component
public class CurrencyFetcher {
    private final CurrencyApi currencyApi;
    private final CurrencyConverter currencyConverter;
    private final CurrencyRepository currencyRepository;

    @Value("${currency.list}")
    private String currencyBase;

    @Autowired
    public CurrencyFetcher(final CurrencyApi currencyApi,
                           final CurrencyConverter currencyConverter,
                           final CurrencyRepository currencyRepository) {
        this.currencyApi = currencyApi;
        this.currencyConverter = currencyConverter;
        this.currencyRepository = currencyRepository;
    }

    @Scheduled(fixedRateString = "${currency.fetch.rate}")
    public void fetchCurrencies(){
        try {
            String[] split = currencyBase.split(",");
            for (String s : split) {
                CurrencyResponse currencyResponse = this.currencyApi.getAllCurrencies(s);
                CurrencyEntity convert = this.currencyConverter.convert(currencyResponse);
                this.currencyRepository.save(convert);
            }
        } catch (ParseException e) {
            log.error(e.getMessage(), e);
        }
    }
}
