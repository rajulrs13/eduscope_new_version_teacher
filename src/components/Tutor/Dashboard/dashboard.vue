<template>
<v-layout row>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-dialog v-model="installapp" max-width="270px">

        <!-- <v-card>  -->
            <!-- <v-card-title class="grey lighten-3">
                <h2><span class="font-weight-light ">Tutorial</span></h2>
            </v-card-title> -->
            <img :src="pwa" style="vertical-align:middle"  width="auto" height="auto">
        <!-- </v-card> -->

    </v-dialog>
    <v-flex xs12 sm12 md12>
        <h1 style="text-align:center;" class="font-weight-light">Getting Started</h1>
        <v-progress-linear v-if="loading" class="mt-0" height="3" color="accent" :indeterminate="loading"></v-progress-linear>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card>
                        <v-card-title class="grey lighten-3">
                            <h1 class="font-weight-light">Instructions</h1>
                            <v-spacer></v-spacer>                            
                        </v-card-title>
                        <v-container>
                            <v-layout wrap>
                                <ol>

                                    <v-flex xs12>
                                        <h2 class="font-weight-light">
                                            <li>Install App (Optional).
                                                <v-btn @click="installapp=true" flat icon class="primary--text">
                                                    <v-icon>info</v-icon>
                                                </v-btn>
                                            </li>

                                        </h2>
                                        <!-- <div class="text-xs-center">
                                            
                                        </div> -->
                                    </v-flex>
                                    <v-flex xs12 class="mt-2">
                                        <h2 class="font-weight-light">
                                            <li>Create a course.</li>
                                        </h2>
                                        <h3 class="font-weight-light ml-1">This will create your course in Question Bank Tab, as well as in Quizzes and Classes Tab.</h3>
                                    </v-flex>
                                    <br>
                                    <v-flex xs12 class="mt-2">
                                        <h2 class="font-weight-light">
                                            <li>You can now make your Question Bank.</li>
                                        </h2>
                                        <h3 class="font-weight-light ml-1">Click on Question Bank Tab and select a Course, create topics under which questions can be added.</h3>
                                    </v-flex>
                                    <br>
                                    <v-flex xs12 class="mt-2">
                                        <h2 class="font-weight-light">
                                            <li>Create your class/section.</li>
                                        </h2>
                                        <h3 class="font-weight-light ml-1">Click on Classes Tab and select a course, create section(s) you teach and add students.</h3>
                                    </v-flex>
                                    <br>
                                    <v-flex xs12 class="mt-2">
                                        <h2 class="font-weight-light">
                                            <li>Finally you can make Quizzes.</li>
                                        </h2>
                                        <h3 class="font-weight-light ml-1">Click on Quizzes Tab and select a course, create new Quizzes.</h3>
                                    </v-flex>
                                    <br>

                                    </ol>
                                    <v-flex xs12 sm6 offset-sm3 text-xs-center>
                                        <v-tooltip bottom>
                                            <v-btn round large href="manual.pdf" download target="_blank" slot="activator" class="info">
                                                <v-icon left>save_alt</v-icon>
                                                Downlaod Manual
                                            </v-btn>
                                            <span>Download Manual</span>
                                        </v-tooltip>
                                    </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-flex>
</v-layout>
</template>

<script>
import pwa from '../../../assets/pwa.gif'
export default {
    data: function () {
        return {
            installapp: false,
            pwa: pwa
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
        success() {
            return this.$store.getters.success;
        },
        error() {
            return this.$store.getters.error;
        }
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
    }
}
</script>
