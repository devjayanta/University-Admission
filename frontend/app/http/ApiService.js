'use client'

import { showAlert } from '@/components/Alert';
import { Api } from '../../types/api/Api';
import { baseUrl } from './_config';

const requestInterceptor = (
    config
) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

const successResponseInterceptor = (response) => {
    // in case of response type set to Blob
    if (
        response.data &&
        response.data instanceof Blob &&
        response.data.type === 'application/json' // type = json implies error
    ) {
        response.data
            .text()
            .then((txt) => {
                showAlert(txt.message, 'error');

            })
            .catch(() => {
                response.data = {};
            });
    }

    // normal case i.e. response type set to json
    const success = response.data.success;
    if (success === false) {
        const errs = response.data.message;
        showAlert(errs, 'error');

    }
    return response;
};
const errorResponseInterceptor = (error) => {
    if (error.status === 401 || error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location = window.location.replace(/http[s]?:\/\//, "").split('/')[0];
    } else {
        if (error.response) {
            if (error.response.data.success === false) {
                showAlert(err.message, 'error');
            }
            else if (error.response.data.traceId) {
                const errs = error.response.data.errors;
                const errorKeys = Object.keys(errs).filter(
                    (key) => !key.startsWith('$'),
                );
                const errorMsgs = []
                for (const key of errorKeys) {
                    for (const errMsg of errs[key]) {
                        errorMsgs.push(errMsg);
                    }
                }
                showAlert(errorMsgs.join('\n'), 'error');
            } else {
                showAlert(error.message, 'error');
            }
        } else {
            showAlert(
                error.message ??
                'An error has occured. Please try again later.',
                'error',
            );
        }
    }
};

const apiService = new Api({ baseURL: baseUrl });

apiService.instance.interceptors.request.use(requestInterceptor);
apiService.instance.interceptors.response.use(successResponseInterceptor,
    errorResponseInterceptor,)

export default apiService;