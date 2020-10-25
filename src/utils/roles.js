export default {
    //role name as a key.
    admin: {
        routes: [
            {
                component: 'customerList',
                url: '/customer'
            },
            {
                component: 'customerDetail',
                url: '/customer/detail/:customerId'
            },
            {
                component: 'CustomerAdd',
                url: '/customer/add'
            },
            {
                component: 'CustomerClaims',
                url: '/claim/customer'
            },
            {
                component: 'CustomerDeposit',
                url: '/claim/customerdeposit'
            },
            {
                component: 'SubmitDeposit',
                url: '/claim/customerdeposit/deposit'
            },
            {
                component: 'NewClaim',
                url: '/claim/newclaim'
            },
            {
                component: 'JobsList',
                url: '/job'
            },
            {
                component: 'JobDetails',
                url: '/job/details/:jobId'
            },
            {
                component: 'CreateJobs',
                url: '/job/create'
            },
            {
                component: 'JobEditDetails',
                url: '/job/edit/:jobId'
            },
            {
                component: 'CalendarApp',
                url: '/calendar'
            },
            {
                component: 'UnavailableSchedule',
                url: '/schedule'
            },
            {
                component: 'DailySchedule',
                url: '/schedule/daily'
            },
            {
                component: 'MoversSchedule',
                url: '/schedule/movers'
            },
            {
                component: 'UsersList',
                url: '/user'
            },
            {
                component: 'CreateUser',
                url: '/user/create'
            },
            {
                component: 'AccountDisplay',
                url: '/account'
            },
            {
                component: 'AccountUpdate',
                url: '/account/update'
            }
        ]
    },
    manager: {
        routes: [
            {
                component: 'HeadOfOperationAndManager',
                url: '/hoo-manager'
            },
            {
                component: 'OnlyForManager',
                url: '/manager-only'
            },
            {
                component: 'HeadOfOperationManagerAndHeadCashier',
                url: '/hoo-manager-head-cashier'
            }
        ],
    },
    mover: {
        routes: [
            {
                component: 'HeadOfOperationManagerAndHeadCashier',
                url: '/hoo-manager-head-cashier'
            }
        ],
    },
    common: {
        routes: [
            {
                component: 'SignInForm',
                url: '/only-for-head-of-operation'
            }
        ]
    }
}