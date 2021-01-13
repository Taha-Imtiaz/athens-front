export default {
    //role name as a key.
    admin: ['/customer', '/customer/detail/:customerId', '/customer/add', '/claim/customer', '/claim/customerdeposit', '/claim/customerdeposit/deposit',
        '/claim/newclaim', '/job', '/job/details/:jobId', '/job/create', '/job/edit/:jobId', '/calendar', '/schedule', '/schedule/daily',
        '/schedule/movers', '/user', '/user/create', '/account', '/account/update'],
    manager: ['/customer', '/customer/detail/:customerId', '/customer/add', '/claim/customer', '/claim/customerdeposit', '/claim/customerdeposit/deposit',
        '/claim/newclaim', '/job', '/job/details/:jobId', '/job/create', '/job/edit/:jobId', '/calendar', '/schedule', '/schedule/daily',
        '/schedule/movers', '/account', '/account/update'],
    mover: ['/mover', '/mover/payment', '/mover/calendar', '/mover/availability', '/mover/jobdetails/:jobId', '/mover/holidaycalendar']
}