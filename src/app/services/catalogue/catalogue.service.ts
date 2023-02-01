// catalogue service for the pokemon catalogue.
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environments';
import {Pokemon} from '../../models/pokemon.model'
const { apiPokemon } =  environment;

@Injectable({
    providedIn: 'root'
})
export class PokemonCatalogueService {
    constructor(private readonly http: HttpClient) {}

    public findAllPokemon(): void {
        const getEmAll = "?limit=1008"
        this.http.get<Pokemon []>(`${apiPokemon}${getEmAll}`) // list of pokemons
        .subscribe({
            next: () => { // in completion 

            },
            error: () => { // when something goes wrong

            } 
        })
    }
}

// see for reference: https://gitlab.com/deanvons/guitar-purchaserizer/-/blob/master/src/app/models/guitar.ts
