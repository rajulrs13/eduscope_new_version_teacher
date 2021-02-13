<template>
<v-layout row>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-dialog v-model="deletedialog" max-width="300">
        <v-card>
            <v-card-title class="headline">Do you really want to delete this Course ?</v-card-title>

            <v-card-text>
                This action will result in removing all data related to this course which includes entire question bank, all quizzes and all classes associated with this course.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="success" flat="flat" @click="dontDelete">
                    No
                </v-btn>

                <v-btn color="error" flat="flat" @click="confirmDelete">
                    Yes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-flex xs12 sm12 md12>
        <h1 style="text-align:center;" class="font-weight-light">Courses</h1>
        <v-progress-linear v-if="loading" class="mt-0" height="3" color="accent" :indeterminate="loading"></v-progress-linear>
        <v-container>
            <v-layout row wrap v-if="courses.length > 0">
                <v-flex v-for="c in courses" :key="c.code" xs12 sm4 class="px-3 mb-4">
                    <v-card hover raised>
                         <router-link id="wer" :to="'/courses/'+c.reference">
                                        
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
                                            <v-badge color="info">
                                                 <h2 class="font-weight-light"><span>Topics : </span> <span>{{c.topics.length}}</span></h2>
                                            </v-badge>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        </router-link>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-layout row wrap>
                                <v-flex xs12 text-xs-center>
                                    <v-btn class="text-xs-center" flat color="error" @click="deleteCourse(c)">
                                        <v-icon>delete</v-icon>
                                        Delete
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-actions>
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
                <p style="text-align:center;" class="font-weight-light">To add a course, click on &nbsp<b>+</b>&nbsp button down below</p>

            </v-layout>
        </v-container>
    </v-flex>
    <add-course></add-course>
</v-layout>
</template>

<script>
import AddCourse from "./addcourse";
export default {
    components: {
        "add-course": AddCourse
    },
    data() {
        return {
            gradient: "to top, #01579B, #B3E5FC ",
            deletedialog: false,
            coursetobedeleted: ''
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
        deleteCourse(payload) {
            this.deletedialog = true
            this.coursetobedeleted = payload
        },
        confirmDelete() {
            this.$store.dispatch('deleteCourse', this.coursetobedeleted)
            this.deletedialog = false
        },
        dontDelete() {
            this.coursetobedeleted = ''
            this.deletedialog = false
        }
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
