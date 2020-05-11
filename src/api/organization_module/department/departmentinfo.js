import request from '../../../utils/request_mockdate'

/**部门信息列表 */
export function departmentList(companyID, currentPage, pageSize, searchKey, searchValue) {
  return request({
    url: '/department',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize,
      [searchKey]: searchValue,
      companyID: companyID

    },
  })
}
/**部门信息删除 */
export function departmentDelete(departmentID) {
  return request({
    url: '/department',
    method: 'delete',
    params: {
      departmentID: departmentID

    },
  })
}
/*部门信息修改*/
export function departmentUpdate(data) {
  return request({
    url: '/department',
    method: 'put',
    params: {

      departmentID: data.departmentID,
      departmentName: data.departmentName,
      isUsed: data.isUsed,
      remark: data.remark

    },
  })
}

/*部门信息*/
export function departmentGetOne(departmentID) {
  return request({
    url: '/department/getone',
    method: 'get',
    params: {
      departmentID: departmentID
    },
  })
}
/*部门信息添加*/
export function departmentAdd(companyID, data) {
  return request({
    url: '/department',
    method: 'post',
    params: {
      companyID: companyID,
      departmentName: data.departmentName,
      isUsed: data.isUsed,
      remark: data.remark
    },
  })
}