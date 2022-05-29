<template>
    <div class="row justify-content-center">
        <div class="col-md-12">  
            <!-- Display Student Content -->
            <h1 class="mb-4">ข้อมูลโครงการสหกิจ</h1>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-hover">
                        <thead class="table table-striped thead-light clm" style="background-color: #FF6E30">
                            <tr>
                                <th class="">ชื่อบริษัท</th>
                                <th class="col-1">ที่อยู่</th>
                                <th class="col-1">เบอร์โทร</th>
                                <th class="">ผู้จัดการโครงการ/หัวหน้า</th>
                                <th class="">ชื่อโครงการ</th>
                                <th class="">วัตถุประสงค์ของโครงการ</th>
                                <th class="col-1">ระยะเวลาของโครงการ</th>
                                <th class="col-1">จำนวนนักศึกษาที่ต้องการ</th>
                                <th class="col-1">ลักษณะงาน</th>
                                <th class="col-1">เครื่องมือและทักษะที่ต้องใช้</th>
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
                                 <td>
                                 
                                    <router-link :to="{path: `/CompanyViewDetails/${company.id}`}" class="btn btn-primary" id="button">
                                         รายละเอียด
                                    </router-link>
                                    <button @click.prevent="deleteCompanyData(company.id)" class="btn btn-danger">
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
import { companyCollection } from "@/Firebase";
import { getDocs, query, where, deleteDoc, doc,  } from 'firebase/firestore'
 export default {
   
    data() {
        return {
            Companys: [],
            };
        },
    methods: {
       async fetchCompanyData() {
       const getApproveStatus = query(companyCollection, where("companyLevel", ">=", '1'));
       let companySnapShot = await getDocs(getApproveStatus); 
       let Companys = [];
       companySnapShot.forEach((company) => {
         let companyData = company.data();
         companyData.id = company.id;
         Companys.push(companyData);
       });
       this.Companys = Companys;
       
    },
    async deleteCompanyData(companyDataId) {
       if(window.confirm("ต้องการลบข้อมูลใช่หรือไม่?")) {
      let companyRef = doc(companyCollection, companyDataId);
       await deleteDoc(companyRef);
       alert("ลบข้อมูลสำเร็จ");
       this.$router.go("/CompanyView");
       }
      },
   },
  created() {
     this.fetchCompanyData();
   },
 };


</script>

<style scoped>
.btn {
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