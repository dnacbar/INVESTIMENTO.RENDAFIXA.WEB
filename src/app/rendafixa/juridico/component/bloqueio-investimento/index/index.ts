import { Component, inject, model, OnDestroy, OnInit, signal } from '@angular/core';
import { BloqueioInvestimento } from '../../../model/bloqueio-investimento';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';
import { Router } from '@angular/router';
import { ConsultaBloqueioInvestimento } from '../../../service/consulta-bloqueio-investimento';
import { catchError, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Lista } from "../lista/lista";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-index',
  imports: [Lista],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index {
  private consultaBloqueioInvestimento = inject(ConsultaBloqueioInvestimento);
  private investidorDataBinding = inject(InvestidorDataBinding);
  private router = inject(Router);

  public listaDeBloqueioInvestimentoSignal = toSignal(
    this.investidorDataBinding.investidorEmitter$
      .pipe(
        switchMap(x => {
          if (x.verificaSeEstaVazio()) {
            return of([]);
          }
          return this.consultaBloqueioInvestimento.listaBloqueioInvestimento(x)
            .pipe(
              catchError(err => {
                console.error('Erro na consulta de bloqueio de investimento:', err);
                return of([]);
              })
            );
        }),
        tap(() => this.investidorDataBinding.enviaHabilitaSelecaoDeInvestidor(true))),
    { initialValue: [] as BloqueioInvestimento[] });

  public irParaHome(): void {
    this.router.navigateByUrl('/home');
  }

  public adicionaBloqueioInvestimento(): void {
    this.router.navigateByUrl('/bloqueio-investimento/adiciona');
  }
}
