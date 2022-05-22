export default Vue.component('goods-search', {
    props: ['searchLine'],
    template: `
        <input type="search" class="goods-search" v-bind:value="searchLine"
        v-on:input="$emit('input', $event.target.value)"/>
    `
})