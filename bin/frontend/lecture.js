function getStyle(element, style) {
    return window.getComputedStyle(element, null).getPropertyValue(style);
}
function fixSlideDimensions(ratio) {
    var browserWidth = document.body.clientWidth;
    var browserHeight = document.body.clientHeight;
    if (browserWidth / browserHeight < ratio)
        browserHeight = browserWidth / ratio;
    else
        browserWidth = browserHeight * ratio;
    var root = document.querySelector(':root');
    root.style.fontSize = browserWidth / 80 + "px";
    var firstSlide = document.querySelector('article.slide');
    var paddingTop = parseInt(getStyle(firstSlide, 'padding-top'));
    var paddingRight = parseInt(getStyle(firstSlide, 'padding-right'));
    var paddingBottom = parseInt(getStyle(firstSlide, 'padding-bottom'));
    var paddingLeft = parseInt(getStyle(firstSlide, 'padding-left'));
    root.style.setProperty('--slide-width', browserWidth - paddingLeft - paddingRight + "px");
    root.style.setProperty('--slide-height', browserHeight - paddingTop - paddingBottom + "px");
    setTimeout(resizeSlideContent, 100);
}
function resizeSlideContent() {
    //TODO: Find a better way to resize slides. Maybe start by resizing only images!
    var number = +window.location.hash.slice(1);
    var resizer = document.querySelector("article[id='" + number + "'] .resizer");
    if (resizer == null)
        return;
    var content = document.querySelector("article[id='" + number + "'] .content");
    if (content == null)
        return;
    content.style.removeProperty('--scale');
    resizer.style.overflow = 'auto';
    if (resizer.clientHeight < content.clientHeight) {
        var scale = resizer.clientHeight / content.clientHeight;
        content.style.setProperty('--scale', scale.toString());
    }
    resizer.style.overflow = null;
}
function handleKeyPress(e) {
    var key = e.code || e.key;
    switch (key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case 'Space' || ' ':
            nextSlide();
            break;
        case 'ArrowUp':
        case 'ArrowLeft':
            previousSlide();
            break;
    }
}
function handleWheel(e) {
    if (e.deltaY < 0)
        previousSlide();
    if (e.deltaY > 0)
        nextSlide();
}
function handleClick(e) {
    if (e.button === 0) {
        if (e.clientX < window.innerWidth / 2)
            previousSlide();
        else
            nextSlide();
    }
}
function nextSlide() {
    var number = +window.location.hash.slice(1);
    if (document.querySelector("article[id='" + (number + 1) + "']"))
        changeHash("#" + (number + 1));
}
function previousSlide() {
    var number = +window.location.hash.slice(1);
    if (number > 1)
        changeHash("#" + (number - 1));
}
function fixSlideNumber() {
    var number = +window.location.hash.slice(1);
    if (!document.querySelector("article[id='" + number + "']"))
        changeHash('#1');
}
function changeHash(hash) {
    location.replace(hash);
    resizeSlideContent();
}
function createHeaders() {
    var slides = document.querySelectorAll('article.slide');
    slides.forEach(function (slide) {
        var header = slide.querySelector('header');
        var first = slide.querySelector('.content :first-child');
        if (header !== null && first !== null)
            header.append(first);
    });
}
var fixDimensions = fixSlideDimensions.bind(window, 4 / 3);
fixDimensions();
window.addEventListener('load', fixDimensions);
window.addEventListener('resize', fixDimensions);
window.addEventListener('orientationchange', fixDimensions);
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('wheel', handleWheel, false);
window.addEventListener('load', createHeaders);
window.addEventListener('load', fixSlideNumber);
