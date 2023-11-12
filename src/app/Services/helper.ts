export const baseUrl = () => {
    if(window.location.href.includes('localhost')){
        return 'http://3.223.92.25:8080/api';
    }
    return '';
}