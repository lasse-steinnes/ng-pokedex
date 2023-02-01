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
export class LoginService {
    constructor(private readonly http: HttpClient) { }


    public login(username:string): Observable<User>{
        return this.checkUsername(username)
        .pipe(
            switchMap((user: User | undefined) => { // user is either of type User or undefined, 
                // switchmap allows us to change observable
                if(user===undefined){ //user does not exist
                    return this.createUser(username)
                } 
                return of(user); // return the existing user insted of working with created object
            }),
            tap((user: User) => {
                storageUtil.storageSave<User>(StorageKeys.User, user);
            })
        )
    }

    //public getPokemon(pokemons: []): Observable<Caught>{
    //    return pokemon; 
    //}

    private checkUsername(username: string): Observable<User | undefined> {
        return this.http.get<User[]>(`${apiTrainers}?username=${username}`)
        .pipe(
            map((response: User[]) =>  response.pop())
        ) 
    } // returns an observable.

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
    return this.http.post<User>(apiTrainers,user,{ // url, object
        headers
    })
    }

    private updateData(data: any, id: string): Observable<any> {
        return this.http.patch(`${apiTrainers}/${id}`, data)
    }

}