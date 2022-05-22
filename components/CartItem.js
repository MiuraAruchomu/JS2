import { API_URL } from "../main.js"

export default Vue.component('cart-item', {
    props: ['goodProp'],
    methods: {
        async removeFromCart() {
            const responce = await fetch(`${API_URL}/removeFromCart`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
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
    <div class="cart-item">
        <h3>{{goodProp.product_name}}</h3>
        <p>{{goodProp.price}}</p>
        <button class="remove-from-cart-button" @click="removeFromCart">Удалить из корзины</button>
    </div>
    `
})