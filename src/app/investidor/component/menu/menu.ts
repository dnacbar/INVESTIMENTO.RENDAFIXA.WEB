import { Investidor } from '../../model/investidor';
import { InvestidorDataBinding } from '../../service/investidor-data-binding';
import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ConsultaInvestidor } from '../../service/consulta-investidor';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [TypeaheadModule, CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu implements OnInit, OnDestroy {
  public carregandoInvestidor = true;
  public listaDeInvestidor: Investidor[] = Array<Investidor>();
  public idInvestidorSelecionado = '';

  private consultaInvestidor = inject(ConsultaInvestidor);
  private investidorDataBinding = inject(InvestidorDataBinding);

  private subject$ = new Subject<void>();

  ngOnInit(): void {
    this.consultaInvestidor.listaInvestidor()
    .pipe(takeUntil(this.subject$))
      .subscribe({
        next: x => {
          this.listaDeInvestidor = x;
          this.carregandoInvestidor = false;
        },
        error: () => { this.carregandoInvestidor = false; }
      });
  }
  
  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  public investidorSelecionado() {
    const investidor = this.listaDeInvestidor.find(inv => inv.idInvestidor === this.idInvestidorSelecionado);
    this.investidorDataBinding.enviaInvestidor(investidor ?? new Investidor());
  }
}