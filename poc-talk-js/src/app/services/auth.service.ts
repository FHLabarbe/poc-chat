import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { User } from "../user";

@Injectable({providedIn :'root'})
export class AuthService {
    private usersUrl = "/assets/users.json";
    private currentUser: User | null = null;
    
    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<boolean> {
        return this.http.get<User[]>(this.usersUrl).pipe(
            map(users => {
                console.log("dans le map");
                console.log("usersUrl value :", this.usersUrl);
                const user = users.find(u => u.username === username && u.password === password);
                console.log("user après assignation : ",user);
                if (user){
                    console.log("dans le if du map");
                    this.currentUser = user;
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    return true;
                }
                return false;
            }),
            catchError(() => of(false))
        );
    }

    logout():void {
        this.currentUser = null;
        sessionStorage.removeItem('currentUser');
    }

    isLoggedIn(): boolean {
        return this.currentUser !== null || !!sessionStorage.getItem('currentUser');
    }

    getCurrentUser(): User | null {
        if (!this.currentUser){
            const stored = sessionStorage.getItem('currentUser');
            if (stored){
                this.currentUser = JSON.parse(stored);
            }
        }
        return this.currentUser;
    }

}