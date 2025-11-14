import { MenuInvestidor } from './../../model/menu-investidor';
import { Investidor } from '../../model/investidor';
import { InvestidorDataBinding } from '../../service/investidor-data-binding';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ConsultaInvestidor } from '../../service/consulta-investidor';
import { catchError, map, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-menu-investidor',
  imports: [TypeaheadModule, CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  public menuInvestidorModel = model<MenuInvestidor>(new MenuInvestidor());

  private consultaInvestidor = inject(ConsultaInvestidor);
  private investidorDataBinding = inject(InvestidorDataBinding);

  public listaDeInvestidorSignal = toSignal(
    this.consultaInvestidor.listaInvestidor()
      .pipe(
        map(x => {
          this.menuInvestidorModel.update(menu => { menu.boCarregandoInvestidor = false; return menu; });
          return x;
        }),
        catchError(error => {
          console.error('Erro ao carregar lista de investidor:', error);
          this.menuInvestidorModel.update(menu => { menu.boCarregandoInvestidor = true; return menu; });

          return of([] as Investidor[]);
        })), { initialValue: [] as Investidor[] });

  public habilitaSelecaoDeInvestidorSignal = toSignal(this.investidorDataBinding.habilitaSelecaoDeInvestidorEmitter$, { initialValue: false });

  public investidorSelecionado(): void {
    const investidor = this.listaDeInvestidorSignal().find(inv => inv.idInvestidor === this.menuInvestidorModel().idInvestidorSelecionado);
    this.investidorDataBinding.enviaInvestidor(investidor ?? new Investidor());
  }
}