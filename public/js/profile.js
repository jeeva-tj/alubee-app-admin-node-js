
const a_user = document.getElementById('a_user');
const a_email = document.getElementById('a_email');
const a_phone = document.getElementById('a_phone');
const a_role = document.getElementById('a_role')
const loader = document.getElementById('loader');
const admin_profile = document.getElementById('admin_profile');


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