<template>
     <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Register</h3>
      <input v-model="userData.fullname" type="text" placeholder="Tam Ad" class="input mb-3" />
      <input v-model="userData.username" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
      <input v-model="userData.password" type="password" placeholder="Şifre" class="input mb-3" />
      <button @click="sendData" class="default-button">Kayıt ol</button>
      <span class="text-center mt-3 text-sm">
        Zaten Üyeyim,
        <router-link class="text-red-900 hover:text-black" :to="{name : 'LoginPage'}">Giriş yap!</router-link>
      </span>
    </div>
</template>
<script>
import CryptoJs from "crypto-js"
export default {
  data() {
    return {
      userData : {
        username : null,
        fullname : null,
        password : null
      }
    }
  },
  methods : {
    sendData(){
      const password = CryptoJs.HmacSHA1(this.userData.password, this.$store.getters._saltKey).toString();
      this.$appAxios.post("/users" , {...this.userData , password}).then(resgistered_res => {
        console.log(resgistered_res)
        this.$router.push({name : "HomePage"})
      })
    }
  }
}
</script>