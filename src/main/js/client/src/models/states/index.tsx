export interface Book {
  id: number;
  title: string;
  author: string | null;
  cover: string | null;
  lastChapterRead: string | null;
  rating: number;
  lastReadDate: string | null;
  nextReadDate: string | null;
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
  creating: boolean;
  createError: string | null;
  fetchingAll: boolean;
  fetchAllError: string | null;
  books: Book[];
}

export type mListStates = AuthState | BookState;

/**
 * State for rootReducer.
 */
export interface RootState {
  auth: AuthState;
  book: BookState;
}
