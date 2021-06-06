const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"

class GoodsList {
    constructor() {
        this.goods = []
        this.clickHandler =''
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

    clickHandlers(cartList) {
        this.clickHandler = document.querySelectorAll('.add-to-cart-button')
        this.clickHandler.forEach(button => {
            button.addEventListener('click', (event) => {
                let good = event.target.closest('div')
                let goodTitle = good.dataset.title
                let goodPrice = good.dataset.price
                let goodId = good.id

                let cartItem = new CartItem(goodTitle, goodPrice, goodId)
                cartList.addItemToCart(cartItem)
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

class GoodsItem {
    constructor(title, price, id) {
        this.title = title
        this.price = price
        this.id = id
    }

    render() {
        return `<div class="goods-item" data-title="${this.title}" data-price="${this.price}" id="${this.id}"><h3>${this.title}</h3><p>${this.price}</p><button class="add-to-cart-button" type="button"><i class="fas fa-shopping-basket"></i></button></div>`
    }
}

class Cart {
    constructor() {
        this.goods = []
        this.clickHandler = ''
    }

    addItemToCart(cartItem) {
        let flag = false
        this.goods.forEach(item => {
            if (item.id === cartItem.id) {
                flag = true
            }
        })
        if (flag) {
            alert('Данный товар уже находится в корзине')
        } else {
            this.render(cartItem)
        }
    }

    removeItemFromCart(cartItem, cartItemId) {
        let flag = false
        let good = ''
        this.goods.forEach(item => {
            while (true) {
                if (item.id === cartItemId) {
                    flag = true
                    good = item
                }
                break
            }
        })
        if (flag) {
            this.goods = this.goods.filter(item => item !== good)
            cartItem.remove()
            this.clickHandlers()
        }
    }

    clickHandlers() {
        this.clickHandler = document.querySelectorAll('.remove-from-cart-button')
        this.clickHandler.forEach(button => {
            button.addEventListener('click', (event) => {
                let good = event.target.closest('div')
                let goodId = good.id

                this.removeItemFromCart(good, goodId)
            })
        })
    }

    render(cartItem) {
        this.goods.push(cartItem)
        document.querySelector('.cart-list').innerHTML += cartItem.render()
        this.clickHandlers()
    }


}

class CartItem {
    constructor(title, price, id) {
        this.title = title
        this.price = price
        this.id = id
    }

    render() {
        return `<div class="cart-item" data-title="${this.title}" data-price="${this.price}" id="${this.id}"><h3>${this.title}</h3><p>${this.price}</p><button class="remove-from-cart-button" type="button"><i class="fas fa-shopping-basket"></i></button></div>`
    }
}

const init = async () => {
    const goodsList = new GoodsList()
    const cartList = new Cart()
    await goodsList.fetchGoods()
    goodsList.render()
    goodsList.clickHandlers(cartList)
}

window.onload = init;

