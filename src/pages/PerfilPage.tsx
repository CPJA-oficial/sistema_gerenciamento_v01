import { useParams } from "react-router-dom";
import { Calendar, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import TopBar from "@/components/TopBar";
import { mockUsers } from "@/data/mockData";

const PerfilPage = () => {
  const { tipo } = useParams();
  const user = tipo === "novo" ? mockUsers[1] : mockUsers[0];

  return (
    <div className="min-h-screen bg-background">
      <TopBar titulo="Meu Perfil" />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Info do usuário */}
        <div className="mb-8 grid gap-6 md:grid-cols-[auto_1fr]">
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
          <Card className="shadow-sm">
            <CardContent className="grid gap-3 pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Nome</p>
                <p className="text-lg font-semibold">{user.nome}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{user.telefone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div>
                <Badge variant="secondary" className="mt-1">
                  <Calendar size={14} className="mr-1" />
                  Membro desde {user.dataCadastro}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Histórico */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Minha Caminhada</h2>
            <Button
              size="sm"
              onClick={() => toast.info("Abrir formulário de novo trabalho")}
            >
              <Plus size={16} className="mr-1" />
              Adicionar Trabalho
            </Button>
          </div>

          {user.historico.length === 0 ? (
            <Card className="shadow-sm">
              <CardContent className="py-8 text-center text-muted-foreground">
                Nenhum trabalho registrado ainda. Comece sua caminhada!
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {user.historico.map((item, i) => (
                <Card key={i} className="animate-fade-in shadow-sm transition-shadow hover:shadow-md" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      {item.data}
                    </div>
                    <CardTitle className="text-base">{item.trabalho}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PerfilPage;
