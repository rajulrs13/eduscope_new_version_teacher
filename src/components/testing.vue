<template>
    <div>
        <img :src="myimg" alt="">
    </div>
</template>

<script>
import firebase from "./../firebase/firebase";
export default {
    data(){
        return{
            myimg:null

        }
    },
    created(){
        firebase.storage().ref().child(this.$store.getters.getUserId+'/'+'manipaal1.jpg').getDownloadURL().then(function(url){
            this.myimg = url
        })
    }
}
</script>
