/*books.js*/
const Vue = require('./src/js/vue.js');
const axios = require('axios');
import './src/css/normalize.css';
import './src/css/less/base.less';

var app = new Vue({
    el: '.wrap',
    data: {
        booksdata: [],
        isCheckAll: false
    },
    created: function() {
        let self = this;
        this.$nextTick(function() {
            axios.get('/api/books')
                .then(function(res) {
                    self.booksdata = res.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    },
    mounted: function() {
        let self = this;
    },
    computed: {
        totalprice: function() {
            let total = 0;
            this.booksdata.forEach(function(el, index, arr) {
                if (el.select) {
                    total = total + el.buyprice * el.buynum;
                }
            })
            return total;
        },
        selectNum: function() {
            let selectNum = 0;
            this.booksdata.forEach(function(el, index, arr) {
                if (el.select) {
                    selectNum = selectNum + el.buynum;
                }
            });
            return selectNum;
        },

    },
    methods: {
        changeNum: function(self, opt) {
            if (opt == -1) {
                if (self.buynum == 1) {
                    return;
                } else
                    self.buynum--;
            } else
                self.buynum++;
        },
        selectBook: function(book, value) {
            if (book.select == void 0) { //使用void 0 代替undefined
                if (value != void 0) {
                    this.$set(book, 'select', value)
                } else
                    this.$set(book, 'select', true)
            } else {
                if (value != void 0) {
                    book.select = value;
                } else
                    book.select = !book.select;
            }
        },
        selectAll: function() {
            let self = this;
            this.isCheckAll = !this.isCheckAll;
            this.booksdata.forEach(function(el, index, arr) {
                self.selectBook(el, self.isCheckAll);
                console.log(el.select);
            })
        }
    },
    filters: {
        starFilter: function(val) {
            let star = '';
            if (val > 9) {
                star = '★★★★★';
            } else if (val > 8) {
                star = '★★★★☆';
            } else if (val > 7) {
                star = '★★★☆☆';
            } else if (val > 6) {
                star = '★★☆☆☆';
            } else if (val > 5) {
                star = '★☆☆☆☆';
            } else {
                star = '☆☆☆☆☆';
            }
            return star;
        },
        priceFilter: function(val) {
            return '￥ ' + parseFloat(val.toFixed(2)) + ' 元';
        }
    }
})