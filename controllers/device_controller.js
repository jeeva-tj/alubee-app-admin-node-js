import asyncHandler from 'express-async-handler';
import bigquery from '../config/big_query.js';

const deviceStatus = asyncHandler(async (req, res) => {

    // all machines
    const query = `SELECT * FROM alubee_dataset.alubee_machine_mapping`;
    const result = await bigquery.query(query);

    // currently running machine number
    const mquery = `SELECT * FROM alubee_dataset.view_admin_app`;
    const machine = await bigquery.query(mquery);
    const unique_machine = [...new Set(machine[0].map(item => item.Machine_No))]

    let device_status = [];

    result[0].forEach((u_val) => {
        const status = unique_machine.includes(u_val.Machine_No) ? 'online' : 'offline';
        device_status.push({
            unit: u_val.Unit,
            machine: u_val.Machine_No,
            status: status,
            date: new Date().toLocaleDateString('en-GB')
        });
    });

    res.status(200).send(device_status)
})

export {
    deviceStatus
}