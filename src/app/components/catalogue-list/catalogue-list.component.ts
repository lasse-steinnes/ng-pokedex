import { Component, OnInit } from "@angular/core";
import { PokemonJson } from "src/app/models/pokemon.model";

@Component({
    selector:"app-catalogue-list",
    templateUrl:"catalogue-list.component.html",
    styleUrls: ["catalogue-list.component.css"]
})

export class CatalogueList implements OnInit{    
    items:PokemonJson[] = [new PokemonJson("Pikachu"), new PokemonJson("Ditto")];

    ngOnInit(): void {
        //TODO: Fetch data
    }
}