export interface Notification {
  enabled: boolean,
  tresholdPrice: number
}

export interface NotificationActions {
  addNotification: (id: string, tresholdPrice: number, enabled: boolean) => void,
  deleteNotification: (id: string, enabled: boolean) => void,
}