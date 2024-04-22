import type {ResponseApi} from "../models";

export const getCollectionRates = ():ResponseApi => {
    const rates = localStorage.getItem('rates');
    const base_code = localStorage.getItem('base_code');

    if (rates !== null && base_code !== null) {
        return {
            rates: JSON.parse(rates),
            base_code: JSON.parse(base_code)
        }
    }

    return {
        rates: {},
        base_code: ''
    };
}

export const setCollectionRates = (response: ResponseApi): void => {
    localStorage.setItem('rates', JSON.stringify(response.rates));
    localStorage.setItem('base_code', JSON.stringify(response.base_code));
}