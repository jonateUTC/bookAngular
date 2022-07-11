export interface Bookregister {
  name?: string | null;
  position?: number | null;
  description?: string | null;
  autor?: string | null;
  date?: Date | null;
  number?: number | null;
  price?: number | null;
}
export interface Booklinks {
  first?: string,
  previous?: string,
  next?: string,
  last?: string
}
export interface Bookmeta {
  currentPage?: number,
  itemCount?: number,
  itemsPerPage?: number,
  totalItems?: number,
  totalPages?: number
}
