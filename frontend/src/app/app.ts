import {Component} from '@angular/core';
import {TimerList} from '../features/timers/timer-list/timer-list';

@Component({
  selector: 'app-root',
  imports: [TimerList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
