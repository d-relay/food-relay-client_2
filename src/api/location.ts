import { get, post } from './api'
import type { Location } from '../interfaces/Location';

export function getLocation(token: string): Promise<Location> {
    return get('/location', {}, token)
}
export function updateLocation(data: any, token: string) {
    return post('/location', data, token);
}