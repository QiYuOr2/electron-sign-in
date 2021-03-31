<template>
  <login v-if="state === 0" @update-state="updateState" />
  <info v-else />
</template>

<script>
import { ref } from 'vue';
import Login from './components/Login';
import Info from './components/Info';
import Utils from './common/utils';
import { NEED_LOGIN, STATE } from './common/constant';

export default {
  name: 'App',
  components: { Login, Info },
  setup() {
    Utils.getConfig();

    const needLogin = Utils.getWidget(NEED_LOGIN);

    const state = ref(needLogin ? STATE.SHOW_LOGIN : STATE.SHOW_INFO);
    const updateState = (currentValue) => {
      state.value = currentValue;
    };

    return {
      state,
      updateState,
    };
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.el-message {
  min-width: 200px !important;
  max-width: 300px !important;
}
</style>
