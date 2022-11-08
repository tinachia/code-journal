// // /* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var allForms = localStorage.getItem('javascript-local-storage');
if (allForms !== null) {
  data = JSON.parse(allForms);
}

window.addEventListener('beforeunload', windowRefresh);
function windowRefresh(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
