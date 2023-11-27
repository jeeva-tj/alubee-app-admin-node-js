
const report_dates = document.getElementById('dates');
const report_shifts = document.getElementById('shifts');
const report_machines = document.getElementById('machine_no');
const reportFilter_form = document.getElementById('reportFilter_form')
const loader = document.getElementById('loader');
const report_filter_form = document.getElementById('report_filter_form');

const notyf = new Notyf();


async function reportsFilterReq() {

    try {

        report_filter_form.classList.add('active');
        loader.classList.add('active');

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.get(`${hostUrl}/report`, config)


        if (data) {

            report_filter_form.classList.remove('active');
            loader.classList.remove('active');

            const dateArr = data?.dates;
            const shiftArr = data?.shifts;
            const machineArr = data?.machine_no;

            let dateOutput = '';
            dateArr.forEach((val) => {
                dateOutput += `
                    <option value='${val}'>${val}</option>
                `;
            })

            let shiftOutput = '';
            shiftArr.forEach((val) => {
                shiftOutput += `
                    <option value='${val}'>${val}</option>
                `;
            })
           
            let machineOutput = '';
            machineArr.forEach((val) => {
                machineOutput += `
                    <option value='${val}'>${val}</option>
                `;
            })

            report_dates.innerHTML = dateOutput;
            report_shifts.innerHTML = shiftOutput;
            report_machines.innerHTML = machineOutput;

        }else{

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

reportsFilterReq();



const r_date = document.getElementById('r_date');
const r_shift = document.getElementById('r_shift');
const r_machine = document.getElementById('r_machine');
const r_inCharge = document.getElementById('r_inCharge');
const r_supervisor = document.getElementById('r_supervisor');
const r_quality_inCharge = document.getElementById('r_quality_inCharge');
const r_operator = document.getElementById('r_operator');
const r_partNo = document.getElementById('r_partNo');
const r_shotPlan = document.getElementById('r_shotPlan');
const r_shotCount = document.getElementById('r_shotCount');
const r_rejPlan = document.getElementById('r_rejPlan');
const r_rejCount = document.getElementById('r_rejCount');
const r_total_shotPlan = document.getElementById('r_total_shotPlan');
const r_total_shotCount = document.getElementById('r_total_shotCount');
const r_total_rejPlan = document.getElementById('r_total_rejPlan');
const r_total_rejCount = document.getElementById('r_total_rejCount');
const r_hourly_bins = document.getElementById('r_hourly_bins');
const r_shift_avg = document.getElementById('r_shift_avg');


const pdf_page_container = document.getElementById('pdf_page_container');
const r_close_btn = document.getElementById('r_close_btn');


reportFilter_form.addEventListener('submit', async(e) => {
    e.preventDefault();

        try {

            // loader
            loader.classList.add('active');

            const filterData = {
                date: report_dates.value,
                shift: report_shifts.value,
                machine_no: report_machines.value
            }

            const a_token = sessionStorage.getItem('alubee');

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${a_token}`
                },
            }

            const { data:reports } = await axios.post(`${hostUrl}/view-report`,filterData, config);


            if (reports) {
                r_date.innerHTML = reports?.data[0]?.Work_Date?.value ? reports?.data[0]?.Work_Date?.value : '-' ;
                r_shift.innerHTML = reports?.data[0]?.Shift ? reports?.data[0]?.Shift : '-';
                r_machine.innerHTML = reports?.data[0]?.Machine_No ? reports?.data[0]?.Machine_No : '-';
                r_inCharge.innerHTML = reports?.data[0]?.InCharge_Name ? reports?.data[0]?.InCharge_Name : '-';
                r_supervisor.innerHTML = reports?.data[0]?.Supervisor_Name ? reports?.data[0]?.Supervisor_Name : '-';
                r_quality_inCharge.innerHTML = reports?.data[0]?.Quality_InCharge_Name ? reports?.data[0]?.Quality_InCharge_Name : '-';
                r_operator.innerHTML = reports?.data[0]?.Operator ? reports?.data[0]?.Operator : '-';
                r_partNo.innerHTML = reports?.data[0]?.PartNo ? reports?.data[0]?.PartNo : '-';
                r_shotPlan.innerHTML = reports?.data[0]?.Shot_Plan ? reports?.data[0]?.Shot_Plan : '-';
                r_shotCount.innerHTML = reports?.data[0]?.Shot_Count ? reports?.data[0]?.Shot_Count : '-';
                r_rejPlan.innerHTML = reports?.data[0]?.Rejection_Plan ? reports?.data[0]?.Rejection_Plan : '-';
                r_rejCount.innerHTML = reports?.data[0]?.Rejection_Count ? reports?.data[0]?.Rejection_Count : '-';
                r_total_shotPlan.innerHTML = reports?.data[0]?.Shot_Plan ? reports?.data[0]?.Shot_Plan : '-';
                r_total_shotCount.innerHTML = reports?.data[0]?.Shot_Count ? reports?.data[0]?.Shot_Count : '-';
                r_total_rejPlan.innerHTML = reports?.data[0]?.Rejection_Plan ? reports?.data[0]?.Rejection_Plan : '-';
                r_total_rejCount.innerHTML = reports?.data[0]?.Rejection_Count ? reports?.data[0]?.Rejection_Count : '-';

                let hourly_arr = Object.entries(reports?.hourly_bins).sort();
                
                let hourly_bins = '';
                hourly_arr?.map((val) => {

                    hourly_bins += `
                        <div class="grid grid-cols-3 ">
                            <div class="border border-gray-300 text-center p-0.5 font-bold">${val[0] ? val[0] : '-'}</div>
                            <div class="border border-gray-300 text-center p-0.5">${val[1].Shots ? val[1].Shots : 0}</div>
                            <div class="border border-gray-300 text-center p-0.5">${val[1].Rejected ? val[1].Rejected : 0}</div>
                        </div>
                    `; 
                })
                r_hourly_bins.innerHTML = hourly_bins;
                r_shift_avg.innerHTML = reports?.shift_average[0]?.shift_avg ? `${reports?.shift_average[0]?.shift_avg} shots` : 0;

                // loader
                loader.classList.remove('active');
                pdf_page_container.classList.add('active');

            }else{
                pdf_page_container.classList.remove('active');
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
})


r_close_btn.addEventListener('click', () => {
    pdf_page_container.classList.remove('active');
})