import { Injectable } from "@angular/core";
import { Pokemon } from "src/app/components/pokemon/pokemon.component";
import { StorageKeys } from "src/app/enums/storage-keys.enum";
import { User } from "src/app/models/user.model";
import { storageUtil } from "src/app/utils/storage.util";

    @Injectable({
        providedIn: 'root' 
    })
    export class UserService {
        
        private _user?: User;
        //get the user
        get user(): User | undefined{
            return this._user
        }
        // set the user
        set user(user: User | undefined) {
            this._user= user;
        }
        //sets the user equals to the session storage
        constructor () {
            this._user = storageUtil.storageRead<User>(StorageKeys.User)
         }

         public alreadyCaught(pokemonName: string): boolean {
            if(this._user){
                return Boolean(this.user?.pokemon.find((pokemon: Pokemon) => pokemon.name === pokemonName))

            }
            return false;
         }
    }