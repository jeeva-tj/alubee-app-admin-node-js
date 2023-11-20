const host = 'http://localhost:8080'
const version = 'v2';
const type = 'api';
const hostUrl = `${host}/${version}/${type}`;

const login_email = document.getElementById('email');
const login_password = document.getElementById('password');
const login_form = document.getElementById('login_form');
const login_loading = document.getElementById('loading');

if (sessionStorage.getItem('alubee')) {
    location.href = host + '/dashboard';
}else{
    sessionStorage.removeItem('alubee')
}

login_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {

        const data = {
            email: login_email.value,
            password: login_password.value
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        login_loading.innerHTML = 'loading...';

        const res = await axios.post(`${hostUrl}/login`, data, config)

        const storeLocal = {
            name: res?.data?.data?.name,
            email: res?.data?.data?.email,
            token: res?.data?.token,
        }
        
        sessionStorage.setItem('alubee', JSON.stringify(storeLocal))
        
        login_loading.innerHTML = '';

        if (sessionStorage.getItem('alubee')) {
            location.href = host + '/dashboard';
        } else {
            sessionStorage.removeItem('alubee')
        }
        
    } catch (error) {

        const resErr = error.response && error.response.data.message ? error.response.data.message : error.message
        console.log(resErr);
    }
})






