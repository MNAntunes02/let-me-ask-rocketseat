import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ExcluirDialogComponent } from './public/excluir-dialog/excluir-dialog.component';
import { EncerrarDialogComponent } from './public/encerrar-dialog/encerrar-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './guard/auth.guard'
import { AuthNoGuard } from './guard/auth-no.guard'


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
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

  ],
  providers: [
    ScreenTrackingService,UserTrackingService,AuthService,AuthGuard,AuthNoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
