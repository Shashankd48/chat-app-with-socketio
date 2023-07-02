export interface MessageInterface {
   id: string;
   value: string;
   senderId: string;
   receiverId: string;
}

export interface NewMessageInterface {
   content: string;
   contentType: string;
   mimeType: string;
   conversation: string;
}
