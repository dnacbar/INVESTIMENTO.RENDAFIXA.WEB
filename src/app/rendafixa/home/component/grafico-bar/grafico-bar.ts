import { Component, inject, model, OnDestroy, OnInit } from '@angular/core';
import { TotalInvestimento } from '../../model/total-investimento';
import { ConsultaAnaliticaInvestimento } from '../../service/consulta-analitica-investimento';
import {
    NgApexchartsModule,
    ApexChart,
    ApexPlotOptions
} from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis,
    stroke: ApexStroke;
    legend: ApexLegend;
};

@Component({
    selector: 'app-grafico-bar',
    standalone: true,
    imports: [NgApexchartsModule],
    templateUrl: './grafico-bar.html',
    styleUrls: ['./grafico-bar.scss']
})
export class GraficoBarComponent implements OnInit, OnDestroy {
    public totalInvestimento = model<TotalInvestimento>(new TotalInvestimento());
    public chartOptionsModel = model<ChartOptions>({} as ChartOptions);

    private chartOptions = {} as ChartOptions;
    private destroy$ = new Subject<void>();

    private consultaAnaliticaInvestimento = inject(ConsultaAnaliticaInvestimento);

    constructor() {
        this.chartOptions = {
            series: [],
            chart: {
                type: "bar",
                height: 300
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: "12px",
                    colors: ["#fff"]
                }
            },
            stroke: {
                show: true,
                width: 1,
                colors: ["#fff"]
            },
            xaxis: {
                categories: ['2025'],
                labels: {
                    style: {
                        fontSize: "12px",
                        colors: ["#fff"]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: "12px",
                        colors: ["#fff"]
                    }
                }
            },
            legend: {
                show: true,
                labels: {
                    colors: ["#fff", "#fff", "#fff"]
                }
            }
        };
    }

    ngOnInit(): void {
        this.consultaAnaliticaInvestimento.consultaSomaDeInvestimentoQueNaoEstaLiquidado()
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
                this.totalInvestimento.set(data);
                this.chartOptions = {
                    ...this.chartOptions,
                    series: [
                        {
                            name: "Inicial",
                            data: [parseFloat(this.totalInvestimento()?.valorTotalInicialInvestido.toFixed(2)) || 0]
                        },
                        {
                            name: "Final",
                            data: [parseFloat(this.totalInvestimento()?.valorTotalFinalInvestido.toFixed(2)) || 0]
                        },
                        {
                            name: "Imposto",
                            data: [parseFloat(this.totalInvestimento()?.valorTotalDeImposto.toFixed(2)) || 0]
                        }
                    ],
                };

                this.chartOptionsModel.set(this.chartOptions);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
