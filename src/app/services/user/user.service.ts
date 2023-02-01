import { Injectable } from "@angular/core";
import { StorageKeys } from "src/app/enums/storage-keys.enum";
import { User } from "src/app/models/user.model";
import { storageUtil } from "src/app/utils/storage.util";

    @Injectable({
        providedIn: 'root' 
    })
    export class UserService {
        
        private _user?: User;

        get user(): User | undefined{
            return this._user
        }

        set user(user: User | undefined) {
            this._user= user;
        }

        constructor () {
            this._user = storageUtil.storageRead<User>(StorageKeys.User)
         }
    }