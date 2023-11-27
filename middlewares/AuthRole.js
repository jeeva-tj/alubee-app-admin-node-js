
import asyncHandler from 'express-async-handler';

const authRoleProtect = asyncHandler(async(req, res, next) => {    
    const user = req?.session?.user;

    if (user) {
        if (req.originalUrl === '/dashboard' && (user.role === 'Owner' || user.role === 'Editor' || user.role === 'Viewer')) {
            next();
            
        } else if (req.originalUrl === '/reports' && (user.role === 'Owner' || user.role === 'Editor' || user.role === 'Viewer')){
            next();

        } else if (req.originalUrl === '/work-order' && (user.role === 'Owner' || user.role === 'Editor')){
            next();

        } else if (req.originalUrl === '/device-manager' && user.role === 'Owner'){
            next();

        } else if (req.originalUrl === '/user-management' && user.role === 'Owner'){
            next();

        } else if (req.originalUrl === '/work-order-add' && (user.role === 'Owner' || user.role === 'Editor')) {
            next();
            
        } else if (req.route.path === '/work-order-update/:id' && (user.role === 'Owner' || user.role === 'Editor')) {
            next();
            
        } else if (req.originalUrl === '/user-add' && user.role === 'Owner') {
            next();
            
        } else if (req.route.path === '/user-update/:id' && user.role === 'Owner') {
            next();
            
        } else if (req.route.path === '/user-reset/:id' && user.role === 'Owner') {
            next();
            
        }else {
            res.redirect('/dashboard');
        }

    }else{
        res.redirect('/');
    }
})


const authLogin = asyncHandler(async (req, res) => {
    const user = req?.session?.user;

    if (user) {
        res.redirect('/dashboard');

    } else {
        res.redirect('/');
    }
})


export {
    authRoleProtect,
    authLogin
}