package org.marikaya.pd.dto;

import lombok.Data;

@Data
public class UserBalanceDTO extends BaseDTO {
    private String key;
    private Double amount;
    private Long userId;
}
