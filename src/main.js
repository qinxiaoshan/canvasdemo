import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '@/common/fonts/iconfont.css'	//引入自定义图标样式
import themeicon from '@/common/fonts/iconfont.js'

Vue.config.productionTip = false

//使用插件
Vue.prototype.$axios = axios;
export default({
});

router.afterEach( ( to, from, next ) => {
 setTimeout(()=>{
   var _hmt = _hmt || [];
   (function() {
    //每次执行前，先移除上次插入的代码
    document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?xxxx";
    hm.id = "baidu_tj"
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
   })();
 },0);
} );

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


