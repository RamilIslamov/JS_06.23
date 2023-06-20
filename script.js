class Note {
  constructor(title, body, date) {
    this.title = title;
    this.body = body;
    this.date = date;
    this.updated = false;
  }
}

class NoteManager {
  constructor() {
    this.notes = [];
    this.notesContainer = document.getElementById('notesContainer');
    this.addButton = document.getElementById('addButton');
    this.titleInput = document.getElementById('titleInput');
    this.bodyInput = document.getElementById('bodyInput');
    this.modal = document.getElementById('modal');
    this.modalContent = document.getElementById('modal-content');
    this.modalText = document.getElementById('modalText');
    this.modalConfirmButton = document.getElementById('modalConfirmButton');
    this.modalCancelButton = document.getElementById('modalCancelButton');

    this.addButton.addEventListener('click', this.handleAddNote.bind(this));
    this.modalConfirmButton.addEventListener(
      'click',
      this.handleDeleteNote.bind(this)
    );

    this.modalCancelButton.addEventListener(
      'click',
      this.closeModal.bind(this)
    );

    this.titleInput.addEventListener('input', () =>
      this.titleInput.classList.remove('error')
    );

    this.bodyInput.addEventListener('input', () =>
      this.bodyInput.classList.remove('error')
    );

    this.loadNotesFromLocalStorage();
    this.renderNotes();
  }

  handleDeleteNote() {
    const noteIndex = this.noteIndex;
    if (noteIndex !== -1) {
      this.notes.splice(noteIndex, 1);
      this.saveNotesToLocalStorage();
      this.renderNotes();
    }

    this.closeModal();
  }

  closeModal() {
    this.modal.classList.remove('show');
    this.modalContent.classList.remove('show');
  }

  openModal(event) {
    this.modal.classList.add('show');
    this.modalContent.classList.add('show');
    this.modalText.textContent = `Are you sure you want to delete this note?`;
    this.noteIndex = parseInt(event.target.getAttribute('data-index'));
  }

