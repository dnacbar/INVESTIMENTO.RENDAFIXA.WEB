import { Component, inject, model } from '@angular/core';
import { Resgate } from '../../../model/resgate';
import { Router } from '@angular/router';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';
import { ManipulaResgate } from '../../../service/manipula-resgate';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultaInvestimento } from '../../../service/consulta-investimento';
import { Investimento } from '../../../model/investimento';

@Component({
  selector: 'app-adiciona',
  imports: [FormsModule, CommonModule],
  templateUrl: './adiciona.html',
  styleUrl: './adiciona.scss'
})
export class Adiciona {
  public resgateModel = model<Resgate>(new Resgate());
  public listaDeInvestimentoModel = model<Investimento[]>([]);
  public investimentoModel = model<Investimento>(new Investimento());

  private consultaInvestimento = inject(ConsultaInvestimento);
  private investidorDataBinding = inject(InvestidorDataBinding);
  private location = inject(Location);
  private manipulaResgate = inject(ManipulaResgate);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.investidorDataBinding.investidorEmitter$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: x => {
          if (x.verificaSeEstaVazio()) {
            this.listaDeInvestimentoModel.set([]);
            return;
          }
          this.investimentoModel.set(new Investimento());

          this.consultaInvestimento.listaInvestimentoComResgateDisponivel(x.converteEmListaInvestimentoComResgateDisponivelSignature())
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: result => { this.listaDeInvestimentoModel.set(result); },
              error: err => console.error('Erro na consulta de investimento com resgate disponível: ' + err),
            });
        },
        error: err => console.error('Erro ao selecionar o investidor: ' + err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public adicionaResgate() {
    this.resgateModel().idInvestimento = this.investimentoModel().idInvestimento;

    this.manipulaResgate.adicionaResgate(this.resgateModel().converteEmSignatureAdicionaResgate())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(['/resgate']);
            return;
          }
          this.resgateModel().boCarregandoResgate = false;
        },
        error: (err) => {
          console.log(err);
          this.resgateModel().boCarregandoResgate = false;
        }
      });
  }

  public alert(): void {
    alert(JSON.stringify(this.investimentoModel()));
  }

  public volta(): void {
    this.location.back();
  }
}
