const mode = process.env.NODE_ENV === "development";

export function getCookie(name: string, cookies?: string | null) {
    if (cookies == null) {
        if (typeof window === 'undefined') {
            return undefined;
        }
        cookies = document.cookie;
    }

    const kv = cookies.split(';').find((part) => part.trim().startsWith(name));

    if (!kv) return undefined;

    const cookieValue = kv.split('=')[1];
    if (!cookieValue) return undefined;

    return decodeURIComponent(cookieValue.trim());
}

export function setCookie(name: string, value: string) {
    let updatedCookie = {
        [encodeURIComponent(name)]: encodeURIComponent(value),
        sameSite: 'strict',
        secure: !mode
    };

    document.cookie = Object.entries(updatedCookie)
        .map((kv) => kv.join('='))
        .join(';');
}