export function direction(el) {
    let dom = document.getElementsByClassName(el)[0];
    let startX, startY, endX, endY, x, y;
    dom.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    });
    dom.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].pageX;
        endY = e.changedTouches[0].pageY;
        x = endX - startX;
        y = endY - startY;

        if(Math.abs(x) > Math.abs(y) && x > 0) {
            return 'right';
        }
        if(Math.abs(x) > Math.abs(y) && x < 0) {
            return 'left';
        }
        if(Math.abs(y) > Math.abs(x) && y > 0) {
            return 'bottom';
        }
        if(Math.abs(y) > Math.abs(x) && y < 0) {
            return 'top';
        }
    });
}