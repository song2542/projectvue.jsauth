<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-dark justify-content-between flex-nowrap flex-row" style="background-color: #FF6E30">
      <a href="https://www.kmitl.ac.th/"><img src="https://www.kmitl.ac.th/themes/custom/kmitl/logo.svg"  width="100" height="100" class="d-inline-block align-top p-2"></a>
       <div class="container">
          <router-link to="/" class="navbar-brand float-left"><h4>COMPUTER - SCIENCE</h4></router-link>
          <ul class="nav navbar-nav flex-row float-right">
            <li class="nav-item">
              </li>
             <li class="nav-item">
                <router-link to="/StudentForm" v-show="isLoggedIn === true" class="nav-link p-3" >แบบฟอร์มนักศึกษา</router-link>     
              </li>
              <li class="nav-item">
                <router-link to="/CompanyForm" v-show="isLoggedIn === true" class="nav-link p-3" >แบบฟอร์มบริษัท</router-link>     
              </li>
              <li class="nav-item">
                <router-link to="/StudentView" v-show="isLoggedIn === true" class="nav-link p-3" >ดูข้อมูลลงทะเบียนนสหกิจ</router-link>     
              </li>
              <li class="nav-item">
                <router-link to="/CompanyView" v-show="isLoggedIn === true" class="nav-link p-3" >ดูข้อมูลโครงการสหกิจ</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/AdminHandle" v-show="isLoggedIn === true" class="nav-link p-3" >Admin</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/CalendarView" class="nav-link p-3">ปฏิทินกิจกรรม</router-link>
              </li>
          </ul>
       </div>
       <div v-if="isLoggedIn === true" class="logIn-logOut-Position">
       <button class="logOut-button-pushable" role="button" @click="handleSignOut">
  <span class="logOut-button-shadow"></span>
  <span class="logOut-button-edge"></span>
  <span class="logOut-button-front text d-flex justify-content-center">
    LogOut
  </span>
  </button>
      </div>
      <div v-else class="logIn-logOut-Position">
  <button class="logIn-button-pushable" role="button"><router-link to="/Login" class="text-decoration-none">
  <span class="logIn-button-shadow"></span>
  <span class="logIn-button-edge"></span>
  <span class="logIn-button-front d-flex justify-content-center">
    LogIn
  </span>
  </router-link>
  </button>
  </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
       <router-view></router-view>
    </div>
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

const handleSignOut = () =>{
  if (isLoggedIn.value === false ){
    alert("คุณยังไม่ได้เข้าสู่ระบบ");
  }else{
  if (window.confirm("ต้องการออกจากระบบใช่หรือไม่?")) {
  signOut(auth).then(()=>{
    alert("ออกจากระบบสำเร็จ");
    router.push("/Login");
  }
  )
  }
  return{
    handleSignOut
  }
}
}
const youAreNotUser = () => {
  if (isLoggedIn.value === false){
    alert("กรุณาเข้าสู่ระบบ");
  }
}
const youAreUser = () => {
  if (isLoggedIn.value === true) {
    alert("คุณได้เข้าสู่ระบบแล้ว");
    router.push("/");
  }
}
// Show or Hide Login - Logout Button //
// const loggedOutBtns = document.querySelectorAll('.logged-out');
// const loggedInBtns = document.querySelectorAll('.logged-in');

// onAuthStateChanged(auth,(user) => {
//   if (user) {
//     loggedInBtns.forEach(link => link.style.display = 'block');
//     loggedOutBtns.forEach(link => link.style.display = 'none');

//     // We can add more functions here to display the data that can be made available to a logged in user

//   } else {
//     loggedInBtns.forEach(link => link.style.display = 'none');
//     loggedOutBtns.forEach(link => link.style.display = 'block');
//   }
// });
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=Orelega+One&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h4 {
  font-size: 1.5rem;
  margin: 0;
  font-family: 'Orelega One', cursive;
}
.logIn-logOut-Position {
  margin-top: -2.5rem;
}
.logOut-button-pushable {
  width:6rem;
  height: 3rem;
  float: right;
  margin-top: 3px;
  margin-right: 0.5rem;
  margin-bottom: auto;
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.logOut-button-shadow {
    width:6rem;
  height: 3rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

.logOut-button-edge {
  width:6rem;
  height: 3rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
}

.logOut-button-front {
  width:6rem;
  height: 3rem;
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: hsl(345deg 100% 47%);
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

@media (min-width: 768px) {
  .button-82-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.logOut-button-pushable:hover {
  filter: brightness(110%);
  -webkit-filter: brightness(110%);
}

.logOut-button-pushable:hover .logOut-button-front {
  transform: translateY(-6px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

.logOut-button-pushable:active .logOut-button-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.logOut-button-pushable:hover .logOut-button-shadow {
  transform: translateY(4px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

.logOut-button-pushable:active .logOut-button-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.logOut-button-pushable:focus:not(:focus-visible) {
  outline: none;
}







.logIn-button-pushable {
  width:6rem;
  height: 3rem;
  float: right;
  margin-top: 3px;
  margin-right: 0.5rem;
  margin-bottom: auto;
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.logIn-button-shadow {
  width:6rem;
  height: 3rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

.logIn-button-edge {
  width:6rem;
  height: 3rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to left,
    rgb(14, 135, 27) 0%,
    rgb(38, 197, 54) 8%,
    rgba(14, 135, 27) 92%,
    rgb(38, 197, 54) 100%
  );
}

.logIn-button-front {
  width:6rem;
  height: 3rem;
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: #0bc91e;
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

@media (min-width: 768px) {
  .button-82-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.logIn-button-pushable:hover {
  filter: brightness(110%);
  -webkit-filter: brightness(110%);
}

.logIn-button-pushable:hover .logIn-button-front {
  transform: translateY(-6px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

.logIn-button-pushable:active .logIn-button-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.logIn-button-pushable:hover .logIn-button-shadow {
  transform: translateY(4px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

.logIn-button-pushable:active .logIn-button-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.logIn-button-pushable:focus:not(:focus-visible) {
  outline: none;
}
</style>
