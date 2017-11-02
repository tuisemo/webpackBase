/*home.js*/
/*====================================================*/
/*|                                                   |*/
/*|  本案例主要实现了Vue平行组件或任意组件通信功能    |*/
/*|                                                   |*/
/*=====================================================*/

const Vue = require('./src/js/vue.js');
const axios = require('axios');
import './src/css/normalize.css';
import './src/css/less/base.less';


// 搜索组件——全局注册
Vue.component('search', {
    template: `
    <div>
        <div class="search-form">
            <input class="input-group" type="text" name="keyword" v-model:value="keyword" placeholder="作品 / 电子书 / 专栏连载 / 作者 / 出版社" autocomplete="off">
            <div class="btn-add" @click="searchThis">搜索</div>
        </div>
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
                    event.$emit('searchResult', res.data.books);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
});
// 展示组件——全局注册
Vue.component('showbook', {
    template: `
    <ul class="bookList">
        <li v-for="(book,index) in booksdata">
            <img v-bind:src="book.images.medium" v-bind:alt="book.imagesalt" /> {{ book.title }}
        </li>
    </ul>
    `,
    data: function() {
        return {
            booksdata: []
        }
    },
    mounted: function() {
        let self = this;
        event.$on('searchResult', function(data) {
            self.booksdata = data;
        })
    },
    methods: {
        show_msg: function(data) {
            this.booksdata = data;
        }
    }
});

// 通信中间件
var event = new Vue({});

// Vue实例
var app = new Vue({
    el: '.wrap',
    data: {
        booksdata: []
    },
    created: function() {
        // body...
    }
})