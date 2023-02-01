import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environments";
import { storageUtil } from "src/app/utils/storage.util";
import { StorageKeys } from "src/app/enums/storage-keys.enum";

//destructures value from environment variable
const { apiTrainers, API_KEY } = environment

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    //Dependency injection
    constructor(private readonly http: HttpClient) { }

    //logging in returns an observable User
    public login(username: string): Observable<User> {
        return this.checkUsername(username)
            .pipe(
                switchMap((user: User | undefined) => {
                    if (user === undefined) {
                        return this.createUser(username)
                    }
                    return of(user);
                }),
                tap((user: User) => {
                    storageUtil.storageSave<User>(StorageKeys.User, user);
                })
            )
    }

    //checks if the username already exists in the api
    //in the return it checks for the username and either comes back with an array or an empty array
    //response.pop takes the last item on the array and return it back into the map and makes the return value the username
    //retruns undefined if the array is empty.
    private checkUsername(username: string): Observable<User | undefined> {
        return this.http.get<User[]>(`${apiTrainers}?username=${username}`)
            .pipe(
                map((Response: User[]) => Response.pop())
            )
    }
    //creates a new user 
    private createUser(username: string): Observable<User> {
        const user = {
            username,
            pokemon: []
        };

        
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        });
        console.log(username)
        return this.http.post<User>(apiTrainers, user, {
            headers
        })
    }

}