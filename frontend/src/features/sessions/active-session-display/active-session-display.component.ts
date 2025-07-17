import {Component, input} from '@angular/core';
import {ActiveSession} from '../../../types/timer';

@Component({
    selector: 'active-session-display',
    template: `
        <p>{{ activeSession().id }}</p>
    `
})
export class ActiveSessionDisplay {
    activeSession = input.required<ActiveSession>();
}
