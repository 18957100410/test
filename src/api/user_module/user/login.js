import request from '../../../utils/request_mockdate'
/*用户登录 */
export function userLogin(data) {
    return request({
        url: '/user/login',
        method: 'post',
        params: {
            userName:data.userName,
            passWord:data.passWord
        },
    })
}
/**用户注册 */
export function userRegister(data) {
    return request({
        url: '/user',
        method: 'post',
        params: {
            userName:data.userName,
            passWord:data.passWord,
            mobileNumber:data.mobileNumber,
            mail:data.mail,
            sex:data.sex,
            age:data.age,
            companyID:data.companyID
        },
    })
}
/**用户列表 */
export function userList(currentPage,pageSize,searchKey,searchValue) {
    return request({
        url: '/user',
        method: 'get',
        params: {
            token:sessionStorage.getItem('token'),
            currentPage:currentPage,
            pageSize:pageSize,
            [searchKey]:searchValue
            
        },
    })
}
/**用户修改 */
export function userUpdate(data) {
    return request({
        url: '/user',
        method: 'put',
        params: {
            token:sessionStorage.getItem('token'),
            userName:data.userName,
            passWord:data.passWord,
            mobileNumber:data.mobileNumber,
            mail:data.mail,
            sex:data.sex,
            age:data.age,
            companyID:data.companyID
        },
    })
}
/**用户查询 */
export function userGetOne(userID) {
    return request({
        url: '/user/getone',
        method: 'get',
        params: {
            token:sessionStorage.getItem('token'),
            userID:userID
            
        },
    })
}
/**用户删除 */
export function userDelete(userID) {
    return request({
        url: '/user',
        method: 'delete',
        params: {
            token:sessionStorage.getItem('token'),
            userID:userID
            
        },
    })
}