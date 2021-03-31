<template>
  <div class="info-container">
    <el-input
      ref="cardInput"
      v-model="cardId"
      placeholder="扫描校园卡以导入卡号"
      autofocus
      @keydown="getInfo"
    />
    <el-empty v-if="!haveData" description="请扫描校园卡" :image-size="60" />
    <div v-else>
      <el-avatar :src="info.avatar_url" :size="90" />
      <div>{{ info.name }}</div>
      <div>{{ info.team }}</div>
      <div class="buttons">
        <el-button @click="signIn" type="success">签到</el-button>
        <el-button @click="signOut" type="danger">签退</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { fetchInfo, fetchSignIn, fetchSignOut } from '../api';
import Utils from '../common/utils';
import { API_AVATAR_ROOT } from '../common/constant';
import { ElMessage } from 'element-plus';

export default {
  setup() {
    const cardInput = ref(null);
    const haveData = ref(false);
    const cardId = ref('');
    const info = reactive({
      id: 0,
      name: '加载失败',
      avatar_url: '',
      team: '加载失败',
    });

    const getInfo = async (e) => {
      if (e.keyCode === 13) {
        const { code, data } = await fetchInfo(+cardId.value);
        if (code === 200) {
          haveData.value = true;
          info.id = data.id;
          info.name = data.name;
          info.avatar_url = Utils.getApi(API_AVATAR_ROOT) + data.avatar_url;
          info.team = data.team;
        }
      }
    };

    const cancel = () => {
      haveData.value = false;
      cardId.value = '';
      info.id = 0;
      info.name = '加载失败';
      info.avatar_url = '';
      info.team = '加载失败';
      cardInput.value.focus();
    };

    const signIn = async () => {
      try {
        const { code, data } = await fetchSignIn(
          +info.id,
          +Utils.getAdminId || 1
        );
        if (code === 200) {
          if (data.sign_time) {
            ElMessage.success('签到成功：' + data.sign_time);
          } else {
            ElMessage.warning(data);
          }
        }
      } catch (error) {
        ElMessage.error('签到成功：' + error);
      } finally {
        cancel();
      }
    };

    const signOut = async () => {
      try {
        const { code, data } = await fetchSignOut(
          +info.id,
          +Utils.getAdminId || 1
        );
        if (code === 200) {
          if (data.sign_time) {
            ElMessage.success('签退成功：' + data.sign_time);
          } else {
            ElMessage.warning(data);
          }
        }
      } catch (error) {
        ElMessage.error('签退失败：' + error);
      } finally {
        cancel();
      }
    };

    return {
      cardInput,
      haveData,
      info,
      getInfo,
      cardId,
      cancel,
      signIn,
      signOut,
    };
  },
};
</script>

<style>
.info-container {
  padding: 20px;
}
.info-container .el-input {
  margin-bottom: 1rem;
}
.info-container div > * {
  margin-bottom: 1rem;
}
.info-container .buttons {
  margin-top: 1rem;
}
</style>
