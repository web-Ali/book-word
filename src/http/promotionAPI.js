import {$authHost, $host} from "./index";


export const getPromotionPriceList = () => {
    return $host.get('promotion_prices/?lang='+localStorage.getItem('i18nextLng'));
};

export const createPromotion = (days, type, book_id) => {
    let payload = {days, type, book_id};
    return $authHost.post('promotions/?lang='+localStorage.getItem('i18nextLng'), payload);
}