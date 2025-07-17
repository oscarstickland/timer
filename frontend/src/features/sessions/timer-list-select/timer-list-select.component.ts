import {Component, effect, inject, output} from '@angular/core';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

import {TimerService} from '../../timers/timers.service';
import {Timer} from '../../../types/timer';

@Component({
    selector: "timer-list-select",
    imports: [
        AsyncPipe
    ],
    templateUrl: "./timer-list-select.component.html"
})
export class TimerListSelectComponent {
    private timerService = inject(TimerService);

    timerSelected = output<Timer>();

    timers$!: Observable<Timer[]>;

    constructor() {
        effect(() => {
           this.timers$ = this.timerService.getTimers();
        })
    }

    onTimerSelected(timer: Timer): void {
        this.timerSelected.emit(timer);
    }

}
