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
    location.href = origin;
}