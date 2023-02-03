// service for trainerpage
import { Injectable } from "@angular/core";
import { PokemonCatalogueService } from "../catalogue/catalogue.service";
import { UserService } from "../user/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environments";
import { PokemonModel } from "src/app/models/pokemon.model";
import { User } from "src/app/models/user.model";
import { finalize, Observable, tap } from "rxjs";

const { API_KEY, apiTrainers} = environment

@Injectable({
    providedIn: 'root'
})

export class TrainerService {

private _loading: boolean = false;

get loading(): boolean{
    return this._loading;
}

    constructor (
        private readonly http: HttpClient,
        private readonly userService: UserService,
        private readonly pokemonCatalogueService: PokemonCatalogueService
    ) { }

    //checks if the user is valid, then checks if the pokemon is valid aswell as if you already have it
    public addToPokemonArray (pokemonName?: string): Observable<User> {
        if(!this.userService.user){
            throw new Error("addToPokemonArray: There is no user "); 
        }

        const user: User = this.userService.user;

        const pokemonModel: PokemonModel | undefined = this.pokemonCatalogueService.pokemonByName(pokemonName);

        if(!pokemonModel?.name){
            throw new Error("addToPokemonArray: No pokemon with name: " + pokemonName);
        }   
        if( this.userService.alreadyCaught(pokemonModel?.name)){
            throw new Error("addToPokemonArray: Pokemon already caught");
        }
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        });

        this._loading = true;
        //sends a patch to the api with the new pokemon
        return  this.http.patch<User>(`${apiTrainers}/${user.id}`, {
            pokemon: [...user.pokemon, pokemonModel] 
        }, {
            headers
        })
        //updates the user so the next patch won't overwrite the previous one.
        .pipe(
            tap((updatedUser: User) => {
                this.userService.user = updatedUser;
            }),
            finalize(() => {
            this._loading = false;
        })
      )
    } 


}