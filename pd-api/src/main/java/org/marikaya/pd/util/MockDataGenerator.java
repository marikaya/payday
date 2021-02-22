package org.marikaya.pd.util;

import org.marikaya.pd.dao.UserBalanceDAO;
import org.marikaya.pd.dao.UserDAO;
import org.marikaya.pd.dto.UserBalanceDTO;
import org.marikaya.pd.dto.UserDTO;
import org.marikaya.pd.entity.redis.CurrencyEntity;
import org.marikaya.pd.redis.repository.CurrencyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.DecimalFormat;
import java.text.NumberFormat;

@Configuration
public class MockDataGenerator {
    private static final Logger logger = LoggerFactory.getLogger(MockDataGenerator.class);
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${currency.list}")
    private String currencyBase;

    @Autowired
    public MockDataGenerator(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Bean
    CommandLineRunner generateData(UserDAO userDAO,
                                   UserBalanceDAO userBalanceDAO,
                                   CurrencyRepository currencyRepository) {
        return (args) -> {
            if (logger.isInfoEnabled()) {
                logger.info("[MockDataGenerator][generateData] -> User is being created");
            }
            UserDTO userDTO = new UserDTO();
            userDTO.setTitle("Mr.");
            userDTO.setFullName("Muhammet ARIKAYA");
            userDTO.setEmail("m.arikayaw@gmail.com");
            userDTO.setPassword(bCryptPasswordEncoder.encode("password"));

            userDTO = userDAO.save(userDTO);
            String[] availableCurrencies = currencyBase.split(",");

            NumberFormat format = new DecimalFormat("##,##");
            for (String availableCurrency : availableCurrencies) {
                UserBalanceDTO userBalanceDTO = new UserBalanceDTO();
                userBalanceDTO.setUserId(userDTO.getId());
                userBalanceDTO.setKey(availableCurrency);
                userBalanceDTO.setAmount(100.0);

                userBalanceDAO.save(userBalanceDTO);
            }
        };
    }
}
