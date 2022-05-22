import GoodsList from './components/GoodsList.js'
import GoodsItem from './components/GoodsItem.js'
import CartList from './components/CartList.js'
import CartItem from './components/CartItem.js'
import GoodsSearch from './components/GoodsSearch.js'

export const API_URL = "http://localhost:3000"

const app = new Vue({
    el: '#app',
    components: {
        'goods-list': GoodsList,
        'goods-item': GoodsItem,
        'cart-list': CartList,
        'cart-item': CartItem,
        'goods-search': GoodsSearch
      },
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