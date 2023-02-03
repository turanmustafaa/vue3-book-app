<template>
    <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Login</h3>
      <input v-model="userData.username" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
      <input v-model="userData.password" type="password" placeholder="Şifre" class="input mb-3" />
      <button @click="onSubmit" class="default-button">Giriş yap</button>
      <span class="text-center mt-3 text-sm">
        Üye değilim,
        <router-link class="text-red-900 hover:text-black" :to="{name : 'RegisterPage'}">Üye olmak istiyorum!</router-link>
      </span>
    </div>
</template>
<script>
import CryptoJs from 'crypto-js';
export default {
  data() {
    return {
      userData : {
        username : null,
        password : null
      }
    }
  },
  methods : {
    onSubmit() {
      const password = CryptoJs.HmacSHA1(this.userData.password, this.$store.getters._saltKey).toString();
      console.log('password', password)
      this.$appAxios.get(`/users?username=${this.userData.username}`)
      .then(login_res => {
        console.log(login_res.data[0])
        if(login_res?.data?.length > 0) {
         this.$store.commit("setUser", login_res?.data[0])
         this.$router.push({name : "HomePage"})
        }
      }).catch(e => console.log(e))
    }
  }
}
</script>