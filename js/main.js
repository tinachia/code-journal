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

function newEntry(entry) {
  var $list = document.createElement('li');
  $list.setAttribute('class', 'row');

  var $divColHalf1 = document.createElement('div');
  $divColHalf1.setAttribute('class', 'column-half');

  $list.appendChild($divColHalf1);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photo);
  $img.setAttribute('alt', 'placeholder');

  $divColHalf1.appendChild($img);
  // $divColHalf1.appendChild($img);

  var $divColHalf2 = document.createElement('div');
  $divColHalf2.setAttribute('class', 'column-half');

  $list.appendChild($divColHalf2);

  var $title = document.createElement('h2');
  $title.setAttribute('class', 'entry-title');

  $title.textContent = entry.title;

  $divColHalf2.appendChild($title);

  var $note = document.createElement('p');
  $note.setAttribute('class', 'entry-note');

  $note.textContent = entry.notes;

  $divColHalf2.appendChild($note);

  return $list;
}

var $ul = document.querySelector('#entry-list');
window.addEventListener('DOMContentLoaded', loop);

function loop(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(newEntry(data.entries[i]));
  }
}
