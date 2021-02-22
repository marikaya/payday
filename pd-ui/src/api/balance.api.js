import {dataService} from "../root";


export const ENTITY_BASE = "/balance";

export const fetchBalances = () => dispatch => {
    return new Promise((resolve, reject) => {
        dataService.get(ENTITY_BASE+ "/getBalances").then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
};

