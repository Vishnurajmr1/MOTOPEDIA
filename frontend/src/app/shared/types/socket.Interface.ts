export enum ISocketEvents {
  CONNECTED_EVENT = 'connected',
  DISCONNECT_EVENT = 'disconnect',
  JOIN_CHAT_EVENT = 'joinChat',
  NEW_CHAT_EVENT = 'newChat',
  TYPING_EVENT = 'typing',
  STOP_TYPING_EVENT = 'stopTyping',
  MESSAGE_RECEIVED_EVENT = 'messageReceived',
  LEAVE_CHAT_EVENT = 'leaveChat',
  UPDATE_GROUP_NAME_EVENT = 'updateGroupName',
  JOIN_NOTIFICATION_EVENT = 'joinNotifications',
  NOTIFICATION_RECEIVED_EVENT = 'sendNotifications',
}
