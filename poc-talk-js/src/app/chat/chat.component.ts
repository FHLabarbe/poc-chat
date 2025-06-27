import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TalkService } from '../services/talkjs.service';
import { User } from '../user';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat',
  imports: [MatButtonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatJsComponent implements AfterViewInit {
  @ViewChild('talkjsContainer', {static:true}) container!: ElementRef;

  constructor(
    private authService: AuthService, 
    private talkService: TalkService,
    private router: Router
  ) {}

  async ngAfterViewInit(): Promise<void> {
    const session = await this.talkService.createSession();

    const me = this.authService.getCurrentUser()!;
    const otherUser: User = { 
      id: me.username === 'client' ? 1 : 0, 
      username: me.username === 'client' ? 'conseiller' : 'client', 
      password: '', 
    };

    const conversationBuilder = await this.talkService.getOrCreateConversationBuilder(
      session,
      otherUser
    );

    await this.talkService.createInbox(
      session,
      conversationBuilder,
      this.container.nativeElement
    )

  }
  goHome(): void {
    this.router.navigate(['home']);
  }
}
