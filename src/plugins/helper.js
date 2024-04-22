export default {
    install(app, options) {
        app.config.globalProperties.ucFirst = ucFirst
    },
    toQueryString: toQueryString
}

export function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function toQueryString(formData) {
    return Object.keys(formData)
        .filter(key => formData[key] != null && formData[key] !== '' && formData[key] !== undefined)
        .map(key => {
            if(Array.isArray(formData[key])) {
                return `${key}=${formData[key].join(',')}`;
            }
            else if (typeof formData[key] === 'object') {
                return toQueryString(formData[key])
            }
            else return `${key}=${encodeURIComponent(formData[key])}`;
        }).join('&')
}
