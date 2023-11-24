
const loginPage = (req, res) => {
    const user = req?.session?.user;

    if (user) {
        res.redirect('/dashboard');
    }else{
        res.render('index')
    }
}

const dashboardPage = (req, res) => {
    res.render('dashboard', { user: req?.session?.user?.role })
}

const reportPage = (req, res) => {
    res.render('report', { user: req?.session?.user?.role })
}

const workOrderPage = (req, res) => {
    res.render('work_order', { user: req?.session?.user?.role })
}

const deviceMangerPage = (req, res) => {
    res.render('device_manager', { user: req?.session?.user?.role })
}

const userManagementPage = (req, res) => {
    res.render('user_management', { user: req?.session?.user?.role })
}

const workOrderAddPage = (req, res) => {
    res.render('work_order_add', { user: req?.session?.user?.role })
}

const workOrderUpdatePage = (req, res) => {
    res.render('work_order_update', { user: req?.session?.user?.role })
}

export {
    loginPage,
    dashboardPage,
    reportPage,
    workOrderPage,
    deviceMangerPage,
    userManagementPage,
    workOrderAddPage,
    workOrderUpdatePage
}