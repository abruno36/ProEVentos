import { NgModule } from '@angular/core';
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

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { NavComponent } from './nav/nav.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { EventoService } from './services/evento.service';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [			
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    NavComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot({
         timeOut: 3000,
         preventDuplicates: true,
         progressBar: true
      }),
    FormsModule
  ],
  providers: [EventoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
