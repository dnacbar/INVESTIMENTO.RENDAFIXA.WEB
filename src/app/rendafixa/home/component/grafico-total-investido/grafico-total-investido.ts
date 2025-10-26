import { Component, OnDestroy, OnInit, inject, model } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ConsultaAnaliticaInvestimento } from '../../service/consulta-analitica-investimento';
import { TotalInvestimento } from '../../model/total-investimento';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexTitleSubtitle } from 'ng-apexcharts';
import { CurrencyPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-grafico-total-investido',
  standalone: true,
  imports: [NgApexchartsModule, CurrencyPipe],
  templateUrl: './grafico-total-investido.html',
  styleUrl: './grafico-total-investido.scss'
})
export class GraficoTotalInvestido implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.consultaAnaliticaInvestimento.consultaSomaDeInvestimentoQueNaoEstaLiquidado()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.totalInvestimento.set(result);
        this.chartOptions = {
          ...this.chartOptions,
          series: [
            result.valorTotalInicialInvestido || 0,
            result.valorTotalFinalInvestido || 0,
            result.valorTotalDeImposto || 0
          ]
        };
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  public totalInvestimento = model<TotalInvestimento>(new TotalInvestimento());

  public chartOptions: ChartOptions = {
    series: [0, 0, 0],
    chart: {
      type: 'donut',
      width: 380,
      foreColor: '#FFF' // Cor do texto do gráfico
    },
    dataLabels: {
      style: {
        colors: ['#FFF', '#FFF', '#FFF'] // Defina as cores desejadas para cada label
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 300 },
        legend: { position: 'bottom' }
      }
    }],
    title: { text: 'Total Investido', style: { color: '#FFF' } },
    labels: ['Inicial', 'Final', 'Imposto'],
  };

  private consultaAnaliticaInvestimento = inject(ConsultaAnaliticaInvestimento);


}
