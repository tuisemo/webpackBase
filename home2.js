/*home.js*/
/*==========================================*/
/*|                                        |*/
/*|  本案例主要实现了Vue子父组件通信功能   |*/
/*|                                        |*/
/*==========================================*/

const Vue = require('./src/js/vue.js');
const axios = require('axios');
import './src/css/normalize.css';
import './src/css/less/base.less';


// 搜索组件（子组件）——全局注册
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
                    self.$emit('update', res.data.books);
                    // self.$parent.booksdata = res.data.books; //执行这个方法可直接操作父级对象数据
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
});
// 展示组件（父组件）——全局注册
Vue.component('showbook', {
    template: `
    <div>
    <search @update="show_msg"></search>
    <ul class="bookList">
        <li v-for="(book,index) in booksdata">
            <img v-bind:src="book.images.medium" v-bind:alt="book.imagesalt" /> {{ book.title }}
        </li>
    </ul>
    </div>
	`,
    data: function() {
        return {
            booksdata: []
        }
    },
    methods: {
        show_msg: function(data) {
            this.booksdata = data;
        }
    }
});

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



