import { useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Plus, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import Pagination from "@/components/Pagination";
import { mockUsers, mockSales } from "@/data/mockData";

const PerfilPage = () => {
  const { tipo } = useParams();
  const user = tipo === "novo" ? mockUsers[1] : mockUsers[0];

  // Pagination and Filter states
  const [paginaCaminhada, setPaginaCaminhada] = useState(1);
  const [filtroAno, setFiltroAno] = useState("all");
  const [paginaGastos, setPaginaGastos] = useState(1);
  const itensPorPagina = 10;

  // Formatting
  const formatCurrency = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Filter "Minha Caminhada"
  const historicoFiltrado = user.historico.filter((item) => {
    if (filtroAno === "all") return true;
    return item.data.endsWith(filtroAno);
  });

  // Pagination "Minha Caminhada"
  const totalPaginasCaminhada = Math.ceil(historicoFiltrado.length / itensPorPagina);
  const inicioCaminhada = (paginaCaminhada - 1) * itensPorPagina;
  const fimCaminhada = inicioCaminhada + itensPorPagina;
  const historicoPaginado = historicoFiltrado.slice(inicioCaminhada, fimCaminhada);

  // Filter "Meus Gastos"
  const gastosUsuario = mockSales.filter((venda) => venda.comprador === user.nome);
  const totalGastos = gastosUsuario.reduce((acc, current) => acc + current.valorTotal, 0);

  // Pagination "Meus Gastos"
  const totalPaginasGastos = Math.ceil(gastosUsuario.length / itensPorPagina);
  const inicioGastos = (paginaGastos - 1) * itensPorPagina;
  const fimGastos = inicioGastos + itensPorPagina;
  const gastosPaginados = gastosUsuario.slice(inicioGastos, fimGastos);

  // Dynamic years for filter
  const anos = ["all", ...new Set(user.historico.map(item => item.data.split("/")[2]))].sort((a, b) => b.localeCompare(a));

  return (
    <PageLayout titulo="Meu Perfil" maxWidth="4xl">
      <div className="space-y-8">
        {/* Info do usuário */}
        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          {/* Foto */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-lg">
              <AvatarImage src={user.foto} alt={user.nome} />
              <AvatarFallback className="text-2xl">{user.nome.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Upload de foto simulado")}
            >
              Alterar Foto
            </Button>
          </div>

          {/* Dados */}
          <Card className="shadow-sm border-primary/10">
            <CardContent className="grid gap-3 pt-6">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Nome Completo</p>
                <p className="text-lg font-bold text-primary">{user.nome}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">WhatsApp / Telefone</p>
                  <p className="font-medium">{user.telefone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">E-mail</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                  <Calendar size={14} className="mr-1.5" />
                  Membro desde {user.dataCadastro}
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                   {user.status || "Ativo"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Minha Caminhada */}
        <Card className="shadow-sm border-primary/10 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              Minha Caminhada
            </CardTitle>
            <div className="flex items-center gap-3">
              <Select value={filtroAno} onValueChange={(val) => {
                setFiltroAno(val);
                setPaginaCaminhada(1);
              }}>
                <SelectTrigger className="w-[120px] h-9 bg-background border-primary/20">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  {anos.map((ano) => (
                    <SelectItem key={ano} value={ano}>
                      {ano === "all" ? "Todos os anos" : ano}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                className="h-9 gap-1.5"
                onClick={() => toast.info("Abrir formulário de novo trabalho")}
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Adicionar Trabalho</span>
                <span className="sm:hidden">Adicionar</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto min-h-[300px]">
              <Table>
                <TableHeader className="bg-muted/20">
                  <TableRow>
                    <TableHead className="pl-6 w-[120px]">Data</TableHead>
                    <TableHead>Trabalho</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicoPaginado.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                        Nenhum registro encontrado para este período.
                      </TableCell>
                    </TableRow>
                  ) : (
                    historicoPaginado.map((item, i) => (
                      <TableRow key={i} className="hover:bg-muted/5 transition-colors">
                        <TableCell className="pl-6 font-medium text-muted-foreground">{item.data}</TableCell>
                        <TableCell className="font-semibold">{item.trabalho}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{item.descricao}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination
              currentPage={paginaCaminhada}
              totalPages={totalPaginasCaminhada}
              onPageChange={setPaginaCaminhada}
              totalItems={historicoFiltrado.length}
              itemsPerPage={itensPorPagina}
              label="registros"
            />
          </CardContent>
        </Card>

        {/* Meus Gastos */}
        <Card className="shadow-sm border-primary/10 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign size={20} className="text-primary" />
              Meus Gastos na Casa
            </CardTitle>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Acumulado</span>
              <span className="text-lg font-bold text-primary">{formatCurrency(totalGastos)}</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto min-h-[300px]">
              <Table>
                <TableHeader className="bg-muted/20">
                  <TableRow>
                    <TableHead className="pl-6">Produto</TableHead>
                    <TableHead className="text-center">Qtd</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right pr-6">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gastosPaginados.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                        Nenhum gasto registrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    gastosPaginados.map((gasto) => (
                      <TableRow key={gasto.id} className="hover:bg-muted/5 transition-colors">
                        <TableCell className="pl-6 font-medium">{gasto.produto}</TableCell>
                        <TableCell className="text-center">{gasto.quantidade}</TableCell>
                        <TableCell className="text-right font-bold text-primary">{formatCurrency(gasto.valorTotal)}</TableCell>
                        <TableCell className="text-right pr-6 text-muted-foreground text-sm">{gasto.data}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination
              currentPage={paginaGastos}
              totalPages={totalPaginasGastos}
              onPageChange={setPaginaGastos}
              totalItems={gastosUsuario.length}
              itemsPerPage={itensPorPagina}
              label="gastos"
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PerfilPage;

