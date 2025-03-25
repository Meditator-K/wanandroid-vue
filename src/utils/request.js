import axios from "axios";

const service = axios.create({
    baseURL: '',
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
});

service.interceptors.request.use(
    config => {
        console.log('请求成功：', config);
        config.headers['token'] = '';
        return config;
    },
    error => {
        console.log('请求失败：', error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    result => {
        console.log('响应成功：', result);
        return result;
    },
    error => {
        console.log('响应失败：', error);
        return Promise.reject(error);
    }
);

export function get(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, { params: params })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => { reject(err) });
    });
}

export function post({ url, params = {} }) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
    });
}