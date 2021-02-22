package org.marikaya.pd.client;

import org.marikaya.pd.client.model.CurrencyResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class CurrencyApiImpl implements CurrencyApi {

    private RestTemplate restTemplate;

    @Autowired
    public CurrencyApiImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public CurrencyResponse getAllCurrencies(final String currencyBase){
        RestTemplate template = new RestTemplate();
        Map<String, String> pathParams = new HashMap<>();
        pathParams.put("base", currencyBase);
        CurrencyResponse result =
                template.getForObject("https://api.exchangeratesapi.io/latest?base={base}", CurrencyResponse.class, pathParams);


        return result;
    }


}
