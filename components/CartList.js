export default Vue.component('cart-list', {
    props: ['isVisibleCart', 'cartGoods'],
    template: `
        <div class="cart-list" v-if="isVisibleCart">
            <cart-item v-for="goodEntity in cartGoods" :goodProp="goodEntity"></cart-item>
        </div>
    `
})