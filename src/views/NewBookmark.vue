<template>
     <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
      <input v-model="userData.head" type="text" placeholder="Başlık" class="input mb-3" />
      <input v-model="userData.url" type="text" placeholder="URL" class="input mb-3" />
      <select class="input mb-3" @change="switchView( $event.target.selectedIndex)">
        <option disabled value="" selected>Kategori</option>
        <option v-for="item in categories" :key="item.id" value="">{{ item.category }}</option>
      </select>
      <textarea v-model="userData.description" placeholder="Açıklama" class="input mb-3" cols="30" rows="10"></textarea>
      <div class="flex items-center justify-end gap-x-1">
        <button @click="$router.push({name : 'HomePage'})" class="secondary-button">İptal</button>
        <button @click="onSave" class="default-button">Kaydet</button>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      categories : [],
      userData : {
        head : null,
        url : null,
        categoryId : null,
        description : null
      }
    }
  },
  mounted() {
    this.$appAxios.get('/categories')
    .then(res => {
      this.categories = res.data
    })
  },
  methods : {
    onSave() {
      const savedData = {
        ...this.userData,
        userId : this._getCurrentUser?.id,
        created_At : new Date()
      }
      this.$appAxios.post('/bookmarks', savedData )
      .then(res => {
        console.log( res)
       this.becomeNull(this.userData)
      })
      this.$router.push({ name : "HomePage"})
    },
    switchView(selectedIndex){   
      this.userData.categoryId = selectedIndex;
    },
    becomeNull(arr){
      Object.keys(arr).forEach(i => arr[i] = null)
    }
  },
  computed : {
    ...mapGetters(["_getCurrentUser"])
  }
}
</script>