import {$authHost, $host} from "./index";


export const getChaptersModeration = () => {
    return $authHost.get('moderation/book/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}

export const verifyModeration = (chapterId,bool) => {

    return $authHost.post('/moderation/book/'+ chapterId +'/verify/?lang='+localStorage.getItem('i18nextLng'), bool)
        .then(response => {
            return response;
        });
}
