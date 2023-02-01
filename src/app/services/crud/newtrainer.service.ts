import { Injectable } from "@angular/core";
import { map, Observable, of , switchMap, tap} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environments";
import { storageUtil } from "src/app/utils/storage.util";
import { StorageKeys } from "src/app/enums/storage-keys.enum";

const {apiTrainers, API_KEY} = environment

@Injectable({
    providedIn: 'root'
})
export class ssService {
    constructor(private readonly http: HttpClient) { }


    public login(username:string): Observable<User>{
        return this.checkUsername(username)
        .pipe(
            switchMap((user: User | undefined) => {
                if(user===undefined){
                    return this.createUser(username)
                }
                return of(user);
            }),
            tap((user: User) => {
                storageUtil.storageSave<User>(StorageKeys.User, user);
            })
        )
    }


    private checkUsername(username: string): Observable<User | undefined> {
        return this.http.get<User[]>(`${apiTrainers}?username=${username}`)
        .pipe(
            map((Response: User[]) =>  Response.pop())
        ) 
    }

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
    return this.http.post<User>(apiTrainers,user,{
        headers
    })
    }

}