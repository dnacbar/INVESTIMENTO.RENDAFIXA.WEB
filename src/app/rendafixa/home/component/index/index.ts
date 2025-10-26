import { InvestidorDataBinding } from './../../../investidor/service/investidor-data-binding';
import { Component, inject, OnInit } from '@angular/core';
import { GraficoTotalInvestido } from '../grafico-total-investido/grafico-total-investido';
import { GraficoBarComponent } from '../grafico-bar/grafico-bar';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [GraficoBarComponent],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index implements OnInit {
  private investidorDataBinding = inject(InvestidorDataBinding);

  ngOnInit(): void {
    this.investidorDataBinding.enviaHabilitaSelecaoDeInvestidor(false);
  }
}