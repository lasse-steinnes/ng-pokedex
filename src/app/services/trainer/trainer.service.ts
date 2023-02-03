// service for trainerpage
import { Injectable } from "@angular/core";
import { PokemonCatalogueService } from "../catalogue/catalogue.service";
import { UserService } from "../user/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environments";
import { PokemonModel } from "src/app/models/pokemon.model";
import { User } from "src/app/models/user.model";
import { finalize, Observable } from "rxjs";

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

    public addToPokemonArray (pokemonName: string): Observable<any> {
        if(!this.userService.user){
            throw new Error("addToPokemonArray: There is no user "); 
        }

        const user: User = this.userService.user;

        const pokemonModel: PokemonModel | undefined = this.pokemonCatalogueService.pokemonByName(pokemonName);

        if(!pokemonModel){
            throw new Error("addToPokemonArray: No pokemon with name: " + pokemonName);
        }  
        if( this.userService.alreadyCaught(pokemonName)){
            throw new Error("addToPokemonArray: Pokemon already caught");
        }
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key-': API_KEY
        })

        this._loading = true;

        return  this.http.patch(`${apiTrainers}/${user.id}`, {
            pokemon: [...user.pokemon, pokemonModel] 
        }, {
            headers
        })
        .pipe(
            finalize(() => {
            this._loading = false;
        })
      )
    } 


}