<template>
    <div class="row justify-content-center">
        <div class="col-md-6 bgbd">
            <!-- แบบ Forms -->
            <h1 class="d-flex justify-content-center formtitle-1">แก้ไขข้อมูล</h1>
            <form @submit.prevent="updateCompanyData">
                <div class="form-group">
                    <label for="thaiName">ชื่อสถานประกอบการ/หน่วยงาน (ภาษาไทย)</label>
                    <input type="text" class="form-control" v-model="Companys.thaiName" required>
                </div>
                <div class="form-group">
                    <label for="engName">ชื่อสถานประกอบการ/หน่วยงาน (ภาษาอังกฤษ)</label>
                    <input type="text" class="form-control" v-model="Companys.engName" required>
                </div>
                <div class="form-group">
                    <label for="address">ที่อยู่</label>
                    <input type="text" class="form-control" v-model="Companys.address" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" v-model="Companys.email" required>
                </div>
                <div class="form-group">
                    <label for="phone">เบอร์โทรศัพท์</label>
                    <input type="text" class="form-control" v-model="Companys.phone" required>
                </div>
                <div class="form-group">
                    <label for="managerName">ชื่อผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (ชื่อ-สกุล)</label>
                    <input type="text" class="form-control" v-model="Companys.managerName" required>
                </div>
                <div class="form-group">
                    <label for="managerPosition">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (ตำแหน่ง)</label>
                    <input type="text" class="form-control" v-model="Companys.managerPosition" required>
                </div>
                <div class="form-group">
                    <label for="managerDepartment">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (แผนก)</label>
                    <input type="text" class="form-control" v-model="Companys.managerDepartment" required>
                </div>
                <div class="form-group">
                    <label for="managerPhone">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (เบอร์โทรศัพท์)</label>
                    <input type="text" class="form-control" v-model="Companys.managerPhone" required>
                </div>
                <div class="form-group">
                    <label for="managerEmail">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (อีเมล)</label>
                    <input type="text" class="form-control" v-model="Companys.managerEmail" required>
                </div>

                <!-- Check Box ติดต่อประสานงาน -->
                <label for="contact" class="">หากมหาวิทยาลัยฯ ประสงค์จะติดต่อประสานงานในรายละเอียดกับสถานประกอบการ/หน่วยงาน ขอให้ติดต่อที่ใคร</label>
                <div class="form-group">
                     <input  
                     type="radio" 
                     class="btn-check" 
                     value="ติดต่อโดยตรงกับผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ" 
                     id="contact1" 
                     v-model="Companys.contact" 
                     required>
                     <label class="btn btn-focus mt-2" for="contact1">
                     ติดต่อโดยตรงกับผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ
                     </label>
                </div>
                <div class="form-group">
                     <input  
                     type="radio"
                     class="btn-check" 
                     value="ติดต่อกับบุคคลที่ สถานประกอบการ/หน่วยงาน มอบหมายต่อไปนี้ (หากตอบข้อนี้กรุณาตอบคำถามด้านล่าง)" 
                     id="contact2" 
                     v-model="Companys.contact" 
                     required>
                     <label class="btn btn-focus mt-2" for="contact2">
                     ติดต่อกับบุคคลที่ สถานประกอบการ/หน่วยงาน มอบหมายต่อไปนี้ (หากตอบข้อนี้กรุณาตอบคำถามด้านล่าง)
                     </label>
                </div>

                <div class="form-group">
                    <label for="coordinatorDetails">หากข้อที่แล้วตอบข้อ 2 โปรดใส่รายละเอียดของผู้ประสานงานของสถานประกอบการ/หน่วยงาน ผู้ประสานงานของสถานประกอบการ/หน่วยงาน (ชื่อ-สกุล, ตำแหน่ง, แผนก, โทรศัพท์, อีเมล)</label>
                    <input type="text" class="form-control" v-model="Companys.coordinatorDetails" required>
                </div>
                <div class="form-group">
                    <label for="projectName">ชื่อโครงการ</label>
                    <input type="text" class="form-control" v-model="Companys.projectName" required>
                </div>
                <div class="form-group">
                    <label for="projectObjective">วัตถุประสงค์ของโครงการ</label>
                    <input type="text" class="form-control" v-model="Companys.projectObjective" required>
                </div>
                <div class="form-group">
                    <label for="projectPeriod">ระยะเวลาของโครงการ ตั้งแต่เดือนไหนถึงเดือนไหน</label>
                    <input type="text" class="form-control" v-model="Companys.projectPeriod" required>
                </div>
                <div class="form-group">
                    <label for="studentQuantityRequire">จำนวนนักศึกษาที่ต้องการ</label>
                    <input type="number" class="form-control" v-model="Companys.studentQuantityRequire" required>
                </div>
                <div class="form-group">
                    <label for="projectDescription">ลักษณะงานที่นักศึกษาต้องปฏิบัติและรับผิดชอบ</label>
                    <input type="text" class="form-control" v-model="Companys.projectDescription" required>
                </div>
                <div class="form-group">
                    <label for="projectSkill">เครื่องมือและทักษะที่ต้องใช้ในการทำโครงการ</label>
                    <input type="text" class="form-control" v-model="Companys.projectSkill" required>
                </div>
                <div class="form-group">
                    <label for="projectSalary">เงินเดือนฝึกงาน</label>
                    <input type="text" class="form-control" v-model="Companys.projectSalary" required>
                </div>
                <div class="form-group">
                    <label for="projectMentor">พี่เลี้ยงประจำโครงการ (มีได้มากกว่า 1 คน) โปรดใส่ ชื่อ-สกุล ตำแหน่ง เบอร์โทรศัพท์ และอีเมล</label>
                    <input type="text" class="form-control" v-model="Companys.projectMentor" required>
                </div>

                <!-- Check Box สถานที่ทำงาน -->
                <label for="workLocation" class="check-button">สถานที่ปฏิบัติการ</label>
                <div class="form-group buttonfocus">
                     <input  
                     type="radio" 
                     class="btn-check" 
                     value="บริษัท" 
                     id="workLocation1" 
                     v-model="Companys.workLocation" 
                     required>
                     <label class="btn btn-focus mt-2" for="workLocation1">
                     บริษัท
                     </label>
                </div>
                <div class="form-group buttonfocus">
                     <input  
                     type="radio"
                     class="btn-check btn-focus" 
                     value="Work From Home" 
                     id="workLocation2" 
                     v-model="Companys.workLocation" 
                     required>
                     <label class="btn btn-focus mt-2" for="workLocation2">
                     Work From Home
                     </label>
                </div>

                <div class="form-group">
                    <label for="projectInformantName">ลงชื่อผู้ให้ข้อมูลนี้</label>
                    <input type="text" class="form-control" v-model="Companys.projectInformantName" required>
                </div>
                <div class="form-group">
                    <label for="projectInformantPosition">ตำแหน่งผู้ให้ข้อมูลนี้</label>
                    <input type="text" class="form-control" v-model="Companys.projectInformantPosition" required>
                </div>
                
                <!-- Submit Button -->
                <div class="form-group d-flex justify-content-center">
                    <button class="btn submit-btn mt-5">บันทึกข้อมูล</button>
                </div>
                     

            </form>
        </div>
    </div>
