//CREATE USER
export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

//CREATE ROOM
export interface CreateRoomData {
  roomName: string;
}

export interface CreateRoomResponse {
  createSuccsess: boolean;
  roomInfo?: Room;
}

//ADD MEMBER
export interface NewMemberData {
  roomId: string;
  userEmail: string;
}

//ADD USER TO ROOM MESSAGE DATA
export interface AddUserToRoomMessageData {
  userId: string;
  room: Room;
}

//AUTH
export interface SignInData {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  token: string;
}

export interface UserInfo {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  token: string;
  isLoggedIn: boolean;
  isLogedLoading: boolean;
  isLogedError: boolean;
}

//CHAT
////Message itself
export interface MessageInfo {
  id: string;
  roomId: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  text: string;
  files?: MessageFile[];
  created: string;
  isSelf: boolean;
}

export interface MessageFile {
  id: string;
  name: string;
  type: string;
  size: string;
  fileUrl: string;
}

////Messages List
export interface MessageRaw {
  id: string;
  roomId: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  text: string;
  created: string;
}

export interface MessageReady {
  id: string;
  roomId: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  text: string;
  created: string;
  isSelf: boolean;
}

export interface SendNewMessageData {
  roomId: string;
  userId: string;
  text: string;
}

////Message Style
export interface MessageStyle {
  alignSelf: string;
  borderRadius: string;
  backgroundColor?: string;
  color?: string;
}

//Room
export interface Room {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessageDatetime: string;
}
