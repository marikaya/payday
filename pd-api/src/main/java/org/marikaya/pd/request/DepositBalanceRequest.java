package org.marikaya.pd.request;

import lombok.Data;

@Data
public class DepositBalanceRequest {
    private String key;
    private Integer amount;
}
