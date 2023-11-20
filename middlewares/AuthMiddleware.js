import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bigquery from '../config/big_query.js';


const userProtect = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {

            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const query = `SELECT User_ID, Email, Name, Role FROM alubee_dataset.alubee_user_table WHERE User_ID='${decoded.id}'`;

            console.log(decoded);
            // req.user = await bigquery.query(query);
            
            // next()
        } catch (err) {

            res.status(401)
            throw Error('Not Authorized, Token Failed')
        }

    }

    if (!token) {
        res.status(401)
        throw Error('Not Authorized, No Token')
    }

})


export {
    userProtect
}