export type SortConfigKey = 'title' | 'lastChapterRead' | 'rating' | 'lastReadDate' | 'daysToWait' | null;

export type SortConfigOrder = 'asc' | 'desc' | null;

export interface SortConfig {
  order: SortConfigOrder; 
  key: SortConfigKey;
}

export interface Book {
  id: number;
  title: string;
  language: string;
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
  sortConfig: SortConfig;
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
