import axios from 'axios';

const setAuthToken = (token) => {
    // check if token exists and if it does set it as a header parameter
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        // if it does not exist, delete the parameter in the header
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;