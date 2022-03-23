export const environment = {
  production: true,
  
};

export const apiEndpoint= {
 
  user: {
    userList: 'admin/users',
    resetPassword: 'account/admin/users/password/reset',
    userSignup: 'account/v1/users',
  },
  userTransaction:{
    getuserTransaction:'transaction/admin/transactions',
    getUserTransaction:'transaction/admin/transaction/user',
  },
  transaction:{
    getQuarantineTransaction:'connector/v1/railsbank/transaction/quatantine_list',
    getAllTransaction : 'transaction/admin/all/transaction'

  },
  openOrders:{
    getopenOrders:'transaction/admin/open/orders',
  },
  userManagement:{
    getuserUsermanaggement:'account/admin/users',
    transactionDetail:'transactionDetails'
  },
  activity : {
    postActivity : 'activity/admin/activity',
  },
  ApplicantId:{
    getApplicantId : 'connector/v1/onfido/check/list',
  },
  getId:{
    getIDReportList : 'connector/v1/getid/kyc/report',
  },
  reportListId:{
    getReportListId: 'connector/v1/onfido/admin/reports',
  },
  reportObjList:{
    getReportListObj : 'connector/v1/onfido/admin/report',
  },
  config:{
  getAllConfigList : 'connector/v1/admin/config',
  },
    countryResidenceRisk:{
    getCountryResidence : 'account/admin/risks/residency',
  },
  nationalityRisk:{
    getnationalityRisk : 'account/admin/risks/nationality',
  },
  screeningRisk:{
    getscreeningRisk : 'account/admin/risks/screening',
  },
  feesRisk:{
    getFees: 'account/admin/v1/fee',
  },
  notification:{
    getNotification : 'notification/admin/notification',
  },
  transactionAll:{
    getTransactionAll : 'account/admin/risks/screening',
  },
    onFidoThirdPartyApi:{
    onfidoImage:'https://api.eu.onfido.com/v3.2/live_photos/',
    onfidoDocuments:'https://api.eu.onfido.com/v3.2/documents/'
  },

  dashBoard:{
    getDashboard:'account/admin/dashboard'
  },
  getRole:{
    getRolePermission:'account/admin/role/permissions',
    postRolePermission:'account/admin/assign/role',
    deleteUser: 'account/admin/user-status'
  },
  getVerfyUser:{
    getVerfyUser: 'account/admin/verify-user',
    getResetPassword: 'account/admin/users/password/update',
    getPhone: 'account/admin/mobile/update/'
  },
  kycLimit : {
    getKycLimit:'account/admin/kyc/limit',
  },
  coins:{
    getCoinsLimit: 'account/admin/coins/list',
    updateCoins:'account/admin/coins',
    uploadImage: 'account/v1/upload'
  },
  settlement:{
    getSettle: 'transaction/admin/one-alpha/transactions',
  },
  checkList:{
    getChecklist: 'account/admin/users/kyc/checklist'
  },
 
  kycStatus:{
    getKycStatus: 'account/admin/users/update/kyc-status/',
    uploadKyc: 'connector/v1/lxt/users/kyc/upload/'
  },
  uploadImage: 'uploadMultipleImages',



  modules: [
    'Dashboard',
    'User Management',
    'Risk Management',
    'Activity Log',
    'Transaction Resolution',
    'Configuration Management',
    'Fees Management',
    'Notification Management',
    'Transaction Management',
    'Role Management',
    'Admin Management',
    'Coins Management',
    'Kyc Limit',
    'Settlement Management',
    'User SignUp',
    'Register',
    'Kyc Dashboard'
  ]
}
 
