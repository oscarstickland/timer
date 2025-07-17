import { Routes } from '@angular/router';
import {DashboardComponent} from '../pages/dashboard/dashboard.component';
import {TimerComponent} from '../pages/timer/timer.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'timer',
        component: TimerComponent
    }
];
