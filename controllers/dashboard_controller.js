import asyncHandler from 'express-async-handler';
import bigquery from '../config/big_query.js';


const getUnit = asyncHandler(async(req, res) => {
    const query = `SELECT * FROM alubee_dataset.alubee_machine_mapping`;
    const unit = await bigquery.query(query);
    const unique_unit = [...new Set(unit[0].map(item => item.Unit))];
    res.status(200).send(unique_unit)
})

const getMachineByUnit = asyncHandler(async (req, res) => {

    const { unit } = req.body;
    if (!unit) {
        res.status(400)
        throw new Error('Unit is required')
    }
    const query = `SELECT * FROM alubee_dataset.alubee_machine_mapping WHERE Unit = "${unit}"`;
    const result = await bigquery.query(query);

    if (!result[0][0]) {
        res.status(400)
        throw new Error('This '+ unit + ' have no records')
    }

    // running machine number
    const mquery = `SELECT * FROM alubee_dataset.view_admin_app`;
    const machine = await bigquery.query(mquery);
    const unique_machine = [...new Set(machine[0].map(item => item.Machine_No))]

    // get all machine number matched to the currently running machine number
    const matchingMachineNos = result[0].filter(item => unique_machine.includes(item.Machine_No)).map(item => item.Machine_No);

    res.status(200).send(matchingMachineNos)
})






const getMachineNumbers = asyncHandler(async(req, res) => {
    const query = `SELECT * FROM alubee_dataset.view_admin_app`;
    const machine = await bigquery.query(query);
    const unique_machine = [...new Set(machine[0].map(item => item.Machine_No))];
    res.status(200).send(unique_machine);
})


const getMachineResults = asyncHandler(async (req, res) => {
    const { machine_no } = req.body;
    const query = `SELECT * FROM alubee_dataset.view_admin_app WHERE Machine_No="${machine_no}"`;
    const results = await bigquery.query(query);
    res.status(200).send(results[0]);
})



export {
    getMachineNumbers,
    getMachineResults,
    getUnit,
    getMachineByUnit,
}