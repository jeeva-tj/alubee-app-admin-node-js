const host = window.location.origin;
const version = 'v2';
const type = 'api';
const hostUrl = `${host}/${version}/${type}`;

const login_email = document.getElementById('email');
const login_password = document.getElementById('password');
const login_form = document.getElementById('login_form');
const loader = document.getElementById('loader');
const login_err_msg = document.getElementById('login_err_msg');

const notyf = new Notyf();


login_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {

        const login_data = {
            email: login_email.value,
            password: login_password.value
        }

        loader.classList.add('active');

        const { data } = await axios.post(`${hostUrl}/login`, login_data);

        if (data?.token) {
            loader.classList.remove('active');

            sessionStorage.setItem('alubee', data?.token)
            sessionStorage.setItem('alubee_name', data?.name)

            if (sessionStorage.getItem('alubee')) {
                location.href = host + '/dashboard';
            } else {
                sessionStorage.removeItem('alubee')
            }
        }else{
            loader.classList.remove('active');
            // login_err_msg.innerHTML = `<div class="bg-[#F8D7D9] text-[#721C23] w-full p-2 text-center text-sm font-medium rounded mb-3">Something went wrong!</div>`;
            notyf.error({
                message: 'Something went wrong!',
                duration: 5000,
                position: {
                    x: 'right',
                    y: 'top',
                },
                dismissible: true
            })
        }
        
        
    } catch (error) {
        loader.classList.remove('active');
        const resErr = error.response && error.response.data.message ? error.response.data.message : error.message;
        notyf.error({
            message: resErr,
            duration: 5000,
            position: {
                x: 'right',
                y: 'top',
            },
            dismissible: true
        })
        // login_err_msg.innerHTML = `<div class="bg-[#F8D7D9] text-[#721C23] w-full p-2 text-center text-sm font-medium rounded mb-3">${resErr}</div>`;
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