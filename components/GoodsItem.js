import { API_URL } from "../main.js"

export default Vue.component('goods-item', {
    props: ['goodProp'],
    methods: {
        async addToCart() {
            const responce = await fetch(`${API_URL}/addToCart`, {
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.goodProp)
            })
            if (responce.ok) {
                const cartGoods = await responce.json()
                this.$parent.$parent.cartGoods = cartGoods
                this.$parent.$parent.getCartProducts()
            } else {
                alert('Произошла ошибка при соединении с сервером!')
            }
        }
    },
    template: `
        <div class="goods-item">
            <h3>{{goodProp.product_name}}</h3>
            <p>{{goodProp.price}}</p>
            <button class="add-to-cart-button" @click="addToCart">Добавить в корзину</button>
        </div>
    `
})