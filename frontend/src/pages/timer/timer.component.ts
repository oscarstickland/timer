import {Component, inject} from '@angular/core';
import {TimerListSelectComponent} from '../../features/sessions/timer-list-select/timer-list-select.component';
import {ActiveSession, Timer} from '../../types/timer';
import {Observable} from 'rxjs';
import {SessionService} from '../../features/sessions/sessions.service';
import {AsyncPipe} from '@angular/common';
import {ActiveSessionDisplay} from '../../features/sessions/active-session-display/active-session-display.component';

@Component({
    selector: 'page-timer',
    imports: [
        TimerListSelectComponent,
        AsyncPipe,
        ActiveSessionDisplay
    ],
    template: `
        <timer-list-select (timerSelected)="onTimerSelected($event)" />

        <button (click)="this.fetchActiveSession()">Refresh</button>

        @if (activeSession$ | async; as activeSession) {
            <active-session-display [activeSession]="activeSession" />
        }
    `
})
export class TimerComponent {
    activeSession$!: Observable<ActiveSession>
    private sessionService = inject(SessionService);


    onTimerSelected(timer: Timer) {
        this.activeSession$ = this.sessionService.startSession(timer.id);
    }

    fetchActiveSession() {
        this.activeSession$ = this.sessionService.fetchSession();
    }

    constructor() {
        this.fetchActiveSession();
    }
}
