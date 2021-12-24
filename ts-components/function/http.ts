type HttpMethod = 'GET' | 'POST';
type Request = {
    method: HttpMethod;
    headers: Record<string, string>;
    body: string;
}

/**
 * To send request to the url
 * @param url - url to send request
 * @param request - context of a request
 * @returns response from the url
 */
export async function sendRequest(url: string, request: Request) {
    try {
        const response = await fetch(url, request);
        return await response.json();
    } catch (error) {
        // any exception handling here
        throw new Error(`/sendRequest - ${error}`)
    }
}