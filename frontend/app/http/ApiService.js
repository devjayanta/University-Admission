import { Api } from '../../types/api/Api';
import { baseUrl } from './_config';

const requestInterceptor = (
    config
) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

const apiService = new Api({ baseURL: baseUrl });

apiService.instance.interceptors.request.use(requestInterceptor);

export default apiService;