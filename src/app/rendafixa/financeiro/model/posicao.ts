import { ListaCincoUltimasPosicoesResult } from "../service/result/lista-cinco-ultimas-posicoes-result";

export class Posicao {
    idInvestimento = '';
    cdInvestimento = 0;
    idPosicao = 0;
    dtPosicao = new Date();
    nmValorBrutoTotal = 0;
    nmValorLiquidoTotal = 0;
    nmValorBruto = 0;
    nmValorLiquido = 0;

    public static convertePosicao(result: ListaCincoUltimasPosicoesResult): Posicao {
        const posicao = new Posicao();

        if (!result)
            return posicao;

        posicao.idInvestimento = '';
        posicao.cdInvestimento = 0;
        posicao.idPosicao = result?.posicao;
        posicao.dtPosicao = new Date(result?.dtPosicao);
        posicao.nmValorBrutoTotal = result?.vlBrutoTotal;
        posicao.nmValorLiquidoTotal = result?.vlLiquidoTotal;
        posicao.nmValorBruto = result?.vlBruto;
        posicao.nmValorLiquido = result?.vlLiquido;
        return posicao;
    }
}
