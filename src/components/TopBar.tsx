import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, ShoppingBag, Shield } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";

interface TopBarProps {
  titulo: string;
}

const TopBar = ({ titulo }: TopBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso (simulado)");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <span className="hidden text-lg font-heading font-bold text-primary sm:inline">Casa do Pai José</span>
        </Link>
        <h1 className="hidden text-lg font-heading font-semibold sm:block">{titulo}</h1>
        <nav className="flex items-center gap-1">
          <Link
            to="/perfil"
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/perfil")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <User size={18} />
            <span className="hidden sm:inline">Perfil</span>
          </Link>
          <Link
            to="/loja"
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/loja")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Loja</span>
          </Link>
          <Link
            to="/admin"
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/admin")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Shield size={18} />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default TopBar;
