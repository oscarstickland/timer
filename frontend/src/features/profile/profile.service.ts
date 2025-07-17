import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../types/user';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private http = inject(HttpClient);

    getUser(): Observable<User> {
        return this.http.get<User>("/api/auth/profile/");
    }
}
