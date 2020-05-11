import Cookies from '../../node_modules/js-cookie'

const TokenKey = 'yq-backstage-manage'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
