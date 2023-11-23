const host = window.location.origin;
const version = 'v2';
const type = 'api';
const hostUrl = `${host}/${version}/${type}`;

const login_email = document.getElementById('email');
const login_password = document.getElementById('password');
const login_form = document.getElementById('login_form');
const loader = document.getElementById('loader');
const login_err_msg = document.getElementById('login_err_msg');



login_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {

        const data = {
            email: login_email.value,
            password: login_password.value
        }

        // const config = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // }

        loader.classList.add('active');

        const res = await axios.post(`${hostUrl}/login`, data);
        // const res = await fetchApi.json()
        
        if (res) {
            loader.classList.remove('active');

            sessionStorage.setItem('alubee', res?.token)
            sessionStorage.setItem('alubee_name', res?.data?.name)

            if (sessionStorage.getItem('alubee')) {
                location.href = host + '/dashboard';
            } else {
                sessionStorage.removeItem('alubee')
            }
        }
        
        
    } catch (error) {
        loader.classList.remove('active');
        const resErr = error.response && error.response.data.message ? error.response.data.message : error.message
        login_err_msg.innerHTML = `<div class="bg-[#F8D7D9] text-[#721C23] w-full p-2 text-center text-sm font-medium rounded mb-3">${resErr}</div>`;
    }
})


login_err_msg.addEventListener('click', () => {
    login_err_msg.innerHTML = '';
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