export const baseUrl = () => {
    //if(window.location.href.includes('localhost')){
      //return 'http://localhost:8080/api';
    if(window.location.href.includes('skytech-proyecto-gym.s3-website-us-east-1.amazonaws.com')){
        return 'http://3.223.92.25:8080/api';
    }
    return '';
}

export const baseUrl = () => {
    if(window.location.href.includes('localhost')){
    }
    return '';
