const app = document.querySelector('#app')
let header = `
        <div class="wrapper">
        <div class="header">
            <img class="logo" src="images/icons/bar_icon.svg" alt="">
            <p id='homeBtn'>Главная</p>
            <p id='barBtn'>Бар</p>
        </div>
        <div class="title">
            <h1 id='title'>Главная страница</h1>
        </div>
        <div class="content-list" id="contentList">
            <p>Ожидайте, данные загружаются</p>
        </div>
    </div>
`
app.innerHTML = header
const contentList = document.querySelector('#contentList')
const title = document.querySelector('#title')

function home(time = 0) {
    setTimeout(getData, time)
    title.innerHTML = 'Главная страница'
    async function getData() {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`).catch((error) => {
            console.log(error)
            alert('Произошла ошибка загрузки данных с сервера')
        })
        const data = await response.json()
        contentList.innerHTML = 'Ожидайте, данные загружаются'
        contentList.innerHTML = card(data.drinks[0])
    }
}
home(2000) //   для разнообразия

function card(cardData) {
    let card = `
            <div class="card">
                <img class="list-img" src=${cardData.strDrinkThumb} alt="тут наша картинка">
                <h2>${cardData.strDrink}</h2>
                <p>${cardData.strInstructions}</p>
            </div>
            `
    return card
}

// т.к. всего 2 кнопки, буду прослушивать каждую отдельно

let homeBtn = document.querySelector('#homeBtn')
let barBtn = document.querySelector('#barBtn')

homeBtn.addEventListener('click', home)
barBtn.addEventListener('click', showbar)

function showbar() {
    title.innerHTML = 'Бар'
    contentList.innerHTML = 'Ожидайте, данные загружаются'
    async function getData() {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`).catch((error) => {
            console.log(error)
            alert('Произошла ошибка загрузки данных с сервера')
        })
        const data = await response.json()
        contentList.innerHTML = ''
        for(let i = 0; i < data.drinks.length; i++ ) {
            contentList.insertAdjacentHTML('afterBegin', card(data.drinks[i]))
        }
    }
    getData()
}