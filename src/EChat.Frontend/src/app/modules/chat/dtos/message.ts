import { ChatMessage } from "..";

export interface Message {
    name: string;
    text: string;
    userId: string;
}

export function mapMessageToChatMessage(message: Message, userId: string): ChatMessage {
    const isSent = message.userId === userId;

    return {
        text: message.text,
        userName: message.name,
        isSent: isSent,
    };
}