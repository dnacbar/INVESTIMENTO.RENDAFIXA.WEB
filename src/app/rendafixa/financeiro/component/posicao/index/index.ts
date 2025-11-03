import { Component, inject, model, OnDestroy, OnInit } from '@angular/core';
import { Lista } from '../lista/lista';
import { Posicao } from '../../../model/posicao';
import { Subject, takeUntil } from 'rxjs';
import { ConsultaPosicao } from '../../../service/consulta-posicao';
import { ListaCincoUltimasPosicoesSignature } from '../../../service/signature/lista-cinco-ultimas-posicoes-signature';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [Lista],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index implements OnInit, OnDestroy {
  public listaDePosicao = model<Posicao[]>([]);

  private destroy$ = new Subject<void>();

  private consultaPosicao = inject(ConsultaPosicao);
  private router = inject(Router);

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    const idInvestimento = window.history.state['investimento'];

    if (!idInvestimento) {
      this.router.navigateByUrl('/Investimento');
      return;
    }

    this.consultaPosicao.listaCincoUltimasPosicoes({ investimento: idInvestimento } as ListaCincoUltimasPosicoesSignature)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: x => {
          this.listaDePosicao.set(x);
        },
        error: (error) => {
          alert('Erro ao carregar as posições: ' + error);
        }
      });
  }
}
