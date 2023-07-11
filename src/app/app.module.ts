import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { SalaComponent } from './pages/sala/sala.component';
import { PerguntaComponent } from './public/pergunta/pergunta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SalaComponent,
    PerguntaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
