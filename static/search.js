window.addEventListener("DOMContentLoaded", () => {
  if (typeof PagefindUI === "undefined") return;
  new PagefindUI({
    element: "#search",
    showSubResults: true,
    translations: {
      placeholder: "Dokus durchsuchen",
      zero_results: "Keine Treffer für [SEARCH_TERM]",
      clear_search: "Löschen",
    },
  });
});
