/*home.js*/
const Vue = require('./src/js/vue.js');
const axios = require('axios');
import './src/css/normalize.css';
import './src/css/less/base.less';

// 全局注册
// 搜索组件
Vue.component('search', {
    // props: ['booksdata'],
    template: `
    <div>
        <form class="search-form">
            <input class="input-group" type="text" name="keyword" v-model:value="keyword" placeholder="作品 / 电子书 / 专栏连载 / 作者 / 出版社" autocomplete="off">
            <div class="btn-add" @click="searchThis">搜索</div>
        </form>
    </div>
    `,
    data: function() {
        return {
            keyword: ''
        }
    },
    methods: {
        searchThis: function() {
            let self = this;
            axios.post('/api/search', {
                    'q': self.keyword
                })
                .then(function(res) {
                    // console.log(res.data.books);
                    self.$emit('update', res.data.books);
                    // self.$parent.booksdata = res.data.books;
                    console.log(self.$parent);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
});
// 展示组件
Vue.component('showbook', {
    // props: ['data'],
    template: `
    <div>
    <search @update="shoumsg()"></search>
    <ul class="bookList">
        <li v-for="(book,index) in booksdata">
            <img v-bind:src="book.images.medium" v-bind:alt="book.imagesalt" /> {{ book.subtitle }}
        </li>
    </ul>
    </div>
	`,
    data: function() {
        return {
            booksdata: []
        }
    },
    methdos: {
        shoumsg: function(data) {
            this.booksdata = data;
        }
    }
});

var app = new Vue({
    el: '.wrap',
    data: {
        booksdata: []
    },
    created: function() {
        // body...
    },
    // 局部注册
    /*components: {
        'search':search_component
    }*/
})









// 局部注册
/*var search_component = {
    template: `
        <form class="search-form">
            <input class="input-group" type="text" name="q" maxlength="60" size="22" value="" placeholder="作品 / 电子书 / 专栏连载 / 作者 / 出版社" autocomplete="off">
            <div class="btn-add" @click="searchThis">搜索</div>
        </form>
    `,
    methods: {
        searchThis: function() {
            let self = this;
            axios.post('/api/search', {
                    'q': self.keyword
                })
                .then(function(res) {
                    console.log(res);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};*/