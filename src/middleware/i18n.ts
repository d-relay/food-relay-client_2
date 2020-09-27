import type { Request, Response, NextFunction } from 'express';

import {
    register,
    init,
    getLocaleFromNavigator,
    locale as $locale,
} from 'svelte-i18n';

import { setCookie, getCookie } from '../handlers/cookie.js';

const INIT_OPTIONS = {
    fallbackLocale: 'uk',
    initialLocale: null,
    loadingDelay: 200,
    formats: {},
    warnOnMissingMessages: true,
};

let currentLocale: string | null = null;

register('en', () => import('../locale/en.json'));
register('uk', () => import('../locale/uk.json'));
register('ru', () => import('../locale/ru.json'));

$locale.subscribe((value) => {
    if (value == null) return;

    currentLocale = value;

    // if running in the client, save the language preference in a cookie
    if (typeof window !== 'undefined') {
        setCookie('locale', value);
    }
});

// initialize the i18n library in client
export function startClient() {
    init({
        ...INIT_OPTIONS,
        initialLocale: getCookie('locale') || getLocaleFromNavigator(),
    });
}

const DOCUMENT_REGEX = /^([^.?#@]+)?([?#](.+)?)?$/;
// initialize the i18n library in the server and returns its middleware
export function i18nMiddleware() {
    // initialLocale will be set by the middleware
    init(<any>INIT_OPTIONS);
    return (req: Request, res: Response, next: NextFunction) => {
        const isDocument = DOCUMENT_REGEX.test(req.originalUrl);
        // get the initial locale only for a document request
        if (!isDocument) {
            next();
            return;
        }

        let locale = getCookie('locale', req.headers.cookie);

        // no cookie, let's get the first accepted language
        if (locale == null) {
            if (req.headers['accept-language']) {
                const headerLang = req.headers['accept-language'].split(',')[0].trim();
                if (headerLang.length > 1) {
                    locale = headerLang;
                }
            } else {
                locale = INIT_OPTIONS.initialLocale || INIT_OPTIONS.fallbackLocale;
            }
        }

        if (locale != null && locale !== currentLocale) {
            $locale.set(locale);
        }

        next();
    };
}