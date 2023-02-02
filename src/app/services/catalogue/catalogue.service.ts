// catalogue service for the pokemon catalogue.
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environments';
import {Pokemon} from '../../models/pokemon.model';
import {finalize } from 'rxjs'; // callback method
const { apiPokemon } =  environment;

@Injectable({
    providedIn: 'root'
})
export class PokemonCatalogueService {

    private _pokemons: Pokemon[] = []; // store pokemon object as private init as empty arrray
    private _error: string = ""; //error initialize as empty string.
    private _loading: boolean = false;

    get pokemons(): Pokemon[]{ // can use readonly and this get-method to obtain pokemons
        return this._pokemons;
    }

    get error(): string { // can use this to expose error msg.
        return this._error;
    }

    constructor(private readonly http: HttpClient) {}

    public findAllPokemon(): void {
        this._loading = true;
        const getEmAll = "?limit=1008"
        this.http.get<Pokemon[]>(`${apiPokemon}${getEmAll}`) // list of pokemons
        .pipe(
            finalize(() => {
                this._loading = false;
            }
            ))
        )
        .subscribe({
            next: (pokemons: Pokemon[]) => { // in completion return array of pokemon
                this._pokemons = pokemons;
            },
            error: (error: HttpErrorResponse) => { // when something goes wrong
                this._error = error.message;
            } 
        })
    }
}

// see for reference: https://gitlab.com/deanvons/guitar-purchaserizer/-/blob/master/src/app/models/guitar.ts
