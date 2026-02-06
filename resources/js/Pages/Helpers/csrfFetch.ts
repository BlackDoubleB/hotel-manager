export function fetchCsrf(url: string, options: RequestInit = {}) {
    const token = document.querySelector<HTMLMetaElement>(
        'meta[name="csrf-token"]',
    )?.content;

    const headers = new Headers(options.headers || {});
    headers.set("X-Requested-With", "XMLHttpRequest");

    if (token) {
        headers.set("X-CSRF-TOKEN", token);
    }

    return fetch(url, {
        credentials: "same-origin",
        mode: "cors",
        cache: "no-cache",
        ...options,
        headers,
    });
}
