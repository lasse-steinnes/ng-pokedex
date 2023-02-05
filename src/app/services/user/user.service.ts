import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, finalize } from "rxjs";
import { StorageKeys } from "src/app/enums/storage-keys.enum";
import {  PokemonModel } from "src/app/models/pokemon.model";
import { User } from "src/app/models/user.model";
import { storageUtil } from "src/app/utils/storage.util";
import { environment } from "src/environments/environments";
import { PokemonCatalogueService } from "../catalogue/catalogue.service";

const { API_KEY, apiTrainers } = environment

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _loading: boolean = false;
    private _user?: User;
    
    constructor(
        private readonly http: HttpClient,
        private readonly pokemonCatalogueService: PokemonCatalogueService
    )
    {
        //sets the user equals to the session storage
        this._user = storageUtil.storageRead<User>(StorageKeys.User)
    }

    get loading(): boolean {
        return this._loading;
    }    

    get user(): User | undefined {
        return this._user
    }
    set user(user: User | undefined) {
        storageUtil.storageSave<User>(StorageKeys.User, user!)
        this._user = user;
    }
    get ownedPokemons(){
        return this.user?.pokemon;
    }
    

    public catchPokemon(pokemonName:string){

        console.log("Catching " + this.user?.pokemon + " . . . ");

        if (!this.user) {
            throw new Error("caughtPokemon: There is no trainer ");
        }

        const user: User = this.user;
        

        const pokemonModel: PokemonModel | undefined = this.pokemonCatalogueService.pokemonByName(pokemonName);

        if (!pokemonModel) {
            throw new Error("caughtPokemon: No pokemon with name: " + pokemonName);
        }

        if (this.pokemonOwned(pokemonName)) {
            this.removePokemon(pokemonName!)            
        }
        else {
            this._user?.pokemon.push(pokemonModel);
        }
        
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        });

        this._loading = true;
        console.log(user.pokemon)
        //sends a patch to the api with the new pokemon
        return this.http.patch<User>(`${apiTrainers}/${user.id}`, {
            pokemon: [...user.pokemon]
        }, {
            headers
        })
            //updates the user so the next patch won't overwrite the previous one.
            .pipe(
                tap((updatedUser: User) => {
                    this.user = updatedUser;
                }),
                finalize(() => {
                    this._loading = false;
                })
            ).subscribe({
                next: (user: User) => {
                    console.log("NEXT", user)
                    //let index:number = this.items.findIndex(pokemon => pokemon.name == pokemonName); 
                    //items[index].setIsCaught(this.userService.alreadyCaught(pokemonName));
                },
                error: (error: HttpErrorResponse) => {
                    console.log("ERROR", error.message);
                }
            })
    }

    public pokemonOwned(pokemonName?: string): boolean {
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