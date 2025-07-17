import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActiveSession} from '../../types/timer';

@Injectable({providedIn: 'root'})
export class SessionService {
    private http = inject(HttpClient);

    startSession(timerId: number): Observable<ActiveSession> {
        return this.http.get<ActiveSession>(`/api/sessions/${timerId}/start/`);
    }

    stopSession(timerId: number) {
        this.http.get(`/api/sessions/${timerId}/stop/`).subscribe();
    }

    fetchSession(): Observable<ActiveSession> {
        return this.http.get<ActiveSession>("/api/sessions");
    }
}
