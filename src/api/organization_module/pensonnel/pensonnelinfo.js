import request from '../../../utils/request_mockdate'

/**员工信息列表 */
export function pensonnelList(companyID, currentPage, pageSize, searchKey, searchValue, departmentID) {
  return request({
    url: '/pensonnel',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize,
      [searchKey]: searchValue,
      companyID: companyID,
      departmentID: departmentID
    },
  })
}
/**员工信息删除 */
export function pensonnelDelete(pensonnelID) {
  return request({
    url: '/pensonnel',
    method: 'delete',
    params: {
      pensonnelID: pensonnelID

    },
  })
}
/*员工信息修改*/
export function pensonnelUpdate(data) {
  return request({
    url: '/pensonnel',
    method: 'put',
    params: {
      pensonnelID: data.pensonnelID,
      departmentID: data.departmentID,
      name: data.name,
      sex: data.sex,
      age: data.age,
      mobileNumber: data.mobileNumber,
      mail: data.mail,
      remark: data.remark
    },
  })
}

/*员工信息*/
export function pensonnelGetOne(pensonnelID) {
  return request({
    url: '/pensonnel/getone',
    method: 'get',
    params: {
      pensonnelID: pensonnelID
    },
  })
}
/*员工信息添加*/
export function pensonnelAdd(companyID, data) {
  return request({
    url: '/pensonnel',
    method: 'post',
    params: {
      companyID: companyID,
      departmentID: data.departmentID,
      name: data.name,
      sex: data.sex,
      age: data.age,
      mobileNumber: data.mobileNumber,
      mail: data.mail,
      remark: data.remark
    },
  })
}