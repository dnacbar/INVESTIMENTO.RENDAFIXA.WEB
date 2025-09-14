import { InvestimentoService } from './../../service/investimento-service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Lista } from '../lista/lista';
import { Investimento } from '../../model/investimento';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-index',
  imports: [Lista],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index implements OnInit, OnDestroy {
  public listaDeInvestimento: Investimento[];

  private investimentoService = inject(InvestimentoService);
  private subject$ = new Subject<void>();

  constructor() {
    this.listaDeInvestimento = [];
  }

  ngOnInit(): void {
    this.investimentoService.listaInvestimentoQueNaoEstaLiquidado({} as any)
    .pipe(takeUntil(this.subject$))
    .subscribe((result: Investimento[]) => this.listaDeInvestimento = result);
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }
}
