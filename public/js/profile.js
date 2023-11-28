
const a_user = document.getElementById('a_user');
const a_email = document.getElementById('a_email');
const a_phone = document.getElementById('a_phone');
const a_role = document.getElementById('a_role')

const loader = document.getElementById('loader');
const text_loader = document.getElementById('text_loader');

const admin_profile = document.getElementById('admin_profile');

const a_update_btn = document.getElementById('a_update_btn');

const a_name_input = document.getElementById('a_name_input');
const a_email_input = document.getElementById('a_email_input');
const a_phone_input = document.getElementById('a_phone_input');

const a_saveUpdate_btn = document.getElementById('a_saveUpdate_btn');
const a_cancelUpdate_btn = document.getElementById('a_cancelUpdate_btn');


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

            a_name_input.value = data.Name;
            a_email_input.value = data.Email;
            a_phone_input.value = data.Phone;

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


a_update_btn.addEventListener('click', () => {

    a_name_input.classList.add('active');
    a_email_input.classList.add('active');
    a_phone_input.classList.add('active');

    a_saveUpdate_btn.classList.add('active');
    a_cancelUpdate_btn.classList.add('active');

    a_update_btn.style.display = "none";
    a_user.style.display = "none";
    a_email.style.display = "none";
    a_phone.style.display = "none";
})

a_saveUpdate_btn.addEventListener('click', async() => {

    try {

        text_loader.innerHTML = "Loading...!";

        const a_data = {
            name: a_name_input.value,
            email: a_email_input.value,
            phone: a_phone_input.value
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

            a_saveUpdate_btn.classList.remove('active');
            a_cancelUpdate_btn.classList.remove('active');

            a_update_btn.style.display = "block";
            a_user.style.display = "block";
            a_email.style.display = "block";
            a_phone.style.display = "block";

            getProfile();

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

    a_saveUpdate_btn.classList.remove('active');
    a_cancelUpdate_btn.classList.remove('active');

    a_update_btn.style.display = "block";
    a_user.style.display = "block";
    a_email.style.display = "block";
    a_phone.style.display = "block";
})
