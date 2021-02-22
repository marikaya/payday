package org.marikaya.pd.dto;

import lombok.Data;

import java.util.Date;
import java.util.Map;

@Data
public class CurrencyDTO extends BaseDTO{
    private String key;
    private String name;
    private Date date;
    private Map<String, Double> rates;
}
