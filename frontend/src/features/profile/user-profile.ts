import {Component, effect, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {ProfileService} from './profile.service';
import {AsyncPipe} from '@angular/common';
import {User} from '../../types/user';

@Component({
    selector: 'user-name',
    imports: [AsyncPipe],
    template:  `
        @if (user$ | async; as user) {
            <p>{{ user.firstName }} {{ user.lastName }}</p>
        }
    `
})
export class UserProfile {
    private profileService = inject(ProfileService);
    user$!: Observable<User>;

    constructor() {
        effect(() => {
            this.user$ = this.profileService.getUser();
        })
    }
}
