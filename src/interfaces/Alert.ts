import type { User } from './User';
import type { Image } from './Image';

export interface Alert {
    alert_token: string;
    id: number;
    color: string;
    font_size: number;
    message: string;
    duration: number;
    interval: number;
    user: User;
    image: Image;
}