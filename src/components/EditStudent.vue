<template>
    <div class="row justify-content-center">
        <div class="col-md-6 bgbd">
            <!-- Content goes here -->
            <h1 class="d-flex justify-content-center formtitle-1">แบบฟอร์มลงทะเบียนสหกิจศึกษา</h1>
            <form @submit.prevent="updateStudent">
                <div class="form-group">

                <!-- รหัสนักศึกษา -->
                    <label for="studentID">รหัสนักศึกษา</label>
                    <input type="text" class="form-control" v-model="Students.studentID" required>
                </div>

                <!-- ชื่อ  -->
                <div class="form-group">
                    <label for="firstName">ชื่อ</label>
                    <input type="text" class="form-control" v-model="Students.firstName" required>
                </div>

                <!-- นามสกุล  -->
                <div class="form-group">
                    <label for="lastName">นามสกุล</label>
                    <input type="text" class="form-control" v-model="Students.lastName" required>
                </div>

                <!-- Email  -->
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" v-model="Students.email" required>
                </div>

                <!-- เลือกบริษัท -->
                <label for="firstChoice">บริษัทที่ 1</label> 
                <br>
                   <select v-model="this.Students.firstChoice.companyNameAndProjectName" @change="onChangeFirstChoice($event)" >
                      <option disabled selected hidden>{{ this.Students.firstChoice.companyNameAndProjectName }}</option>
                      <option v-for="company in Companys" :key="company.id" :value="company.id"> {{ company.thaiName }} - {{ company.projectName }}</option> 
                </select>
                <br>
                <label for="firstChoice">บริษัทที่ 2</label> <br>
                    <select v-model="this.Students.secondChoice.companyNameAndProjectName" @change="onChangeSecondChoice($event)"> 
                      <option disabled selected hidden>{{ this.Students.secondChoice.companyNameAndProjectName }}</option>
                      <option v-for="company in Companys" :key="company.id" :value="company.id"> {{ company.thaiName }} - {{ company.projectName }}</option> 
                </select>
                <br>
                <label for="firstChoice">บริษัทที่ 3</label> <br>
                    <select v-model="this.Students.thirdChoice.companyNameAndProjectName" @change="onChangeThirdChoice($event)"> 
                <br>
                      <option disabled selected hidden>{{ this.Students.thirdChoice.companyNameAndProjectName }}</option>
                      <option v-for="company in Companys" :key="company.id" :value="company.id"> {{ company.thaiName }} - {{ company.projectName }}</option> 
                </select>
                
                <!--  เกรดเฉลี่ย  -->
                <div class="form-group">
                    <label for="gpm">เกรดเฉลี่ย</label>
                    <input type="text" class="form-control" v-model="Students.gpm" required>
                </div>

                <!-- สถานะ MVC -->
                <label for="mvcStatus" class="">สถานะ MVC</label>
                <div class="form-group">
                     <input  type="radio" class="btn-check" value="ผ่าน" id="option1" v-model="Students.mvcStatus" required>
                     <label class="btn btn-success mt-2" for="option1">
                     ผ่าน
                     </label>
                </div>
                <div class="form-group">
                     <input  type="radio" class="btn-check" value="ไม่ผ่าน" id="option2" v-model="Students.mvcStatus" required>
                     <label class="btn btn-danger mt-2" for="option2">
                     ไม่ผ่าน
                     </label>

                <!-- ปุ่มลงทะเบียน -->
                <div class="form-group">
                    <button class="btn btn-success col-12 mt-3">ลงทะเบียนสหกิจ</button>
                </div>                       
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { studentCollection,companyCollection } from '@/Firebase';
import { getDoc, getDocs, query, where, doc, setDoc } from 'firebase/firestore'
import { getAuth } from '@firebase/auth';

export default {
    data(){
        return{ 
                Companys: [],
                studentDataId:null,
                studentDoc:null,
                Students: {
                firstName:null,
                lastName:null,
                studentID:null,
                email:null,
                firstChoice:{},
                secondChoice:{},
                thirdChoice:{},
                gpm:null,
                mvcStatus:null,
                userId:null
      }
    };
      },
    methods: {
      async getStudentData() {
            const user = getAuth().currentUser;
            let studentRef = doc(studentCollection, this.studentDataId);
            this.studentDoc = studentRef;
            let student = await getDoc(this.studentDoc);
            let studentData = student.data();
            this.Students.firstName = studentData.firstName;
            this.Students.lastName = studentData.lastName;
            this.Students.studentID = studentData.studentID;
            this.Students.email = studentData.email;
            this.Students.firstChoice = studentData.firstChoice;
            this.Students.secondChoice = studentData.secondChoice;
            this.Students.thirdChoice = studentData.thirdChoice;
            this.Students.gpm = studentData.gpm;
            this.Students.mvcStatus = studentData.mvcStatus;
            this.Students.userId = user.uid;

      },
    async updateStudent() {
      await setDoc(this.studentDoc, this.Students);
      alert(
        `อัพเดตข้อมูลเรียบร้อยแล้ว`
      );
      this.$router.push("/StudentView");
    },

    // get Companydata in to database Companys //
    async getCompanyData() {
        const getApproveStatus = query(companyCollection, where("approveStatus", "==", true));
        let companySnapShot = await getDocs(getApproveStatus); 
        let Companys = [];
        companySnapShot.forEach((company) => {
        let companyData = company.data();
        companyData.id = company.id;
        Companys.push(companyData);
       });
        this.Companys = Companys;
       
    },
    // Put Value from option Select field in to Database -- firstChoice //
    onChangeFirstChoice(event){
      this.Students.firstChoice.companyId = event.target.value;
      var name = event.target.options[event.target.options.selectedIndex].text;
      this.Students.firstChoice.companyNameAndProjectName = name;

  },
    // Put Value from option Select field in to Database -- secondChoice //
    onChangeSecondChoice(event){
      this.Students.secondChoice.companyId = event.target.value
      var name = event.target.options[event.target.options.selectedIndex].text;
      this.Students.secondChoice.companyNameAndProjectName = name;

     
  },
    // Put Value from option Select field in to Database -- thirdChoice //
    onChangeThirdChoice(event){
      this.Students.thirdChoice.companyId = event.target.value
      var name = event.target.options[event.target.options.selectedIndex].text;
      this.Students.thirdChoice.companyNameAndProjectName = name;

     
  }
},
  created() {
    let studentDataId = this.$route.params.studentDataId;
    this.studentDataId = studentDataId;
    this.getCompanyData();
    this.getStudentData();

  }
}
//     // methods: {
//     //     createStudentData(){
//     //         let apiURL = 'http://localhost:4000/APIstudent/create-student'
//     //         axios.post(apiURL, this.student).then(() => {
//     //             this.$router.push('/view')
//     //             this.student = {
//     //             firstName:'',
//     //             lastName:'',
//     //             studentID:'',
//     //             email:'',
//     //             firstChoice:'',
//     //             secondChoice:'',
//     //             thirdChoice:'',
//     //             gpm:'',
//     //             mvcStatus:''

//     //             }
//     //         }).catch(error => {
//     //             console.log(error);
//     //         })
//     //     }
//     // }
// }
</script>

<style scoped>
* {
  box-sizing: border-box;
}
select {
  width: 15rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  border-radius: 0.4rem;

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
    height: 58rem;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    animation: expand 0.5s ease-in-out forwards 0s;
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