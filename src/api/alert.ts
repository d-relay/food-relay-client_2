import { get, post } from './api'
import type { Alert } from '../interfaces/Alert';

export function getAlert(token: string) {
    return get('/alert', {}, token)
}

export function getAlertWithoutAuth(alert_token: string): Promise<Alert> {
    return get<Alert>('/alert/personal', { alert_token });
}

export function updateAlert(data: any, token: string) {
    return post('/alert', data, token);
}

export function testAlert(alert_token: string, token: string) {
    return post('/alert/test/' + alert_token, {}, token);
}

export function transformAlertParams(alert: Alert): Alert {
    alert.interval = alert.interval * 60 * 1000;
    alert.duration = alert.duration * 1000;
    return alert;
}