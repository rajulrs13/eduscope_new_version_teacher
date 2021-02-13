<template>
<section>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-app light>
        <v-content>
            <section>
                <v-parallax :src="manipal" height="700" class="element">
                    <v-layout column align-center justify-center class="white--text">
                        <!-- Logo Image -->
                        <!-- <img  src="assets/vuetify.png" alt="Vuetify.js" height="200"> -->
                        <h2 class="white--text mb-2 display-2 text-xs-center" style="font-family:'Monospace'; font-size:30px;">Eduscope</h2>
                        <router-link :to="userstatus">
                            <v-btn class="primary mt-2" style="opacity:0.9" round large>
                                <v-icon class="mr-2">play_circle_filled</v-icon>
                                <span style="opacity:1" class>Get Started</span>
                            </v-btn>
                        </router-link>
                    </v-layout>
                </v-parallax>
            </section>

            <section class>
                <br>
                <br>
                <v-layout row wrap class align-center>
                    <v-flex xs12 class="my-3">
                        <div class="text-xs-center">
                            <v-icon size="100" class="primary--text">fas fa-graduation-cap</v-icon>
                            <h1 class="text-xs-center mb-4 font-weight-light" style="font-family:'Monospace'; font-size:30px;">About Eduscope</h1>
                            <span class="subheading">" We Specialise in Quiz Making "</span>
                        </div>
                    </v-flex>
                    <v-flex xs12>
                        <v-layout row wrap align-center>
                            <v-flex>
                                <v-card class="elevation-0 transparent" flat>
                                    <v-card-title class="layout justify-center">
                                        <h2 class="font-weight-light px-5 text-xs-center" style="text-align: justify;">Eduscope Quiz Maker is the perfect software to create and deliver online exams and tests. Easily create online quizzes, secure tests and assessments for students or employees. Advanced options like data security, automated grading makes it ideal for corporations, educational institutions and even users looking to create quizzes just for fun. Receive detailed reports for your quizzes to analyze the performance of your learners. Eduscope Quiz Maker makes it easy to create quizzes anytime, anywhere!</h2>
                                    </v-card-title>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <br>
                <br>
        </section>

                <section>
                    <v-layout row wrap class="my-5" align-center>
                        <v-flex xs12 class="my-3">
                            <div class="text-xs-center">
                                <h1 class="text-xs-center mb-4 font-weight-light" style="font-family:'Monospace'; font-size:30px;">Getting Started</h1>
                            </div>
                        </v-flex>
                        <v-flex xs12 class="my-3">
                            <v-layout row wrap align-center>
                                <v-flex xs12 md4>
                                    <v-card class="elevation-0 transparent" flat>
                                        <v-card-text class="text-xs-center">
                                            <v-icon size="120" class="primary--text">fas fa-marker</v-icon>
                                        </v-card-text>
                                        <v-card-title primary-title class="layout justify-center">
                                            <div class="headline text-xs-center">Create</div>
                                        </v-card-title>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-card class="elevation-0 transparent" flat>
                                        <v-card-text class="text-xs-center">
                                            <v-icon size="120" class="primary--text">fas fa-share-alt</v-icon>
                                        </v-card-text>
                                        <v-card-title primary-title class="layout justify-center">
                                            <div class="headline">Share</div>
                                        </v-card-title>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-card class="elevation-0 transparent" flat>
                                        <v-card-text class="text-xs-center">
                                            <v-icon size="120" class="primary--text">far fa-chart-bar</v-icon>
                                        </v-card-text>
                                        <v-card-title primary-title class="layout justify-center">
                                            <div class="headline text-xs-center">Job Done</div>
                                        </v-card-title>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </section>

                <!-- <v-parallax :src="manipal2" height="500" class="element2">           
        </v-parallax>-->
                <section>
                    <v-layout row wrap class="my-5">
                        <v-flex xs12 sm12 class="my-3">
                            <div class="text-xs-center">
                                <h1 class="text-xs-center mb-4 font-weight-light" style="font-family:'Monospace'; font-size:30px;">CONTACT US</h1>
                                <h2 class="px-5 font-weight-light">We would love to hear what you think. Drop us a line, whether it is praise or criticism, a question, a suggestion or just a hello. Go ahead and send it!</h2>
                            </div>
                        </v-flex>
                        <!-- Rajul -->
                        <v-flex xs12 sm3 class="text-xs-center">
                            <v-card class="elevation-0 transparent" flat>
                                <v-card-title primary-title>
                                    <v-layout row wrap justify-center>
                                        <v-flex xs12 class="text-xs-center">
                                            <v-avatar size="100" class="image">
                                                <img :src="rajul" alt="Rajul">
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
                                                <a href="tel:+918285437376" style="text-decoration:none; color:black">
                          <span class>+91-8285437376</span>
                        </a>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                    <!-- <v-list-tile>
                    <v-layout row wrap>
                      <v-flex class="ml-3">
                        <v-icon class="primary--text">fas fa-map-marked-alt</v-icon>
                        <span class="ml-2">Manipal University Jaipur</span>
                      </v-flex>
                    </v-layout>
                  </v-list-tile>-->
                                    <v-list-tile class="mt-1">
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <a
                          href="whatsapp://send?text=Hi Rajul!&phone=+918285437376"
                          style="text-decoration:none; color:black"
                        >
                          <span class="ml-3">
                            <v-icon large class="green--text" left>fab fa-whatsapp</v-icon>
                          </span>
                        </a>
                                                <!-- <a
                          href="mailto:rajulsaxena13@gmail.com"
                          style="text-decoration:none; color:black"
                        >
                          <v-icon large class="error--text">fas fa-envelope</v-icon>
                        </a>-->
                                                <a
                          href="https://www.linkedin.com/in/rajulrs13/"
                          style="text-decoration:none; color:black"
                          target="_blank"
                        >
                          <v-icon large class="blue--text accent-4">fab fa-linkedin-in</v-icon>
                        </a>
                                                <a
                          href="https://twitter.com/rajulrs13"
                          style="text-decoration:none; color:black"
                          target="_blank"
                        >
                          <v-icon large class="blue--text accent-4 ml-3">fab fa-twitter</v-icon>
                        </a>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>
                        <!-- Lokesh -->
                        <v-flex xs12 sm3 class="text-xs-center">
                            <v-card class="elevation-0 transparent" flat>
                                <v-card-title primary-title>
                                    <v-layout row wrap justify-center>
                                        <v-flex xs12 class="text-xs-center">
                                            <v-avatar size="100" class="image">
                                                <img :src="lokesh" alt="Lokesh">
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
                                                <a href="tel:+919830588848" style="text-decoration:none; color:black">
                          <span class>+91-9830588848</span>
                        </a>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                    <!-- <v-list-tile>
                    <v-layout row wrap>
                      <v-flex class="ml-3">
                        <v-icon class="primary--text">fas fa-map-marked-alt</v-icon>
                        <span class="ml-2">Manipal University Jaipur</span>
                      </v-flex>
                    </v-layout>
                  </v-list-tile>-->
                                    <v-list-tile class="mt-1">
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <a
                          href="whatsapp://send?text=Hi Lokesh!&phone=+919830588848"
                          style="text-decoration:none; color:black"
                        >
                          <span class="ml-3">
                            <v-icon large class="green--text" left>fab fa-whatsapp</v-icon>
                          </span>
                        </a>
                                                <!-- <a
                          href="mailto:lokeshdugarld@gmail.com"
                          style="text-decoration:none; color:black"
                        >
                          <v-icon large class="error--text">fas fa-envelope</v-icon>
                        </a>-->
                                                <a
                          href="https://www.linkedin.com/in/lokesh-dugar-07a9b5128/"
                          style="text-decoration:none; color:black"
                          target="_blank"
                        >
                          <v-icon large class="blue--text accent-4">fab fa-linkedin-in</v-icon>
                        </a>
                                                <a
                          href="https://www.instagram.com/lokesh_dugar/"
                          style="text-decoration:none; color:black"
                          target="_blank"
                        >
                          <v-icon large class="pink--text accent-3 ml-3">fab fa-instagram</v-icon>
                        </a>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 class="text-xs-center px-5 mt-2">
                            <v-form ref="form" v-model="valid">
                                <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
                                <v-text-field v-model="email" type="email" :rules="emailRules" label="Email" required></v-text-field>
                                <v-text-field v-model="contact" :rules="contactRules" type="number" label="Contact Number" required></v-text-field>
                                <v-textarea v-model="message" no-resize :rules="messageRules" counter="250" label="Message"></v-textarea>
                                <!-- <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox> -->
                                <br>
                                <v-btn round color="error" @click="reset">Reset Form</v-btn>
                                <v-btn round :disabled="!valid" color="accent" @click="sendresp">Send</v-btn>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </section>

                <v-footer class="primary">
                    <v-layout row wrap align-center>
                        <v-flex xs12>
                            <div class="text-xs-center white--text">
                                <!-- <v-icon class="white--text mr-1 ml-1 mt-1">copyright</v-icon> -->
                                <span class="mt-1">© Eduscope 2019</span>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-footer>
        </v-content>
    </v-app>
