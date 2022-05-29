<template>
    <div class="row justify-content-center">
     <h3>User : {{email}} </h3> 
        <div class="col-md-12">  
            <!-- Display Student Content -->
            <h1 class="mb-4">ข้อมูลโครงการสหกิจ (Admin) 
              <!-- <button class="btn btn-primary manage-btn" @click="manageCompanyData()">จัดการข้อมูล</button> -->
              </h1>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-hover">
                        <thead class="table table-striped thead-light clm" style="background-color: #FF6E30">
                            <tr>
                                <th class="col-1">ชื่อบริษัท</th>
                                <th class="col-1">ที่อยู่</th>
                                <th class="col-1">เบอร์โทร</th>
                                <th class="col-1">ผู้จัดการโครงการ/หัวหน้า</th>
                                <th class="col-1">ชื่อโครงการ</th>
                                <th class="col-1">วัตถุประสงค์ของโครงการ</th>
                                <th class="col-1">ระยะเวลาของโครงการ</th>
                                <th class="col-1">จำนวนนักศึกษาที่ต้องการ</th>
                                <th class="col-1">ลักษณะงาน</th>
                                <th class="col-1">เครื่องมือและทักษะที่ต้องใช้</th>
                                <th class="col-1">ระดับบริษัท</th>
                                <th class="col-2">สถานะการอนุมัติ</th>
                                <th class="col-1">จัดการข้อมูล</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="company in Companys" :key="company.id">
                                 <td>{{ company.thaiName }}</td>
                                 <td>{{ company.address }}</td>
                                 <td>{{ company.phone }}</td>
                                 <td>{{ company.managerName }}</td>
                                 <td>{{ company.projectName }}</td>
                                 <td>{{ company.projectObjective }}</td>
                                 <td>{{ company.projectPeriod }}</td>
                                 <td>{{ company.studentQuantityRequire }}</td>
                                 <td>{{ company.projectDescription }}</td>
                                 <td>{{ company.projectSkill }}</td>
                                 <td v-if="company.companyLevel >= 3">ดีมาก</td>
                                 <td v-else-if="company.companyLevel == 2">ดี</td>
                                 <td v-else>พอใช้</td>
                                 <td v-if="company.approveStatus === true">Approved</td>
                                 <td v-else>Not Approve</td>

                                 <td>
                                    <button v-if="company.approveStatus === false" @click.prevent="approveCompany(company.id)" class="btn btn-primary approve-delete-btn">
                                         อนุมัติ
                                    </button>
                                    <button v-else @click.prevent="approveCompany(company.id)" class="btn btn-primary approve-delete-btn">
                                         ยกเลิกอนุมัติ
                                    </button>
                                    <button @click.prevent="deleteCompanyData(company.id)" class="btn btn-danger approve-delete-btn ">
                                         Delete
                                    </button>
                                    <select v-model="company.companyLevel" @change="onChange($event,company.id)">
                                            <option v-if="company.companyLevel == 1" disabled value="" > พอใช้ </option>
                                            <option v-else-if="company.companyLevel == 2" disabled value="" > ดี </option>
                                            <option v-else-if="company.companyLevel == 3" disabled value="" > ดีมาก </option>
                                            <option v-else disabled value=""> ระดับบริษัท </option>
                                            <option value="3">ดีมาก</option>
                                            <option value="2">ดี</option>
                                            <option value="1">พอใช้</option>
                                    </select>
                                 </td>                                   
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button v-if="manageCompany == true" class="btn btn-success manage-btn">บันทึกข้อมูล</button>
        </div>
    </div>
</template>

<script>
import { companyCollection } from "@/Firebase";
import { getDocs, doc, deleteDoc , getDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
 export default {
    data() {
        return {
            companyDataId:null,
            approveStatus:false,
            Companys: [],
            manageCompany:false,
            email:null
            };
            
        },

    methods: {
      // Get and List Company Data from Database //
       async fetchCompanyData() {
       let groupByCompany = query(companyCollection,orderBy("thaiName", "desc"))
       let companySnapShot = await getDocs(groupByCompany);
       let Companys = [];
       companySnapShot.forEach((company) => {
         let companyData = company.data();
         companyData.id = company.id;
         Companys.push(companyData);
       });
       this.Companys = Companys;
    },


      // Delete Company from Database //
    async deleteCompanyData(companyDataId) {
       if(window.confirm("ต้องการลบข้อมูลใช่หรือไม่?")) {
       let companyRef = doc(companyCollection, companyDataId);
       await deleteDoc(companyRef);
       alert("ลบข้อมูลสำเร็จ");
       this.$router.go("/CompanyView");
       };
      }, 

      // Add Approve Status to Database //
      async approveCompany(companyDataId) {
       let companyRef = doc(companyCollection, companyDataId);
       this.companyDoc = companyRef;
       let company = await getDoc(this.companyDoc);
       let companyData = company.data();
       this.Companys.approveStatus = companyData.approveStatus;
       this.Companys.thaiName = companyData.thaiName;
       this.Companys.projectName = companyData.projectName;
       let approveMsg = '';
       if(this.Companys.approveStatus == false) {
         approveMsg = "อนุมัติ";
       }
       else {
         approveMsg = "ยกเลิกอนุมัติ";
       }
       if(window.confirm(("คุณต้องการ" + approveMsg + "โครงการ : " + companyData.projectName + " ของบริษัท :  " + companyData.thaiName) + " ใช่หรือไม่?") == true ) { 
       this.Companys.approveStatus = !this.Companys.approveStatus;
       await updateDoc(companyRef, {approveStatus:(this.Companys.approveStatus) });
       alert(approveMsg + "เรียบร้อยแล้ว");
       }
       this.$router.go("/CompanyView");
       return companyRef = doc(companyCollection, companyDataId);
      },

      // Add Company Level to Database //
      async onChange(event,companyDataId) {
        let companyRef = doc(companyCollection, companyDataId) ;
        this.companyDoc = companyRef;
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        this.Companys.companyLevel = companyData.companyLevel;
              if(event.target.value > 0) {
                  await updateDoc(companyRef, {companyLevel:(event.target.value) });
          }
 },
    },
 
    created() {
     this.fetchCompanyData();
     const auth = getAuth();
      const user = auth.currentUser;
      this.email = user.email
   }
 }

</script>

<style scoped>
select {
  width: 7rem;
  display: flex;
  justify-content: center;
}

.manage-btn {
  display: flex;
  justify-content: center;
  width: 7rem;
  float: right;
  margin-top: 0.5rem;
  margin-right:42rem;

}
.approve-delete-btn {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
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
    margin-left: 0;

    display: block;
    justify-content: center;
    animation: slideUp 1s ease-in-out 0s;
    width: 100%;
}
.fade-in {
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 1s;
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
</style>