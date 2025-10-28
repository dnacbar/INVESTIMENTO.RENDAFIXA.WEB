import { Component, inject, model } from '@angular/core';
import { BloqueioInvestimento } from '../../../model/bloqueio-investimento';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';
import { Router } from '@angular/router';
import { ConsultaBloqueioInvestimento } from '../../../service/consulta-bloqueio-investimento';
import { Subject, takeUntil } from 'rxjs';
import { Lista } from "../lista/lista";

@Component({
  selector: 'app-index',
  imports: [Lista],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index {
 public listaDeBloqueioInvestimentoModel = model<BloqueioInvestimento[]>([]);

  private consultaBloqueioInvestimento = inject(ConsultaBloqueioInvestimento);
  private investidorDataBinding = inject(InvestidorDataBinding);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {

    this.investidorDataBinding.investidorEmitter$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: x => {
          if (x.verificaSeEstaVazio()) {
            this.listaDeBloqueioInvestimentoModel.set([]);
            return;
          }
 
          this.consultaBloqueioInvestimento.listaBloqueioInvestimento(x.converteEmListaBloqueioInvestimentoSignature())
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: result => {
                this.listaDeBloqueioInvestimentoModel.set(result);
              },
              error: err => console.error('Erro na consulta de resgate: ' + err),
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

  public adicionaBloqueioInvestimento(): void {
    this.router.navigateByUrl('/bloqueio-investimento/adiciona');
  }
}
