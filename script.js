const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"

Vue.component('goods-search', {
    props: ['search-line'],
    template: `
        <div class="search">
            <input type="text" class="goods-search" v-model="search-line">
            <button class="search-button" type="button" @click="filterGoods">Поиск</button>
        </div>
    `
})

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
    template: `
        <div class="goods-item">
            <h3>{{goodProp.product_name}}</h3>
            <p>{{goodProp.price}}</p>
        </div>
    `
})

Vue.component('cart-list', {
    props: ['is-visible-cart'],
    template: `
        <div class="cart-list" v-if="is-visible-cart"></div>
    `
})

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false
    },

    methods: {
        async getProducts() {
            const responce = await fetch(`${API_URL}/catalogData.json`)
            if (responce.ok) {
                const goods = await responce.json()
                this.goods = goods
                this.filteredGoods = goods
            } else {
                alert('Произошла ошибка при соединении с сервером!')
            }
        },

        filterGoods() {
            const regExp = new RegExp(this.searchLine, 'i')
            this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name))
        },

        showOrHideCart() {
            if (this.isVisibleCart === false) {
                this.isVisibleCart = true
            } else {
                this.isVisibleCart = false
            }
        }
    },

    async mounted() {
        await this.getProducts()
    }
})