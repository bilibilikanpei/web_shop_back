// 把对像格式参数添加到url末尾
function UrlQuery(url, params) {
    let paramsArray = [];
    //拼接参数  
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
    } else {
        url += '&' + paramsArray.join('&')
    }
    return url;
}

//response的处理方法
const check_response = (response) => {
    //第一次then，要判断 状态
    if (response.status === 200) {
        //成功状态
        if (response.headers.get("Content-Type").indexOf('application/json') >= 0) {
            return response.json();
        } else {
            // eslint-disable-next-line
            throw ({ message: `返回结果的Content-Type类型不对` });
        }
    } else {
        //失败状态 根据不同的状态进行处理
        switch (response.status) {
            default:
                // eslint-disable-next-line
                throw { response, message: '请求出错' };
        }
    }
}
export default {
    getJSON: function (url, params) {
        return fetch(UrlQuery(url, params), {
            credentials: 'include'
        }).then(check_response);
    },
    postJSON: function (url, params) {
        return fetch(url, {
            credentials: 'include',
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }).then(check_response)
    },
    postForm: function (url, formdata) {
        return fetch(url, {
            credentials: 'include',
            method: 'post',
            headers: {
                "Content-type": "multipart/form-data"
            },
            body: formdata
        }).then(check_response);
    }
}