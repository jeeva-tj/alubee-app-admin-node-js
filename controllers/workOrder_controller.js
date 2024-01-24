import asyncHandler from 'express-async-handler';
import bigquery from '../config/big_query.js';
import timeFormat from '../helper/time.js';

const getWorkOrders = asyncHandler(async (req, res) => {

    const query = `SELECT * FROM alubee_dataset.alubee_master_table`;

    const data = await bigquery.query(query);
 
    let fdata = [];

    data[0].forEach((val) => {
        fdata.push({
            id: val.PlanID,
            shift: val.Shift,
            machine_no: val.Machine_No,
            part_no: val.Part_No,
            shot_plan: val.Shot_Plan,
            rejection_plan: val.Rejection_Plan,
            operator: val.Operator,
            date: val.Date.value
        })
    })

    res.status(200).send(fdata);
    // res.status(200).send(data[0]);
})


const workOrderById = asyncHandler(async (req, res) => {
 
    if (!req?.params?.id) {
        res.status(400)
        throw Error("Work Order ID not found!")
    }
    const query = `SELECT * FROM alubee_dataset.alubee_master_table WHERE PlanID="${req?.params?.id}"`;
    const workOrder = await bigquery.query(query);

    if (!workOrder[0][0]?.PlanID) {
        res.status(400)
        throw Error("Work order not found!")
    }

    res.status(200).send(workOrder[0][0]);
})


const workOrder_requirements = asyncHandler(async (req, res) => {

    // machine number
    const machine_query = `SELECT * FROM alubee_dataset.alubee_machine_mapping`;
    const machine = await bigquery.query(machine_query)

    let unique_machine = [];

    machine[0].forEach((val) => {
        unique_machine.push(val.Machine_No)
    })


    // Operator
    const op_query = `SELECT * FROM alubee_dataset.alubee_operators_table`;
    const operator = await bigquery.query(op_query);

    let operator_name = [];

    operator[0].forEach((val) => {
        operator_name.push(val.Operator_Name)
    })

    const final = {
        machines:  unique_machine,
        operators: operator_name
    };

    res.status(200).send(final);
})


const createWorkOrder = asyncHandler(async (req, res) => {

    const { plan_id, date, machine_no, operator, part_no, rejection_plan, shift, shot_plan, pressure, unit } = req.body;

    if (!plan_id || !date || !machine_no || !operator || !part_no || !rejection_plan || !shift || !shot_plan || !pressure || !unit)  {
        res.status(400)
        throw Error('please add all details')
    }

    if (!/^(?:0|[1-9]\d{0,2})$/.test(shot_plan)) {
        res.status(400)
        throw Error('Shot plan invalid input. Only get the positive input')
    }

    if (!/^(?:0|[1-9]\d{0,2})$/.test(rejection_plan)) {
        res.status(400)
        throw Error('Rejection plan invalid input. Only get the positive input')
    }

    if (!/^(?:0|[1-9]\d{0,2})$/.test(pressure)) {
        res.status(400)
        throw Error('Pressure invalid input. Only get the positive input')
    }


    const existCheck_query = `SELECT * FROM alubee_dataset.alubee_master_table WHERE PlanID='${plan_id}'`;
    const existCheck = await bigquery.query(existCheck_query);
    if (existCheck[0][0]) {
        res.status(400)
        throw new Error('Plan Id already exists!, Try unique ID')
    }

    const insert_query = `INSERT INTO alubee_dataset.alubee_master_table VALUES ('${plan_id}','${shift}','${machine_no}','${part_no}',${shot_plan},${rejection_plan},'${operator}','${date}', ${pressure}, '${unit}')`;
    await bigquery.query(insert_query);

    const tracker_query = `INSERT INTO alubee_dataset.alubee_nofitication_table VALUES ('${timeFormat()}', ${req?.user.User_ID} , 'Create', 'Work Order')`;
    await bigquery.query(tracker_query);

    res.status(200).json({
        msg: 'Work Order Created!',
        success: true,
    })
})


const deleteWorkOrder = asyncHandler(async (req, res) => {

    if (!req?.params?.id) {
        res.status(400)
        throw Error("Require Work Order ID!")
    }

    const query = `SELECT PlanID FROM alubee_dataset.alubee_master_table WHERE PlanID="${req?.params?.id}"`;

    const existWorkOrder = await bigquery.query(query);

    if (!existWorkOrder[0][0]?.PlanID) {
        res.status(400)
        throw Error("Work Order not found!")
    }

    const delete_query = `DELETE FROM alubee_dataset.alubee_master_table WHERE PlanID="${req?.params?.id}"`;
    await bigquery.query(delete_query);

    const tracker_query = `INSERT INTO alubee_dataset.alubee_nofitication_table VALUES ('${timeFormat()}', ${req?.user.User_ID} , 'Delete', 'Work Order')`;
    await bigquery.query(tracker_query);

    res.status(200).json({
        msg: 'Work Order Deleted!',
        success: true,
    })
})


const updateWorkOrder = asyncHandler(async (req, res) => {
    
    if (!req?.params?.id) {
        res.status(400)
        throw Error("Require Work Order ID!")
    }

    const query = `SELECT PlanID FROM alubee_dataset.alubee_master_table WHERE PlanID="${req?.params?.id}"`;

    const existWorkOrder = await bigquery.query(query);

    if (!existWorkOrder[0][0]?.PlanID) {
        res.status(400)
        throw Error("Work Order not found!")
    }

    const { date, rejection_plan, shot_plan } = req.body;

    if (!date || !rejection_plan || !shot_plan) {
        res.status(400)
        throw Error('please add all details')
    }

    const update_query = `UPDATE alubee_dataset.alubee_master_table SET Shot_Plan = ${shot_plan}, Rejection_Plan = ${rejection_plan}, Date = "${date}" WHERE PlanID= "${req?.params?.id}"`;
    await bigquery.query(update_query);

    const tracker_query = `INSERT INTO alubee_dataset.alubee_nofitication_table VALUES ('${timeFormat()}', ${req?.user.User_ID} , 'Update', 'Work Order')`;
    await bigquery.query(tracker_query);

    res.status(200).json({
        msg: 'Work Order Updated!',
        success: true,
    })

})


const getWOMachineByUnit = asyncHandler(async (req, res) => {

    const { unit } = req.body;
    if (!unit) {
        res.status(400)
        throw new Error('Unit is required')
    }
    const query = `SELECT * FROM alubee_dataset.alubee_machine_mapping WHERE Unit = "${unit}"`;
    const result = await bigquery.query(query);

    if (!result[0][0]) {
        res.status(400)
        throw new Error('This ' + unit + ' have no records')
    }

    res.status(200).send(result[0])
})




export {
    getWorkOrders,
    workOrder_requirements,
    createWorkOrder,
    deleteWorkOrder,
    workOrderById,
    updateWorkOrder,
    getWOMachineByUnit
}