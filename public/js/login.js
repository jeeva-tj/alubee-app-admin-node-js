const host = window.location.origin;
const version = 'v2';
const type = 'api';
const hostUrl = `${host}/${version}/${type}`;

const login_email = document.getElementById('email');
const login_password = document.getElementById('password');
const login_form = document.getElementById('login_form');
const login_loading = document.getElementById('loading');



login_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {

        const data = {
            email: login_email.value,
            password: login_password.value
        }

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        login_loading.innerHTML = 'loading...';

        const fetchApi = await fetch(`${hostUrl}/login`, config);
        const res = await fetchApi.json()
        
        sessionStorage.setItem('alubee', res?.token)
        sessionStorage.setItem('alubee_name', res?.data?.name)

        if (sessionStorage.getItem('alubee')) {
            location.href = host + '/dashboard';
        } else {
            sessionStorage.removeItem('alubee')
        }
        
        login_loading.innerHTML = '';
        
    } catch (error) {

        const resErr = error.response && error.response.data.message ? error.response.data.message : error.message
        console.log(resErr);
    }
})




// Password show/hide functionality
var password = document.getElementById('password');
var toggler = document.getElementById('toggler');

showHidePassword = () => {
    if (password.type == 'password') {
        password.setAttribute('type', 'text');
        toggler.classList.add('fa-eye-slash');
        toggler.classList.remove('fa-eye');
    } else {
        toggler.classList.remove('fa-eye-slash');
        toggler.classList.add('fa-eye');
        password.setAttribute('type', 'password');
    }
};
toggler.addEventListener('click', showHidePassword);
//====