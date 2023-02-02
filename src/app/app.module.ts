import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCateloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PokemonList } from './components/pokemon-list/pokemon-list.component';
import { Catch } from './components/catch-and-release/catch.component';
import { Release } from './components/catch-and-release/release.component';
import { Pokemon } from './components/pokemon/pokemon.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    PokemonCateloguePage,
    PokemonList,
    TrainerPage,
    LoginFormComponent,
    PokemonList,
    Catch,
    Release,
    Pokemon
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,// allows http requests
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }  