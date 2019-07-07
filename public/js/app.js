console.log('Client side js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //browser wont refresh

    const location = search.value

    msgOne.textContent = 'Please wait a second ...'
    msgTwo.textContent = ''

    fetch('http://localhost:3000/weather?adress=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})