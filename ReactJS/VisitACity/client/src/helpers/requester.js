export async function requester(url, method, body, isAuthorized, skipResult) {

    if (method === undefined) {
        method = 'get'
    }

    let headers = {};
    if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
        headers['Content-type'] = 'application/json';
    }

    if (isAuthorized) {
        headers['X-Authorization'] = JSON.parse(localStorage.getItem('user')).accessToken;
    }


    let options = {
        headers,
        method
    }
    if (body !== undefined) {
        options.body = JSON.stringify(body)
    }
    let response = await fetch(url, options);
    if (!response.ok) {

        let message = await response.text();
        throw new Error(`${response.status}: ${response.statusText}\n${message}`);
    }
    if (skipResult === undefined) {
        skipResult = false;
    }

    let result = undefined;
    if (skipResult === false) {
        result = await response.json();

    }
    return result;

}