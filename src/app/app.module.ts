import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalaComponent } from './pages/sala/sala.component';
import { PerguntaComponent } from './public/pergunta/pergunta.component';
import { LoginComponent } from './pages/login/login.component';
import { AcessoSalaComponent } from './pages/acesso-sala/acesso-sala.component';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ExcluirDialogComponent } from './public/excluir-dialog/excluir-dialog.component';
import { EncerrarDialogComponent } from './public/encerrar-dialog/encerrar-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    SalaComponent,
    PerguntaComponent,
    LoginComponent,
    AcessoSalaComponent,
    ExcluirDialogComponent,
    EncerrarDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),

  ],
  providers: [
    ScreenTrackingService,UserTrackingService,AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
