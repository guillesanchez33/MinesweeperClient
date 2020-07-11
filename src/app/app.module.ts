import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MyHttpInterceptor} from './security/http.interceptor';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  MatButtonModule,
  HttpClientModule
  ],
  providers: [HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true},
    GameService],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
