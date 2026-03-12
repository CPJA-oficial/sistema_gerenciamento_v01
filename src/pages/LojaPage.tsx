import { useState } from "react";
import { Plus, Package, Trash2, Search, DollarSign, Calendar, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import { mockProducts, categorias, compradores, type Product } from "@/data/mockData";

const LojaPage = () => {
  const [produtos, setProdutos] = useState<Product[]>(mockProducts);
  const [busca, setBusca] = useState("");

  // Registrar Venda state
  const [vendaProduto, setVendaProduto] = useState("");
  const [vendaQtd, setVendaQtd] = useState(2);
  const [vendaComprador, setVendaComprador] = useState("");

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
      toast.success(`Produto "${produto.nome}" excluído`);
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
        <TabsContent value="venda">
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
        </TabsContent>

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
