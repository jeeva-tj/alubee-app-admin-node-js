import asyncHandler from 'express-async-handler';
import bigquery from '../config/big_query.js';


const notification = asyncHandler(async (req, res) => {

    if (req.user.Role === 'Owner') {

        const query = `
        WITH recent_rows AS (
            SELECT
                COUNT(*)
            FROM
                alubee_dataset.alubee_nofitication_table
            WHERE
            DATE(Date) = CURRENT_DATE()
        )
        SELECT 
        (SELECT * FROM recent_rows) AS today_notification_count, t2.User_ID, t2.Name, t2.Email, t2.Phone, t1.Action, t1.Reference, t1.Date
        FROM
        alubee_dataset.alubee_nofitication_table AS t1
        INNER JOIN
        alubee_dataset.alubee_user_table AS t2
        ON
        t1.User_ID = t2.User_ID ORDER BY t1.Date DESC LIMIT 4;
        `;

        const notification_data = await bigquery.query(query);
        res.send(notification_data[0]);

    } else if (req.user.Role === 'Editor' || req.user.Role === 'Viewer') {

        const query = `
        WITH recent_rows AS (
            SELECT
                COUNT(*)
            FROM
                alubee_dataset.alubee_nofitication_table
            WHERE
            DATE(Date) = CURRENT_DATE() AND Reference = 'Work Order'
        )

        SELECT 
        (SELECT * FROM recent_rows) AS today_notification_count, t2.User_ID, t2.Name, t2.Email, t2.Phone, t1.Action, t1.Reference, t1.Date
        FROM
        alubee_dataset.alubee_nofitication_table AS t1
        INNER JOIN
        alubee_dataset.alubee_user_table AS t2
        ON
        t1.User_ID = t2.User_ID AND t1.Reference = 'Work Order' ORDER BY t1.Date DESC LIMIT 4;
        `;

        const notification_data = await bigquery.query(query);
        res.send(notification_data[0]);

    } else {

        res.send([]);
    }
})



const allNotification = asyncHandler(async (req, res) => {

    let query;

    if (req.user.Role === 'Owner') {

        query = `
        SELECT 
        t2.User_ID, t2.Name, t2.Email, t2.Phone, t1.Action, t1.Reference, t1.Date
        FROM
        alubee_dataset.alubee_nofitication_table AS t1
        INNER JOIN
        alubee_dataset.alubee_user_table AS t2
        ON
        t1.User_ID = t2.User_ID ORDER BY t1.Date DESC;
        `;



    } else if (req.user.Role === 'Editor' || req.user.Role === 'Viewer') {

        query = `
        SELECT 
        t2.User_ID, t2.Name, t2.Email, t2.Phone, t1.Action, t1.Reference, t1.Date
        FROM
        alubee_dataset.alubee_nofitication_table AS t1
        INNER JOIN
        alubee_dataset.alubee_user_table AS t2
        ON
        t1.User_ID = t2.User_ID AND t1.Reference = 'Work Order' ORDER BY t1.Date DESC;
        `;

    } else {
        res.send([]);
    }

    if (!query) {
        res.send([]);
    }



    const notification_data = await bigquery.query(query);

    let fdata = [];

    notification_data[0].forEach((val) => {
        fdata.push({
            id: val.User_ID,
            name: val.Name,
            email: val.Email,
            phone: val.Phone,
            action: val.Action,
            reference: val.Reference,
            date: val.Date.value
        })
    })

    res.send(fdata);
})


const deleteAllNotifications = asyncHandler(async (req, res) => {

    const query = "DELETE FROM alubee_dataset.alubee_nofitication_table WHERE TRUE";
    await bigquery.query(query);

    res.status(200).json({
        msg: 'Deleted all notifications!',
        success: true,
    })
})



export {
    notification,
    allNotification,
    deleteAllNotifications
}