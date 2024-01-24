
const dashboard_loader = document.getElementById('dashboard_loader')

// refresh page time
function dateTime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var ampm = today.getHours() >= 12 ? 'PM' : 'AM';
    var dateTime = date + ' ' + time + ' ' + ampm;
    return dateTime;
}
document.getElementById('date').innerHTML = dateTime();
//====


const notyf = new Notyf();

// machine number dropdown function
const machineNumber_dropdown = document.getElementById('machineNumber_dropdown');

machineNumber_dropdown.addEventListener('click', () => {
    machineNumber_dropdown.classList.toggle('active')
})

//===
// unit dropdown function
const unit_dropdown = document.getElementById('unit_dropdown');

unit_dropdown.addEventListener('click', () => {
    unit_dropdown.classList.toggle('active')
})
//===


async function getUnits(){

    try {

        dashboard_loader.classList.add('active')
        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }
        const { data } = await axios.get(`${hostUrl}/dashboard/units`, config)


        if (data.length > 0) {
            dashboard_loader.classList.remove('active')
            getMachinesByUnit(data[0])
            
            let result = '';

            data?.forEach((val) => {
                result += `
                    <div onclick="getMachinesByUnit('${val}')" class="options">${val}</div>
                `;
            })

            document.getElementById('unit_option').innerHTML = result;
            // document.getElementById('machine_unit').classList.add('active');

        }else{
            document.getElementById('unit_option').innerHTML = '';
            // document.getElementById('machine_unit').classList.remove('active');


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

        if (data.length >= 4) {
            document.querySelector('.unit_dropdown > .unit_options').style.height = "200px"
        } else {
            document.querySelector('.unit_dropdown > .unit_options').style.height = "auto"
        }
        
    } catch (error) {
        dashboard_loader.classList.remove('active')
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

getUnits();


let unit_name;

async function getMachinesByUnit(unitVal){
    try {

        unit_name = unitVal;
        dashboard_loader.classList.add('active')
        const a_token = sessionStorage.getItem('alubee');
        // document.getElementById('machine_unit').classList.remove('active');

        document.getElementById('unit_text').value = unitVal ? unitVal : 'Unit';

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const query = {
            unit: unitVal
        }


        const { data } = await axios.post(`${hostUrl}/dashboard/machines`, query, config)

        if (data.length > 0) {
            
            dashboard_loader.classList.remove('active')
            machineNo_dropdown(data[0])
            
            let result = '';

            data?.forEach((val) => {
                result += `
                    <div onclick="machineNo_dropdown('${val}')" class="options">${val}</div>
                `;
            })

            document.getElementById('machine_no_option').innerHTML = result;
            // document.getElementById('machine_unit').classList.add('active');

        } else {
            document.getElementById('machine_no_option').innerHTML = '';
            // document.getElementById('machine_unit').classList.remove('active');


            dashboard_loader.classList.remove('active')

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

        if (data.length >= 4) {
            document.querySelector('.machineNumber_dropdown > .machineNumber_options').style.height = "200px"
        } else {
            document.querySelector('.machineNumber_dropdown > .machineNumber_options').style.height = "auto"
        }
        
    } catch (error) {
        dashboard_loader.classList.remove('active')
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

// async function getMachineNumber() {


//     try {
        
//         dashboard_loader.classList.add('active')
//         const a_token = sessionStorage.getItem('alubee');

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${a_token}`
//             }
//         }
//         const { data } = await axios.get(`${hostUrl}/dashboard/machine-no`, config)
           

//         if (data?.length > 0) {
//             dashboard_loader.classList.remove('active')
//             machineNo_dropdown(data[0]);

//             let result = '';

//             data?.forEach((val) => {
//                 result += `
//                     <div onclick="machineNo_dropdown('${val}')" class="options">${val}</div>
//                 `;
//             })

//             document.getElementById('machine_no_option').innerHTML = result;
//         } else {
//             document.getElementById('machine_no_option').innerHTML = '';
//         }


//         if (data.length >= 4) {
//             document.querySelector('.machineNumber_dropdown > .machineNumber_options').style.height = "200px"
//         } else {
//             document.querySelector('.machineNumber_dropdown > .machineNumber_options').style.height = "auto"
//         }

//     } catch (error) {
//         dashboard_loader.classList.remove('active')
//         const resErr = error.response && error.response.data.message ? error.response.data.message : error.message

//         notyf.error({
//             message: "Machine No - " + resErr,
//             duration: 5000,
//             position: {
//                 x: 'right',
//                 y: 'top',
//             },
//             dismissible: true
//         })
//     }
// }

// getMachineNumber()



// machine number select functionality
async function machineNo_dropdown(val) {
    
    try {

        dashboard_loader.classList.add('active')
        document.getElementById('machineNo_text').value = val ? val : 'Machine No';
        document.getElementById('machine_no_display').innerHTML = val ? val : '-';

        // loading
        document.getElementById('shots_count').innerHTML = '0';
        document.getElementById('rejections_count').innerHTML = '0';
        document.getElementById('average_pressure_count').innerHTML = '0';

        const machine_data = {
            machine_no: val
        }

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.post(`${hostUrl}/dashboard/machine-results`, machine_data, config)

        if (data.length > 0) {
            dashboard_loader.classList.remove('active')
            card_details(data)
            shotsLineChart(data)
        }else{
            dashboard_loader.classList.remove('active')
            console.log('not data');
        }

    } catch (error) {
        dashboard_loader.classList.remove('active')
        console.log(error);
    }


    
}




function card_details(data) {
    const shots_count = document.getElementById('shots_count');
    const rejections_count = document.getElementById('rejections_count');
    const average_pressure_count = document.getElementById('average_pressure_count');
    const operator_name = document.getElementById('operator_name');
    const operator_shift = document.getElementById('operator_shift');

    let no_of_shots = 0;
    let no_of_rejections = 0;

    data.forEach((val) => {
        no_of_shots += val.shots
        no_of_rejections += val.rejects
    });

    shots_count.innerHTML = no_of_shots ? no_of_shots : '0';
    rejections_count.innerHTML = no_of_rejections ? no_of_rejections : '0';
    average_pressure_count.innerHTML = 0;


    operator_name.innerHTML = unit_name;
    operator_shift.innerHTML = data[0]['Shift'] ? data[0]['Shift'] : 'Nil';
}




// line chart
function shotsLineChart(data) {

    var options = {
        chart: {
            type: 'line',
            height: '315px',
            toolbar: {
                show: false
            }
        },
        series: [{
            name: 'Shots',
            data: data?.length > 0 ? data?.map((val) => val.shots) : ['0'],
        }],
        colors: ["#61b8ea"],
        dataLabels: {
            enabled: true,
            distributed: false,
            offsetX: 0,
            offsetY: -7,
            style: {
                fontSize: '10px',
                colors: ['#000']
            },
            background: {
                enabled: false,
                foreColor: '#000',
            },

        },
        xaxis: {
            categories: data?.length > 0 ? data?.map((val) => val.hourly_count) : ['0']
        },
        markers: {
            size: 4,
        }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    chart.updateOptions(options, true, true);
}


shotsLineChart();

var chart = JSC.chart('bar_chart', {
    debug: false,
    type: 'gauge ',
    animation_duration: 0,
    legend_visible: false,
    xAxis: {
        scale: {
            // Helps position the marker on top of the y Axis. 
            range: [0, 1]
        }
    },
    palette: {
        pointValue: '%yValue',
        ranges: [
            { value: [0, 30], color: '#FF5353' },
            { value: [30, 70], color: '#FFD221' },
            { value: [70, 100], color: '#77E6B4' }
        ]
    },
    yAxis: {
        defaultTick: {
            // Distance between tick labels and colorized axis line 
            padding: 10,
            label: { style_fontSize: '16px' }
        },
        line: {
            width: 5,
            // Gaps occur at tick intervals defined below. 
            breaks: {
                gap: 0.03,
                custom: [
                    0.1,
                    0.2,
                    0.3,
                    0.4,
                    0.5,
                    0.6,
                    0.7,
                    0.8,
                    0.9
                ]
            },
            color: 'smartPalette'
        },
        scale: { range: [0, 100], interval: 10 }
    },

    defaultSeries: {
        opacity: 1,
        mouseTracking_enabled: false,
        shape: {
            label: {
                text: labelText,
                style: { fontSize: '30px' },
                align: 'center',
                verticalAlign: 'middle'
            }
        }
    },
    series: [
        {
            type: 'marker',
            mouseTracking_enabled: true,
            defaultPoint: {
                marker: {
                    outline: {
                        width: 4,
                        color: 'currentColor'
                    },
                    fill: 'white',
                    type: 'circle',
                    size: 15
                }
            },
            points: [{ y: 58 }]
        }
    ],
    toolbar: {
        defaultItem: {
            position: 'top left',
            boxVisible: false,
            margin: 6
        },

    }
});



function labelText(series) {
    var value = series.points(0).options('y'),
        fgg =
            value >= 70
                ? 'Great!'
                : value >= 30
                    ? 'Good'
                    : 'Fair';
    return (
        '%sum%<br/><span style="fontSize: 16px">' +
        fgg +
        '</span>'
    );
} 