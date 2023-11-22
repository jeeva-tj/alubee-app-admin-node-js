const host = window.location.origin;
const version = 'v2';
const type = 'api';
const hostUrl = `${host}/${version}/${type}`;

if (!sessionStorage.getItem('alubee')) {
    logout();
}

const logout_btn = document.getElementById('logout_btn');
const mob_logout_btn = document.getElementById('mob_logout_btn');

logout_btn.addEventListener('click', () => logout());
mob_logout_btn.addEventListener('click', () => logout());


async function logout() {
    await fetch(`${hostUrl}/logout`);
    sessionStorage.removeItem('alubee');
    sessionStorage.removeItem('alubee_name');
    location.href = origin;
}


async function userProfile(){

    const alubee_token = sessionStorage.getItem('alubee');
    const alubee_name = sessionStorage.getItem('alubee_name');
    const profile_initial = document.getElementById('profile_initial');

    if (alubee_token && alubee_name) {
        profile_initial.innerHTML = alubee_name?.charAt(0);
    }else{
        logout();
    }
}

userProfile();