</template>

<script>
import { companyCollection } from "@/Firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
export default {
  data() {
    return {
      companyDataId:null,
      companyDoc:null,
      Companys: {
      thaiName:null,
      engName:null,
      address:null,
      email:null,
      phone:null,
      managerName:null,
      managerPosition:null,
      managerDepartment:null,
      managerPhone:null,
      managerEmail:null,
      contact:null,
      coordinatorDetails:null,
      projectName:null,
      projectObjective:null,
      projectPeriod:null,
      studentQuantityRequire:null,
      projectDescription:null,
      projectSkill:null,
      projectSalary:null,
      projectMentor:null,
      workLocation:null,
      projectInformantName:null,
      projectInformantPosition:null,
      }
    };
    },
  methods: {
    async getCompany() {
      let companyRef = doc(companyCollection, this.companyDataId);
      this.companyDoc = companyRef;
      let company = await getDoc(this.companyDoc);
      let companyData = company.data();
      this.Companys.thaiName = companyData.thaiName;
      this.Companys.engName = companyData.engName;
      this.Companys.address = companyData.address;
      this.Companys.email = companyData.email;
      this.Companys.phone = companyData.phone;
      this.Companys.managerName = companyData.managerName;
      this.Companys.managerPosition = companyData.managerPosition;
      this.Companys.managerDepartment = companyData.managerDepartment;
      this.Companys.managerPhone = companyData.managerPhone;
      this.Companys.managerEmail = companyData.managerEmail;
      this.Companys.contact = companyData.contact;
      this.Companys.coordinatorDetails = companyData.coordinatorDetails;
      this.Companys.projectName = companyData.projectName;
      this.Companys.projectObjective = companyData.projectObjective;
      this.Companys.projectPeriod = companyData.projectPeriod;
      this.Companys.studentQuantityRequire = companyData.studentQuantityRequire;
      this.Companys.projectDescription = companyData.projectDescription;
      this.Companys.projectSkill = companyData.projectSkill;
      this.Companys.projectSalary = companyData.projectSalary;
      this.Companys.projectMentor = companyData.projectMentor;
      this.Companys.workLocation = companyData.workLocation;
      this.Companys.projectInformantName = companyData.projectInformantName;
      this.Companys.projectInformantPosition = companyData.projectInformantPosition;
    },
    async updateCompanyData() {
      await setDoc(this.companyDoc, {
        ...this.Companys,
        approveStatus:'false'});
      alert(
        `อัพเดตข้อมูลเรียบร้อยแล้ว`
      );
      this.$router.go("/CompanyView");
    },
  },
  created() {
    let companyDataId = this.$route.params.companyDataId;
    this.companyDataId = companyDataId;
    this.getCompany();
  },
};
// import axios from 'axios';
// export default {
//     data() {
//         return {
//             company: {}
//         }
//     },
//     created() {
//         let apiURL = `http://localhost:4000/APIcompany/edit-company/${this.$route.params.id}`;
//         axios.get(apiURL).then((res) => {
//             this.company = res.data
//         })
//     },
//     methods: {
//         handleUpdateForm() {
//             let apiURL = `http://localhost:4000/APIcompany/update-company/${this.$route.params.id}`;
//             axios.put(apiURL, this.company).then((res) => {
//                 console.log(res);
//                 this.$router.push('/CompanyView')
//             }).catch(error => {
//                 console.log(error)
//             })
//         }
//     }
// }
</script>

