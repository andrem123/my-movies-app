'use client';

interface PaginationProps {
  page: number;
  totalPages: number;
  path: string;
}

const Pagination = ({ page, totalPages, path }: PaginationProps) => {
  const prev = page > 1 ? `${path}?page=${page - 1}` : null;
  const next = page < totalPages ? `${path}?page=${page + 1}` : null;

  return (
    <div className="flex justify-center gap-4 my-6">
      {prev && (
        <a className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300" href={prev}>
          ← Prev
        </a>
      )}
      <span className="self-center text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>
      {next && (
        <a className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300" href={next}>
          Next →
        </a>
      )}
    </div>
  );
};

export default Pagination;