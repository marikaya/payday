import {dataService} from "../root";


export const ENTITY_BASE = "/currency";

export const fetchCurrencies = () => dispatch => {
    return new Promise((resolve, reject) => {
        dataService.get(ENTITY_BASE+ "/getCurrencies").then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const fetchAvailableCurrencies = () => dispatch => {
    return new Promise((resolve, reject) => {
        dataService.get(ENTITY_BASE+ "/getAvailableCurrencies").then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
};