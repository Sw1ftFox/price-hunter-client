export interface User {
  id: number,
  email: string,
  token: string
}

export interface AuthActions {
  authUser: (
    email: string,
    password: string,
    type: 'register' | 'login',
    onSuccess: () => void) => void,
  logout: (onExit: () => void) => void,
}