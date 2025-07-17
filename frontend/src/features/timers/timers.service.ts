import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Timer} from '../../types/timer';

@Injectable({ providedIn: 'root' })
export class TimerService {
    private http = inject(HttpClient);

    getTimers(): Observable<Timer[]> {
        return this.http.get<Timer[]>(`/api/timer`);
    }
}
