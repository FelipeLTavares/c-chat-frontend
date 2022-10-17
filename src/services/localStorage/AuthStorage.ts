export function saveToken (token: string) {
  window.localStorage.setItem('c-chat-token', token)
}

export function getToken(){
  return window.localStorage.getItem('c-chat-token')
}