export enum EnumTipoImposto {
    Irrf = 1,
    Iof = 2
}

export interface IEnumTipoImpostoDescricao {
    id: number;
    descricao: string;
}

export const ListaEnumTipoImpostoDescricao: IEnumTipoImpostoDescricao[] = [
    { id: EnumTipoImposto.Irrf, descricao: 'IRRF' },
    { id: EnumTipoImposto.Iof, descricao: 'IOF' }
];