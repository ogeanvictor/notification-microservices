export interface NotificationStrategyInterface {
  send(notification: any, userId: string): Promise<void>;
}
