export interface Notification {
  enabled: boolean,
  thresholdPrice: number | null
}

export interface NotificationActions {
  addNotification: (id: string, thresholdPrice: number, enabled: boolean) => void,
  deleteNotification: (id: string, enabled: boolean) => void,
}