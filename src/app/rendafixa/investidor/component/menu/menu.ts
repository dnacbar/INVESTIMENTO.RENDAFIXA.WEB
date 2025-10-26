import { MenuInvestidor } from './../../model/menu-investidor';
import { Investidor } from '../../model/investidor';
import { InvestidorDataBinding } from '../../service/investidor-data-binding';
import { CommonModule } from '@angular/common';
import { Component, inject, model, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ConsultaInvestidor } from '../../service/consulta-investidor';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-menu-investidor',
  imports: [TypeaheadModule, CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu implements OnInit, OnDestroy {
  private menuInvestidor = new MenuInvestidor();

  public menuInvestidorModel = model<MenuInvestidor>(this.menuInvestidor);
  public listaDeInvestidor = model<Investidor[]>([]);

  private consultaInvestidor = inject(ConsultaInvestidor);
  private investidorDataBinding = inject(InvestidorDataBinding);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.consultaInvestidor.listaInvestidor()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: x => {
          this.menuInvestidor.boCarregandoInvestidor = false;
          this.menuInvestidorModel.set(this.menuInvestidor);
          this.listaDeInvestidor.set(x);
        },
        error: () => {
          this.menuInvestidor.boCarregandoInvestidor = true;
          this.menuInvestidorModel.set(this.menuInvestidor);
        }
      });

    this.investidorDataBinding.habilitaSelecaoDeInvestidorEmitter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(x => {
        this.menuInvestidor.boHabilitaSelecaoInvestidor = x;
        this.menuInvestidorModel.set(this.menuInvestidor);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public investidorSelecionado(): void {
    const investidor = this.listaDeInvestidor().find(inv => inv.idInvestidor === this.menuInvestidor.idInvestidorSelecionado);
    this.investidorDataBinding.enviaInvestidor(investidor ?? new Investidor());
  }
}