import {Component} from '@angular/core';
import {TimerList} from '../features/timers/timer-list/timer-list';
import {UserProfile} from '../features/profile/user-profile';

@Component({
  selector: 'app-root',
    imports: [TimerList, UserProfile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
