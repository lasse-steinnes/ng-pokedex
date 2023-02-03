import { Component, Input, OnInit } from "@angular/core";
import { PokemonJson } from "src/app/models/pokemon.model";

@Component({
    selector: "app-catalogue-item",
    templateUrl: "catalogue-item.component.html",
    styleUrls: ["catalogue-item.component.css"]
})

export class CatalogueItem implements OnInit{    
    @Input() json:PokemonJson = new PokemonJson("");
    isCaught:boolean = false;

    btnCatch():void{
        console.log(this.json.name + " catched!");
    }

    ngOnInit(): void {
        //TODO: Is caught?
    }
}