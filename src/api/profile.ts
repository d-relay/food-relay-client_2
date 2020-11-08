import { get } from './api'
import type { Location } from '../interfaces/Location'
import type { Alert } from '../interfaces/Alert'

export function getProfile(token: string): Promise<{ alert: Alert, location: Location }> {
    return get('/profile', {}, token);
}