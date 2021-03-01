import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { UrlEntries } from '@app/_models/url-entries';

@Injectable({ providedIn: 'root' })
export class UrlEntriesService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }
    getAllUrlEntries() {
        return this.http.get<UrlEntries[]>(`${environment.apiUrl}/urlentries`);
    }
    sendUrlInformation(url: string, expression: string) {
        return this.http.post(`${environment.apiUrl}/urlentries/SendUrlInformation`, { url, expression });
    }

}
