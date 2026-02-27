export function fetchCsrf(url: string, options: RequestInit = {}, tokenCsrf: string) {
    if (!tokenCsrf) {
        throw new Error("No se encontro el token CSRF");
    }
    const headers = new Headers(options.headers || {});

    headers.set("X-Requested-With", "XMLHttpRequest");
    headers.set("X-CSRF-TOKEN", tokenCsrf);

    return fetch(url, {
        ...options,
        credentials: "same-origin",
        headers,
    });

}

