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
        this._loading = true;
        const getEmAll =  "?limit=2"; // "?limit=1008" png not available for all

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
                console.log("this mons ", this._pokemons);
                // adding id and img url
                results.results.forEach((pokeObject,index) => {
                    pokeObject.name = pokeObject.name.toUpperCase();
                    pokeObject.id = index + 1;
                    pokeObject.img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" 
                                        + pokeObject.id.toString() + ".png";
                    
                    // this.findSpecs(pokeObject.id); lazy req + async
                    //console.log(this.pokestats);
                    //pokeObject.hp = 400;// this._pokeStats[0].base_stat; //[0].base_stat;
                    //pokeObject.attack = this._pokeStats[1].base_stat;
                    //pokeObject.def = this._pokeStats[2].base_stat;
                    //pokeObject.spatk = this._pokeStats[3].base_stat;
                    //pokeObject.spdef = this._pokeStats[4].base_stat;
                    //pokeObject.spd = this._pokeStats[5].base_stat;
                }
                )

                console.log("here pokestats ", this._pokeStats);
                console.log("here pokemon obj ", this._pokemons)
                //console.log("findings: ",pokemons)

            },
            error: (error: HttpErrorResponse) => { // when something goes wrong
                this._error = error.message;
            } 
        })
    }

    public findSpecs(id: number): void { // give pokemon id as input
        console.log("here findspecs, number ", id);
        //console.log(`${apiPokemon}/${id}/`);
        this.http.get<StatsRes>(`${apiPokemon}/${id}/`) // list of pokemons
        .pipe(
            finalize(() => {
                this._loading = false;
            }),
            map(result=>{

                return result.stats

            })
    
            )
        .subscribe({
            next: (stats: StatsModel[]) => { // in completion return array 
                console.log(stats)

               this._pokeStats = stats; //s[0].base_stat; // stats

               console.log(this._pokeStats)
                
                //console.log("stats obj ", this._pokeStats)
 
            },
            error: (error: HttpErrorResponse) => { // when something goes wrong
                this._error = error.message;
            } 
        })
        
    }
}

// see for