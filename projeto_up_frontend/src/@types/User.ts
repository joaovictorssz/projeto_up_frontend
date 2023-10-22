export interface Profile {
    _id: string
    username: string;
    email: string;
    password: string;
    auditor: boolean;
    qtd_cadastros: number
}