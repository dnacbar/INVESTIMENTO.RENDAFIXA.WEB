import { CommonModule, CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { Component, inject, model, PipeTransform, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskPipe } from 'ngx-mask';
import { Subject } from 'rxjs';
import { TabelaRendaFixaDataBinding } from '../../service/tabela-renda-fixa-data-binding';

@Component({
  selector: 'app-tabela-renda-fixa',
  imports: [CommonModule, FormsModule],
  templateUrl: './tabela-renda-fixa.html',
  styleUrl: './tabela-renda-fixa.scss'
})
export class TabelaRendaFixaComponent<T> {
  public listaDeDadoModel = model<T[]>([]);
  public listaDeColunaModel = model<{ campo: keyof T | ((item: T) => any), titulo: string, pipe?: PipeTransform }[]>([]);
  public cssTabelaModel = model('table table-hover');
  public habilitaColunaAcaoModel = model(true);
  public quantidadePorPagina = model(10);
  public paginaAtual = model(1);

  public tabelaRendaFixaDataBinding = inject(TabelaRendaFixaDataBinding<T>);

  get totalPaginas() {
    return Math.ceil(this.listaDeDadoModel().length / this.quantidadePorPagina());
  }

  get paginas() {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  get dadosPaginados() {
    const inicio = (this.paginaAtual() - 1) * this.quantidadePorPagina();
    return this.listaDeDadoModel().slice(inicio, inicio + this.quantidadePorPagina());
  }

  public obtemValor(item: T, campo: keyof T | ((item: T) => any), pipe?: PipeTransform): any {
    let valor: any;
    if (typeof campo === 'function') {
      valor = campo(item);
    } else {
      valor = item[campo];
    }
    if (!pipe)
      return valor;

    return pipe instanceof DatePipe ? pipe.transform(valor, 'dd/MM/yyyy') :
      pipe instanceof PercentPipe ? pipe.transform(valor, '1.2-2') :
        pipe instanceof CurrencyPipe ? pipe.transform(valor, 'BRL') :
          pipe instanceof NgxMaskPipe ? (valor.length == 11 ? pipe.transform(valor, '000.000.000-00') : pipe.transform(valor, '00.000.000/0000-00')) :
            pipe.transform(valor);
  }

  public irParaPrimeira() { this.paginaAtual.set(1); }
  public irParaUltima() { this.paginaAtual.set(this.totalPaginas); }
  public irParaAnterior() { if (this.paginaAtual() > 1) this.paginaAtual.set(this.paginaAtual() - 1); }
  public irParaProxima() { if (this.paginaAtual() < this.totalPaginas) this.paginaAtual.set(this.paginaAtual() + 1); }
  public irParaPagina(p: number) { this.paginaAtual.set(p); }

  public aoMudarQuantidade(quantidade: number) {
    this.quantidadePorPagina.set(quantidade);
    this.paginaAtual.set(1);
  }
}