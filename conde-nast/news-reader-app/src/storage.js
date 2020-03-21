// Local storage is used in this app to persist recent queries

export function dedupeArray(array = []) {
  const set = new Set(array);
  return Array.from(set);
}

export function getRecentQueries() {
  const currentRecentQueriesString = localStorage.getItem("recentQueries");

  if (!currentRecentQueriesString) {
    return [];
  }

  return JSON.parse(currentRecentQueriesString).reverse();
}

export function setRecentQueries(queries = []) {
  const newQueries = dedupeArray(getRecentQueries().concat(queries));
  console.log(newQueries);
  window.localStorage.setItem("recentQueries", JSON.stringify(newQueries));
  return newQueries;
}
