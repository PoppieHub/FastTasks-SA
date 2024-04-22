import type {ResponseApi} from "../models";

const getInfoRates = async (param: string): Promise<ResponseApi> => {
    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${param}`);

        if (response.ok) {
            const data: ResponseApi = await response.json();

            return data;
        } else {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
    } catch (e: any) {
        throw new Error('Неполадки с API: ' + e.message);
    }
}

export default getInfoRates;