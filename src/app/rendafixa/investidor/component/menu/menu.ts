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
  public menuInvestidorModel = model<MenuInvestidor>(new MenuInvestidor());
  public listaDeInvestidor = model<Investidor[]>([]);

  private consultaInvestidor = inject(ConsultaInvestidor);
  private investidorDataBinding = inject(InvestidorDataBinding);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.consultaInvestidor.listaInvestidor()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: x => {
          this.menuInvestidorModel().boCarregandoInvestidor = false;
          this.listaDeInvestidor.set(x);
        },
        error: () => {
          this.menuInvestidorModel().boCarregandoInvestidor = true;
        }
      });

    this.investidorDataBinding.habilitaSelecaoDeInvestidorEmitter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(x => {
        this.menuInvestidorModel().boHabilitaSelecaoInvestidor = x;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public investidorSelecionado(): void {
    const investidor = this.listaDeInvestidor().find(inv => inv.idInvestidor === this.menuInvestidorModel().idInvestidorSelecionado);
    this.investidorDataBinding.enviaInvestidor(investidor ?? new Investidor());
  }
}