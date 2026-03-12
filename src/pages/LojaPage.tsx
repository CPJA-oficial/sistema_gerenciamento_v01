import { useState, useMemo } from "react";
import { Plus, Package, Trash2, Search, DollarSign, Calendar, Pencil, Filter, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import Pagination from "@/components/Pagination";
import { mockProducts, categorias, compradores, mockSales, type Product, type Sale } from "@/data/mockData";

const LojaPage = () => {
  const [produtos, setProdutos] = useState<Product[]>(mockProducts);
  const [vendas, setVendas] = useState<Sale[]>(mockSales);
  const [busca, setBusca] = useState("");

  // Registrar Venda state
  const [vendaProduto, setVendaProduto] = useState("");
  const [vendaQtd, setVendaQtd] = useState(2);
  const [vendaComprador, setVendaComprador] = useState("");

  // Histórico de Vendas filters
  const anosDisponiveis = ["2026", "2025", "2024"];
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

  const [filtroAno, setFiltroAno] = useState("2026");
  const [filtroMes, setFiltroMes] = useState("03");
  const [vendasCurrentPage, setVendasCurrentPage] = useState(1);
  const vendasItemsPerPage = 10;

  // Cancelamento state
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [saleToCancel, setSaleToCancel] = useState<Sale | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Cadastrar Produto state
  const [novoProdNome, setNovoProdNome] = useState("");
  const [novoProdCat, setNovoProdCat] = useState("");
  const [novoProdQtd, setNovoProdQtd] = useState("");
  const [novoProdValor, setNovoProdValor] = useState("");

  const produtoSelecionado = produtos.find((p) => p.id.toString() === vendaProduto);
  const valorTotal = produtoSelecionado ? produtoSelecionado.valor * vendaQtd : 0;

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  const vendasFiltradas = useMemo(() => {
    return vendas.filter((venda) => {
      const [_dia, mes, ano] = venda.data.split("/");
      const matchAno = venda.data.includes(filtroAno) || ano === filtroAno;
      const matchMes = filtroMes === "all" || mes === filtroMes;
      return matchAno && matchMes;
    });
  }, [vendas, filtroAno, filtroMes]);

  const totalPagesVendas = Math.ceil(vendasFiltradas.length / vendasItemsPerPage);
  const paginatedVendas = vendasFiltradas.slice(
    (vendasCurrentPage - 1) * vendasItemsPerPage,
    vendasCurrentPage * vendasItemsPerPage
  );

  const handleRegistrarVenda = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Venda registrada com sucesso!");
    setVendaProduto("");
    setVendaQtd(2);
    setVendaComprador("");
  };

  const handleCadastrarProduto = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Produto cadastrado com sucesso!");
    setNovoProdNome("");
    setNovoProdCat("");
    setNovoProdQtd("");
    setNovoProdValor("");
  };

  const handleExcluir = (produto: Product) => {
    if (confirm(`Deseja excluir "${produto.nome}"?`)) {
      setProdutos((prev) => prev.filter((p) => p.id !== produto.id));
      toast.success(`Producto "${produto.nome}" excluído`);
    }
  };

  const openCancelDialog = (sale: Sale) => {
    setSaleToCancel(sale);
    setCancelReason("");
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (!cancelReason.trim()) {
      toast.error("Por favor, informe o motivo do cancelamento.");
      return;
    }

    if (saleToCancel) {
      setVendas((prev) =>
        prev.map((v) =>
          v.id === saleToCancel.id
            ? { ...v, status: "cancelada", motivoCancelamento: cancelReason }
            : v
        )
      );
      toast.success(`Venda ${saleToCancel.id} cancelada com sucesso.`);
      setIsCancelDialogOpen(false);
      setSaleToCancel(null);
      setCancelReason("");
    }
  };

  const formatCurrency = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <PageLayout titulo="Loja da Casa">
      <Tabs defaultValue="venda" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="venda">📊 Registrar Venda</TabsTrigger>
          <TabsTrigger value="cadastro">📦 Cadastrar Produto</TabsTrigger>
          <TabsTrigger value="estoque">📋 Gerenciar Estoque</TabsTrigger>
        </TabsList>

        {/* Registrar Venda */}
        <TabsContent value="venda" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Nova Venda</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegistrarVenda} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Produto</Label>
                  <Select value={vendaProduto} onValueChange={setVendaProduto}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {produtos.map((p) => (
                        <SelectItem key={p.id} value={p.id.toString()}>
                          {p.nome} ({formatCurrency(p.valor)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Input value={produtoSelecionado?.categoria ?? ""} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Quantidade</Label>
                  <Input type="number" min={1} value={vendaQtd} onChange={(e) => setVendaQtd(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Comprador</Label>
                  <Select value={vendaComprador} onValueChange={setVendaComprador}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {compradores.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Valor Total</Label>
                  <Input value={formatCurrency(valorTotal)} readOnly className="bg-muted text-lg font-semibold" />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full">Registrar Venda</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Histórico de Vendas</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vendas registradas no sistema
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="w-[120px]">
                    <Select value={filtroAno} onValueChange={(val) => { setFiltroAno(val); setVendasCurrentPage(1); }}>
                      <SelectTrigger className="h-9">
                        <Calendar className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Ano" />
                      </SelectTrigger>
                      <SelectContent>
                        {anosDisponiveis.map((ano) => (
                          <SelectItem key={ano} value={ano}>{ano}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-[160px]">
                    <Select value={filtroMes} onValueChange={(val) => { setFiltroMes(val); setVendasCurrentPage(1); }}>
                      <SelectTrigger className="h-9">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Mês" />
                      </SelectTrigger>
                      <SelectContent>
                        {meses.map((m) => (
                          <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Data</TableHead>
                      <TableHead>Nº Venda</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Comprador</TableHead>
                      <TableHead className="text-center">Qtd</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-center pr-6">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedVendas.length > 0 ? (
                      paginatedVendas.map((venda) => (
                        <TableRow key={venda.id} className={venda.status === "cancelada" ? "opacity-60 bg-muted/5" : ""}>
                          <TableCell className="pl-6">{venda.data}</TableCell>
                          <TableCell className="font-mono text-xs">{venda.id}</TableCell>
                          <TableCell>
                            {venda.produto}
                            {venda.status === "cancelada" && (
                              <Badge variant="destructive" className="ml-2 text-[10px] py-0 h-4">Cancelada</Badge>
                            )}
                          </TableCell>
                          <TableCell>{venda.comprador}</TableCell>
                          <TableCell className="text-center">{venda.quantidade}</TableCell>
                          <TableCell className="text-right font-semibold">
                            {formatCurrency(venda.valorTotal)}
                          </TableCell>
                          <TableCell className="text-center pr-6">
                            {venda.status !== "cancelada" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => openCancelDialog(venda)}
                                title="Cancelar Venda"
                              >
                                <XCircle size={18} />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                          Nenhuma venda encontrada para este período.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="grid gap-3 p-4 md:hidden">
                {paginatedVendas.length > 0 ? (
                  paginatedVendas.map((venda) => (
                    <Card key={venda.id} className={`shadow-none border border-primary/10 ${venda.status === "cancelada" ? "opacity-60 bg-muted/5" : ""}`}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-muted-foreground">{venda.data}</p>
                            <p className="font-semibold">
                              {venda.produto}
                              {venda.status === "cancelada" && (
                                <Badge variant="destructive" className="ml-2 text-[10px] py-0 h-4 uppercase">Cancelada</Badge>
                              )}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="outline" className="font-mono text-[10px]">
                              {venda.id}
                            </Badge>
                            {venda.status !== "cancelada" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 text-destructive border-destructive/20 hover:bg-destructive/10"
                                onClick={() => openCancelDialog(venda)}
                              >
                                <XCircle size={14} className="mr-1" />
                                Cancelar
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="text-sm">
                            <p><span className="text-muted-foreground">Comprador:</span> {venda.comprador}</p>
                            <p><span className="text-muted-foreground">Qtd:</span> {venda.quantidade}</p>
                          </div>
                          <p className={`font-bold ${venda.status === "cancelada" ? "line-through text-muted-foreground" : "text-primary"}`}>
                            {formatCurrency(venda.valorTotal)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">
                    Nenhuma venda encontrada.
                  </p>
                )}
              </div>

              <Pagination
                currentPage={vendasCurrentPage}
                totalPages={totalPagesVendas}
                onPageChange={setVendasCurrentPage}
                totalItems={vendasFiltradas.length}
                itemsPerPage={vendasItemsPerPage}
                label="vendas"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Modal de Cancelamento */}
        <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cancelar Venda</DialogTitle>
              <DialogDescription>
                Informe o motivo do cancelamento da venda <strong>{saleToCancel?.id}</strong> ({saleToCancel?.produto}).
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Motivo do Cancelamento</Label>
                <Textarea
                  id="reason"
                  placeholder="Descreva aqui o motivo..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleConfirmCancel}>
                Confirmar Cancelamento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cadastrar Produto */}
        <TabsContent value="cadastro">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Novo Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCadastrarProduto} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input placeholder="Ex: Vela 7 dias" value={novoProdNome} onChange={(e) => setNovoProdNome(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={novoProdCat} onValueChange={setNovoProdCat}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {categorias.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantidade Inicial</Label>
                  <Input type="number" placeholder="10" value={novoProdQtd} onChange={(e) => setNovoProdQtd(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Valor Unitário (R$)</Label>
                  <Input type="number" step="0.01" placeholder="5.00" value={novoProdValor} onChange={(e) => setNovoProdValor(e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full">Adicionar Produto</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gerenciar Estoque */}
        <TabsContent value="estoque">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Estoque</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produto..."
                    className="pl-9"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-center">Qtd</TableHead>
                      <TableHead className="text-right">Valor Unit.</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {produtosFiltrados.map((p) => (
                      <TableRow key={p.id} className={p.quantidade < 5 ? "bg-warning/50" : ""}>
                        <TableCell className="font-medium">{p.nome}</TableCell>
                        <TableCell>{p.categoria}</TableCell>
                        <TableCell className="text-center">
                          {p.quantidade}
                          {p.quantidade < 5 && (
                            <Badge variant="outline" className="ml-2 border-accent text-accent text-xs">Baixo</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(p.valor)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => toast.info(`Editar produto: ${p.nome}`)}>
                              <Pencil size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleExcluir(p)}>
                              <Trash2 size={16} className="text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="grid gap-3 md:hidden">
                {produtosFiltrados.map((p) => (
                  <Card key={p.id} className={`shadow-sm ${p.quantidade < 5 ? "border-accent/50 bg-warning/30" : ""}`}>
                    <CardContent className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-semibold">{p.nome}</p>
                        <p className="text-sm text-muted-foreground">{p.categoria}</p>
                        <p className="mt-1 text-sm">
                          Qtd: {p.quantidade} · {formatCurrency(p.valor)}
                          {p.quantidade < 5 && (
                            <Badge variant="outline" className="ml-2 border-accent text-accent text-xs">Baixo</Badge>
                          )}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => toast.info(`Editar produto: ${p.nome}`)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleExcluir(p)}>
                          <Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default LojaPage;

