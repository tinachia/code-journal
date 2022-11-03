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
  data.entries.unshift(entry);
  $form.reset();
  $updateImg.setAttribute('src', 'images/placeholder-image-square.jpg');
}

// DOM Tree

function newEntries(entries) {
  var $list = document.createElement('li');
  $list.setAttribute('class', 'column-full');

  var $divRow = document.createElement('div');
  $divRow.setAttribute('div', 'row');

  $list.appendChild($divRow);

  var $divColHalf1 = document.createElement('div');
  $divColHalf1.setAttribute('class', 'column-half');

  $divRow.appendChild($divColHalf1);

  var $img = document.createElement('img');
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $img.setAttribute('alt', 'placeholder');

  $divColHalf1.appendChild($img);
  $divColHalf1.appendChild($img);

  var $divColHalf2 = document.createElement('div');
  $divColHalf2.setAttribute('class', 'column-half');

  $divRow.appendChild($divColHalf2);

  var $title = document.createElement('h2');
  $title.setAttribute('class', 'entry-title');

  $divColHalf2.appendChild($title);

  var $note = document.createElement('p');
  $note.setAttribute('class', 'entry-note');

  $divColHalf2.appendChild($note);

  return $list;
}

var addDOMTree = document.querySelector('ul');
window.addEventListener('DOMContentLoad', loop);

function loop(event) {
  for (var i = 0; i < data.entries.length; i++) {
    addDOMTree.appendChild(newEntries(data.entries[i]));
  }
}
