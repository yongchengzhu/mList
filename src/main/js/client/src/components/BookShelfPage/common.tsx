import moment from 'moment';

// Column Indices
export const TITLE          = 0;
export const LAST_READ      = 1;
export const RATING         = 2;
export const READ_SINCE     = 3;
export const DAYS_LEFT      = 4;
export const STATUS         = 5;
export const LANGUAGE       = 6;
export const ID             = 7;
export const COVER_IMAGE    = 8;
export const LAST_READ_DATE = 9;
export const DAYS_TO_WAIT   = 10;

export const getFormattedLastReadDate = (lastReadDate: string | null) => {
  return moment(lastReadDate).utc().format("MM/DD/YYYY");
};

export const getDaysLeft = (lastReadDate: string | null, daysToWait: number) => {
  return moment(lastReadDate).utc()
    .add(daysToWait, 'days').utc()
    .diff(moment(lastReadDate).utc(), 'days');
}

const getLanguages = (query: URLSearchParams) => {
  const result: Set<string> = new Set();
  query.forEach((v: string, k: string) => {
    if (k === 'language') {
      result.add(v);
    }
  });
  return result;
}

// copy-pasta from w3school ('ω^＼)
export const filterTable = (query: URLSearchParams) => {
  let filter, table, tr, status, lang, langValue, i, txtValue;
  const languages = getLanguages(query);
  filter = query.get('status');
  if (!filter) 
    filter = 'reading';
  
  filter = filter.toString().toUpperCase();
  table = document.getElementById("book-table");
  if (!table) return;
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    status = tr[i].getElementsByTagName("td")[5];
    lang = tr[i].getElementsByTagName("td")[6];
    if (status) {
      txtValue = status.textContent || status.innerText;
      langValue = lang.textContent || lang.innerHTML;
      if ((filter === 'ALL' || txtValue.toUpperCase() === filter) 
        && (!languages.size || languages.has(langValue))) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}