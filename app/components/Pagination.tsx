import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationUIProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationUI = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationUIProps) => {
  const handlePrevious = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (
    page: number,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    onPageChange(page);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrevious} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(event) => handlePageClick(1, event)}
            className={currentPage === 1 ? "bg-slate-200" : ""}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(event) => handlePageClick(2, event)}
            className={currentPage === 2 ? "bg-slate-200" : ""}
          >
            2
          </PaginationLink>
        </PaginationItem>
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(event) => handlePageClick(currentPage, event)}
              className="bg-slate-200"
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationUI;
