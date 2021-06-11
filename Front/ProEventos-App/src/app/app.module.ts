import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";

import { EventoService } from './services/evento.service';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { AppComponent } from './app.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/titulo/titulo.component';

import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';


defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [				
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    DateTimeFormatPipe,
    NavComponent,
    TituloComponent
   ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot({
         timeOut: 4000,
         preventDuplicates: true,
         progressBar: true
      }),
    FormsModule
  ],
  providers: [EventoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
