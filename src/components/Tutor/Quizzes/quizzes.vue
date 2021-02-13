<template>
<v-layout row>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>    
    <v-flex xs12 sm12 md12>
        <h1 style="text-align:center;" class="font-weight-light">Quizzes</h1>
        <br>
        <h3 style="text-align:center;" class="font-weight-light">Courses</h3>
        <v-progress-linear v-if="loading" class="mt-0" height="3" color="accent" :indeterminate="loading"></v-progress-linear>
        <v-container>

            <v-layout row wrap v-if="courses.length > 0">
                <v-flex v-for="c in courses" :key="c.code" xs12 sm4 class="px-3 mb-4">
                    <v-card hover raised>
                        <router-link :to="'/allquizzes/'+c.reference">
                                        
                        <v-jumbotron :gradient="gradient" dark height="150px">
                            <v-container fill-height>
                                <v-layout align-center>
                                    <v-flex text-xs-center>
                                        <h3 class="display-3">{{c.acronym}}</h3>
                                        <span class="white--text">{{c.code}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-jumbotron>
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-layout>
                                        <v-flex xs12 class="px-4 text-xs-center">                                            
                                                 <h2 class="font-weight-light"><span>Quizzes :   </span> <span>{{c.quizzes.length}}</span></h2>                                            
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        </router-link>
                        
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout align-center justify-center column fill-height v-else>
                        <br>
                    <div class="text-xs-center">
                <v-icon size="220">vertical_split</v-icon>
                </div>
                <br>
                <h2 style="text-align:center;" class="font-weight-light">No Course Added</h2>
                <br>
                <h4 style="text-align:center;" class="font-weight-light">You can add a course by clicking on Courses in side panel</h4>
            
            </v-layout>
        </v-container>
    </v-flex>

</v-layout>
</template>

<script>

export default {
    data() {
        return {
            gradient: "to top, #01579B, #B3E5FC ",            
        };
    },
    computed: {
        error() {
            return this.$store.getters.error;
        },
        success() {
            return this.$store.getters.success;
        },
        loading() {
            return this.$store.getters.loading;
        },
        courses() {
            return this.$store.getters.getTeacherCourses
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
    },
    methods: {
        
    }
};
</script>

<style scoped>
#xyz a {
    text-decoration: none;
}
a {
    color: black;
    text-decoration: none;
}
</style>
