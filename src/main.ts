import { createApp } from 'vue'
import App from '/@/App.vue'
import ElementPlus from 'element-plus'
import I18n from '/@/lang/index' //引入i18n组件
import direct from '/@/directive/index'
import router from '/@/router/index'
import { pinia } from '/@/store'
import '/@/permission'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import 'nprogress/nprogress.css'
import '/@/assets/css/index.css'
import 'virtual:svg-icons-register'
import SvgIcon from '/@/components/SvnIcon/index.vue'
import MakeitCaptcha from 'makeit-captcha'
import 'makeit-captcha/dist/captcha.min.css'

const app = createApp(App)
direct(app)
app.use(MakeitCaptcha)
app.use(ElementPlus)
app.use(I18n)
app.use(router)
app.use(pinia)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
