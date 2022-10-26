
// Form Elements
const cardHolderName = document.getElementById('cardholdername')
const cardNumber = document.getElementById('cardnumber')
const expDateMonth = document.getElementById('expdatem')
const expDateYear = document.getElementById('expdatey')
const cvc = document.getElementById('cvc')

// Card Display Elements
const cardHolderNameDisplay = document.getElementById('cardholder-name-display')
const cardNumberDisplay = document.getElementById('card-number-display')
const expDateMonthDisplay = document.getElementById('exp-datem-display')
const expDateYearDisplay = document.getElementById('exp-datey-display')
const cvcDisplay = document.getElementById('cvc-display')

// Form Control
let warning = 1
const changeState = (input) => {
    input.style.border = "2px solid red"
    warning = 1
}
const changeBack = (input) => {
    input.style.border= '1px solid hsl(270, 3%, 87%)';
    warning = 0
}
const dateCheck = () => {
    const inputMonth = expDateMonth.value
    const inputYear = expDateYear.value
    const parent = expDateMonth.parentNode.parentNode
    const text = parent.querySelector('p')
    if (inputMonth.length <=0 || inputMonth.length > 2 || inputYear.length > 2 || inputYear.length<=0) {
        text.innerText = "* Please input valid Date!"
        if (inputMonth.length <=0 || inputMonth.length > 2) {
            changeState(expDateMonth)
        } else {
            changeState(expDateYear)
        }
    } else {
        if (parseInt(inputMonth) > 12 || parseInt(inputMonth) <=0) {
            text.innerText = "* Please input valid Date"
            changeState(expDateMonth)
        } else if (parseInt(inputYear) <=0) {
            text.innerText = "* Please input valid Date"
            changeState(expDateYear)
        }else {
            text.innerText = ""
            changeBack(expDateMonth)
            changeBack(expDateYear)
        }
    }
}
const matchCardNumber = (text) => {
    let pattern = /\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d/
    return text.match(pattern) == null? false: true
}

cardHolderName.addEventListener('blur', (event)=> {
    const input = event.target.value
    const parent = event.target.parentNode
    const text = parent.querySelector('p')
    if (input.length <=0) {
        text.innerText = "* Please input the Cardholder's Name!"
        changeState(event.target)
    } else {
        text.innerText = ""
        changeBack(event.target)
    }
})

cardNumber.addEventListener('blur', (event) => {
    const input = event.target.value
    const parent = event.target.parentNode
    const text = parent.querySelector('p')
    if (input.length <19) {
        text.innerText = "* Please input the Card Number!"
        changeState(event.target)
    } else if (!matchCardNumber(cardNumberDisplay.innerText)) {
        text.innerText = "* Wrong format, number only"
        changeState(event.target)
    } else {
        text.innerText = ""
        changeBack(event.target)
    }
})

expDateMonth.addEventListener('blur', (event)=> {
    dateCheck()
})
expDateYear.addEventListener('blur', (event) => {
    dateCheck()
})
cvc.addEventListener('blur', (event)=> {
    const input = event.target.value
    const parent = event.target.parentNode
    const text = parent.querySelector('p')
    console.log(input == "")
    if (input.length <=0 || input.length > 3 || parseInt(input) <= 0) {
        text.innerText = "* Input valid CVC"
        changeState(event.target)
    } else {
        text.innerText = ""
        changeBack(event.target)
    }
})


// Card Control
cardHolderName.addEventListener('input', (event)=> {
    const input = event.target.value
    if (input == '') {
        cardHolderNameDisplay.innerText = 'jane appleseed'
    } else {
        cardHolderNameDisplay.innerText = input
    }
})
cardNumber.addEventListener('input', (event)=> {
    let input = event.target.value
    const index = [4, 9, 14]
    if (input.length == 4 || input.length == 9 || input.length == 14) {
        event.target.value += " "
    }
    if (input == '') {
        cardNumberDisplay.innerText = '0000 0000 0000 0000'
    } else {
        while (input.length < 19) {
            if (input.length == 4 || input.length == 9 || input.length == 14) {
                input += " "
            } else {
                input += "0"
            }
        }
        cardNumberDisplay.innerText = input
    }
})
expDateMonth.addEventListener('input', (event)=> {
    let input = event.target.value
    if (input == '') {
        expDateMonthDisplay.innerText = '00'
    } else {
        if (input.length == 1) {
            input = `0${input}`
        }
        expDateMonthDisplay.innerText = input
    }
})
expDateYear.addEventListener('input', (event)=> {
    let input = event.target.value
    if (input == '') {
        expDateYearDisplay.innerText = '00'
    } else {
        if (input.length == 1) {
            input = `0${input}`
        }
        expDateYearDisplay.innerText = input
    }
})
cvc.addEventListener('input', (event)=> {
    let input = event.target.value
    if (input == '') {
        cvcDisplay.innerText = '000'
    } else {
        if (input < 10) {
            input = `00${input}`
        } else if (input < 100) {
            input = `0${input}`
        }
        cvcDisplay.innerText = input
    }
})


// Submit Control

empty = () => {
    return cardHolderName.value == ""? true:
    cardNumber.value == ""? true:
    expDateMonth.value == ""? true:
    expDateYear.value == ""? true:
    cvc.value == ""? true:
    false
}
const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (warning || empty()) {
        alert("Please Input All Value!")
    } else {
        const complete = document.querySelector('.complete')
        complete.classList.remove('hidden')
        form.classList.add('hidden')
    }
})

const confirm = document.querySelector('.complete button')
confirm.addEventListener('click', (event)=> {
    deployNew()
    const complete = document.querySelector('.complete')
    complete.classList.add('hidden')
    form.classList.remove('hidden')
})

const deployNew = () => {
    cvcDisplay.innerText = '000';
    cardHolderNameDisplay.innerText = 'Jane Appleseed'
    cardNumberDisplay.innerText = '0000 0000 0000 0000'
    expDateMonthDisplay.innerText = '00'
    expDateYearDisplay.innerText = '00'
    cardHolderName.value = ''
    cardNumber.value = ''
    expDateMonth.value = ''
    expDateYear.value = ''
    cvc.value = ''
}

document.addEventListener('DOMContentLoaded', (event) => {
    deployNew()
})
