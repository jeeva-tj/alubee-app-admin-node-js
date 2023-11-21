import asyncHandler from 'express-async-handler';
import bigquery from '../config/big_query.js';


const getMachineNumbers = asyncHandler(async(req, res) => {

    const query = `SELECT * FROM alubee_dataset.view_admin_app`;
    const machine = await bigquery.query(query);
    res.status(200).send(machine[0]);
})



export {
    getMachineNumbers
}