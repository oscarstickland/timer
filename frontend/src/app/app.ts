import {Component} from '@angular/core';
import {TimerList} from '../features/timers/timer-list/timer-list';
import {UserProfile} from '../features/profile/user-profile';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
    imports: [TimerList, UserProfile, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
