<template>
    <div>
                <router-link to="/AdminStudent" v-show="isLoggedIn === true" class="nav-link p-3">จัดการข้อมูลนักศึกษา</router-link>
                <router-link to="/AdminCompany" v-show="isLoggedIn === true" class="nav-link p-3" >จัดการข้อมูลบริษัท</router-link>

    </div>
</template>

<script setup>
import {onMounted, ref } from 'vue' // used for conditional rendering
import {getAuth , onAuthStateChanged ,signOut} from "firebase/auth"
import { useRouter } from 'vue-router';

const router = useRouter()

const isLoggedIn = ref(false);
let auth
onMounted(()=>{
  auth = getAuth()
  onAuthStateChanged(auth,(user)=>{
    if(user){
      isLoggedIn.value = true
    }else{
      isLoggedIn.value = false
    }
  })
})

</script>

<style>
.nav-link {
    text-decoration: none;
}
</style>