</section>
</template>

<script>
import axios from "axios";
import router from "../router/index";
import manipal from "../assets/manipal.png";
import manipal2 from "../assets/manipal2.jpg";
import rajul from "../assets/rajul.jpg";
import lokesh from "../assets/lokesh.jpeg";
export default {
    data: function () {
        return {
            manipal: manipal,
            lokesh: lokesh,
            rajul: rajul,
            manipal2: manipal2,
            valid: false,
            name: "",
            contact: "",
            email: "",
            message: "",
            nameRules: [v => !!v || "Required"],
            contactRules: [
                v => !!v || "Contact number  is required",
                v => (v && v.length == 10) || "Must be of 10 characters"
            ],
            messageRules: [
                v => !!v || "Required",
                v => (v && v.length <= 250) || "Must be less than 250 characters"
            ],
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ]
        };
    },
    computed: {
        userstatus() {
            if (
                this.$store.getters.getUserId !== null &&
                this.$store.getters.getUserId !== undefined
            ) {
                return "/dashboard";
            } else {
                return "/signin";
            }
        },
        error() {
            return this.$store.getters.error;
        },
        success() {
            return this.$store.getters.success;
        },
        loading() {
            return this.$store.getters.loading;
        },
    },
    watch: {
        error(err) {
            if (!!err) {
                setTimeout(() => this.$store.dispatch("clearError"), 3000);
            }
        },
        success(con) {
            if (!!con) {
                setTimeout(() => this.$store.dispatch("clearSuccess"), 2000);
            }
        }
    },
    methods: {
        sendresp() {
            var name = this.name
            var email = this.email
            var message = this.message
            var contact = this.contact     
            // console.log(name)       
            // console.log(email)       
            // console.log(message)       
            // console.log(contact)       
            var formData = new FormData();
            formData.append('email', email);
            formData.append('name', name);
            formData.append('message', message);
            formData.append('contact', contact);
            self = this;
            axios
                .post("https://www.mujquiz.com/contactus.php", formData, {
                    headers: {
                       'Content-Type': 'multipart/form-data',
                        "Access-Control-Allow-Origin": "*"
                    }
                })
                .then(function (response) {
                    if (response.data.status == "true") {
                        self.$store.commit("setSuccess", {
                            message: "Your response has been collected. We will reply to you shortly",
                            status: true
                        });
                        console.log('Sent')
                    }
                    self.reset();
                })
                .catch(error => {
                    self.$store.commit("setError", {
                        message: "Server Not Responding. Try Again Later",
                        status: true
                    });
                    console.log('Error')
                    self.reset();
                });
        },
        reset() {
            this.$refs.form.reset();
        }
    }
};
</script>

