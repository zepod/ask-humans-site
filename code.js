const elementInViewport = el => {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
    );
}

const getMobileOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) return "Android";
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
    return "unknown";
}

const sections = ['overview', 'asking', 'answering', 'relating', 'identity', 'author']

window.addEventListener('scroll', () => {
    const [section] = sections.filter(_section => elementInViewport(document.querySelector(`#${_section}`)))
    if (section) history.replaceState(undefined, undefined, `#${section}`)
    sections.forEach(section => {
        if (window.location.href.indexOf(section) > -1){
            document.querySelector(`#${section}-link`).classList.add('active')
        } else {
            document.querySelector(`#${section}-link`).classList.remove('active')
        }
    })
})

setTimeout(() => {
    const os = getMobileOS()
    if (os === 'unknown') return;

    let menuShown = false;

    const menuElement = document.querySelector('.menu-mobile')

    document.querySelector('.navbar')
        .addEventListener('click', () => {
            menuElement.style.pointerEvents = menuShown ? 'none' : 'auto';
            menuElement.style.opacity = menuShown ? '0' : '1';
            menuElement.style.zIndex = menuShown ? '-1' : '5';
            menuShown = !menuShown;
        })

    menuElement.addEventListener('click', () => {
            menuElement.style.pointerEvents = 'none';
            menuElement.style.opacity = '0';
            menuElement.style.zIndex = '-1';
            menuShown = false;
        })
    setTimeout(() => {
        const appLink = document.querySelector(`.app-link-${os}`)
        if (appLink) {
            appLink.style.opacity = '1'
            appLink.style.pointerEvents = 'auto';
        }
    }, 700)
}, 100)
