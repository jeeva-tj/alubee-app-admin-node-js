const user_name = document.getElementById('user_name');
const user_email = document.getElementById('user_email');
const user_phone = document.getElementById('user_phone');
const user_role = document.getElementById('user_role')
const user_password = document.getElementById('user_password');
const user_cpassword = document.getElementById('user_cpassword');

const user_add_div = document.getElementById('user_add_div');
const user_add_form = document.getElementById('user_add_form');
const loader = document.getElementById('loader');

const password_err = document.getElementById('password_err-msg');
const cpassword_err = document.getElementById('cpassword_err-msg');

const notyf = new Notyf();

user_add_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {

        loader.classList.add('active');

        const u_data = {
            name: user_name.value,
            email: user_email.value,
            phone: user_phone.value,
            role: user_role.value,
            password: user_cpassword.value,
        }

        const a_token = sessionStorage.getItem('alubee');


        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.post(`${hostUrl}/user`, u_data, config)

        if (data?.success === true) {

            loader.classList.remove('active');
            location.href = origin + '/user-management';
            getNotification();

        } else {

            loader.classList.remove('active');
            notyf.error({
                message: 'Something wrong!',
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
        const resErr = error.response && error.response.data.message ? error.response.data.message : error.message

        notyf.error({
            message: resErr,
            duration: 5000,
            position: {
                x: 'right',
                y: 'top',
            },
            dismissible: true
        })
    }
})



const passwordMsg = {
    charLength: 'Must be at least 5 characters long',
    lowercase: 'Must contain a lowercase letter',
    uppercase: 'Must contain an uppercase letter',
    special: 'Must contain a number or special character'
}

var pattern = {
    charLength: function () {
        if (user_password.value.length >= 5) {
            return true;
        }
    },
    lowercase: function () {
        var regex = /^(?=.*[a-z]).+$/; // Lowercase character pattern

        if (regex.test(user_password.value)) {
            return true;
        }
    },
    uppercase: function () {
        var regex = /^(?=.*[A-Z]).+$/; // Uppercase character pattern

        if (regex.test(user_password.value)) {
            return true;
        }
    },
    special: function () {
        var regex = /^(?=.*[0-9_\W]).+$/; // Special character or number pattern

        if (regex.test(user_password.value)) {
            return true;
        }
    }
};



user_password.addEventListener('keyup', () => {

    if (user_password.value) {

        if (!pattern.lowercase()) {
            password_err.innerHTML = passwordMsg.lowercase;
            password_err.style.color = 'red';

        } else if (!pattern.charLength()) {
            password_err.innerHTML = passwordMsg.charLength;
            password_err.style.color = 'red';

        } else if (!pattern.uppercase()) {
            password_err.innerHTML = passwordMsg.uppercase;
            password_err.style.color = 'red';

        } else if (!pattern.special()) {
            password_err.innerHTML = passwordMsg.special;
            password_err.style.color = 'red';

        } else {
            password_err.innerHTML = 'Strong';
            password_err.style.color = 'green';
        }

    } else {
        password_err.innerHTML = '';
    }

})


user_cpassword.addEventListener('keyup', () => {

    if (user_cpassword.value) {
        if (user_password.value === user_cpassword.value) {
            cpassword_err.innerHTML = "Password matched";
            cpassword_err.style.color = 'green';
        } else {
            cpassword_err.innerHTML = "Password doesn't match";
            cpassword_err.style.color = 'red';
        }
    } else {
        cpassword_err.innerHTML = "";
    }

})




// Password show/hide functionality
const user_password_toggler = document.getElementById('user_password_toggler');
const user_cpassword_toggler = document.getElementById('user_cpassword_toggler');


showHidePassword = (password, toggler) => {
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
user_password_toggler.addEventListener('click', () => showHidePassword(user_password, user_password_toggler));
user_cpassword_toggler.addEventListener('click', () => showHidePassword(user_cpassword, user_cpassword_toggler));
