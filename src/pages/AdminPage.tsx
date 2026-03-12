import { useState } from "react";
import { Users, DollarSign, Eye, EyeOff, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageLayout from "@/components/PageLayout";
import Pagination from "@/components/Pagination";
import { mockUsers, mockProducts, mockSales } from "@/data/mockData";

const AdminPage = () => {
  const [mostrarVendas, setMostrarVendas] = useState(false);
  const [filtroMes, setFiltroMes] = useState("all");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  // Em um sistema real, isso viria de um contexto de autenticação
  // Para fins de demonstração, vamos definir o usuário logado aqui.
  // Você pode trocar para "Pai", "Mãe", "Loja", etc. para testar as restrições.
  const currentUserRole: string = "Admin"; 

  const totalUsuarios = mockUsers.length;
  const usuariosAtivos = mockUsers.filter((u) => u.status === "Ativo").length;
  const usuariosInativos = mockUsers.filter((u) => u.status === "Inativo").length;

  // Simulated monthly sales total
  const vendasDoMes = 1_845.5;

  const formatCurrency = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Filtering sales
  const vendasFiltradas = mockSales.filter((venda) => {
    if (filtroMes === "all") return true;
    const mesVenda = venda.id.split("-")[1]; // Extract month from 00001-MM-YY
    return mesVenda === filtroMes;
  });

  // Pagination calculation
  const totalPaginas = Math.ceil(vendasFiltradas.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const vendasPaginadas = vendasFiltradas.slice(inicio, fim);

  const meses = [
    { value: "all", label: "Todos os meses" },
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  return (
    <PageLayout titulo="Administração">
      <div className="space-y-8">
        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Usuários */}
          <Card className="shadow-sm border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Usuários
              </CardTitle>
              <Users size={18} className="text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalUsuarios}</p>
              <div className="mt-1 flex gap-2 text-xs">
                <span className="text-green-600 font-medium bg-green-500/10 px-1.5 py-0.5 rounded-sm">{usuariosAtivos} ativos</span>
                <span className="text-red-500 font-medium bg-red-500/10 px-1.5 py-0.5 rounded-sm">{usuariosInativos} inativos</span>
              </div>
            </CardContent>
          </Card>

          {/* Vendas do mês */}
          <Card className="shadow-sm border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Vendas do mês
              </CardTitle>
              <DollarSign size={18} className="text-primary" />
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <p className="text-3xl font-bold">
                {mostrarVendas ? formatCurrency(vendasDoMes) : "R$ ••••••"}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                onClick={() => setMostrarVendas(!mostrarVendas)}
              >
                {mostrarVendas ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </CardContent>
          </Card>

          {/* Produtos em estoque */}
          <Card className="shadow-sm border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Produtos em estoque
              </CardTitle>
              <span className="text-lg">📦</span>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockProducts.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {mockProducts.filter((p) => p.quantidade < 5).length} com <span className="text-orange-500 font-medium">estoque baixo</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Usuários */}
        <Card className="shadow-sm border-primary/10 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users size={20} className="text-primary" />
              Usuários Cadastrados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto">
              <Table>
                <TableHeader className="bg-muted/20">
                  <TableRow>
                    <TableHead className="pl-6">Usuário</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Membro desde</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead className="text-center pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/10 transition-colors">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-primary/10">
                            <AvatarImage src={user.foto} alt={user.nome} />
                            <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">{user.telefone}</TableCell>
                      <TableCell className="text-muted-foreground">{user.dataCadastro}</TableCell>
                      <TableCell>
                        <Select 
                          defaultValue={user.role} 
                          disabled={currentUserRole === "Pai" || currentUserRole === "Mãe"}
                        >
                          <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Filho">Filho</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Pai">Pai</SelectItem>
                            <SelectItem value="Mãe">Mãe</SelectItem>
                            <SelectItem value="Loja">Loja</SelectItem>
                            <SelectItem value="Lanchonete">Lanchonete</SelectItem>
                            <SelectItem value="Ogan">Ogan</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-center pr-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={currentUserRole === "Pai" || currentUserRole === "Mãe"}
                          className="p-0 h-auto hover:bg-transparent"
                        >
                          <Badge
                            variant={user.status === "Ativo" ? "default" : "secondary"}
                            className={
                              user.status === "Ativo"
                                ? "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 shadow-none"
                                : "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 shadow-none"
                            }
                          >
                            {user.status ?? "Ativo"}
                          </Badge>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Vendas */}
        <Card className="shadow-sm border-primary/10 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign size={20} className="text-primary" />
              Histórico de Vendas
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden sm:inline">Filtrar por mês:</span>
              <Select value={filtroMes} onValueChange={(val) => {
                setFiltroMes(val);
                setPaginaAtual(1);
              }}>
                <SelectTrigger className="w-[160px] h-9 bg-background border-primary/20 hover:border-primary/40 transition-colors">
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  {meses.map((mes) => (
                    <SelectItem key={mes.value} value={mes.value}>{mes.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto min-h-[400px]">
              <Table>
                <TableHeader className="bg-muted/20">
                  <TableRow>
                    <TableHead className="pl-6 w-[140px]">Pedido</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Comprador</TableHead>
                    <TableHead className="text-center">Qtd</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right pr-6">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendasPaginadas.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                        Nenhuma venda encontrada para o período selecionado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    vendasPaginadas.map((venda) => (
                      <TableRow key={venda.id} className="hover:bg-muted/10 transition-colors">
                        <TableCell className="pl-6 font-mono text-xs text-primary font-bold">{venda.id}</TableCell>
                        <TableCell className="font-medium">{venda.produto}</TableCell>
                        <TableCell className="text-muted-foreground">{venda.comprador}</TableCell>
                        <TableCell className="text-center">{venda.quantidade}</TableCell>
                        <TableCell className="text-right font-semibold text-foreground">{formatCurrency(venda.valorTotal)}</TableCell>
                        <TableCell className="text-right pr-6 text-muted-foreground text-sm">
                          <div className="flex items-center justify-end gap-1.5">
                            <Calendar size={12} />
                            {venda.data}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <Pagination
              currentPage={paginaAtual}
              totalPages={totalPaginas}
              onPageChange={setPaginaAtual}
              totalItems={vendasFiltradas.length}
              itemsPerPage={itensPorPagina}
              label="vendas"
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AdminPage;


