export function filterImage(url) {
    return url.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
}

export function filterDefaultCss(css) {
    //let reg = new RegExp(/[\S\s]*padding-left: 20px;\s*}/);
    css = css.replace(/[\S\s]*padding-left: 20px;\s*}/, '');
    css = css.replace(/p\s*{\s*margin:\s*20px\s*0\s*!important;\s*}/, '');
    return css;
}
//去除指定class的div标签
export function filterTag(htmlBody, tagClassArray) {
    tagClassArray.forEach(function(item) {
        let regString = '<div\\s+class="' + item + '">\\s*<\/div>';
        let reg = new RegExp(regString);
        htmlBody = htmlBody.replace(reg, '');

    });
    return htmlBody;
}