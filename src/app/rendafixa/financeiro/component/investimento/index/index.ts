import { ConsultaInvestimento } from '../../../service/consulta-investimento';
import { Component, OnDestroy, OnInit, effect, inject, model, signal } from '@angular/core';
import { Lista } from '../lista/lista';
import { Investimento } from '../../../model/investimento';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';
import { Router } from '@angular/router';
import { Visualiza } from '../visualiza/visualiza';
import { TabelaRendaFixaDataBinding } from '../../../../../library/service/tabela-renda-fixa-data-binding';

@Component({
  selector: 'app-index',
  imports: [Lista, Visualiza],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index implements OnInit, OnDestroy {
  public listaDeInvestimentoSignal = signal<Investimento[]>([]);
  public investimentoModel = model<Investimento | null>(null);

  private consultaInvestimento = inject(ConsultaInvestimento);
  private investidorDataBinding = inject(InvestidorDataBinding);
  private router = inject(Router);
  private tabelaRendaFixaDataBinding = inject(TabelaRendaFixaDataBinding<Investimento>);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.investidorDataBinding.investidorEmitter$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: x => {
          if (x.verificaSeEstaVazio()) {
            this.investimentoModel.set(null);
            this.listaDeInvestimentoSignal.set([]);
            return;
          }

          this.listaDeInvestimentoSignal.set([]);

          this.consultaInvestimento.listaInvestimento(x.converteEmListaInvestimentoSignature())
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: result => {
                this.listaDeInvestimentoSignal.set(result);
                this.investimentoModel.set(this.listaDeInvestimentoSignal()[0]);
              },
              error: err => console.error('Erro na consulta de investimento: ' + err),
            });
        },
        error: err => console.error('Erro ao selecionar o investidor: ' + err),
      });

    this.investidorDataBinding.enviaHabilitaSelecaoDeInvestidor(true);

    this.tabelaRendaFixaDataBinding.eventoEnviaItemSelecionado$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: investimento => {
          this.investimentoModel.set(investimento);
        },
        error: err => console.error('Erro ao receber o investimento selecionado: ' + err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public adicionaInvestimento(): void {
    this.router.navigateByUrl('/investimento/adiciona');
  }

  public irParaHome(): void {
    this.router.navigateByUrl('/home');
  }
}
