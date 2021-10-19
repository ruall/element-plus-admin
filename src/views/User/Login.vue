<template>
  <div class="w-screen h-screen bg-gray-800">
    <div class="layout-login" @keyup="enterSubmit">
      <h3 class="text-2xl font-semibold text-gray-100 text-center mb-6">系统登陆</h3>
      <el-form ref="ruleForm" label-position="right" label-width="80px" :model="form" :rules="rules">
        <el-form-item class="mb-6 -ml-20" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item class="mb-6 -ml-20" prop="pwd">
          <el-input v-model="form.pwd" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password />
        </el-form-item>
        <el-form-item class="mb-6 -ml-20" prop="code">
          <el-input
            class="my-template-class"
            prefix-icon="el-icon-message"
            v-model="form.code"
            placeholder="请输入邮箱"
          >
            <template #append>
              <el-button
                :type="sliderVConf.disabled ? 'info' : 'primary'"
                class="my-primary"
                @click="getCode"
                :disabled="sliderVConf.disabled"
              >
                <i v-if="!sliderVConf.disabled">{{ sliderVConf.txt }}</i>
                <i v-if="sliderVConf.disabled">{{ sliderVConf.count }}s</i>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="mb-6 -ml-20">
          <mi-captcha theme-color="#409EFF" @init="initAfter" width="100%"></mi-captcha>
        </el-form-item>
        <el-form-item class="mb-6 -ml-20">
          <el-button type="primary" class="w-full" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
import { ElNotification } from 'element-plus'
import { validate } from '/@/utils/formExtend'

const formRender = () => {
  const { login } = useLayoutStore()
  const sliderVConf = reactive({
    isShowSelf: false,
    imgUrl: '',
    timer: null,
    count: 0,
    disabled: false,
    txt: '获取验证码'
  })
  let form = reactive({
    name: 'admin',
    pwd: 'admin',
    code: ''
  })
  const ruleForm = ref(null)
  const enterSubmit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }
  const onSubmit = async () => {
    let { name, pwd } = form
    if (!(await validate(ruleForm))) return
    await login({ username: name, password: pwd })
    ElNotification({
      title: '欢迎',
      message: '欢迎回来',
      type: 'success'
    })
  }
  const rules = reactive({
    name: [
      {
        validator: (rule: any, value: any, callback: (arg0?: Error | undefined) => void) => {
          if (!value) {
            return callback(new Error('用户名不能为空'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ],
    pwd: [
      {
        validator: (rule: any, value: any, callback: (arg0?: Error | undefined) => void) => {
          if (!value) {
            return callback(new Error('密码不能为空'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ]
  })
  const getCode = () => {
    sliderVConf.disabled = true
    const TIME_COUNT = 60
    if (!sliderVConf.timer) {
      sliderVConf.count = TIME_COUNT
      sliderVConf.timer = setInterval(() => {
        if (sliderVConf.count > 0 && sliderVConf.count <= TIME_COUNT) {
          sliderVConf.count--
        } else {
          clearInterval(sliderVConf.timer)
          sliderVConf.timer = null
          sliderVConf.disabled = false
          sliderVConf.txt = '重新获取验证码'
        }
      }, 1000)
    }
  }
  let verifyParams = {}
  const initAfter = (res: { ret: { code: number }; data: { key: string } }) => {
    if (res.ret.code === 1) {
      localStorage.setItem('mi-captcha-key', res.data.key)
      verifyParams = { key: res.data.key }
    }
  }
  return {
    form,
    sliderVConf,
    onSubmit,
    enterSubmit,
    getCode,
    initAfter,
    verifyParams,
    rules,
    ruleForm
  }
}
export default defineComponent({
  name: 'Login',
  setup() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      ...formRender()
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-login {
  padding-top: 200px;
  width: 400px;
  margin: 0 auto;

  ::v-deep(.el-input__inner) {
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #ddd;
  }

  .my-template-class {
    .el-input-group__append {
      position: relative;

      .my-primary {
        width: 140px;
        background-color: var(--el-button-background-color, var(--el-color-white));
        border: 1px solid var(--el-button-background-color, var(--el-color-white));
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        color: var(--el-button-font-color, var(--el-text-color-regular));
        margin: -10px -21px;

        i {
          font-style: normal;
        }
      }
    }
  }
}
</style>
