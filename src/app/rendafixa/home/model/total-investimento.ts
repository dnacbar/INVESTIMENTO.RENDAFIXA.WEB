import { TotalInvestimentoAnaliticoResult } from "../service/result/total-investimento-analitico-result";

export class TotalInvestimento {
    public valorTotalInicialInvestido = 0;
    public valorTotalFinalInvestido = 0;
    public valorTotalDeImposto = 0;

    public static converteTotalInvestimento(result: TotalInvestimentoAnaliticoResult): TotalInvestimento {
        const totalInvestimento = new TotalInvestimento();

        if (!result)
            return totalInvestimento;

        totalInvestimento.valorTotalInicialInvestido = result?.vlTotalInicialInvestido;
        totalInvestimento.valorTotalFinalInvestido = result?.vlTotalFinalInvestido;
        totalInvestimento.valorTotalDeImposto = result?.vlTotalDeImposto;

        return totalInvestimento;
    }
}
