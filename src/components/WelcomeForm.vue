<template>
<div class="d-flex flex-row float-left">
  <div class="student-form">
      <div id="border" class="card text-black bg-light mb-3" style="width: 40rem; height: 25rem">
        <div class="card-body">
            <h5 class="card-title">แบบฟอร์มสำหรับนักศึกษาลงทะเบียนสหกิจศึกษา</h5>
               <router-link to="/StudentForm" class="text-decoration-none"><button class="button-71 d-flex justify-content-center wing" role="button">คลิกที่นี่</button></router-link>
               
      </div>
    </div>
  </div>
  <div class="d-flex flex-row float-right ms-5">
    <div class="company-form">
    <div id="border" class="card text-black bg-light mb-3" style="width: 40rem; height: 25rem">
        <div class="card-body">
            <h5 class="card-title">แบบฟอร์มสำหรับบริษัทเสนอโครงการสหกิจศึกษา</h5>
               <router-link to="/CompanyForm" class="text-decoration-none"><button class="button-71 d-flex justify-content-center wing" role="button">คลิกที่นี่</button></router-link>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<style scoped>
.student-form, .company-form {
  font-weight: bolder;
}
.student-form {
  animation: expandLeft 0.5s ease-in-out forwards 0s;
}
.company-form {
  animation: expandRight 0.5s ease-in-out forwards 0s;
}
div#border {
    border-radius: 30px;
    
    border: 3px solid #FF6E30;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    background: white;
}
h5{
    text-align: center;
    margin-top: 8rem;
    margin-bottom: 2rem;

}
.button-71 {
  margin: 0 auto;
  background-color: #FF6E30;
  border: 0;
  border-radius: 56px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  font-size: 18px;
  font-weight: 600;
  outline: 0;
  padding: 16px 21px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  animation: wiggle
}

.button-71:before {
  background-color: initial;
  background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
  border-radius: 125px;
  content: "";
  height: 50%;
  left: 4%;
  opacity: .5;
  position: absolute;
  top: 0;
  transition: all .3s;
  width: 92%;
}

.button-71:hover {
  box-shadow: rgba(255, 255, 255, .2) 0 3px 15px inset, rgba(0, 0, 0, .1) 0 3px 5px, rgba(0, 0, 0, .1) 0 10px 13px;
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .button-71 {
    padding: 16px 48px;
  }
}
@keyframes expandLeft {
  0% {
    transform: translateX(-500px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes expandRight {
  0% {
    transform: translateX(500px);
  }
  100% {
    transform: translateX(0px);
  }
}

/* .wing {
  animation: wiggle 2s linear infinite;
} */
@keyframes wiggle {
  0%, 7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-15deg);
  }
  20% {
    transform: rotateZ(10deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  30% {
    transform: rotateZ(6deg);
  }
  35% {
    transform: rotateZ(-4deg);
  }
  40%, 100% {
    transform: rotateZ(0);
  }
}
</style>

