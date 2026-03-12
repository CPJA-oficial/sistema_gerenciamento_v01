import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  label?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  label = "itens",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const inicio = (currentPage - 1) * itemsPerPage;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-muted/10 border-t border-primary/10">
      <p className="text-xs text-muted-foreground">
        {totalItems !== undefined && (
          <>
            Mostrando <span className="font-bold text-foreground">{totalItems > 0 ? inicio + 1 : 0}</span> a <span className="font-bold text-foreground">{Math.min(inicio + itemsPerPage, totalItems)}</span> de <span className="font-bold text-foreground">{totalItems}</span> {label}
          </>
        )}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 px-3 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors disabled:opacity-40"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={14} />
          Anterior
        </Button>
        <div className="flex items-center gap-1.5 px-3">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-sm">
            {currentPage}
          </span>
          <span className="text-xs text-muted-foreground">de</span>
          <span className="text-xs font-medium text-muted-foreground">
            {totalPages}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 px-3 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors disabled:opacity-40"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Próximo
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
