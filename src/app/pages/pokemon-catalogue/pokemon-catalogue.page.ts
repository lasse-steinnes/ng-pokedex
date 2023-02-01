import { Component, Output } from '@angular/core';
import { PokeAction } from 'src/app/other/enums';

@Component({
    selector: 'app-pokemon-catalogue-page',
    templateUrl: 'pokemon-catalogue.page.html',
    styleUrls: ['pokemon-catalogue.page.css']
})

export class PokemonCateloguePage{
    //What action should be enabled in this page
    @Output() action:PokeAction = PokeAction.Catch;
}