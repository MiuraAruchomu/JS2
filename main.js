const API_URL = "http://localhost:3000"

Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"></goods-item>
        </div>
    `
})

Vue.component('goods-item', {
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

Vue.component('goods-search', {
    props: ['searchLine'],
    template: `
        <input type="search" class="goods-search" v-bind:value="searchLine"
        v-on:input="$emit('input', $event.target.value)"/>
    `
})

Vue.component('cart-list', {
    props: ['isVisibleCart', 'cartGoods'],
    template: `
        <div class="cart-list" v-if="isVisibleCart">
            <cart-item v-for="goodEntity in cartGoods" :goodProp="goodEntity"></cart-item>
        </div>
    `
})

Vue.component('cart-item', {
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

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        cartGoods: [],
        searchLine: '',
        isVisibleCart: false
    },
    methods: {
        async getProducts() {
            const responce = await fetch(`${API_URL}/catalogData`)
            if (responce.ok) {
                const goods = await responce.json()
                this.goods = goods
                this.filteredGoods = goods
            } else {
                alert('Произошла ошибка при соединении с сервером!')
            }
        },

        async getCartProducts() {
            const responce = await fetch(`${API_URL}/cartData`)
            if (responce.ok) {
                const cartGoods = await responce.json()
                this.cartGoods = cartGoods
            } else {
                alert('Произошла ошибка при соединении с сервером!')
            }
        },

        filterGoods() {
            const regExp = new RegExp(this.searchLine, 'gi')
            this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name))
        },

        showOrHideCart() {
            if (this.isVisibleCart === false) {
                this.isVisibleCart = true
            } else {
                this.isVisibleCart = false
            }
        },
    },

    async mounted() {
        await this.getProducts()
        await this.getCartProducts()
    }
})