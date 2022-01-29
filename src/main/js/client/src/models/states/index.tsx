export type SortConfigKey =
  | 'title'
  | 'lastChapterRead'
  | 'rating'
  | 'lastReadDate'
  | 'daysToWait';

export type SortConfigOrder = 'asc' | 'desc';

export type FilterConfigStatus =
  | 'reading'
  | 'dropped'
  | 'axed'
  | 'planned'
  | 'completed'
  | 'all';

export type Source = 'cn' | 'kr' | 'jp' | '';

export type FilterConfigSource = Set<Source>;

export interface SortConfig {
  order: SortConfigOrder;
  key: SortConfigKey;
}

export interface FilterConfig {
  status: FilterConfigStatus;
  source: FilterConfigSource;
}

export type SortFilterConfig = SortConfig & FilterConfig;

export interface Book {
  id: number;
  title: string;
  language: Source;
  cover: string | null;
  lastChapterRead: string | null;
  rating: number;
  lastReadDate: string | null;
  daysToWait: number;
  comments: string | null;
  status: string | null;
}

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  checking: boolean;
  error: string | null;
  username: string | null;
}

export interface BookState {
  showCreateModal: boolean;
  showDeleteModal: boolean;
  creating: boolean;
  createError: string | null;
  fetchingAll: boolean;
  fetchAllError: string | null;
  deleting: boolean;
  deleteError: string | null;
  books: Book[];
  formState: Book;
  showEditModal: boolean;
  editError: string | null;
  editing: boolean;
  sortFilterConfig: SortFilterConfig;
}

export type mListStates = AuthState | BookState | Book;

/**
 * State for rootReducer.
 */
export interface RootState {
  auth: AuthState;
  book: BookState;
  context: Book;
}
