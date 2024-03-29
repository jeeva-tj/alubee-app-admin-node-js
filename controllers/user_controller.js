import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import bigquery from '../config/big_query.js';
import generateToken from '../utils/generateToken.js';
import timeFormat from '../helper/time.js';


const login = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error('please add all details')
    }

    const query = `SELECT * FROM alubee_dataset.alubee_user_table WHERE Email='${email}'`;

    const loginRes = await bigquery.query(query);

    if (!loginRes[0][0]) {
        res.status(400)
        throw new Error("Invalid Email!")
    }
    
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
        throw new Error("Invalid credentials!")
    }

    req.session.user = resData;

    // const tracker_query = `INSERT INTO alubee_dataset.alubee_nofitication_table VALUES ('${timeFormat()}', ${resData.id} , '-', 'Login')`;
    // await bigquery.query(tracker_query);

    res.status(200).json({
        msg: 'Login successful!',
        success: true,
        token: generateToken(resData.id),
        name: resData.name
    })
})



const profile = asyncHandler(async (req, res) => {

    if (!req?.user) {
        res.status(400)
        throw new Error("User not found!")
    }

    const query = `SELECT User_ID, Email, Name, Phone, Role FROM alubee_dataset.alubee_user_table WHERE User_ID=${req?.user?.User_ID}`;

    const user = await bigquery.query(query);

    res.status(200).send(user[0][0]);
})



const allUser = asyncHandler(async (req, res) => {

    const user = req.user;

    if (!user.User_ID) {
        res.status(400)
        throw new Error("User not found!, try to login")
    }

    const query = `SELECT User_ID, Email, Name, Phone, Role FROM alubee_dataset.alubee_user_table WHERE User_ID != ${user.User_ID}`;

    const users = await bigquery.query(query);

    res.status(200).send(users[0]);
})



const userById = asyncHandler(async (req, res) => {

    if (!req?.params?.id) {
        res.status(400)
        throw new Error("User ID not found!")
    }

    const query = `SELECT User_ID, Email, Name, Phone, Role FROM alubee_dataset.alubee_user_table WHERE User_ID=${req?.params?.id}`;

    const user = await bigquery.query(query);

    if (!user[0][0]?.User_ID) {
        res.status(400)
        throw new Error("User not found!")
    }

    res.status(200).send(user[0][0]);
})




const newUser = asyncHandler(async (req, res) => {
    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !phone || !role || !password) {
        res.status(400)
        throw new Error('please add all details')
    }

    const existEmail_query = `SELECT * FROM alubee_dataset.alubee_user_table WHERE Email='${email}'`;
    const existEmail = await bigquery.query(existEmail_query);
    if (existEmail[0][0]) {
        res.status(400)
        throw new Error('Email already exists!, Try new Email')
    }

    const existPhone_query = `SELECT * FROM alubee_dataset.alubee_user_table WHERE Phone='${phone}'`;
    const existPhone = await bigquery.query(existPhone_query);
    if (existPhone[0][0]) {
        res.status(400)
        throw new Error('Phone Number already exists!, Try another phone number')
    }

    const getId_query = "SELECT MAX(User_ID) as user_id FROM alubee_dataset.alubee_user_table";
    const user_id = await bigquery.query(getId_query);

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
        res.status(400)
        throw new Error('somthing went wrong with bcrypt')
    }

    const hashPassword = await bcrypt.hash(password, salt)
    if (!hashPassword) {
        res.status(400)
        throw new Error('something went wrong with hashing')
    }

    const insert_query = `INSERT INTO alubee_dataset.alubee_user_table VALUES(${user_id[0][0].user_id + 1}, '${email}', '${hashPassword}', '${name}', '${phone}', '${role}')`;
    await bigquery.query(insert_query);

    const tracker_query = `INSERT INTO alubee_dataset.alubee_nofitication_table VALUES ('${timeFormat()}', ${req.user.User_ID} , 'Create', 'User Management')`;
    await bigquery.query(tracker_query);

    res.status(200).json({
        msg: 'User Created successful!',
        success: true,
    })
})



const updateUser = asyncHandler(async (req, res) => {

    const { name, email, phone, role } = req.body;

    if (!req?.params?.id) {
        res.status(400)
        throw new Error("User ID not found!")
    }

    if (!name || !email || !phone || !role) {
        res.status(400)
        throw new Error('please add all details')
    }

    const query = `SELECT User_ID FROM alubee_dataset.alubee_user_table WHERE User_ID=${req?.params?.id}`;
    const existUser =  await bigquery.query(query);

    if (!existUser[0][0]?.User_ID) {
        res.status(400)
        throw new Error("User not found!")
    }

    const update_query = `UPDATE alubee_dataset.alubee_user_table SET Name = "${name}", Email = "${email}", Role = "${role}", Phone = "${phone}" WHERE User_ID = ${ req?.params?.id }`
    await bigquery.query(update_query);

    const tracker_query = `INSERT INTO alubee_dataset.alubee_nofitication_table VALUES ('${timeFormat()}', ${req.user.User_ID} , 'Update', 'User Management')`;
    await bigquery.query(tracker_query);

    res.status(200).json({
        msg: 'User Updated successful!',
        success: true,
    })

})



