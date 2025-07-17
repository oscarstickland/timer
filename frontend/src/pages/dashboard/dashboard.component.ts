import {Component} from '@angular/core';
import {UserProfile} from '../../features/profile/user-profile';
import {TimerList} from '../../features/timers/timer-list/timer-list';

@Component({
    selector: 'page-dashboard',
    imports: [
        UserProfile,
        TimerList
    ],
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {}