<style lang="css" scoped>
@keyframes bounce {

    0%,
    20%,
    60%,
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

    40% {
        -webkit-transform: translateY(-20px);
        transform: translateY(-20px);
    }

    80% {
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
    }
}

a {
    color: black;
    text-decoration: none;
}

.image img {
    -webkit-transition: all 1s ease;
    /* Safari and Chrome */
    -moz-transition: all 1s ease;
    /* Firefox */
    -ms-transition: all 1s ease;
    /* IE 9 */
    -o-transition: all 1s ease;
    /* Opera */
    transition: all 1s ease;
}

.image:hover img {
    -webkit-transform: scale(1.25);
    /* Safari and Chrome */
    -moz-transform: scale(1.25);
    /* Firefox */
    -ms-transform: scale(1.25);
    /* IE 9 */
    -o-transform: scale(1.25);
    /* Opera */
    transform: scale(1.25);
}

/* button{
    position: relative;
    display: inline-block;
    font-weight: bold;   
    text-decoration: none;
    color: #00BCD4;
    background: #ECECEC; 
    transition: .4s;
}*/
button:hover {
    animation: bounce 1s;
    text-shadow: 0px 0px 0px rgba(255, 255, 255, 1);
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
    /* transform: skew(-29deg); */
}

.element {
    /* border-radius: 0 0 150% 150% / 20%; */
    /* clip-path: polygon(0 0,100% 0,100% 100%,0 100vh) */
    /* Note that percentages work as well as px */
}

.element2 {
    border-radius: 150% 150% 0 0/ 30%;

    /* clip-path: polygon(0 0,100% 0,100% 100%,0 100vh) */
    /* Note that percentages work as well as px */
}
</style>
