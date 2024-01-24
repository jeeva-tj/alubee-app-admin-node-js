const href = window.location.href.split('/');
const uId = href[href.length - 1];

const user_id = document.getElementById('user_id');
const user_name = document.getElementById('user_name');
const user_email = document.getElementById('user_email');
const user_phone = document.getElementById('user_phone');
const user_role = document.getElementById('user_role')

const user_update_div = document.getElementById('user_update_div');
const user_update_form = document.getElementById('user_update_form');
const loader = document.getElementById('loader');

const notyf = new Notyf();


if (uId) {
    getOnePerson(uId);

} else {
    location.href = '/work-order';
}


async function getOnePerson(id){

    try {
        if (id) {

            user_update_div.classList.add('active');
            loader.classList.add('active');

            const a_token = sessionStorage.getItem('alubee');

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${a_token}`
                }
            }

            const { data } = await axios.get(`${hostUrl}/user/${id}`, config);

            if (data) {

                user_update_div.classList.remove('active');
                loader.classList.remove('active');

                user_id.value = data?.User_ID ? data?.User_ID : '';
                user_name.value = data?.Name ? data?.Name : '';
                user_email.value = data?.Email ? data?.Email : '';
                user_phone.value = data?.Phone ? data?.Phone : '';
                user_role.value = data?.Role ? data?.Role : '';

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

        } else {

            loader.classList.remove('active');
            notyf.error({
                message: 'ID is required!',
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




user_update_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {

        const id = user_id.value;
        
        loader.classList.add('active');

        const wo_data = {
            name: user_name.value,
            email: user_email.value,
            phone: user_phone.value,
            role: user_role.value,
        }

        const a_token = sessionStorage.getItem('alubee');


        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }


        const { data } = await axios.put(`${hostUrl}/user/${id}`, wo_data, config)

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