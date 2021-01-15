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