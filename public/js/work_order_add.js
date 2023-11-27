
const plan_id = document.getElementById('plan_id');
const date = document.getElementById('date');
const shift = document.getElementById('shift');
const machine_no = document.getElementById('machine_no')
const part_no = document.getElementById('part_no');
const shot_plan = document.getElementById('shot_plan');
const rejection_plan = document.getElementById('rejection_plan');
const operator = document.getElementById('operator');
const work_order_add_div = document.getElementById('work_order_add_div');
const work_order_add_form = document.getElementById('work_order_add_form');
const loader = document.getElementById('loader');

const notyf = new Notyf();

async function workOrderReq() {

    try {

        work_order_add_div.classList.add('active');
        loader.classList.add('active');

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.get(`${hostUrl}/work-order-req`, config)

        if (data?.machines && data?.operators) {

            work_order_add_div.classList.remove('active');
            loader.classList.remove('active');


            let machinesOutput = '';
            data?.machines.forEach((val) => {
                machinesOutput += `
                    <option value='${val}'>${val}</option>
                `;
            })

            let operatorsOutput = '';
            data?.operators.forEach((val) => {
                operatorsOutput += `
                    <option value='${val}'>${val}</option>
                `;
            })

            machine_no.innerHTML = machinesOutput;
            operator.innerHTML = operatorsOutput;

        }else{

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
}

workOrderReq();




work_order_add_form.addEventListener('submit',async (e) => {
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

        const { data } = await axios.post(`${hostUrl}/work-order-create`, wo_data, config)

        if (data?.success === true) {

            loader.classList.remove('active');
            location.href = origin + '/work-order';

        }else{

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