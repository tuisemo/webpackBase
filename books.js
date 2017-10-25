/*books.js*/
const Vue = require('./src/js/vue.js');
const axios = require('axios');
import './src/css/normalize.css';
import './src/css/less/base.less';

var app = new Vue({
    el: '.wrap',
    data: {
        bookdata: {}
    },
    created: function() {
        let self = this;
        this.$nextTick(function() {
            axios.get('/api/bookid', {
                    params: {
                        id: 1003078
                    }
                })
                .then(function(res) {
                    self.bookdata = res.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    },
    mounted: function() {
        let self = this;
    },
    computed: {},
    methods: {
        loadBook: function(id) {
            let self = this;
            axios.get('/api/bookid', {
                    params: {
                        id: id
                    }
                })
                .then(function(res) {
                    self.bookdata = res.data;
                })
                .catch(function(error) {
                    console.log(error);
                });

        }
    },
    filters: {
        starFilter: function(val) {
            let star = '';
            if (val > 9.5) {
                star = '★★★★★';
            } else if (val > 9) {
                star = '★★★★☆';
            } else if (val > 8) {
                star = '★★★☆☆';
            } else if (val > 7) {
                star = '★★☆☆☆';
            } else if (val > 6) {
                star = '★☆☆☆☆';
            } else {
                star = '☆☆☆☆☆';
            }
            return star;
        }
    }
})