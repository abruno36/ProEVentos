import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { EventoService } from '@app/services/evento.service';
import { LoteService } from '@app/services/lote.service';
@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
  providers: [ DatePipe ]
})
export class EventoDetalheComponent implements OnInit {

  eventoId!: number;
  evento = {} as Evento;
  form!: FormGroup;
  registerForm!: FormGroup;
  estadoSalvar = 'post';

  constructor(
      private eventoService: EventoService
    , private spinner: NgxSpinnerService
    , private loteService: LoteService
    , private fb: FormBuilder
    , private router: ActivatedRoute
    , private localeService: BsLocaleService
    , private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }
  get f(): any {
    return this.form.controls;
  }  

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

    public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = {...evento};
          this.form.patchValue(this.evento);
          //this.carregarLotes();
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
          console.error(error);
        }
      ).add(() => this.spinner.hide());
    }
  }
  
  public carregarLotes(): void {
    this.loteService.getLotesByEventoId(this.eventoId).subscribe(
      (lotesRetorno: Lote[]) => {
        lotesRetorno.forEach(lote => {
          this.lotes.push(this.criarLote(lote));
        });
      },
      (error: any) => {
        this.toastr.error('Erro ao tentar carregar lotes', 'Erro');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }

  ngOnInit(): void {
     this.carregarEvento();
     this.validation();
  }
    public validation() {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      imagemURL: ['', Validators.required]
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim]
    });
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
      return {'is-invalid': campoForm.errors && campoForm.touched};
  }  

  public salvarEvento(): void {
    this.spinner.show();
    if (this.form.valid) {

      if (this.estadoSalvar === 'post')
      {
        this.evento = {...this.form.value}
        this.eventoService.post(this.evento).subscribe(
        () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso'),
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Error ao salvar evento', 'Erro');
        },
        () => this.spinner.hide()
      );
      } else {
        this.evento = {id: this.evento.id,...this.form.value}
        this.eventoService.put(this.evento.id,this.evento).subscribe(
        () =>  this.toastr.success('Evento alterado com Sucesso!', 'Sucesso'),
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Error ao alterar evento', 'Erro');
        },
        () => this.spinner.hide()
      );
      }
    }
  }

  public resetForm(): void {
    this.form.reset();
  }
}
