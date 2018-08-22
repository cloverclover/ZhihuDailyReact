export function filterImage(url) {
    return url.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
}

export function filterDefaultCss(url) {
    fetch(url)
    .then(response => response.json());
}