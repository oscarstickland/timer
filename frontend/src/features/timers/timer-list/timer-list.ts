import {Component, effect, inject} from '@angular/core';
import {Observable} from 'rxjs';

import { TimerService } from '../timers.service';
import {Timer} from '../../../types/timer';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'timer-list',
    imports: [AsyncPipe],
    templateUrl: './timer-list.component.html'
})
export class TimerList {
    private timerService = inject(TimerService);
    timers$!: Observable<Timer[]>;

    constructor() {
        effect(() => {
            this.timers$ = this.timerService.getTimers();
        });
    }

}
