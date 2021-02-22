package org.marikaya.pd.client;

import org.marikaya.pd.client.model.CurrencyResponse;

public interface CurrencyApi {
    CurrencyResponse getAllCurrencies(String currencyBase);
}
