
const a_user = document.getElementById('a_user');
const a_email = document.getElementById('a_email');
const a_phone = document.getElementById('a_phone');
const a_role = document.getElementById('a_role')

const loader = document.getElementById('loader');
const text_loader = document.getElementById('text_loader');

const admin_profile = document.getElementById('admin_profile');


const a_name_input = document.getElementById('a_name_input');
const a_email_input = document.getElementById('a_email_input');
const a_phone_input = document.getElementById('a_phone_input');
const a_role_input = document.getElementById('a_role_input');

const a_update_btn = document.getElementById('a_update_btn');
const a_saveUpdate_btn = document.getElementById('a_saveUpdate_btn');
const a_cancelUpdate_btn = document.getElementById('a_cancelUpdate_btn');

const reset_password_btn = document.getElementById('reset_password_btn');
const save_resetpassword_btn = document.getElementById('save_resetpassword_btn');
const cancel_resetpassword_btn = document.getElementById('cancel_resetpassword_btn');


const profile_container = document.getElementById('profile_container');
const password_container = document.getElementById('password_container');


const a_password_input = document.getElementById('a_password_input');
const a_cpassword_input = document.getElementById('a_cpassword_input');


const a_password_err = document.getElementById('a_password_err');
const a_cpassword_err = document.getElementById('a_cpassword_err');



const notyf = new Notyf();


