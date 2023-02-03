import { Injectable } from "@angular/core";
import { StorageKeys } from "src/app/enums/storage-keys.enum";
import {  PokemonModel } from "src/app/models/pokemon.model";
import { User } from "src/app/models/user.model";
import { storageUtil } from "src/app/utils/storage.util";



@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _loading: boolean = false;

    get loading(): boolean {
        return this._loading;
    }

    private _user?: User;

    //get the user
    get user(): User | undefined {
        return this._user
    }
    // set the user
    set user(user: User | undefined) {
        storageUtil.storageSave<User>(StorageKeys.User, user!)
        this._user = user;
    }
    //sets the user equals to the session storage
    constructor(
        ) {
        this._user = storageUtil.storageRead<User>(StorageKeys.User)
    }

    public alreadyCaught(pokemonName?: string): boolean {
        if (this._user) {
            return Boolean(this.user?.pokemon.find((pokemons: PokemonModel) => pokemons.name === pokemonName))

        }
        return false;
    }

    public addToCatched(pokemon: PokemonModel): void {
        if(this._user) {
            this._user.pokemon.push(pokemon)
        }
    }

    public removePokemon(pokemonName: string): void {
        if (this._user) {
            this._user.pokemon = this._user.pokemon.filter((pokemon: PokemonModel) => pokemon.name !== pokemonName)
        }
    }
}