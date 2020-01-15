MicroModal.init();

// Cancel default action on modal trigger links to avoid changing URL
document
    .querySelector('[data-micromodal-trigger]')
    .addEventListener('click', e => e.preventDefault());

const form = document.querySelector('#note-form');
const url = form.getAttribute('action');
const method = form.getAttribute('method');

const prependNote = html => {
  const notesList = document.querySelector('.notes-list');
  const div = document.createElement('div');
  div.innerHTML = html;
  notesList.insertBefore(div.firstChild, notesList.firstChild);
};

const onSuccess = html => {
  MicroModal.close('note-modal');
  form.reset();

  if (method === 'POST') {
    prependNote(html);
  } else if (method === 'PUT') {
    document.querySelector('.note-content').innerHTML = html;
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();

  fetch(url, {
    method,
    body: new FormData(form)
  })
    .then(response => response.text())
    .then(text => onSuccess(text))
    .catch(error => console.error(error));
});
