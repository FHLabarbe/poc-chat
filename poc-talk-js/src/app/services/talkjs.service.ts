import { Injectable } from '@angular/core';
import Talk from 'talkjs';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Injectable({ providedIn: 'root' })
export class TalkService {
    private currentTalkUser!: Talk.User;

    constructor(private auth: AuthService) {}

    async createSession(): Promise<Talk.Session> {
        await Talk.ready;
        const appUser = this.auth.getCurrentUser()!;
        this.currentTalkUser = new Talk.User({
            id:    appUser.id,
            name:  appUser.username,
            email: `${appUser.username}@example.com`,
            role:  appUser.username
        });

        return new Talk.Session({
            appId: 'tLFuimhi',
            me: this.currentTalkUser
        });
    }

    async getOrCreateConversationBuilder(
        session: Talk.Session,
        otherAppUser: User
    ): Promise<Talk.ConversationBuilder> {
        const otherTalkUser = new Talk.User({
            id: otherAppUser.id,
            name:   otherAppUser.username,
            email:  `${otherAppUser.username}@example.com`
        });

        const builder = session.getOrCreateConversation(
            Talk.oneOnOneId(this.currentTalkUser, otherTalkUser)
        );
        
        builder.setParticipant(this.currentTalkUser);
        builder.setParticipant(otherTalkUser);

        return builder;
    }

    async createInbox(
        session: Talk.Session,
        builder: Talk.ConversationBuilder,
        container: HTMLElement
    ): Promise<Talk.Inbox> {
        const inbox = session.createInbox({selected: builder});
        inbox.mount(container);
        return inbox;
    }

    async createChatBox(
        session: Talk.Session,
        builder: Talk.ConversationBuilder,
        container: HTMLElement
    ): Promise<Talk.Chatbox> {
        const chatbox = session.createChatbox();
        chatbox.mount(container);
        chatbox.select(builder);
        return chatbox;
    }
}