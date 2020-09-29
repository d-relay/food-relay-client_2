import fetch from 'node-fetch';

async function send({ method, path, body, token }: {
    method: string, path: string, body?: any, token?: string
}) {
    const url = new URL(process.env.API_BASE_URL!);
    url.pathname = path;
    const response = await fetch(url.href, {
        method,
        body,
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        return response.json();
    } else {
        console.error({ url, body, token });
        throw new Error(response.statusText);
    }
}

export function post(path: string, data: any, token?: string) {
    return send({ method: 'post', path, body: JSON.stringify(data), token })
}

export function put(path: string, data: any, token?: string) {
    return send({ method: 'put', path, body: JSON.stringify(data), token })
}

export function get(path: string, data: any, token?: string) {
    const params = Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
    return send({
        method: 'get',
        path: `${path}${params ? '?' + params : ''}`,
        token
    })
}