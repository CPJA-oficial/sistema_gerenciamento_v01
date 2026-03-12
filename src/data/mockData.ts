export interface HistoricoItem {
  data: string;
  trabalho: string;
  descricao: string;
}

export type UserRole = "Filho" | "Admin" | "Pai" | "Mãe" | "Loja" | "Lanchonete" | "Ogan";

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  foto: string;
  dataCadastro: string;
  historico: HistoricoItem[];
  status?: "Ativo" | "Inativo";
  role: UserRole;
}

export interface Category {
  id: string;
  nome: string;
  descricao: string;
}

export interface Product {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  valor: number;
}

export interface Sale {
  id: string; // Formato: 00001-03-26
  produto: string;
  quantidade: number;
  valorTotal: number;
  comprador: string;
  data: string; // ISO format or DD/MM/YYYY
  status?: "cancelada";
  motivoCancelamento?: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    nome: "Maria José de Oliveira",
    email: "maria@casa.com",
    telefone: "(11) 98765-4321",
    foto: "https://i.pravatar.cc/150?img=3",
    dataCadastro: "15/03/2023",
    role: "Admin",
    historico: [
      { data: "02/03/2026", trabalho: "Gira de Preto Velho", descricao: "Auxiliar no preparo" },
      { data: "15/02/2026", trabalho: "Consulta com Caboclo", descricao: "Acompanhamento" },
      { data: "28/01/2026", trabalho: "Limpeza Energética", descricao: "Participação" },
      { data: "20/12/2025", trabalho: "Festa de Iemanjá", descricao: "Organização" },
      { data: "10/11/2025", trabalho: "Gira de Baiano", descricao: "Cambone" },
      { data: "25/10/2025", trabalho: "Trabalho de Cura", descricao: "Auxílio" },
      { data: "12/09/2025", trabalho: "Gira de Erê", descricao: "Distribuição de doces" },
      { data: "05/08/2025", trabalho: "Consulta de Esquerda", descricao: "Acompanhamento" },
      { data: "15/07/2025", trabalho: "Amaci", descricao: "Ritual anual" },
      { data: "28/06/2025", trabalho: "Gira de Caboclo", descricao: "Cambone" },
      { data: "10/05/2025", trabalho: "Preparo de Ervas", descricao: "Horta da casa" },
      { data: "22/04/2025", trabalho: "Gira de Ogum", descricao: "Celebração" },
      { data: "15/03/2025", trabalho: "Aniversário da Casa", descricao: "Festa comunitária" },
      { data: "28/02/2025", trabalho: "Limpeza da Tronqueira", descricao: "Manutenção" },
      { data: "10/01/2025", trabalho: "Primeira Gira do Ano", descricao: "Abertura" },
    ],
    status: "Ativo",
  },
  {
    id: 2,
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 91234-5678",
    foto: "https://i.pravatar.cc/150?img=7",
    dataCadastro: "09/03/2026",
    role: "Filho",
    historico: [],
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Ana Beatriz",
    email: "ana@email.com",
    telefone: "(11) 99999-8888",
    foto: "https://i.pravatar.cc/150?img=5",
    dataCadastro: "10/01/2024",
    role: "Filho",
    historico: [],
    status: "Inativo",
  },
];

export const mockProducts: Product[] = [
  { id: 1, nome: "Vela 7 dias", categoria: "Velas", quantidade: 45, valor: 5.0 },
  { id: 2, nome: "Defumador", categoria: "Ervas", quantidade: 12, valor: 12.0 },
  { id: 3, nome: "Guia de Proteção", categoria: "Imagens", quantidade: 3, valor: 25.0 },
  { id: 4, nome: "Fumo de Rolo", categoria: "Fumo", quantidade: 8, valor: 8.0 },
  { id: 5, nome: "Água de Cheiro", categoria: "Ervas", quantidade: 2, valor: 15.0 },
];

export const categorias: Category[] = [
  { id: "1", nome: "Velas", descricao: "Artigos de cera para rituais e iluminação" },
  { id: "2", nome: "Ervas", descricao: "Ervas secas e frescas para banhos e defumação" },
  { id: "3", nome: "Fumo", descricao: "Tabacos e derivados para oferendas" },
  { id: "4", nome: "Imagens", descricao: "Estátuas e representações de entidades" },
  { id: "5", nome: "Bebidas", descricao: "Bebidas rituais e para oferendas" },
  { id: "6", nome: "Outros", descricao: "Produtos diversos da loja" },
];

export const compradores = ["Maria José", "João Silva", "Ana Beatriz", "Visitante"];

export const mockSales: Sale[] = [
  { id: "00001-03-26", produto: "Vela 7 dias", quantidade: 2, valorTotal: 10.0, comprador: "Maria José", data: "02/03/2026" },
  { id: "00002-03-26", produto: "Defumador", quantidade: 1, valorTotal: 12.0, comprador: "João Silva", data: "05/03/2026" },
  { id: "00003-03-26", produto: "Guia de Proteção", quantidade: 1, valorTotal: 25.0, comprador: "Visitante", data: "07/03/2026" },
  { id: "00004-03-26", produto: "Fumo de Rolo", quantidade: 2, valorTotal: 16.0, comprador: "Ana Beatriz", data: "10/03/2026" },
  { id: "00005-03-26", produto: "Água de Cheiro", quantidade: 1, valorTotal: 15.0, comprador: "Visitante", data: "12/03/2026" },
  { id: "00001-02-26", produto: "Vela 7 dias", quantidade: 5, valorTotal: 25.0, comprador: "Maria José", data: "15/02/2026" },
  { id: "00002-02-26", produto: "Defumador", quantidade: 2, valorTotal: 24.0, comprador: "João Silva", data: "18/02/2026" },
  { id: "00003-02-26", produto: "Fumo de Rolo", quantidade: 1, valorTotal: 8.0, comprador: "Visitante", data: "20/02/2026" },
  { id: "00004-02-26", produto: "Vela 7 dias", quantidade: 3, valorTotal: 15.0, comprador: "Ana Beatriz", data: "22/02/2026" },
  { id: "00005-02-26", produto: "Guia de Proteção", quantidade: 1, valorTotal: 25.0, comprador: "Maria José", data: "25/02/2026" },
  { id: "00006-02-26", produto: "Defumador", quantidade: 1, valorTotal: 12.0, comprador: "Visitante", data: "28/02/2026" },
  { id: "00001-01-26", produto: "Água de Cheiro", quantidade: 2, valorTotal: 30.0, comprador: "Ana Beatriz", data: "10/01/2026" },
  { id: "00002-01-26", produto: "Vela 7 dias", quantidade: 1, valorTotal: 5.0, comprador: "João Silva", data: "15/01/2026" },
];