  loadNotesFromLocalStorage() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
    }
  }

  saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  createNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    const titleElement = document.createElement('h2');
    titleElement.textContent = note.title;

    const bodyElement = document.createElement('p');
    bodyElement.classList.add('body-text');
    bodyElement.textContent = note.body;

    const dateElement = document.createElement('p');
    dateElement.classList.add('date');
    dateElement.textContent = this.formatDateTime(note.date, note.updated);

    const buttonsContainer = document.createElement('div');

    const updateButton = document.createElement('button');
    updateButton.classList.add('button', 'update-button');
    updateButton.textContent = 'UPDATE';
    updateButton.addEventListener('click', () => {
      this.handleUpdateNoteForm(
        note,
        titleElement,
        bodyElement,
        updateButton,
        cancelButton,
        deleteButton,
        dateElement
      );
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button', 'delete-button');
    deleteButton.textContent = 'DELETE';
    deleteButton.setAttribute('data-index', this.notes.indexOf(note));
    deleteButton.addEventListener('click', (event) => this.openModal(event));

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('button', 'cancel-button');
    cancelButton.textContent = 'CANCEL';
    cancelButton.classList.add('update-button');
    cancelButton.style.display = 'none';
    cancelButton.addEventListener('click', () => {
      this.handleCancelUpdate(
        titleElement,
        bodyElement,
        updateButton,
        cancelButton,
        note,
        deleteButton
      );
    });

    buttonsContainer.appendChild(updateButton);
    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(cancelButton);

    noteElement.appendChild(titleElement);
    noteElement.appendChild(bodyElement);
    noteElement.appendChild(dateElement);
    noteElement.appendChild(buttonsContainer);
    return noteElement;
  }

  renderNotes() {
    this.notesContainer.innerHTML = '';

    for (const note of this.notes) {
      const noteElement = this.createNoteElement(note);
      this.notesContainer.appendChild(noteElement);
    }
  }

  handleAddNote() {
    const title = this.titleInput.value;
    const body = this.bodyInput.value;
    const date = new Date().toString();

    if (!this.validateInput(title, body)) {
      return;
    }
    const note = new Note(title, body, date);
    this.notes.push(note);

    this.saveNotesToLocalStorage();
    this.renderNotes();

    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  handleUpdateNoteForm(
    note,
    titleElement,
    bodyElement,
    updateButton,
    cancelButton,
    deleteButton,
    dateElement
  ) {
    titleElement.parentNode.classList.add('note-update');
    const newTitleInput = document.createElement('input');
    newTitleInput.type = 'text';
    newTitleInput.classList.add('inner-input');
    newTitleInput.value = note.title;

    const newBodyTextarea = document.createElement('textarea');
    newBodyTextarea.classList.add('inner-textarea');
    newBodyTextarea.value = note.body;

    titleElement.textContent = '';
    titleElement.appendChild(newTitleInput);

    bodyElement.textContent = '';
    bodyElement.appendChild(newBodyTextarea);

    updateButton.textContent = 'SAVE';
    cancelButton.style.display = 'inline-block';

    deleteButton.style.display = 'none';

    const handleSaveNoteForm = () => {
      this.handleSaveNoteForm(
        note,
        newTitleInput.value,
        newBodyTextarea.value,
        titleElement,
        bodyElement,
        updateButton,
        cancelButton,
        deleteButton,
        dateElement
      );
    };

    updateButton.removeEventListener('click', this.handleUpdateNoteForm);
    updateButton.addEventListener('click', handleSaveNoteForm);
  }

  handleSaveNoteForm(
    note,
    newTitle,
    newBody,
    titleElement,
    bodyElement,
    updateButton,
    cancelButton,
    deleteButton,
    dateElement
  ) {
    titleElement.parentNode.classList.remove('note-update');
    if (!this.validateInput(newTitle, newBody)) {
      const existingTitleInput = titleElement.querySelector('input');
      const existingBodyTextarea = bodyElement.querySelector('textarea');
      existingTitleInput.classList.add('error');
      existingBodyTextarea.classList.add('error');
      return;
    }
    note.title = newTitle;
    note.body = newBody;
    note.date = new Date().toString();
    note.updated = true;

    titleElement.textContent = newTitle;
    bodyElement.textContent = newBody;

    updateButton.textContent = 'UPDATE';
    cancelButton.style.display = 'none';

    this.saveNotesToLocalStorage();

    dateElement.textContent = this.formatDateTime(note.date, note.updated);

    updateButton.removeEventListener('click', this.handleSaveNoteForm);
    updateButton.addEventListener('click', () =>
      this.handleUpdateNoteForm(
        note,
        titleElement,
        bodyElement,
        updateButton,
        cancelButton,
        deleteButton,
        dateElement
      )
    );

    deleteButton.style.display = 'inline-block';
  }

  handleCancelUpdate(
    titleElement,
    bodyElement,
    updateButton,
    cancelButton,
    note,
    deleteButton
  ) {
    titleElement.textContent = note.title;
    bodyElement.textContent = note.body;

    updateButton.textContent = 'UPDATE';
    cancelButton.style.display = 'none';
    titleElement.parentNode.classList.remove('note-update');

    updateButton.removeEventListener('click', this.handleSaveNoteForm);
    updateButton.addEventListener('click', () =>
      this.handleUpdateNoteForm(
        note,
        titleElement,
        bodyElement,
        updateButton,
        cancelButton,
        deleteButton
      )
    );

    deleteButton.style.display = 'inline-block';
  }

  formatDateTime(date, updated) {
    const parsedDate = new Date(date);
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();

    let formattedDate = `${hours}:${minutes} ${day}.${month}.${year}`;
    if (updated) {
      formattedDate = `Updated ${formattedDate}`;
    }

    return formattedDate;
  }

  validateInput(title, body) {
    let valid = true;

    if (title.trim() === '' || title.length < 5 || title.length > 15) {
      this.titleInput.classList.add('error');
      valid = false;
    } else {
      this.titleInput.classList.remove('error');
    }

    if (body.trim() === '' || body.length < 5 || body.length > 100) {
      this.bodyInput.classList.add('error');
      valid = false;
    } else {
      this.bodyInput.classList.remove('error');
    }

    return valid;
  }
}

const noteManager = new NoteManager();
