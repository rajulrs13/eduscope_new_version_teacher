<template>
<v-container>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card hover raised>
                <v-card-title class="grey lighten-3">
                    <h1 class="font-weight-light">Contact Us</h1>
                </v-card-title>
                <v-card-text>                                    
                     <v-layout row wrap class="my-1">
                        <v-flex xs12 class="my-3">
                            <div class="text-xs-center">                              
                                <h2 class="px-5 font-weight-light">For any queries or account related issues feel free to contact anyone of us!</h2>
                            </div>
                        </v-flex>
                        <!-- Rajul -->
                        <v-flex xs12 sm6 class="text-xs-center">
                            <v-card class="elevation-0 transparent" flat>
                                <v-card-title primary-title>
                                    <v-layout row wrap justify-center>
                                        <v-flex xs12 class="text-xs-center">
                                            <v-avatar class="image" size=100>
                                                <img
                                                      :src="rajul"
                                                      alt="Rajul"
                                                    >
                                                  </v-avatar>
                                        </v-flex>
                                        <v-flex xs12 class="text-xs-center mt-3">
                                            <h2 class="text-xs-center font-weight-light" style="font-family:'Monospace'; font-size:25px;">Rajul Saxena</h2>
                                        </v-flex>
                                    </v-layout>
                                </v-card-title>
                                <v-list class="transparent">
                                    <v-list-tile>
                                        <v-layout row wrap>
                                            <v-flex class="ml-3">
                                                <v-icon class="teal--text" left>fas fa-phone-volume</v-icon>
                                                <a href="tel:+918285437376" style="text-decoration:none; color:black"><span class="ml-2">+91-8285437376</span></a>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-layout row wrap>
                                            <v-flex class="ml-3">
                                                <v-icon class="primary--text">fas fa-map-marked-alt</v-icon>
                                                <span class="ml-2">Manipal University Jaipur</span>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                    <!-- <v-list-tile>
                                        <v-layout row wrap>
                                            <v-flex class="ml-3">
                                                <v-icon class="error--text">fas fa-envelope</v-icon>
                                                <a href="mailto:rajulsaxena13@gmail.com" style="text-decoration:none; color:black"><span class="ml-2">rajulsaxena13@gmail.com</span></a>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile> -->
                                    <v-list-tile class="mt-3">
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <a href="whatsapp://send?text=Hi Rajul!&phone=+918285437376" style="text-decoration:none; color:black"><span class="ml-3"><v-icon large class="green--text" left>fab fa-whatsapp</v-icon></span></a>
                                                <a href="mailto:rajulsaxena13@gmail.com" style="text-decoration:none; color:black"><v-icon large class="error--text ml-1">fas fa-envelope</v-icon></a>
                                                <a href="https://www.linkedin.com/in/rajulrs13/" style="text-decoration:none; color:black" target="_blank">
                                                         <v-icon large class="blue--text accent-4 ml-3">fab fa-linkedin-in</v-icon>
                                                </a>
                                                <a href="https://twitter.com/rajulrs13" style="text-decoration:none; color:black" target="_blank">
                                                         <v-icon large class="blue--text accent-4 ml-3">fab fa-twitter</v-icon>
                                                </a>                                                
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>
                        <!-- Lokesh -->
                        <v-flex xs12 sm6 class="text-xs-center">
                            <v-card class="elevation-0 transparent" flat>
                                <v-card-title primary-title>
                                    <v-layout row wrap justify-center>
                                        <v-flex xs12 class="text-xs-center">
                                            <v-avatar class="image" size=100>
                                                <img
                                                      :src="lokesh"
                                                      alt="Lokesh"
                                                      
                                                    >
                                                  </v-avatar>
                                        </v-flex>
                                        <v-flex xs12 class="text-xs-center mt-3">
                                            <h2 class="text-xs-center font-weight-light" style="font-family:'Monospace'; font-size:25px;">Lokesh Dugar</h2>
                                        </v-flex>
                                    </v-layout>
                                </v-card-title>
                                 <v-list class="transparent">
                                    <v-list-tile>
                                        <v-layout row wrap>
                                            <v-flex class="ml-3">
                                                <v-icon class="teal--text" left>fas fa-phone-volume</v-icon>
                                                <a href="tel:+919830588848" style="text-decoration:none; color:black"><span class="ml-2">+91-9830588848</span></a>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-layout row wrap>
                                            <v-flex class="ml-3">
                                                <v-icon class="primary--text">fas fa-map-marked-alt</v-icon>
                                                <span class="ml-2">Manipal University Jaipur</span>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                    <!-- <v-list-tile>
                                        <v-layout row wrap>
                                            <v-flex class="ml-3">
                                                <v-icon class="error--text">fas fa-envelope</v-icon>
                                                <a href="mailto:rajulsaxena13@gmail.com" style="text-decoration:none; color:black"><span class="ml-2">rajulsaxena13@gmail.com</span></a>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile> -->
                                    <v-list-tile class="mt-3">
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <a href="whatsapp://send?text=Hi Lokesh!&phone=+919830588848" style="text-decoration:none; color:black"><span class="ml-3"><v-icon large class="green--text" left>fab fa-whatsapp</v-icon></span></a>
                                                <a href="mailto:lokeshdugarld@gmail.com" style="text-decoration:none; color:black"><v-icon large class="error--text ml-1">fas fa-envelope</v-icon></a>
                                                <a href="https://www.linkedin.com/in/lokesh-dugar-07a9b5128/" style="text-decoration:none; color:black" target="_blank">
                                                         <v-icon large class="blue--text accent-4 ml-3">fab fa-linkedin-in</v-icon>
                                                </a>
                                                <a href="https://www.instagram.com/lokesh_dugar/" style="text-decoration:none; color:black" target="_blank">
                                                         <v-icon large class="pink--text accent-3  ml-3">fab fa-instagram</v-icon>
                                                </a>                                                
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import rajul from "../../../assets/rajul.jpg";
import lokesh from "../../../assets/lokesh.jpeg";
export default {
    data() {
        return {
            lokesh: lokesh,
            rajul: rajul
        }
    },
    methods: {

    },
    computed: {

    },
    watch: {

    }
}
</script>
<style scoped>
.image img {
  -webkit-transition: all 1s ease; /* Safari and Chrome */
  -moz-transition: all 1s ease; /* Firefox */
  -ms-transition: all 1s ease; /* IE 9 */
  -o-transition: all 1s ease; /* Opera */
  transition: all 1s ease;
}

.image:hover img {
  -webkit-transform: scale(1.25); /* Safari and Chrome */
  -moz-transform: scale(1.25); /* Firefox */
  -ms-transform: scale(1.25); /* IE 9 */
  -o-transform: scale(1.25); /* Opera */
  transform: scale(1.25);
}
</style>

