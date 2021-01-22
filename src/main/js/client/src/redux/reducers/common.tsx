import { Book, SortFilterConfig } from '../../models/states';

export const initialBookState: Book = {
  id: -1,
  title: '',
  language: 'cn',
  cover: null,
  lastChapterRead: null,
  rating: 0,
  lastReadDate: null,
  daysToWait: 0,
  comments: null,
  status: 'reading',
};

export const initalSortFilterConfigState: SortFilterConfig = {
  order: 'asc', 
  key: 'daysToWait', 
  status: 'reading', 
  source: new Set()
};