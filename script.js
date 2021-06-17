const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"

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
            if(this.isVisibleCart === false) {
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