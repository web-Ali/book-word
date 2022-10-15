import {$authHost} from "./index";


export const createPayment = (currency, amount, description, return_url) => {
    let payload = {currency, amount, description, return_url};
    return $authHost.post('payment/create/?lang='+localStorage.getItem('i18nextLng'), payload)
        .then(response => {
            return response;
        });
}