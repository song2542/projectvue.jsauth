<template>
  <div>
    <label >upload</label>
      <input type="file" @change="handleChange" >
      <br>
      <button @click="pause">หยุด</button>
      <p>{{progress}}%</p>
  </div>
  
</template>

<script>

import { storage } from '@/Firebase';
import {  ref, uploadBytesResumable } from "firebase/storage";
export default {
data(){
    return{
      uploadTask: null,
      paused:false,
      progress:0
    }
},
methods:{
   handleChange(e){
     const file = e.target.files[0]
     const storageRef = ref(storage, file.name);
     this.uploadTask = uploadBytesResumable(storageRef,file)
     this.uploadTask.on('state_changed',(snapshot) => {
    this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(error.message)
  }, 
  () => {
    getDownloadURL(this.uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  },)
     this.paused = false
   },
   pause(){
     if(this.paused == true){
       this.uploadTask.pause()
       this.paused = true
     }
     else{
       this.uploadTask.resume()
       this.paused = false
     }
   }
        
    }
}

</script>

<style >


</style>