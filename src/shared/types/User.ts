export interface User {
  email: string,
  token: string
}

export interface UserActions {
  fetchUserId: () => void
}