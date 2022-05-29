<template>
    <div class="row justify-content-center">
        <div class="col-md-12">  
            <!-- Display Student Content -->
            <h1 class="mb-4">ข้อมูลนักศึกษา (Admin)</h1>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-hover">
                        <thead class="table table-striped thead-light clm" style="background-color: #FF6E30">
                            <tr>
                                <th>รหัสนักศึกษา</th>
                                <th>ชื่อ</th>
                                <th>นามสกุล</th>
                                <th>บริษัท - ตำแหน่ง (อันดับที่ 1)</th>
                                <th>บริษัท - ตำแหน่ง (อันดับที่ 2)</th>
                                <th>บริษัท - ตำแหน่ง (อันดับที่ 3)</th>
                                <th class="col-1">จัดการข้อมูล</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in Students" :key="student.id">
                                 <td>{{ student.studentID }}</td>
                                 <td>{{ student.firstName }}</td>
                                 <td>{{ student.lastName }}</td>
                                 <td>{{ student.firstChoice.companyNameAndProjectName }}
                                    <select v-model="student.firstChoice.result" @change="onChangeFirstChoice($event,student.id)" class="selectData">
                                      <option :value="true">ผ่าน</option>
                                      <option :value="false">ไม่ผ่าน</option>
                                      <option :value="''">รอผลสัมภาษณ์</option>
                                    </select>
                                  </td>
                                 <td>
                                   {{ student.secondChoice.companyNameAndProjectName }}
                                      <select v-model="student.secondChoice.result" @change="onChangeSecondChoice($event,student.id)" class="selectData">
                                      <option :value="true">ผ่าน</option>
                                      <option :value="false">ไม่ผ่าน</option>
                                      <option :value="''">รอผลสัมภาษณ์</option>
                                    </select>
                                </td>
                                 <td>
                                    {{ student.thirdChoice.companyNameAndProjectName }}
                                    <select v-model="student.thirdChoice.result" @change="onChangeThirdChoice($event,student.id)" class="selectData">
                                      <option :value="true">ผ่าน</option>
                                      <option :value="false">ไม่ผ่าน</option>
                                      <option :value="''">รอผลสัมภาษณ์</option>
                                    </select>
                                </td>
                                 <td>
                                    <router-link :to="{ path: `/EditStudent/${student.id}` }" class="btn btn-success" id="button">
                                         Edit
                                    </router-link>
                                    <button @click.prevent="deleteStudentData(student.id)" class="btn btn-danger">
                                         Delete
                                    </button>
                                 </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { studentCollection } from "@/Firebase";
import { getDocs, doc, deleteDoc, getDoc, updateDoc, query, orderBy} from "firebase/firestore";
    export default {
    data() {
                return {
                    studentDoc:null,
                    Students: [],
                };
            },
    methods: {
       async fetchStudentData() {
        const orderByDateTime = query(studentCollection, orderBy("SubmitDateTime", "asc"))
        const studentSnapShot = await getDocs(orderByDateTime);
        let Students = [];
       studentSnapShot.forEach((student) => {
        let studentData = student.data();
        studentData.id = student.id;
        Students.push(studentData);
       });
       this.Students = Students;
    },
    async deleteStudentData(studentDataId) {
      if(window.confirm("ต้องการลบข้อมูลใช่หรือไม่?")) {
      let studentRef = doc(studentCollection, studentDataId);
       await deleteDoc(studentRef);
       alert("ลบข้อมูลสำเร็จ");
       this.$router.go("/StudentView");
       }
      },
      async onChangeFirstChoice(event,studentDataId) {
        let studentRef = doc(studentCollection, studentDataId) ;
        this.studentDoc = studentRef;
        let student = await getDoc(this.studentDoc);
        let studentData = student.data();
        this.Students.firstChoice = studentData.firstChoice;
        await updateDoc(studentRef, {'firstChoice.result':event.target.value});
        
        },

        async onChangeSecondChoice(event,studentDataId) {
        let studentRef = doc(studentCollection, studentDataId) ;
        this.studentDoc = studentRef;
        let student = await getDoc(this.studentDoc);
        let studentData = student.data();
        this.Students.secondChoice = studentData.secondChoice;
        await updateDoc(studentRef, {'secondChoice.result':event.target.value});
        },

        async onChangeThirdChoice(event,studentDataId) {
        let studentRef = doc(studentCollection, studentDataId) ;
        this.studentDoc = studentRef;
        let student = await getDoc(this.studentDoc);
        let studentData = student.data();
        this.Students.thirdChoice = studentData.thirdChoice;
        await updateDoc(studentRef, {'thirdChoice.result':event.target.value});
        }
 },
  created() {
     this.fetchStudentData();
   },
 };
</script>
    //  created() {
    //     let apiURL = 'http://localhost:4000/APIstudent';
    //     axios.get(apiURL).then(res => {
    //         this.Students = res.data
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // },
    // methods: {
    //     deleteStudent(id) {
    //         let apiURL = `http://localhost:4000/APIstudent/delete-student/${id}`;
    //         let indexOfArrayItem = this.Students.findIndex(i => i._id === id);
    //         if (window.confirm("Do you really want to delete?")) {
    //             axios.delete(apiURL).then(() => {
    //                 this.Students.splice(indexOfArrayItem, 1)
    //             }).catch(error => {
    //                 console.log(error)
    //             })
    //         }
    //     }
    // }

<style scoped>
.btn {
  margin-right: 0;
  margin-left: 0;
  width: 7rem;
  justify-content: center;
  margin: 0.07rem;
  text-align: center;
  margin-bottom: 0.3rem;
}
th,tr {
    text-align: center;
}
#button{
    margin-right: 5px;
    
}
.clm{
    border: 0.2rem solid #FF6E30;
    border-radius: 10px;
    color: white;
}
table{
    animation: slideUp 1s ease-in-out 0s;
}

td {
  justify-content: center;
}

.selectData {
  display: flex;
  margin-top:0.7rem;
  margin-right: auto;
  margin-left: auto;
  width: 8rem;
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
    transform: translateX(1400px);
  }
  100% {
    transform: translateX(0px);
  }
}

.result-btn-wait {
  margin-top:0.7rem;
  margin-right: auto;
  margin-left: auto;
  width: 8rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  background-color: #FF6E30;
  border: 0;
  border-radius: 5px;
  color: white;
  border: 2px solid #FF6E30;
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  font-size: 18px;
  font-weight: 300;
  outline: 0;
  position: relative;
  text-align: center;
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
}

.result-btn-pass {
  margin-top:0.7rem;
  margin-right: auto;
  margin-left: auto;
  width: 8rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  background-color: #4CAF50;
  border: 0;
  border-radius: 5px;
  color: white;
  border: px solid #4CAF50;
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  font-size: 20px;
  font-weight: 100;
  outline: 0;
  position: relative;
  text-align: center;
  transition: all .3s;
  user-select: none;
}

.result-btn-not-pass {
  margin-top:0.7rem;
  margin-right: auto;
  margin-left: auto;
  width: 8rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  background-color: #f44336;
  border-radius: 5px;
  color: white;
  border: 2px solid #f44336;
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  font-size: 20px;
  font-weight: 100;
  outline: 0;
  text-align: center;
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
}
</style>