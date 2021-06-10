import { Component, OnInit, TemplateRef } from '@angular/core';

import { FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';

import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  //providers: [EventoService] //- 2a maneira
})
export class EventosComponent implements OnInit {
  [x: string]: any;

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
  modalRef = {} as BsModalRef;

  public get filtroLista(): string {
    return this.filtroListado;
  }  

  constructor(
    private eventoService: EventoService
    , private modalService: BsModalService
    //, private fb: FormBuilder
    , private localeService: BsLocaleService
    , private toastr: ToastrService
    , private spinner: NgxSpinnerService
    ) {
      this.localeService.use('pt-br');
    }

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
    this.spinner.show();
    this.getEventos();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('Evento deletado com Sucesso!');
  }
 
  decline(): void {
    this.modalRef.hide();
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
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Eventos!', 'Erro!');
      },
      complete: () => this.spinner.hide()
    });
  }

}
