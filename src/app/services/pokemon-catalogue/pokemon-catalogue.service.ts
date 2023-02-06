// catalogue service for the pokemon catalogue.
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environments';
import {StatsRes, StatsModel, PokemonModel, PokemonRes} from '../../models/pokemon.model';
import {finalize, map } from 'rxjs'; // callback method
const { apiPokemon } =  environment;

@Injectable({
    providedIn: 'root'
})
export class PokemonCatalogueService {


    //private _pokeStats = {} as StatsModel;
    private _pokeStats: StatsModel[] = []; // store stats in array
    private _pokemons: PokemonModel[] = []; // store pokemon object as private init as empty arrray

    private _error: string = ""; //error initialize as empty string.
    private _loading: boolean = false;

    get pokestats(): StatsModel[]{
        return this._pokeStats;
    }

    get pokemons(): PokemonModel[]{ // can use readonly and this get-method to obtain pokemons
        return this._pokemons; // set pokemon as property
    }

    get error(): string { // can use this to expose error msg.
        return this._error;
    }

    get loading(): boolean { // set loading as a property
        return this._loading;
    }

    constructor(private readonly http: HttpClient) {}

    public findAllPokemon(): void {
        if(this._pokemons.length > 0)
            return;

        this._loading = true;
        const getEmAll =  "?limit=905"; // "?limit=1008" png not available for all

        this.http.get<PokemonRes>(`${apiPokemon}${getEmAll}`) // list of pokemons
        .pipe(
            finalize(() => {
                this._loading = false;
            }
            // option map remove pokemonR
            
            ))
        .subscribe({
            next: (results: PokemonRes) => { // in completion return array of pokemon
                this._pokemons = results.results; // pokemons
                console.log("this mons ", results.results);
                // adding id and img url
                results.results.forEach((pokeObject,index) => {
                    pokeObject.name = pokeObject.name.toUpperCase();
                    pokeObject.id = index + 1;
                    pokeObject.img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" 
                                        + pokeObject.id.toString() + ".png";
                })
            },
            error: (error: HttpErrorResponse) => { // when something goes wrong
                this._error = error.message;
            } 
        })
    }

    public findSpecs(id: number) { // give pokemon id as input
        console.log("here findspecs, number ", id);
        //console.log(`${apiPokemon}/${id}/`);
        return this.http.get<StatsRes>(`${apiPokemon}/${id}/`) // list of pokemons
        .pipe(
            finalize(() => {
                this._loading = false;
            }),
            map(result=>{

                return result.stats

            })    
        )  
    }

    public pokemonByName(pokemonName?: string){
        return this._pokemons.find((pokemonModel?: PokemonModel) => pokemonModel?.name === pokemonName);
    }
}

// see for