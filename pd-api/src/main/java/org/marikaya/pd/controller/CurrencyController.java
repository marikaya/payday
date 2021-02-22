package org.marikaya.pd.controller;

import org.marikaya.pd.dto.CurrencyDTO;
import org.marikaya.pd.entity.redis.CurrencyEntity;
import org.marikaya.pd.mapper.CurrencyMapper;
import org.marikaya.pd.redis.repository.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "currency")
public class CurrencyController {

    private final CurrencyRepository currencyRepository;
    private final CurrencyMapper currencyMapper;


    @Value("${currency.list}")
    private String currencyBase;

    @Autowired
    public CurrencyController(CurrencyRepository currencyRepository,
                              CurrencyMapper currencyMapper) {
        this.currencyRepository = currencyRepository;
        this.currencyMapper = currencyMapper;
    }

    @RequestMapping(path = "getCurrencies")
    public List<CurrencyDTO> getCurrencies() {
        Iterable<CurrencyEntity> all = this.currencyRepository.findAll();
        List<CurrencyDTO> response = new ArrayList<>();
        all.forEach(c -> response.add(this.currencyMapper.mapToDTO(c)));
        return response;
    }

    @RequestMapping(path = "getAvailableCurrencies")
    public List<String> getAvailableCurrencies() {
        return Arrays.asList(currencyBase.split(","));
    }
}
