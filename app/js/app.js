const serverUrl = 'https://raw.githubusercontent.com/fl4www/Insulter-by-GARIK-NET/main/data.json'
const insults = []

const button = document.querySelector('.app__button')
const submitButton = document.querySelector('.app__button_submit')

const input = document.querySelector('.app__input')
const insultPlaceholder = document.querySelector('.app__title')
const form = document.querySelector('.app__form')

button.addEventListener('click', (e) => {
	e.preventDefault()
	button.style.display = 'none'
	form.style.display = 'block'
}, {once: true})

submitButton.addEventListener('click', (e) => {
	e.preventDefault()
	const insulted = input.value
	if (insulted) {
		insultPlaceholder.innerHTML = ''
		insultPlaceholder.style.cssText = 'color: black; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(31px); padding: 25px; max-width: 830px;'
		insultPlaceholder.innerHTML = `${insulted} сегодня ${getInsult()}`
		
		input.setAttribute('disabled', 'true')
	} else input.style.border = '1px solid red'
})

const xhr = new XMLHttpRequest()
xhr.open('GET', serverUrl, false)

xhr.onload = () => {
	if (xhr.status >= 400) console.error('Ошибка запроса ', xhr.status)
}
xhr.onerror = () => {
	console.error('Ошибка ', xhr.status)
}

xhr.send()


const serverResponse = JSON.parse(xhr.response)

for (let insult of serverResponse) {
	insults.push(insult.phrase)
}

function randomInteger(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

function getInsult() {
	return insults[randomInteger(0, insults.length - 1)]
}

console.log(insults)