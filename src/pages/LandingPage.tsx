import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("membro@casa.com");
  const [loginSenha, setLoginSenha] = useState("******");
  const [cadNome, setCadNome] = useState("");
  const [cadEmail, setCadEmail] = useState("");
  const [cadSenha, setCadSenha] = useState("");
  const [cadConfirm, setCadConfirm] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login realizado com sucesso! (simulação)");
    navigate("/perfil");
  };

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cadastro realizado! Bem-vindo à Casa!");
    navigate("/perfil/novo");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 pb-8 pt-16 md:pt-24">
        <img src={logo} alt="Logo Casa do Pai José de Aruanda" className="h-40 w-40 object-contain md:h-52 md:w-52" />
        <h1 className="mt-4 text-center text-3xl font-bold md:text-4xl">Casa do Pai José de Aruanda</h1>
        <p className="mt-2 text-center text-muted-foreground">Sistema de Administração</p>
      </section>

      {/* Cards */}
      <section className="container mx-auto grid max-w-4xl gap-6 px-4 pb-16 md:grid-cols-2">
        {/* Login */}
        <Card className="animate-fade-in shadow-md transition-shadow hover:shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <LogIn className="text-primary" size={22} />
            </div>
            <CardTitle>Entrar na Casa</CardTitle>
            <CardDescription>Acesse sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">E-mail</Label>
                <Input id="login-email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-senha">Senha</Label>
                <Input id="login-senha" type="password" value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">Acessar</Button>
              <button
                type="button"
                className="w-full text-center text-sm text-muted-foreground hover:underline"
                onClick={() => toast.info("Função em desenvolvimento")}
              >
                Esqueci minha senha
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Cadastro */}
        <Card className="animate-fade-in shadow-md transition-shadow hover:shadow-lg" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/30">
              <UserPlus className="text-secondary-foreground" size={22} />
            </div>
            <CardTitle>Fazer Parte</CardTitle>
            <CardDescription>Cadastre-se para se conectar com a comunidade</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCadastro} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cad-nome">Nome Completo</Label>
                <Input id="cad-nome" placeholder="João Silva" value={cadNome} onChange={(e) => setCadNome(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cad-email">E-mail</Label>
                <Input id="cad-email" type="email" placeholder="joao@email.com" value={cadEmail} onChange={(e) => setCadEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cad-senha">Senha</Label>
                <Input id="cad-senha" type="password" placeholder="********" value={cadSenha} onChange={(e) => setCadSenha(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cad-confirm">Confirmar Senha</Label>
                <Input id="cad-confirm" type="password" placeholder="********" value={cadConfirm} onChange={(e) => setCadConfirm(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">Registrar</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-6 text-center text-sm text-muted-foreground">
        Casa do Pai José de Aruanda © 2026
      </footer>
    </div>
  );
};

export default LandingPage;
