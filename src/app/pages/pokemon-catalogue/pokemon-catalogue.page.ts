import { Component, OnInit, Output } from '@angular/core';
import { PokemonModel } from 'src/app/models/pokemon.model';
import { PokeAction } from 'src/app/enums/poke-action.enum';
import { PokemonCatalogueService } from 'src/app/services/catalogue/catalogue.service';

@Component({
    selector: 'app-pokemon-catalogue-page',
    templateUrl: 'pokemon-catalogue.page.html',
    styleUrls: ['pokemon-catalogue.page.css']
})

export class PokemonCateloguePage implements OnInit{
    //What action should be enabled in this page
    get pokemons(): PokemonModel[] { // method to get pokemon in template (HTML)
        //console.log(this.pokemonCatalogueService.pokemons);
        return this.pokemonCatalogueService.pokemons; // access pokemons as a property
    }

    get loading(): boolean { // expose loading: true/false
        return this.pokemonCatalogueService.loading;
    }

    get error(): string {
        return this.pokemonCatalogueService.error;
    }

    constructor(
        private readonly pokemonCatalogueService: PokemonCatalogueService // injection
    ) { }

    ngOnInit(): void {
        this.pokemonCatalogueService.findAllPokemon();
        //const pokeData = this.pokemons;
        // console.log("instance poke",this.pokemons) async
        // console.log("catalogue-page ", pokeData);
    }

    @Output() action:PokeAction = PokeAction.Catch;
}