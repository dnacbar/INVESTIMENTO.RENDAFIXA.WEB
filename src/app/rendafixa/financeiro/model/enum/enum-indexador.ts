export enum EnumIndexador {
    Pre = 1,
    Cdi = 2,
    Ipca = 3,
    Selic = 4,
    Igpm = 5,
    Incc = 6
}

export interface IEnumIndexadorDescricao {
    id: number;
    descricao: string;
}

export const ListaEnumIndexadorDescricao: IEnumIndexadorDescricao[] = [
    { id: EnumIndexador.Pre, descricao: 'Pré' },
    { id: EnumIndexador.Cdi, descricao: 'CDI' },
    { id: EnumIndexador.Ipca, descricao: 'IPCA' },
    { id: EnumIndexador.Selic, descricao: 'Selic' },
    { id: EnumIndexador.Igpm, descricao: 'IGPM' },
    { id: EnumIndexador.Incc, descricao: 'INCC' }
];