<template>
  <div id="app">
    <h1>{{ title.name }}</h1>
    <div>{{ user }}</div>
    <a-button
    type="primary"
    @click="updateUser"
    >
    修改名称
    </a-button>
  </div>
</template>
<script>
import { reactive,ref } from 'vue';
export default {
    name: 'App',
    setup(){
        const title = reactive({name:'欢迎学习Vue3.0'});
        const user = ref('河畔一角');//如果需要修改值，可通过value
        user.value = '河畔老师';

        const updateUser = () =>{
            user.value = 'hahha';
        }

        return { title , user, updateUser };
    }
}
</script>
<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>