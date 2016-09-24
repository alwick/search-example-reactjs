import TestUtils from 'react-addons-test-utils';

export default function render(component) {
    let renderer = TestUtils.createRenderer();
    renderer.render(component);
    let output = renderer.getRenderOutput();
    return { output, renderer };
}

export function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
};

export function encodeHtmlEntity(str) {
    var buf = [];
    for (var i=str.length-1;i>=0;i--) {
        buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('');
};