const deleteUser = asyncHandler(async (req, res) => {

    if (!req?.params?.id) {
        res.status(400)
        throw new Error("User ID not found!")
    }

    const query = `SELECT User_ID FROM alubee_dataset.alubee_user_table WHERE User_ID=${req?.params?.id}`;
    const existUser = await bigquery.query(query);

    if (!existUser[0][0]?.User_ID) {
        res.status(400)
        throw new Error("User not found!")
    }

    const delete_query = `DELETE FROM alubee_dataset.alubee_user_table WHERE User_ID=${req?.params?.id}`
    await bigquery.query(delete_query);

    const tracker_query = `INSERT INTO alubee_dataset.alubee_nofitication_table VALUES ('${timeFormat()}', ${req.user.User_ID} , 'Delete', 'User Management')`;
    await bigquery.query(tracker_query);

    res.status(200).json({
        msg: 'User Deleted successful!',
        success: true,
    })

})


const resetPwd = asyncHandler(async (req, res) => {

    const { email, password } = req.body;


    if (!email || !password) {
        res.status(400)
        throw new Error('please add all details')
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
        res.status(400)
        throw new Error('somthing went wrong with bcrypt')
    }

    const hashPassword = await bcrypt.hash(password, salt)
    if (!hashPassword) {
        res.status(400)
        throw new Error('something went wrong with hashing')
    }

    const reset_query = `UPDATE alubee_dataset.alubee_user_table SET Pssword = "${hashPassword}" WHERE Email = "${email}"`
    await bigquery.query(reset_query);

    const tracker_query = `INSERT INTO alubee_dataset.alubee_nofitication_table VALUES ('${timeFormat()}', ${req.user.User_ID} , 'Reset Password', 'User Management')`;
    await bigquery.query(tracker_query);

    res.status(200).json({
        msg: 'Password Reseted!',
        success: true,
    })

})


const logout = asyncHandler(async (req, res) => {
    req.session.destroy();
    res.redirect('/')
})



const adminProfileUpdate = asyncHandler(async (req, res) => {

    const u_id = req?.user.User_ID;

    if (!u_id) {
        res.status(400)
        throw new Error("User ID not found!")
    }

    const checkUser_query = `SELECT User_ID, Email, Name, Phone, Role FROM alubee_dataset.alubee_user_table WHERE User_ID=${u_id}`;
    const user = await bigquery.query(checkUser_query);

    if (!user[0][0]?.User_ID) {
        res.status(400)
        throw new Error("User not found!")
    }

    let name = '';
    let email = '';
    let phone = '';
    let role = '';


    if (req.body.name) {
        name = req.body.name
    }else{
        name = user[0][0].Name
    }
 
    
    if (req.body.email) {
        email = req.body.email
    }else{
        email = user[0][0].Email
    }


    if (req.body.phone) {
        phone = req.body.phone
    }else{
        phone = user[0][0].Phone
    }


    if (req.body.role) {
        role = req.body.role
    }else{
        role = user[0][0].Role
    }


    const update_query = `UPDATE alubee_dataset.alubee_user_table SET Name = "${name}", Email = "${email}", Role = "${role}", Phone = "${phone}" WHERE User_ID = ${u_id}`;

    await bigquery.query(update_query);

    res.status(200).json({
        msg: 'Updated successful!',
        success: true,
    })

})



const adminPwdReset = asyncHandler(async (req, res) => {

    const { password } = req.body;

    if (!password) {
        res.status(400)
        throw new Error('Password is required!')
    }

    const u_id = req?.user.User_ID;

    if (!u_id) {
        res.status(400)
        throw new Error("User ID not found!")
    }

    const checkUser_query = `SELECT User_ID FROM alubee_dataset.alubee_user_table WHERE User_ID=${u_id}`;
    const user = await bigquery.query(checkUser_query);

    if (!user[0][0]?.User_ID) {
        res.status(400)
        throw new Error("User not found!")
    }


    const salt = await bcrypt.genSalt(10);
    if (!salt) {
        res.status(400)
        throw new Error('somthing went wrong with bcrypt')
    }

    const hashPassword = await bcrypt.hash(password, salt)
    if (!hashPassword) {
        res.status(400)
        throw new Error('something went wrong with hashing')
    }

    const update_query = `UPDATE alubee_dataset.alubee_user_table SET Pssword = "${hashPassword}" WHERE User_ID = ${u_id}`;
    await bigquery.query(update_query);

    res.status(200).json({
        msg: 'Password Reseted!',
        success: true,
    })
})



const adminProfileDelete = asyncHandler(async (req, res) => {

    if (!req?.params?.id) {
        res.status(400)
        throw new Error("User ID not found!")
    }

    const query = `SELECT User_ID FROM alubee_dataset.alubee_user_table WHERE User_ID=${req?.params?.id}`;
    const existUser = await bigquery.query(query);

    if (!existUser[0][0]?.User_ID) {
        res.status(400)
        throw new Error("User not found!")
    }

    const delete_query = `DELETE FROM alubee_dataset.alubee_user_table WHERE User_ID=${req?.params?.id}`
    await bigquery.query(delete_query);

    const tracker_query = `INSERT INTO alubee_dataset.alubee_nofitication_table VALUES ('${timeFormat()}', ${req.user.User_ID} , 'Delete', 'User Management')`;
    await bigquery.query(tracker_query);

    res.status(200).json({
        msg: 'User Deleted successful!',
        success: true,
    })
})





export {
    login,
    profile,
    userById,
    allUser,
    newUser,
    updateUser,
    deleteUser,
    resetPwd,
    adminProfileUpdate,
    adminPwdReset,
    adminProfileDelete,
    logout
}