<style scoped>
* {
  box-sizing: border-box;
}
/* Body */
h1 {
    transform: translateY(100px);
    animation: expandForm 0.3s ease-in-out forwards 0s;
}
label,input {
  line-height: 28px;
}
button {
  border: 1px solid var(--contrast-color);
  border-radius: 50px;
  padding: 8px 12px;
  font-size: 16px;
  text-transform: uppercase;
  position: relative;
  margin-top: 15px;
  outline: none;
  transform: translateY(100px);
  animation: expandForm 0.3s ease-in-out  forwards 0s;
}
div.bgbd {
    border-radius: 30px;
    background: white;
    border: 0.3rem solid #FF6E30 ;
    width: 80rem;
    height: 126rem;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    animation: expand 0.5s ease-in-out forwards 0s;

}
.submit-btn {
  margin: auto;
  display: block;
  width: 75rem;
  padding: 10px 20px;
  border: 2px solid #FF6E30;
  border-radius: 50px;
  color: black;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  transition: .3s ease;
}
.submit-btn:hover {
  background:#FF6E30 ;
  color: white;
}
.btn-focus {
  background:white ;
  color: black;
  border: 2px solid #FF6E30;
}
.btn-focus:hover {
  background:#FF6E30 ;
  color: white;
}
.btn-focus:active, .btn-focus:focus {
  background-color: #FF6E30;
  color:white;
}

.formtitle-1 {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  background-color: #FF6E30;
  border: 0;
  border-radius: 56px;
  color: #fff;
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
}
.formtitle-1:before {
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

/* Animation */
@keyframes slideIn {
  0% {
    transform: translateX(500px) scale(.2);
  }
  100% {
    transform: translateX(0px) scale(1);
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(200px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes expand {
  0% {
    transform: translateX(500px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes expandForm {
  0% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0px);
  }
}


</style>