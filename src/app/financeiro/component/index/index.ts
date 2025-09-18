import { ConsultaInvestimento } from '../../service/consulta-investimento';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Lista } from '../lista/lista';
import { Investimento } from '../../model/investimento';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InvestidorDataBinding } from '../../../investidor/service/investidor-data-binding';
import { Investidor } from '../../../investidor/model/investidor';
import { ListaInvestimentoQueNaoEstaLiquidadoSignature } from '../../service/signature/lista-investimento-que-nao-esta-liquidado-signature';

@Component({
  selector: 'app-index',
  imports: [Lista],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index implements OnInit, OnDestroy {
  public listaDeInvestimento: Investimento[];

  //private investidor: Investidor;
  private investimentoService = inject(ConsultaInvestimento);
  private investidorDataBinding = inject(InvestidorDataBinding);

  private subject$ = new Subject<void>();

  constructor() {
    this.listaDeInvestimento = [];
    //this.investidor = new Investidor();
  }

  ngOnInit(): void {
    this.investidorDataBinding.investidorEmitter$
      .pipe(takeUntil(this.subject$))
      .subscribe({
        next: x => {
          if (x.verificaSeEstaVazio()) {
            this.listaDeInvestimento = [];
            return;
          }

          this.investimentoService.listaInvestimentoQueNaoEstaLiquidado(x.converteListaInvestimentoQueNaoEstaLiquidadoSignature())
            .pipe(takeUntil(this.subject$))
            .subscribe({
              next: result => this.listaDeInvestimento = result,
              error: err => console.error('Observer got an error: ' + err),
            });
        },
        error: err => console.error('Observer got an error: ' + err),
      });
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }
}
