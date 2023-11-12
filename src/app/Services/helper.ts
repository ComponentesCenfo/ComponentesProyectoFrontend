export const baseUrl = () => {
    if(window.location.href.includes('localhost')){
        return 'http://localhost:8000/api';
    }
    return '';
}