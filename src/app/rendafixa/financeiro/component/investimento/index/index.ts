import { ConsultaInvestimento } from '../../../service/consulta-investimento';
import { Component, OnDestroy, OnInit, inject, model } from '@angular/core';
import { Lista } from '../lista/lista';
import { Investimento } from '../../../model/investimento';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [Lista],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index implements OnInit, OnDestroy {
  public listaDeInvestimentoModel = model<Investimento[]>([]);

  private consultaInvestimento = inject(ConsultaInvestimento);
  private investidorDataBinding = inject(InvestidorDataBinding);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.investidorDataBinding.investidorEmitter$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: x => {
          if (x.verificaSeEstaVazio()) {
            this.listaDeInvestimentoModel.set([]);
            return;
          }

          this.listaDeInvestimentoModel.set([]);

          this.consultaInvestimento.listaInvestimento(x.converteEmListaInvestimentoSignature())
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: result => {
                this.listaDeInvestimentoModel.set(result);
              },
              error: err => console.error('Erro na consulta de investimento: ' + err),
            });
        },
        error: err => console.error('Erro ao selecionar o investidor: ' + err),
      });

      this.investidorDataBinding.enviaHabilitaSelecaoDeInvestidor(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public irParaHome(): void {
    this.router.navigateByUrl('/home');
  }

  public adicionaInvestimento(): void {
    this.router.navigateByUrl('/investimento/adiciona');
  }
}
