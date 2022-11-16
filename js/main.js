/* global data */
// variable definitions
var $image = document.querySelector('.image');
var $photoURL = document.querySelector('.photo-url');
var $journalEntry = document.querySelector('form');
var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');

// viewswapping
var $form = document.querySelector('.entries');
var $entriesLink = document.querySelector('.entries-link');
var $entries = document.querySelector('.new-entries');
var $new = document.querySelector('.new');
var $save = document.querySelector('.save');
// edit
var $h2Edit = document.querySelector('.edit');
var $h2New = document.querySelector('.new-entry');
// delete
var $delete = document.querySelector('.delete');
var $modal = document.querySelector('.modal');
var $cancel = document.querySelector('.cancel');
var $confirm = document.querySelector('.confirm');

// Event listeners
$photoURL.addEventListener('input', updateImage);
$journalEntry.addEventListener('submit', newEntry);
// click target for editing
$save.addEventListener('click', entriesView);
$entriesLink.addEventListener('click', entriesView);
$new.addEventListener('click', formView);
// click target for delete
$delete.addEventListener('click', formView);
$cancel.addEventListener('click', handleDelete);
$confirm.addEventListener('click', handleDelete);

// function definitons
//
function updateImage(event) {
  $image.src = event.target.value;
}

function newEntry(event) {
  event.preventDefault();
  var $title = document.querySelector('.title');
  var $notes = document.querySelector('.notes');
  var newObject = {
    title: $title.value,
    image: $photoURL.value,
    notes: $notes.value,
    id: data.nextEntryId
  };
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(newObject);
    $image.src = '/images/placeholder-image-square.jpg';
    $journalEntry.reset();
    prepend();
  } else {
    var $li = document.querySelectorAll('[data-entry-id]');
    for (var i = 0; i < $li.length; i++) {
      if (data.editing === data.entries[i]) {
        data.entries[i].title = $title.value;
        data.entries[i].image = $photoURL.value;
        data.entries[i].notes = $notes.value;
        // update function to add new DOM Tree or replace exisiting one
        var update = renderEntry(data.entries[i]);
        $li[i].replaceWith(update);
      }
    }
    if (data.view === 'entries') {
      $form.className = 'container new-entries';
      $entries.className = 'container entries hidden';
    }
  }
}

// DOM Tree

function renderEntry(entry) {
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

  var $icon = document.createElement('i');
  $icon.className = 'fa-solid fa-pencil';
  $title.appendChild($icon);

  return $list;
}

var $entryList = document.querySelector('ul');

function renderEvent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
  if (data.view === 'entry-form') {
    data.view = 'entry-form';
    $entries.className = 'container entries';
    $form.className = 'container new-entries hidden';
  } else if (data.view === 'entries') {
    data.view = 'entries';
    $form.className = 'container new-entries';
    $entries.className = 'container entries hidden';
  }
}

document.addEventListener('DOMContentLoaded', renderEvent);

function prepend(event) {
  $entryList.prepend(renderEntry(data.entries[0]));
  $form.className = 'container new-entries';
  $entries.className = 'container entries hidden';
}

function entriesView(event) {
  if (event.target.matches('.entries-link') || event.target.matches('.form')) {
    $form.className = 'container new entries';
    $entries.className = 'container entries hidden';
  }
  data.view = 'entries';
}

function formView(event) {
  if (event.target.matches('.new')) {
    $entries.className = 'container entries';
    $form.className = 'container new-entries hidden';
    $delete.className = 'delete hidden';
    $h2Edit.className = 'edit hidden';
    $h2New.className = 'new-entry';
    // click on new clear all form entries
    $journalEntry.reset();
    $image.scr = '/images/placeholder-image-square.jpg';
    data.editing = null;
  } else if (event.target.matches('i')) {
    $entries.className = 'container entries';
    $form.className = 'container new-entries hidden';
    $h2Edit.className = 'edit';
    $h2New.className = 'new-entry';
    // show delete entry modal
  } else if (event.target.matches('.delete')) {
    $entries.className = 'container entries';
    $form.className = 'container new-entries hidden';
    $delete.className = 'delete';
    $modal.className = 'modal';
  }
  data.view = 'entry-form';
}

function handleDelete(event) {
  $h2Edit.className = 'edit ';
  $h2New.className = 'new-entry hidden';
  if (event.target.matches('.cancel')) {
    $delete.className = 'delete';
    $modal.className = 'modal hidden';
  } else if (event.target.matches('.confirm')) {
    $entries.className = 'container entries hidden';
    $form.className = 'container new-entries';
    $modal.className = 'modal hidden';

    var $li = document.querySelector('[data-entry-id]');
    for (var i = 0; i < $li.length; i++) {
      if (data.editing === data.entries[i]) {
        data.entries.splice(i, 1);
        $li[i].remove();
      }
    }
  }
  if (data.view === 'entry-form') {
    data.view = 'entries';
  }
}

$entryList.addEventListener('click', edit);

function edit(event) {
  formView(event);
  $delete.className = 'delete';
  $h2Edit.className = 'edit';
  $h2New.className = 'new-entry hidden';

  var $li = document.querySelector('[data-entry-id]');
  var closestId = event.target.closest('[data-entry-id]');
  for (var i = 0; i < $li.length; i++) {
    if (closestId === $li[i]) {
      data.editing = data.entries[i];

      $photoURL.value = data.entries[i].image;
      $title.value = data.entries[i].title;
      $notes.value = data.entries[i].notes;
      $image.src = data.entries[i].image;
    }
  }
}
