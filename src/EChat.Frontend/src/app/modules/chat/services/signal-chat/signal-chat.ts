import { Observable } from "rxjs";
import { Message } from "../..";

export abstract class SignalChat {
    abstract receiveMessage(): Observable<Message>;
    abstract sendMessage(message: Message): void;
}