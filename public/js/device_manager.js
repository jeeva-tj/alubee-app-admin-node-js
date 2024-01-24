
const notyf = new Notyf();

async function deviceStatus() {

    try {

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }
        const { data } = await axios.get(`${hostUrl}/device/stauts`, config)


        if (data.length > 0) {

            console.log(data);

        } else {

            notyf.error({
                message: "No Unit Data",
                duration: 5000,
                position: {
                    x: 'right',
                    y: 'top',
                },
                dismissible: true
            })
        }


    } catch (error) {
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

deviceStatus();