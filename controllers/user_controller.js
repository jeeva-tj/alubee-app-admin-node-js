import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import bigquery from '../config/big_query.js';
import generateToken from '../utils/generateToken.js';


const login = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw Error('please add all fields!')
    }

    const query = `SELECT * FROM alubee_dataset.alubee_user_table WHERE Email='${email}'`;

    const loginRes = await bigquery.query(query);
    
    const resData = {
      id: '',
      email: '',
      name: '',
      role: ''
    }

    let bcrypt_password = '';
    loginRes[0].forEach((val) => {
        bcrypt_password = val.Pssword;
        resData.id = val?.User_ID;
        resData.email = val?.Email;
        resData.name = val?.Name;
        resData.role = val?.Role;
    });

    const isPassword = await bcrypt.compare(password, bcrypt_password)
    if (!isPassword) {
        res.status(400)
        throw Error("Invalid credentials!")
    }

    res.status(200).json({
        msg: 'Login successful!',
        success: true,
        token: generateToken(resData.id),
        data: resData
    })
})


const allUser = asyncHandler(async(req, res) => {

    console.log('working');
})


export {
    login,
    allUser
}