import request from '../../../utils/request_mockdate'
/*公司信息*/
export function companyGetOne(companyID) {
  return request({
    url: '/company/getone',
    method: 'get',
    params: {
      companyID: companyID
    },
  })
}
/*公司信息删除*/
export function companyDelete(companyID) {
  return request({
    url: '/company',
    method: 'delete',
    params: {

      companyID: companyID
    },
  })
}
/*公司信息修改*/
export function companyUpdate(data) {
  return request({
    url: '/company',
    method: 'put',
    params: {

      companyID: data.companyID,
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      remark: data.remark

    },
  })
}
/*公司信息添加*/
export function companyAdd(data) {
  return request({
    url: '/company',
    method: 'post',
    params: {

      companyID: data.companyID,
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      remark: data.remark

    },
  })
}