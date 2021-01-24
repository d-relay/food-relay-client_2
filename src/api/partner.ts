import { get } from './api'
import type { Partner } from '../interfaces/Partner'

export function getPartners(token: string): Promise<Partner[]> {
    return get('/partners', {}, token);
}