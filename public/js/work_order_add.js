
const plan_id = document.getElementById('plan_id');
const date = document.getElementById('date');
const shift = document.getElementById('shift');
const machine_no = document.getElementById('machine_no')
const part_no = document.getElementById('part_no');
const shot_plan = document.getElementById('shot_plan');
const rejection_plan = document.getElementById('rejection_plan');
const operator = document.getElementById('operator');
const pressure = document.getElementById('pressure')
const unit = document.getElementById('unit')
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

        if (data?.operators) {

            work_order_add_div.classList.remove('active');
            loader.classList.remove('active');

            let operatorsOutput = '';
            data?.operators.forEach((val) => {
                operatorsOutput += `
                    <option value='${val}'>${val}</option>
                `;
            })

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


// shot plan validation
let shot_plan_check = false;
shot_plan.addEventListener('keyup', () => {

    document.getElementById('shotPlan_check_err').innerHTML = ''

    if (shot_plan.value === '') {
        shot_plan_check = false;
        document.getElementById('shotPlan_check_err').innerHTML = '';

    } else {
        if (/^(?:0|[1-9]\d{0,2})$/.test(shot_plan.value)) {
            shot_plan_check = true;
            document.getElementById('shotPlan_check_err').innerHTML = '';
            
        } else {
            shot_plan_check = false;
            document.getElementById('shotPlan_check_err').innerHTML = 'Invalid input. Please enter a valid number.'
        }
    }
})


// rejection plan validation
let rejection_plan_check = false;
rejection_plan.addEventListener('keyup', () => {

    document.getElementById('rejectionPlan_check_err').innerHTML = ''

    if (rejection_plan.value === '') {
        rejection_plan_check = false;
        document.getElementById('rejectionPlan_check_err').innerHTML = '';

    } else {
        if (/^(?:0|[1-9]\d{0,2})$/.test(rejection_plan.value)) {
            rejection_plan_check = true;
            document.getElementById('rejectionPlan_check_err').innerHTML = '';
            
        } else {
            rejection_plan_check = false;
            document.getElementById('rejectionPlan_check_err').innerHTML = 'Invalid input. Please enter a valid number.'
        }
    }
})


// pressure validation
let pressure_check = false;

pressure.addEventListener('keyup', () => {
    document.getElementById('pressure_check_err').innerHTML = ''

    if (pressure.value === '') {
        pressure_check = false;
        document.getElementById('pressure_check_err').innerHTML = '';
    }else{
        
        if (/^(?:0|[1-9]\d{0,2})$/.test(pressure.value)) {
            if (pressure.value <= 400) {
                pressure_check = true;
                document.getElementById('pressure_check_err').innerHTML = '';
            } else {
                pressure_check = false;
                document.getElementById('pressure_check_err').innerHTML = 'Value must inside the range is (0 to 400)'
            }
        } else {
            pressure_check = false;
            document.getElementById('pressure_check_err').innerHTML = 'Invalid input. Please enter a valid number.'
        }
    }
    
})


unit.addEventListener('change', (e) => {

    getWorkOrderMachinesByUnit(e.target.value);
})


async function getWorkOrderMachinesByUnit(unitVal) {
    try {

        const a_token = sessionStorage.getItem('alubee');

        document.getElementById('machine_loader').innerHTML = "Loading...";
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const query = {
            unit: unitVal
        }


        const { data } = await axios.post(`${hostUrl}/work-order/machines`, query, config)

        if (data.length > 0) {
            document.getElementById('machine_loader').innerHTML = "";
            let result = '';

            data?.forEach((val) => {
                result += `
                    <option value='${val.Machine_No}'>${val.Machine_No}</option>
                `;
            })

            document.getElementById('machine_no').innerHTML = result;

        } else {
            document.getElementById('machine_loader').innerHTML = "";
            notyf.error({
                message: "No Machines Data",
                duration: 5000,
                position: {
                    x: 'right',
                    y: 'top',
                },
                dismissible: true
            })
        }

    } catch (error) {
        document.getElementById('machine_loader').innerHTML = "";
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

getWorkOrderMachinesByUnit('Unit I')

work_order_add_form.addEventListener('submit',async (e) => {
    e.preventDefault();

    try {

        loader.classList.add('active');

        if (!shot_plan_check) {
            loader.classList.remove('active');
            document.getElementById('shotPlan_check_err').innerHTML = "Something went wrong!, please check the value"
        }

        if (!rejection_plan_check) {
            loader.classList.remove('active');
            document.getElementById('rejectionPlan_check_err').innerHTML = "Something went wrong!, please check the value"
        }

        if (!pressure_check) {
            loader.classList.remove('active');
            document.getElementById('pressure_check_err').innerHTML = "Something went wrong!, please check the value"
        }

        const wo_data = {
            plan_id: plan_id.value,
            date: date.value,
            machine_no: machine_no.value,
            operator: operator.value,
            part_no: part_no.value,
            rejection_plan: Number(rejection_plan.value),
            shift: shift.value,
            shot_plan: Number(shot_plan.value),
            pressure: Number(pressure.value),
            unit: unit.value
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
            getNotification();

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