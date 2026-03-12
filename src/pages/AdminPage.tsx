import { useState } from "react";
import { Users, DollarSign, Eye, EyeOff, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
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
import TopBar from "@/components/TopBar";
import { mockUsers, mockProducts, mockSales } from "@/data/mockData";

const AdminPage = () => {
  const [mostrarVendas, setMostrarVendas] = useState(false);
  const [filtroMes, setFiltroMes] = useState("all");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

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

  // Pagination
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
    <div className="min-h-screen bg-background">
      <TopBar titulo="Administração" />

      <main className="container mx-auto max-w-5xl px-4 py-8 space-y-8">
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
                      <TableCell className="text-center pr-6">
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

            {/* Pagination Controls */}
            {totalPaginas > 1 && (
              <div className="flex items-center justify-between px-6 py-4 bg-muted/10 border-t border-primary/10">
                <p className="text-xs text-muted-foreground">
                  Mostrando <span className="font-bold text-foreground">{vendasFiltradas.length > 0 ? inicio + 1 : 0}</span> a <span className="font-bold text-foreground">{Math.min(inicio + itensPorPagina, vendasFiltradas.length)}</span> de <span className="font-bold text-foreground">{vendasFiltradas.length}</span> vendas
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 px-3 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors disabled:opacity-40"
                    onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
                    disabled={paginaAtual === 1}
                  >
                    <ChevronLeft size={14} />
                    Anterior
                  </Button>
                  <div className="flex items-center gap-1.5 px-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-sm">
                      {paginaAtual}
                    </span>
                    <span className="text-xs text-muted-foreground">de</span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {totalPaginas}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 px-3 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors disabled:opacity-40"
                    onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
                    disabled={paginaAtual === totalPaginas}
                  >
                    Próximo
                    <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPage;

