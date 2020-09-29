import { get, post } from './api'

export function getAlert(token: string) {
    return get('/alert', {}, token)
}

export function updateAlert(data: any, token: string) {
    return post('/alert', data, token);
}

export function testAlert(alert_token: string, token: string) {
    return post('/alert/test/' + alert_token, {}, token);
}