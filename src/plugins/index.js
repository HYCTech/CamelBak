import intercepter from './intercepter'
import SearchBox from "../components/searchBox.vue";
import PageBar from "../components/pageBar.vue";
export default {
    install(Vue, opts) {
        intercepter(Vue, opts);
         Vue.component('SearchBox',SearchBox)
         Vue.component('PageBar',PageBar)

        Vue.mixin({
            created() {
                // console.log(this.$options.name + 'created')
            },
            mounted() {
                //console.log(this.$options.name + 'mounted')
            }
        })
    }

}