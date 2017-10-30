/*home.js*/
const Vue = require('./src/js/vue.js');
const axios = require('axios');
import './src/css/normalize.css';
import './src/css/less/base.less';

// 全局注册
Vue.component('search', {
    props: ['booksdata'],
    template: `
        <form class="search-form">
            <input class="input-group" type="text" name="keyword" v-model:value="keyword" placeholder="作品 / 电子书 / 专栏连载 / 作者 / 出版社" autocomplete="off">
            <div class="btn-add" @click="searchThis">搜索</div>
        </form>
    `,
    data: function() {
        return {
            keyword: ''
        }
    },
    methods: {
        searchThis: function() {
            let self = this;
            axios.get('/api/search', {
                    params: {
                        q: self.keyword,
                        tag: self.keyword,
                    }
                })
                .then(function(res) {
                    console.log(res);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
});

// 局部注册
var search_component = {
    template: `
        <form class="search-form">
            <input class="input-group" type="text" name="q" maxlength="60" size="22" value="" placeholder="作品 / 电子书 / 专栏连载 / 作者 / 出版社" autocomplete="off">
            <div class="btn-add" @click="searchThis">搜索</div>
        </form>
    `,
    methods: {
        searchThis: function() {
            alert('yes');
        }
    }
};

var app = new Vue({
    el: '.wrap',
    data: {},
    created: function() {
        // body...
    },
    // 局部注册
    /*components: {
        'search':search_component
    }*/
})