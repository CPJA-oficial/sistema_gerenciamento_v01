import { useState } from "react";
import { Users, DollarSign, Eye, EyeOff, Calendar, UserCog, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { mockUsers, mockProducts, mockSales, type User, type UserRole } from "@/data/mockData";

const UserEditModal = ({ 
  user, 
  open, 
  onOpenChange,
  onSave 
}: { 
  user: User | null; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onSave: (userId: number, updates: Partial<User>) => void;
}) => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [status, setStatus] = useState<"Ativo" | "Inativo">("Ativo");
  const [paginaDividas, setPaginaDividas] = useState(1);
  const itensPorPaginaDivida = 3;

  // Sync state when user changes
  useState(() => {
    if (user) {
      setRoles(user.roles);
      setStatus(user.status || "Ativo");
    }
  });

  // Since we can't use useEffect easily with nested components without more restructuring,
  // let's use a simpler approach or a key on the dialog to reset internal state.

  const handleToggleRole = (role: UserRole) => {
    setRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role) 
        : [...prev, role]
    );
  };

  const handleSave = () => {
    if (user) {
      onSave(user.id, { roles, status });
      onOpenChange(false);
    }
  };

  if (!user) return null;

  const cumulativeRoles: UserRole[] = ["Loja", "Lanchonete", "Ogan"];
  const baseRoles: UserRole[] = ["Filho", "Admin", "Pai", "Mãe"];

  const isRestrictedRole = roles.some(r => ["Admin", "Pai", "Mãe"].includes(r));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-primary/20 bg-background/95 backdrop-blur-sm p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <UserCog className="text-primary" size={20} />
            Atribuições a Usuários
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4 px-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {/* User Info Header */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-primary/5">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={user.foto} />
              <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="font-bold text-lg leading-none">{user.nome}</h4>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex gap-4 mt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Telefone</span>
                  <span className="text-xs font-mono">{user.telefone}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Cadastro</span>
                  <span className="text-xs">{user.dataCadastro}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Status da Conta</Label>
              <div className="flex items-center justify-between p-3 rounded-md border border-primary/10 bg-muted/20">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">
                    Usuário {status === "Ativo" ? "Ativo" : "Inativo"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Define se o usuário pode acessar o sistema
                  </span>
                </div>
                <Switch 
                  checked={status === "Ativo"} 
                  onCheckedChange={(checked) => setStatus(checked ? "Ativo" : "Inativo")}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Função Principal</Label>
              <div className="grid grid-cols-2 gap-2">
                {baseRoles.map((role) => (
                  <Button
                    key={role}
                    type="button"
                    variant={roles.includes(role) ? "default" : "outline"}
                    className={`h-9 text-xs justify-start px-3 ${roles.includes(role) ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-primary/5 hover:text-primary transition-colors"}`}
                    onClick={() => {
                      const isNewRestricted = ["Admin", "Pai", "Mãe"].includes(role);
                      setRoles(prev => {
                        const others = prev.filter(r => !baseRoles.includes(r));
                        // If choosing Admin/Pai/Mãe, clear cumulative roles
                        if (isNewRestricted) {
                          return [role];
                        }
                        return [...others, role];
                      });
                    }}
                  >
                    {roles.includes(role) && <Check size={14} className="mr-2" />}
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            {!isRestrictedRole && (
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Funções Acumulativas</Label>
                <div className="space-y-2">
                  {cumulativeRoles.map((role) => (
                    <div 
                      key={role} 
                      className="flex items-center justify-between p-3 rounded-md border border-primary/10 hover:border-primary/30 transition-all cursor-pointer group"
                      onClick={() => handleToggleRole(role)}
                    >
                      <Label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox 
                          checked={roles.includes(role)} 
                          onCheckedChange={() => handleToggleRole(role)}
                        />
                        <span className="text-sm font-medium group-hover:text-primary transition-colors uppercase tracking-tight">{role}</span>
                      </Label>
                      <Badge variant="outline" className="text-[10px] font-normal border-primary/20">Opcional</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isRestrictedRole && (
              <div className="p-4 rounded-md border border-primary/10 bg-primary/5">
                <p className="text-xs text-muted-foreground text-center italic">
                  As funções Admin, Pai e Mãe já possuem acesso total e não permitem funções acumulativas.
                </p>
              </div>
            )}

            {/* User Debts Section */}
            <div className="space-y-3 pt-2 border-t border-primary/10">
              <Label className="text-sm font-semibold flex items-center justify-between">
                Dívidas do Usuário
                <Badge variant="outline" className="text-[10px] bg-red-500/5 text-red-500 border-red-500/10">
                  Total: {formatCurrency(user.dividas.reduce((acc, d) => acc + d.valor, 0))}
                </Badge>
              </Label>
              
              <div className="rounded-md border border-primary/10 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/10 h-8">
                    <TableRow>
                      <TableHead className="text-[10px] uppercase font-bold h-8">Descrição</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold h-8 text-right">Valor</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold h-8 text-right pr-4">Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.dividas.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4 text-xs text-muted-foreground">
                          Nenhuma dívida encontrada.
                        </TableCell>
                      </TableRow>
                    ) : (
                      user.dividas
                        .slice((paginaDividas - 1) * itensPorPaginaDivida, paginaDividas * itensPorPaginaDivida)
                        .map((divida) => (
                          <TableRow key={divida.id} className="h-10 text-xs">
                            <TableCell className="py-2">{divida.descricao}</TableCell>
                            <TableCell className="py-2 text-right font-medium">{formatCurrency(divida.valor)}</TableCell>
                            <TableCell className="py-2 text-right text-muted-foreground pr-4">{divida.data}</TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {user.dividas.length > itensPorPaginaDivida && (
                <Pagination
                  currentPage={paginaDividas}
                  totalPages={Math.ceil(user.dividas.length / itensPorPaginaDivida)}
                  onPageChange={setPaginaDividas}
                  totalItems={user.dividas.length}
                  itemsPerPage={itensPorPaginaDivida}
                  label="dívidas"
                />
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 p-6 pt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const AdminPage = () => {
  const [mostrarVendas, setMostrarVendas] = useState(false);
  const [filtroMes, setFiltroMes] = useState("all");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const itensPorPagina = 10;

  // Em um sistema real, isso viria de um contexto de autenticação
  // Para fins de demonstração, vamos definir o usuário logado aqui.
  // Você pode trocar para "Pai", "Mãe", "Loja", etc. para testar as restrições.
  const currentUserRole: string = "Admin"; 

  const totalUsuarios = users.length;
  const usuariosAtivos = users.filter((u) => u.status === "Ativo").length;
  const usuariosInativos = users.filter((u) => u.status === "Inativo").length;

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (userId: number, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    // In a real app, you'd call an API here
  };

  // Simulated monthly sales total
  const vendasDoMes = 1_845.5;

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
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right pr-6">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/10 transition-colors group">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-primary/10">
                            <AvatarImage src={user.foto} alt={user.nome} />
                            <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{user.nome}</span>
                            <span className="text-[10px] text-muted-foreground sm:hidden">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs hidden sm:table-cell">{user.email}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-[10px]">{user.telefone}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">{user.dataCadastro}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.roles.map((role) => (
                            <Badge key={role} variant="outline" className="text-[9px] uppercase font-bold py-0 h-5 border-primary/20 bg-primary/5 text-primary">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={user.status === "Ativo" ? "default" : "secondary"}
                          className={
                            user.status === "Ativo"
                              ? "bg-green-500/10 text-green-600 border-green-500/20 shadow-none text-[10px]"
                              : "bg-red-500/10 text-red-500 border-red-500/20 shadow-none text-[10px]"
                          }
                        >
                          {user.status ?? "Ativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={currentUserRole === "Pai" || currentUserRole === "Mãe"}
                          onClick={() => handleEditUser(user)}
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <UserCog size={16} />
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

      <UserEditModal 
        key={selectedUser?.id}
        user={selectedUser} 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen}
        onSave={handleSaveUser}
      />
    </PageLayout>
  );
};

export default AdminPage;


