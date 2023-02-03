import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PokemonModel } from "src/app/models/pokemon.model";

@Component({
    selector: "app-catalogue-item",
    templateUrl: "catalogue-item.component.html",
    styleUrls: ["catalogue-item.component.css"]
})

export class CatalogueItem implements OnInit{    
    @Input() json?:PokemonModel;
    @Output() onCatched:EventEmitter<string> = new EventEmitter<string>();
    isCaught:boolean = false;
    detailed:boolean = false;


    btnCatch():void{
        console.log(this.json?.name + " catched!");

        if(this.json?.name != undefined)
            this.onCatched.emit(this.json.name);
        else
            console.log("Pokemon data invalid!");
    }

    ngOnInit(): void {
        //TODO: Is caught?
    }

    showDetails(){this.detailed = true}
    hideDetails(){this.detailed = false}
}