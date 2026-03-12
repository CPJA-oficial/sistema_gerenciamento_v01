export interface HistoricoItem {
  data: string;
  trabalho: string;
  descricao: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  foto: string;
  dataCadastro: string;
  historico: HistoricoItem[];
  status?: "Ativo" | "Inativo";
}

export interface Product {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  valor: number;
}

export const mockUsers: User[] = [
  {
    id: 1,
    nome: "Maria José de Oliveira",
    email: "maria@casa.com",
    telefone: "(11) 98765-4321",
    foto: "https://i.pravatar.cc/150?img=3",
    dataCadastro: "15/03/2023",
    historico: [
      { data: "02/03/2026", trabalho: "Gira de Preto Velho", descricao: "Auxiliar no preparo" },
      { data: "15/02/2026", trabalho: "Consulta com Caboclo", descricao: "Acompanhamento" },
      { data: "28/01/2026", trabalho: "Limpeza Energética", descricao: "Participação" },
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

export const categorias = ["Velas", "Ervas", "Fumo", "Imagens", "Bebidas", "Outros"];

export const compradores = ["Maria José", "João Silva", "Ana Beatriz", "Visitante"];
