const href = window.location.href.split('/');
const woId = href[href.length - 1];

const plan_id = document.getElementById('plan_id');
const date = document.getElementById('date');
const shift = document.getElementById('shift');
const machine_no = document.getElementById('machine_no')
const part_no = document.getElementById('part_no');
const shot_plan = document.getElementById('shot_plan');
const rejection_plan = document.getElementById('rejection_plan');
const operator = document.getElementById('operator');
const work_order_update_div = document.getElementById('work_order_update_div');
const work_order_update_form = document.getElementById('work_order_update_form');
const loader = document.getElementById('loader');

const notyf = new Notyf();

if (woId) {
    work_order_special(woId);
    
}else{
    location.href = '/work-order';
}



async function work_order_special(id) {

    try {
        if (id) {

            work_order_update_div.classList.add('active');
            loader.classList.add('active');

            const a_token = sessionStorage.getItem('alubee');

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${a_token}`
                }
            }

            const { data } = await axios.get(`${hostUrl}/work-order/${id}`, config);

            if (data) {

                work_order_update_div.classList.remove('active');
                loader.classList.remove('active');

                plan_id.value = data?.PlanID ? data?.PlanID : '-';
                date.value = data?.Date.value ? data?.Date.value : '-';
                shift.value = data?.Shift ? data?.Shift : '-';
                machine_no.value = data?.Machine_No ? data?.Machine_No : '-';
                part_no.value = data?.Part_No ? data?.Part_No : '-';
                shot_plan.value = data?.Shot_Plan ? data?.Shot_Plan : '-';
                rejection_plan.value = data?.Rejection_Plan ? data?.Rejection_Plan : '-';
                operator.value = data?.Operator ? data?.Operator : '-';

            } else {

                notyf.error({
                    message: 'Something went wrong!',
                    duration: 3000,
                    position: {
                        x: 'right',
                        y: 'top',
                    },
                    dismissible: true
                })
            }

        } else {

            notyf.error({
                message: 'ID is required!',
                duration: 3000,
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
            duration: 3000,
            position: {
                x: 'right',
                y: 'top',
            },
            dismissible: true
        })
    }
}




work_order_update_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {

        loader.classList.add('active');

        const wo_data = {
            plan_id: plan_id.value,
            date: date.value,
            machine_no: machine_no.value,
            operator: operator.value,
            part_no: part_no.value,
            rejection_plan: Number(rejection_plan.value),
            shift: shift.value,
            shot_plan: Number(shot_plan.value)
        }

        const a_token = sessionStorage.getItem('alubee');


        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }


        const { data } = await axios.put(`${hostUrl}/work-order/${wo_data.plan_id}`, wo_data, config)

        if (data?.success === true) {

            loader.classList.remove('active');
            location.href = origin + '/work-order';

        } else {

            loader.classList.remove('active');
            notyf.error({
                message: 'Something went wrong!',
                duration: 3000,
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
            duration: 3000,
            position: {
                x: 'right',
                y: 'top',
            },
            dismissible: true
        })
    }
})