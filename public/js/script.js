// Fullscreen function
let fullscreenBtn = document.getElementById("fullscreen_btn");
fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }

        fullscreenBtn.innerHTML = `
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.7071 3.70711L16.4142 9H20C20.5523 9 21 9.44772 21 10C21 10.5523 20.5523 11 20 11H14.0007L13.997 11C13.743 10.9992 13.4892 10.9023 13.295 10.7092L13.2908 10.705C13.196 10.6096 13.1243 10.4999 13.0759 10.3828C13.0273 10.2657 13.0004 10.1375 13 10.003L13 10V4C13 3.44772 13.4477 3 14 3C14.5523 3 15 3.44772 15 4V7.58579L20.2929 2.29289C20.6834 1.90237 21.3166 1.90237 21.7071 2.29289C22.0976 2.68342 22.0976 3.31658 21.7071 3.70711Z" fill="#000000"/>
                <path d="M9 20C9 20.5523 9.44772 21 10 21C10.5523 21 11 20.5523 11 20V14.0007C11 13.9997 11 13.998 11 13.997C10.9992 13.7231 10.8883 13.4752 10.7092 13.295C10.7078 13.2936 10.7064 13.2922 10.705 13.2908C10.6096 13.196 10.4999 13.1243 10.3828 13.0759C10.2657 13.0273 10.1375 13.0004 10.003 13C10.002 13 10.001 13 10 13H4C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15H7.58579L2.29289 20.2929C1.90237 20.6834 1.90237 21.3166 2.29289 21.7071C2.68342 22.0976 3.31658 22.0976 3.70711 21.7071L9 16.4142V20Z" fill="#000000"/>
            </svg>`;
    } else {

        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }

        fullscreenBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-arrows-maximize">
                <path d="M16 4l4 0l0 4"></path>
                <path d="M14 10l6 -6"></path>
                <path d="M8 20l-4 0l0 -4"></path>
                <path d="M4 20l6 -6"></path>
                <path d="M16 20l4 0l0 -4"></path>
                <path d="M14 14l6 6"></path>
                <path d="M8 4l-4 0l0 4"></path>
                <path d="M4 4l6 6"></path>
            </svg>`;
    }
});
//=====



// sidebar mobile responsive - function
document.getElementById('hamburger_btn').addEventListener('click', () => {
    document.getElementById('sidebar_mobile_container').classList.add('active')
})

document.getElementById('sidebar_mobile_container').addEventListener('click', () => {
    document.getElementById('sidebar_mobile_container').classList.remove('active')
})
//====