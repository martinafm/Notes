const addBtn = document.querySelector('.nav__add')
const infoAddBtn = document.querySelector('.info__btn')

const deleteAllBtn = document.querySelector('.nav__deleteAll')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtn = document.getElementsByClassName('.note__delete-btn')

const panel = document.querySelector('.panel')
const info = document.querySelector('.info')
const notes = document.querySelector('.notes')
const textarea = document.querySelector('.panel__textarea')
const category = document.querySelector('#category')

const error = document.querySelector('.error')
const body = document.querySelector('body')

const cardID = 0
let selectedValue

const showPanel = () => {
	panel.classList.add('panel--animation')
	info.classList.remove('info--show')
}

const closePanel = () => {
	panel.classList.remove('panel--animation')
    error.style.visibility = 'hidden'
    textarea.value =''
    category.value = 'default'
    showInfo()
}

const addNote = () => {
	if (textarea.value !== '' && category.value !== 'default') {
		createNote()
		error.style.visibility = 'hidden'
		closePanel()
	} else {
		error.style.visibility = 'visible'
	}
}

const createNote = () => {
	const newNote = document.createElement('article')
	newNote.classList.add('note')
	newNote.setAttribute('id', cardID)

	newNote.innerHTML = `
    <header class="note__heading">
        <h2 class="note__title">${selectedValue}</h2>
        <button class="note__delete-btn" onclick="deleteNote(${cardID})"><i class="note__heading-icon fa-solid fa-xmark"></i></button>
    </header>
    <article class="note__text">${textarea.value}</article>`

	notes.appendChild(newNote)
    checkColor(newNote)
}

const selectValue = () => {
	selectedValue = category.value
}

const checkColor = (note) => {
	const heading = note.querySelector('.note__heading')
	switch (selectedValue) {
		case 'job':
			heading.style.borderBottom = '2px solid #580aff'
			break
		case 'to do':
			heading.style.borderBottom = '2px solid #ff0000'
			break
		case 'shopping':
			heading.style.borderBottom = '2px solid #ff8700'
			break
		case 'other':
			heading.style.borderBottom = '2px solid #0ead69'
			break
	}
}

const deleteNote = (id) => {
	const noteToDelete = document.getElementById(id)
	notes.removeChild(noteToDelete)
    showInfo()
}

const showInfo = () => {
	if (
		notes.textContent === '' &&
		!panel.classList.contains('panel--animation')
	) {
		info.classList.add('info--show')
	}
}

addBtn.addEventListener('click', showPanel)
infoAddBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', closePanel)

saveBtn.addEventListener('click', addNote)
deleteAllBtn.addEventListener('click', () => (notes.textContent = '')(showInfo()))

