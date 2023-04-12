const nameInput = document.querySelector('#name')
const numberInput = document.querySelector('#card-number')
const mmInput = document.querySelector('#mm-date')
const yyInput = document.querySelector('#yy-date')
const cvcInput = document.querySelector('#cvc')
const subBtn = document.querySelector('#submit')
const form = document.querySelector('.form')
const complete = document.querySelector('.complete')

const cvcCard = document.querySelector('.card__cvc')
const nameCard = document.querySelector('.card__name')
const numberCard = document.querySelector('.card__number')
const expCard = document.querySelector('.card__exp')

const complBtn = document.querySelector('#continue')

const nameWrite = () => {
	nameCard.textContent = nameInput.value
	if (nameInput.value === '') {
		nameCard.textContent = 'jane appleseed'
	}
}

const formatCardNumber = (number) => {
	return number
		.replace(/\W/gi, '')
		.replace(/(.{4})/g, '$1 ')
		.trim()
}

const numberWrite = () => {
	const formattedNumber = formatCardNumber(numberInput.value)
	numberCard.textContent = formattedNumber || '0000 0000 0000 0000'
}

const expWrite = () => {
	expCard.textContent = mmInput.value + '/' + yyInput.value
	if (mmInput.value === '' && yyInput.value === '') {
		expCard.textContent = '00/00'
	} else if (mmInput.value === '') {
		expCard.textContent = `00/${yyInput.value}`
	} else if (yyInput.value === '') {
		expCard.textContent = `${mmInput.value}/00`
	}
}

const cvcWrite = () => {
	cvcCard.textContent = cvcInput.value
	if (cvcInput.value === '') {
		cvcCard.textContent = '000'
	}
}

const isNameValid = () => {
	const trimmedName = nameInput.value.trim()

	if (trimmedName === '') {
		nameInput.nextElementSibling.textContent = `Can't be blank`
		return false
	}

	if (/\d/.test(trimmedName) || !/^[a-ząćęłńóśźż\s]+$/i.test(trimmedName)) {
		nameInput.nextElementSibling.textContent = `Wrong format, letters only`
		return false
	}

	nameInput.nextElementSibling.textContent = ''
	return true
}

const isNumberValid = () => {
	const trimmedNumber = numberInput.value.replace(/\s/g, '')

	if (trimmedNumber === '') {
		numberInput.nextElementSibling.textContent = `Can't be blank`
		return false
	}

	if (!/^\d+$/.test(trimmedNumber)) {
		numberInput.nextElementSibling.textContent = `Wrong format, nubers only`
		return false
	}

	if (!/^\d{16}$/.test(trimmedNumber)) {
		numberInput.nextElementSibling.textContent = `Must have 16 digits`
		return false
	}

	numberInput.nextElementSibling.textContent = ''
	return true
}

const isCvcValid = () => {
	const trimmedCvc = cvcInput.value.replace(/\s/g, '')

	if (trimmedCvc === '') {
		cvcInput.nextElementSibling.textContent = `Can't be blank`
		return false
	}

	if (!/^\d+$/.test(trimmedCvc)) {
		cvcInput.nextElementSibling.textContent = `Wrong format, nubers only`
		return false
	}

	if (!/^\d{3}$/.test(trimmedCvc)) {
		cvcInput.nextElementSibling.textContent = `Must have 3 digits`
		return false
	}

	cvcInput.nextElementSibling.textContent = ''
	return true
}

const isExpValid = () => {
	const trimmedMm = mmInput.value.replace(/\s/g, '')
	const trimmedYy = yyInput.value.replace(/\s/g, '')

	if (trimmedMm === '' || trimmedYy === '') {
		mmInput.closest('.form__box-exp').querySelector('.error').textContent = `Can't be blank`
		return false
	}

    if (!/^\d+$/.test(trimmedMm) || !/^\d+$/.test(trimmedYy)) {
		mmInput.closest('.form__box-exp').querySelector('.error').textContent = `Wrong format, nubers only`
		return false
	}

	if (!/^\d{2}$/.test(trimmedMm) || !/^\d{2}$/.test(trimmedYy)) {
		mmInput.closest('.form__box-exp').querySelector('.error').textContent = `Must have 3 digits`
		return false
	}

    mmInput.closest('.form__box-exp').querySelector('.error').textContent = ''
    return true
}

nameInput.addEventListener('keyup', nameWrite)
numberInput.addEventListener('keyup', numberWrite)
mmInput.addEventListener('keyup', expWrite)
yyInput.addEventListener('keyup', expWrite)
cvcInput.addEventListener('keyup', cvcWrite)
subBtn.addEventListener('click', (e) => {
	e.preventDefault()
    if (
        isNameValid() &
        isNumberValid() &
        isCvcValid() & 
        isExpValid() 
    )  {
        form.style.display = 'none'
        complete.style.display = 'flex'
    }
})

complBtn.addEventListener('click', () => {
    location.reload();
})