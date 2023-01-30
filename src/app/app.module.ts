import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [ // components
    AppComponent
  ],
  imports: [ // modules
    BrowserModule,
    HttpClientModule,// allows http requests
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }