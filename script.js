const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"

class GoodsItem {
    constructor(title, price, id) {
        this.title = title
        this.price = price
        this.id = id
    }

    render() {
        return `<div class="goods-item" data-title="${this.title}" data-price="${this.price}" data-id="${this.id}"><h3>${this.title}</h3><p>${this.price}</p><button class="add-to-cart-button" type="button"><i class="fas fa-shopping-basket"></i></button></div>`
    }
}

class GoodsList {
    constructor() {
        this.goods = []
    }

    async fetchGoods() {
        const responce = await fetch(`${API_URL}/catalogData.json`)
        if (responce.ok) {
            const goods = await responce.json()
            this.goods = goods
        } else {
            alert('Произошла ошибка при соединении с сервером!')
        }
    }

    render() {
        let listHtml = ''
        this.goods.forEach((good) => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product)
            listHtml += goodItem.render()
        })
        document.querySelector(".goods-list").innerHTML = listHtml
    }

    clickHandlers() {
        const buttonsEl = document.querySelectorAll('.add-to-cart-button')
        buttonsEl.forEach(button => {
            button.addEventListener('click', (event) => {
                let listHTML = ''
    
                let good = event.target.closest('div')
                let goodTitle = good.dataset.title
                let goodPrice = good.dataset.price
                let goodId = good.dataset.id
    
                let cartItem = new CartItem(goodTitle, goodPrice, goodId)
                listHTML += cartItem.render()
                
                let cartList = document.querySelector('.cart-list')
                сartList.innerHTML += listHTML
            })
        })
    }

    calculateTotalCost() {
        let totalCost = 0
        this.goods.forEach((good) => {
            totalCost += good.price
        })
        return totalCost
    }
}

class CartItem {
    constructor(title, price, id) {
        this.title = title
        this.price = price
        this.id = id
    }

    render() {
        return `<div class="cart-item" data-title="${this.title}" data-price="${this.price}" data-id="${this.id}"><h3>${this.title}</h3><p>${this.price}</p></div>`
    }
}

class Cart {
    constructor() {
        this.goods = []
    }
}

const init = async () => {
    const list = new GoodsList()
    const cartList = new Cart()
    await list.fetchGoods()
    list.render()
    list.clickHandlers()
};

window.onload = init;

