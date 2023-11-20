
const loginPage = (req, res) => {
    res.render('index')
}

const dashboardPage = (req, res) => {
    res.render('dashboard')
}

const reportPage = (req, res) => {
    res.render('report')
}

const workOrderPage = (req, res) => {
    res.render('work_order')
}

const deviceMangerPage = (req, res) => {
    res.render('device_manager')
}

const userManagementPage = (req, res) => {
    res.render('user_management')
}

export {
    loginPage,
    dashboardPage,
    reportPage,
    workOrderPage,
    deviceMangerPage,
    userManagementPage
}