async function getProfile() {

    try {

        admin_profile.classList.add('active');
        loader.classList.add('active');

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.get(`${hostUrl}/profile`, config)


        if (data) {

            admin_profile.classList.remove('active');
            loader.classList.remove('active');

            a_user.innerHTML = data.Name;
            a_email.innerHTML = data.Email;
            a_phone.innerHTML = data.Phone;
            a_role.innerHTML = data.Role;

        } else {

            loader.classList.remove('active');
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
}

getProfile();






a_update_btn.addEventListener('click', async () => {

    try {

        text_loader.innerHTML = "Loading...!";

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.get(`${hostUrl}/profile`, config)


        if (data) {
            text_loader.innerHTML = "";

            a_name_input.value = data.Name;
            a_email_input.value = data.Email;
            a_phone_input.value = data.Phone;
            a_role_input.value = data.Role

            a_name_input.classList.add('active');
            a_email_input.classList.add('active');
            a_phone_input.classList.add('active');

            if (data.Role === 'Owner') {
                a_role.style.display = "none";
                a_role_input.classList.add('active');
            }else{
                a_role.style.display = "block";
                a_role_input.classList.remove('active');
            }

            a_saveUpdate_btn.classList.add('active');
            a_cancelUpdate_btn.classList.add('active');

            a_update_btn.style.display = "none";
            a_user.style.display = "none";
            a_email.style.display = "none";
            a_phone.style.display = "none";

            reset_password_btn.style.display = "none";
            

        } else {

            text_loader.innerHTML = "";
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

        text_loader.innerHTML = "";
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





a_saveUpdate_btn.addEventListener('click', async() => {

    try {

        text_loader.innerHTML = "Loading...!";

        const a_data = {
            name: a_name_input.value,
            email: a_email_input.value,
            phone: a_phone_input.value,
            role: a_role_input.value
        }


        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.put(`${hostUrl}/admin/profile`, a_data, config)

        if (data.success === true) {
            text_loader.innerHTML = "";

            a_name_input.classList.remove('active');
            a_email_input.classList.remove('active');
            a_phone_input.classList.remove('active');
            a_role_input.classList.remove('active');

            a_saveUpdate_btn.classList.remove('active');
            a_cancelUpdate_btn.classList.remove('active');

            a_update_btn.style.display = "block";
            a_user.style.display = "block";
            a_email.style.display = "block";
            a_phone.style.display = "block";
            a_role.style.display = "block";

            reset_password_btn.style.display = "block";

            getProfile();

            notyf.success({
                message: 'Profile Updated!',
                duration: 5000,
                position: {
                    x: 'right',
                    y: 'top',
                },
                dismissible: true
            })

        } else {

            text_loader.innerHTML = "";
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
        
        text_loader.innerHTML = "";
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



a_cancelUpdate_btn.addEventListener('click', () => {
    a_name_input.classList.remove('active');
    a_email_input.classList.remove('active');
    a_phone_input.classList.remove('active');
    a_role_input.classList.remove('active');

    a_saveUpdate_btn.classList.remove('active');
    a_cancelUpdate_btn.classList.remove('active');

    a_update_btn.style.display = "block";
    a_user.style.display = "block";
    a_email.style.display = "block";
    a_phone.style.display = "block";
    a_role.style.display = "block";

    reset_password_btn.style.display = "block";
})



reset_password_btn.addEventListener('click', () => {
    a_update_btn.style.display = "none";
    reset_password_btn.style.display = "none";
    profile_container.classList.add('active')
    password_container.classList.add('active')
    save_resetpassword_btn.classList.add('active')
    cancel_resetpassword_btn.classList.add('active')
})

cancel_resetpassword_btn.addEventListener('click', () => {
    a_update_btn.style.display = "block";
    reset_password_btn.style.display = "block";
    profile_container.classList.remove('active')
    password_container.classList.remove('active')
    save_resetpassword_btn.classList.remove('active')
    cancel_resetpassword_btn.classList.remove('active')
})




const passwordMsg = {
    charLength: 'Must be at least 5 characters long',
    lowercase: 'Must contain a lowercase letter',
    uppercase: 'Must contain an uppercase letter',
    special: 'Must contain a number or special character'
}

var pattern = {
    charLength: function () {
        if (a_password_input.value.length >= 5) {
            return true;
        }
    },
    lowercase: function () {
        var regex = /^(?=.*[a-z]).+$/; // Lowercase character pattern

        if (regex.test(a_password_input.value)) {
            return true;
        }
    },
    uppercase: function () {
        var regex = /^(?=.*[A-Z]).+$/; // Uppercase character pattern

        if (regex.test(a_password_input.value)) {
            return true;
        }
    },
    special: function () {
        var regex = /^(?=.*[0-9_\W]).+$/; // Special character or number pattern

        if (regex.test(a_password_input.value)) {
            return true;
        }
    }
};



a_password_input.addEventListener('keyup', () => {

    if (a_password_input.value) {

        if (!pattern.lowercase()) {
            a_password_err.innerHTML = passwordMsg.lowercase;
            a_password_err.style.color = 'red';

        } else if (!pattern.charLength()) {
            a_password_err.innerHTML = passwordMsg.charLength;
            a_password_err.style.color = 'red';

        } else if (!pattern.uppercase()) {
            a_password_err.innerHTML = passwordMsg.uppercase;
            a_password_err.style.color = 'red';

        } else if (!pattern.special()) {
            a_password_err.innerHTML = passwordMsg.special;
            a_password_err.style.color = 'red';

        } else {
            a_password_err.innerHTML = 'Password strong';
            a_password_err.style.color = 'green';
        }

    } else {
        a_password_err.innerHTML = '';
    }

})


a_cpassword_input.addEventListener('keyup', () => {

    if (a_cpassword_input.value) {
        if (a_password_input.value === a_cpassword_input.value) {
            a_cpassword_err.innerHTML = "Password matched";
            a_cpassword_err.style.color = 'green';
        } else {
            a_cpassword_err.innerHTML = "Password doesn't match";
            a_cpassword_err.style.color = 'red';
        }
    } else {
        a_cpassword_err.innerHTML = "";
    }

})


save_resetpassword_btn.addEventListener('click', async () => {

    try {

        if (a_password_input.value && a_cpassword_input.value) {

            if (a_password_input.value === a_cpassword_input.value) {

                a_password_err.innerHTML = "";
                a_cpassword_err.innerHTML = "";
                text_loader.innerHTML = "Loading...!";


                const a_pwd_data = {
                    password: a_password_input.value,
                }

                const a_token = sessionStorage.getItem('alubee');

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${a_token}`
                    }
                }

                const { data } = await axios.put(`${hostUrl}/admin/reset-pwd`, a_pwd_data, config)

                if (data.success === true) {
                    text_loader.innerHTML = "";

                    a_update_btn.style.display = "block";
                    reset_password_btn.style.display = "block";
                    profile_container.classList.remove('active')
                    password_container.classList.remove('active')
                    save_resetpassword_btn.classList.remove('active')
                    cancel_resetpassword_btn.classList.remove('active')

                    notyf.success({
                        message: 'Password Reseted!',
                        duration: 5000,
                        position: {
                            x: 'right',
                            y: 'top',
                        },
                        dismissible: true
                    })

                } else {
                    text_loader.innerHTML = "";
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
            } else {
                text_loader.innerHTML = "";
                a_cpassword_err.innerHTML = "Password doesn't match";
                a_cpassword_err.style.color = 'red';

            }

        }else{
            text_loader.innerHTML = "";
            a_password_err.innerHTML = "Required!";
            a_password_err.style.color = 'red';
            a_cpassword_err.innerHTML = "Required!";
            a_cpassword_err.style.color = 'red';
        }

    } catch (error) {

        text_loader.innerHTML = "";
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