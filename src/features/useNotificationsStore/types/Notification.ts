export interface Notification {
  enabled: boolean,
  tresholdPrice: number
}

export interface NotificationActions {
  addNotification: (id: number, tresholdPrice: number, enabled: boolean) => void,
  deleteNotification: (id: number, enabled: boolean) => void,
}