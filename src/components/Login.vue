<template>
  <div class="login-container">
    <h2>BAR签到器</h2>
    <p class="remarks">欢迎使用BAR签到器，请管理员输入学号密码以启动签到器</p>
    <label>
      <span>学号</span>
      <el-input v-model="account" />
    </label>
    <label>
      <span>密码</span>
      <el-input type="password" v-model="password" />
    </label>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { fetchLogin } from '../api';
import Utils from '../common/utils';

export default {
  emits: ['updateState'],
  setup(props, { emit }) {
    const account = ref('');
    const password = ref('');

    const login = async () => {
      const { code, data } = await fetchLogin(account.value, password.value);
      if (code === 200) {
        Utils.setAdminId(data.id);
        emit('updateState', 1);
      }
    };

    return {
      account,
      password,
      login,
    };
  },
};
</script>

<style>
.login-container {
  padding: 20px 10px;
}
.login-container h2 {
  margin-bottom: 1.5rem;
}
.login-container .remarks {
  padding: 0 1.5rem;
  font-size: 14px;
  margin-bottom: 2rem;
}
.login-container label {
  display: flex;
  align-items: center;
  padding-right: 1rem;
  margin-bottom: 1rem;
}
.login-container label span {
  min-width: 3rem;
}
.login-container .el-button {
  margin-top: 2rem;
}
</style>
