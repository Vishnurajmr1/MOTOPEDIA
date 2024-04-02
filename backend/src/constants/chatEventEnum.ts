export const ChatEventEnum = Object.freeze({
    // ? once user is ready to go
    CONNECTED_EVENT: 'connected',
    // ? when user gets disconnected
    DISCONNECT_EVENT: 'disconnect',
    // ? when user joins a socket room
    JOIN_CHAT_EVENT: 'joinChat',
    // ? when participant gets removed from group, chat gets deleted or leaves a group
    LEAVE_CHAT_EVENT: 'leaveChat',
    // ? when admin updates a group name
    UPDATE_GROUP_NAME_EVENT: 'updateGroupName',
    // ? when new message is received
    MESSAGE_RECEIVED_EVENT: 'messageReceived',
    // ? when there is new one on one chat, new group chat or user gets added in the group
    NEW_CHAT_EVENT: 'newChat',
    // ? when there is an error in socket
    SOCKET_ERROR_EVENT: 'socketError',
    // ? when participant stops typing
    STOP_TYPING_EVENT: 'stopTyping',
    // ? when participant starts typing
    TYPING_EVENT: 'typing',
    //?when user enable notification
    JOIN_NOTIFICATION_EVENT:'joinNotifications',
    //?When receive notification
    NOTIFICATION_RECEIVED_EVENT:'sendNotifications'
});

export const AvailableChatEvents = Object.values(ChatEventEnum);
