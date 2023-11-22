
const report_dates = document.getElementById('dates');
const report_shifts = document.getElementById('shifts');
const report_machines = document.getElementById('machine_no');
const reportFilter_form = document.getElementById('reportFilter_form')


async function reportsFilterReq() {

    try {

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const rep = await fetch(`${hostUrl}/report`, config)
        const reports = await rep.json();

        if (reports) {
            
            const dateArr = reports?.dates;
            const shiftArr = reports?.shifts;
            const machineArr = reports?.machine_no;

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
        }

    } catch (error) {

        const resErr = error.response && error.response.data.message ? error.response.data.message : error.message
        console.log(resErr);
    }
}

reportsFilterReq();


reportFilter_form.addEventListener('submit', async(e) => {
    e.preventDefault();

        try {
            const filterData = {
                date: report_dates.value,
                shift: report_shifts.value,
                machine_no: report_machines.value
            }

            const a_token = sessionStorage.getItem('alubee');

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${a_token}`
                },
                body: JSON.stringify(filterData)
            }

            const rep = await fetch(`${hostUrl}/view-report`, config)
            const reports = await rep.json();

            console.log(reports);

            
        } catch (error) {
            const resErr = error.response && error.response.data.message ? error.response.data.message : error.message
            console.log(resErr);
        }
})
