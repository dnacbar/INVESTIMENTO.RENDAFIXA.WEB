import { ConsultaResgate } from './../../../service/consulta-resgate';
import { Component, inject, model, OnDestroy, OnInit } from '@angular/core';
import { Lista } from '../lista/lista';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';
import { Resgate } from '../../../model/resgate';

@Component({
  selector: 'app-index',
  imports: [Lista],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index implements OnInit, OnDestroy {
  public listaDeResgateModel = model<Resgate[]>([]);

  private consultaResgate = inject(ConsultaResgate);
  private investidorDataBinding = inject(InvestidorDataBinding);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {

    this.investidorDataBinding.investidorEmitter$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: x => {
          if (x.verificaSeEstaVazio()) {
            this.listaDeResgateModel.set([]);
            return;
          }

          this.consultaResgate.listaResgateDoInvestidor(x)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: result => {
                this.listaDeResgateModel.set(result);
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

  public adicionaResgate(): void {
    this.router.navigateByUrl('/resgate/adiciona');
  }
}