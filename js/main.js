/* global data */

var $photoURLInput = document.querySelector('#photoURL');
var $updateImg = document.querySelector('img');
$photoURLInput.addEventListener('input', updateURL);

function updateURL(event) {
  var target = event.target.value;
  $updateImg.setAttribute('src', target);
}

var $form = document.querySelector('form');
$form.addEventListener('submit', submitForm);

function submitForm(event) {
  var entry = {};
  entry.title = $form.elements.title.value;
  entry.photo = $form.elements.photo.value;
  entry.notes = $form.elements.notes.value;
  entry.entryId = data.nextEntryId++;
  event.preventDefault();
  data.entries.push(entry);
  $form.reset();
  $updateImg.setAttribute('src', 'images/placeholder-image-square.jpg');
}
