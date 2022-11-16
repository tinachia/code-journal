/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  window.localStorage.setItem('javascript-local-storage', dataJSON);
}

var allForms = localStorage.getItem('javascript-local-storage');
if (allForms !== null) {
  data = JSON.parse(allForms);
}
