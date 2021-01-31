/*判断是否支持主题色*/

if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
    console.log('Browser doesn\'t support dark mode');
}

/*判断是否处于深色模式*/
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //Do some thing
    document.getElementsByTagName("body")[0].removeAttribute('data-md-color-scheme');
    document.getElementsByTagName("body")[0].removeAttribute('data-md-color-primary');
    document.getElementsByTagName("body")[0].setAttribute("data-md-color-scheme", "slate");
    document.getElementsByTagName("body")[0].setAttribute("data-md-color-primary", "dark");
}

/*判断是否处于浅色模式*/
if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.getElementsByTagName("body")[0].removeAttribute('data-md-color-scheme');
    document.getElementsByTagName("body")[0].removeAttribute('data-md-color-primary');
    document.getElementsByTagName("body")[0].setAttribute("data-md-color-primary", "light");
    document.getElementsByTagName("body")[0].setAttribute("data-md-color-scheme", "light");
}


/*模式切换听器*/
var listeners = {
    dark: function (mediaQueryList) {
        if (mediaQueryList.matches) {
            document.getElementsByTagName("body")[0].removeAttribute('data-md-color-scheme');
            document.getElementsByTagName("body")[0].removeAttribute('data-md-color-primary');
            document.getElementsByTagName("body")[0].setAttribute("data-md-color-scheme", "slate");
            document.getElementsByTagName("body")[0].setAttribute("data-md-color-primary", "dark");
        }
    },
    light: function (mediaQueryList) {
        if (mediaQueryList.matches) {
            document.getElementsByTagName("body")[0].removeAttribute('data-md-color-scheme');
            document.getElementsByTagName("body")[0].removeAttribute('data-md-color-primary');
            document.getElementsByTagName("body")[0].setAttribute("data-md-color-primary", "light");
            document.getElementsByTagName("body")[0].setAttribute("data-md-color-scheme", "light");
        }
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(listeners.dark)
window.matchMedia('(prefers-color-scheme: light)').addListener(listeners.light)

function changeTheme() {

    if (document.getElementsByTagName("body")[0].getAttribute("data-md-color-primary") == "light") {
        document.getElementsByTagName("body")[0].removeAttribute('data-md-color-scheme');
        document.getElementsByTagName("body")[0].removeAttribute('data-md-color-primary');
        document.getElementsByTagName("body")[0].setAttribute("data-md-color-scheme", "slate");
        document.getElementsByTagName("body")[0].setAttribute("data-md-color-primary", "dark");
    } else {
        document.getElementsByTagName("body")[0].removeAttribute('data-md-color-scheme');
        document.getElementsByTagName("body")[0].removeAttribute('data-md-color-primary');
        document.getElementsByTagName("body")[0].setAttribute("data-md-color-primary", "light");
        document.getElementsByTagName("body")[0].setAttribute("data-md-color-scheme", "light");
    }

}

console.log(`
░░░░░░░░░░░░░░░░░░░░░░░░▄░░
░░░░░░░░░▐█░░░░░░░░░░░▄▀▒▌░
░░░░░░░░▐▀▒█░░░░░░░░▄▀▒▒▒▐
░░░░░░░▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐
░░░░░▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐
░░░▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌
░░▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒
░░▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐
░▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄
░▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒
▀▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒
单身狗就这样默默地看着你，一句话也不说。
https://github.com/higker
`)