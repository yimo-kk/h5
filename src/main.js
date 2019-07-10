// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import flexible from 'amfe-flexible'
import './assets/css/common.scss'
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole();
// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);

import { Swipe, SwipeItem, Collapse, CollapseItem, Rate, Lazyload, List, Loading, Popup, ImagePreview, NoticeBar, Tab, Tabs, GoodsAction, Actionsheet, Area, GoodsActionBigBtn, GoodsActionMiniBtn, Search, PullRefresh, Notify, Toast, Icon, Tag, RadioGroup, Radio, Cell, CellGroup, Field, Button } from 'vant';
Vue.use(Swipe).use(SwipeItem).use(Collapse).use(CollapseItem).use(Rate).use(Lazyload).use(List).use(Loading).use(Popup).use(ImagePreview).use(NoticeBar).use(Tab).use(Tabs).use(GoodsAction).use(Actionsheet).use(Area).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(Search).use(PullRefresh).use(Notify).use(Toast).use(Icon).use(Tag).use(RadioGroup).use(Radio).use(Cell).use(CellGroup).use(Field).use(Button);
Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify
Vue.use(flexible)
// Vue.use(vConsole)
Vue.use(require('vue-moment'));
Vue.prototype.moment = require('moment');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
