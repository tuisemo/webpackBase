/*main.js*/
const Vue = require('./src/js/vue.js');
const data = require('./src/js/data.js').provinces;
import './src/css/normalize.css';
import './src/css/less/base.less';

var app = new Vue({
    el: '.wrap',
    data: {
        provinces: data,
        // citys 使用计算属性生成
        curProvince: data[0].name,
        curCity: data[0].citys[0]
    },
    computed: {
        citys: function() {
            let self = this;
            let value;
            data.forEach(function(el, index, arr) {
                if (el.name == self.curProvince) {
                    value = el.citys;
                    self.curCity = el.citys[0];
                }
            });
            return value;
        }
    }
})