export interface MessageI {
  id: string;
  text: string;
  senderId: string;
}

export interface CardI {
  id: string;
  title: string;
  messages: MessageI[];
}

export interface UserI {
  id: string;
}
