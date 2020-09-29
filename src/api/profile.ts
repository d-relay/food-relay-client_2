import { get } from './api'

export function getProfile(token: string) {
    return get('/profile', {}, token);
}