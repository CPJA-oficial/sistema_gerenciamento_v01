import { useState } from "react";
import { Users, DollarSign, Eye, EyeOff } from "lucide-react";
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
import TopBar from "@/components/TopBar";
import { mockUsers, mockProducts } from "@/data/mockData";

const AdminPage = () => {
  const [mostrarVendas, setMostrarVendas] = useState(false);

  const totalUsuarios = mockUsers.length;
  const usuariosAtivos = mockUsers.filter((u) => u.status === "Ativo").length;
  const usuariosInativos = mockUsers.filter((u) => u.status === "Inativo").length;

  // Simulated monthly sales total
  const vendasDoMes = 1_845.5;

  const formatCurrency = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="min-h-screen bg-background">
      <TopBar titulo="Administração" />

      <main className="container mx-auto max-w-5xl px-4 py-8 space-y-8">
        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Usuários */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Usuários
              </CardTitle>
              <Users size={18} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalUsuarios}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">{usuariosAtivos} ativos</span>
                {" · "}
                <span className="text-red-400 font-medium">{usuariosInativos} inativos</span>
              </p>
            </CardContent>
          </Card>

          {/* Vendas do mês */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Vendas do mês
              </CardTitle>
              <DollarSign size={18} className="text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <p className="text-3xl font-bold">
                {mostrarVendas ? formatCurrency(vendasDoMes) : "R$ ••••••"}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setMostrarVendas(!mostrarVendas)}
              >
                {mostrarVendas ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </CardContent>
          </Card>

          {/* Produtos em estoque */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Produtos em estoque
              </CardTitle>
              <span className="text-lg">📦</span>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockProducts.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {mockProducts.filter((p) => p.quantidade < 5).length} com estoque baixo
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Usuários */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Usuários Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Membro desde</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.foto} alt={user.nome} />
                            <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.telefone}</TableCell>
                      <TableCell>{user.dataCadastro}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={user.status === "Ativo" ? "default" : "secondary"}
                          className={
                            user.status === "Ativo"
                              ? "bg-green-500/15 text-green-600 hover:bg-green-500/25"
                              : "bg-red-500/15 text-red-500 hover:bg-red-500/25"
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

            {/* Mobile Cards */}
            <div className="grid gap-3 md:hidden">
              {mockUsers.map((user) => (
                <Card key={user.id} className="shadow-sm">
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.foto} alt={user.nome} />
                        <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.nome}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">Desde {user.dataCadastro}</p>
                      </div>
                    </div>
                    <Badge
                      variant={user.status === "Ativo" ? "default" : "secondary"}
                      className={
                        user.status === "Ativo"
                          ? "bg-green-500/15 text-green-600 hover:bg-green-500/25"
                          : "bg-red-500/15 text-red-500 hover:bg-red-500/25"
                      }
                    >
                      {user.status ?? "Ativo"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPage;
