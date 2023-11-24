
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


// line chart
function shotsLineChart() {

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
            data: ['0'],
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
            categories: ['0']
        },
        markers: {
            size: 4,
        }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
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