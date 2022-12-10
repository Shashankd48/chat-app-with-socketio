import { MessageInterface } from "./message.interface";
import { UserInterface } from "./user.interface";

export interface ChatInterface {
   thread: UserInterface | null;
   messages: MessageInterface[];
   users: any;
}

export const InitialChat: ChatInterface = {
   thread: null,
   messages: [],
   users: [],
};
