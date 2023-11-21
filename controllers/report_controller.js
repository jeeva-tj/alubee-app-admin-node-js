import asyncHandler from 'express-async-handler';
import bigquery from '../config/big_query.js';


const report = asyncHandler(async( req, res) => {

    const query = "SELECT * FROM alubee_dataset.view_shift_horoscope";

    const report = await bigquery.query(query);

    let dates = [];
    let shifts = [];
    let machine_numbers = [];

    report[0].forEach((val) => {
        dates.push(val.Work_Date.value)
        shifts.push(val.Shift)
        machine_numbers.push(val.Machine_No)
    })

    let unique_dates = [...new Set(dates)]
    let unique_shifts = [...new Set(shifts)]
    let unique_machine_numbers = [...new Set(machine_numbers)]

    
    const reportFilterData = {
        dates: unique_dates,
        shifts: unique_shifts,
        machine_no: unique_machine_numbers
    }

    res.status(200).send(reportFilterData)
})


const viewReport = asyncHandler(async (req, res) => {

    const { date, shift, machine_no } = req.body;

    if (!date || !shift || !machine_no) {
        res.status(400)
        throw Error('please add all details')
    }

    const query_horosope = `SELECT * FROM alubee_dataset.view_shift_horoscope WHERE Work_Date="${date}" and Shift="${shift}" and Machine_No="${machine_no}"`;
    const result_horosope = await bigquery.query(query_horosope);

    const query_hourly_horoscope = `SELECT * FROM alubee_dataset.view_shift_hourly_horoscope WHERE WorkDate="${date}" and Shift="${shift}" and MachineNo="${machine_no}"`;
    const result_hourly_horoscope = await bigquery.query(query_hourly_horoscope);

    let hourly_bins = {}

    result_hourly_horoscope[0].forEach((val) => {
        hourly_bins[val["HourBucket"]] = { "Shots": val.Shots, "Rejected": val.Rejects}
    })

    const shift_avg_query = `SELECT ROUND(AVG(sum_of_shots), 0) as shift_avg FROM (SELECT work_date,shift, SUM(CAST(shot_count AS INT64)) as sum_of_shots FROM iot-alubee.alubee_dataset.view_shot GROUP BY shift,work_date)`
    const result_shift_avg = await bigquery.query(shift_avg_query)

    const finalReport = {
        data: result_horosope[0],
        hourly_bins: hourly_bins,
        shift_average: result_shift_avg[0]
    }

    res.status(200).send(finalReport);

})



export {
    report,
    viewReport
}