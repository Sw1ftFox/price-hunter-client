export interface User {
  id: string,
  email: string,
  token: string
}

const Auth = {
  REGISTER: 'register',
  LOGIN: 'login'
} as const

type AuthType = (typeof Auth)[keyof typeof Auth]

export interface AuthActions {
  authUser: (
    email: string,
    password: string,
    type: AuthType,
    onSuccess: () => void) => void,
  logout: (onExit: () => void) => void,
}