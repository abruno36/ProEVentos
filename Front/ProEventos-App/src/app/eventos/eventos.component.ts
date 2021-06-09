import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule,BsModalService } from 'ngx-bootstrap/modal';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
//import { BsLocaleService } from 'ngx-bootstrap/';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  //providers: [EventoService] //- 2a maneira
})
export class EventosComponent implements OnInit {

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public imagemLargura = 50;
  public imagemMargem = 2;
  public mostrarImagem = false;
  private filtroListado: string = '';
  public modoSalvar = 'post';
  public registerForm!: FormGroup;
  public evento: Evento | undefined;
  public bodyDeletarEvento = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }  

  constructor(private eventoService: EventoService) {}

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }



  //excluirEvento(evento: Evento, template: any) {
  //  this.openModal(template);
  //  this.evento = evento;
  //  this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  //}



  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
        (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ngOnInit() {
    this.getEventos();
  }

  public alternarImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public getEventos(): void {
      this.eventoService.getEventos().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => console.log(error)
    });
  }

}
