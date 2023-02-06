import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PokemonModel } from "src/app/models/pokemon.model";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: "app-catalogue-item",
    templateUrl: "catalogue-item.component.html",
    styleUrls: ["catalogue-item.component.css"]
})

export class CatalogueItem implements OnInit {
    @Input() json?: PokemonModel;
    @Input() isCaught: boolean = false;
    @Output() onCatched: EventEmitter<CatalogueItem> = new EventEmitter<CatalogueItem>();

    private detailed: boolean = false;

    constructor(
        private userService: UserService
    ) { }

    private get loading(): boolean {
        return this.userService.loading;
    }

    btnCatch(): void {
        if(this.json != undefined)
        {
            this.onCatched.emit(this);
            this.isCaught = true;
        }
        else console.log("json undefined");
    }

    ngOnInit(): void {
        //TODO: Is caught?
        this.isCaught = this.userService.pokemonOwned(this.json?.name)
    }

    showDetails() { this.detailed = true }
    hideDetails() { this.detailed = false }

    get isDetailed() {return this.detailed;}
    get pokemonModel() {return this.json;}
    set setIsCaught(caught:boolean) {this.isCaught = caught;}
}