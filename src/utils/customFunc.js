export const isEmptyObj = (object) => {
    for (let key in object) {

        if (object.hasOwnProperty(key)) {

            return false;

        }

    }
    return true;
}
export const httpOnHttps = (url) => {
    if (!url) {
        return null;
    }
    return url.replace("http://", "https://")
}

export const nameLengthSlice = (str = '', length = 300) => {
    if (str.length > length) {
        return str.slice(0, length) + '...'
    }
    return str
}

export const validateEmail = (value) => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(value);
}

export const shuffle = (array) => array.sort(() => Math.random() - 0.5);

