<template>
<v-layout row>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>

    <v-btn fab large color="accent" bottom right fixed raised ripple @click="fetchAllClasses">
        <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="addclassdialog" max-width="500px">
        <v-card>
            <v-form @submit.prevent="addclass" ref="form" v-model="classvalid">
                <v-card-title class="grey lighten-3">
                    <h1 class="font-weight-light">New class</h1>
                </v-card-title>
                <v-progress-linear v-if="loading" color="accent" class="mt-0" height="3" :indeterminate="loading"></v-progress-linear>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-autocomplete :disabled="loading" hint="Type class name" persistent-hint :items="allclasslist" v-model="classselected" item-text="acronym" item-value="acronym" label="Select Class" :rules="classrules">
                                    <template slot="data.selected" slot-scope="data">{{data.item}}</template>
                                    <template slot="item" slot-scope="data">
                                        <template v-if="typeof data.item !== 'object'">
                                            <v-list-tile-content v-text="acronym">
                                            </v-list-tile-content>
                                        </template>
                                        <template v-else>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="data.item.acronym">
                                                </v-list-tile-title>
                                                <v-list-tile-sub-title v-html="data.item.name">
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            </v-flex>
                            <v-flex xs12>

                            </v-flex>
                            <v-flex xs12>

                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="accent" flat @click.native="addclassdialog = false">Close</v-btn>
                    <v-btn color="accent" flat type="submit" :disabled="!classvalid || loading">Add</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>

    <!-- Delete Single Class Dialog-->
    <v-dialog v-model="deletesingleclassdialog" max-width="290">
        <v-card>
            <v-card-title class="headline">Do you want to delete this class ?</v-card-title>

            <v-card-text>
                This means all the data related to this class will be deleted permanently. Once deleted, you cannot restore it.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" flat="flat" @click="deletesingleclassdialog = false">
                    No
                </v-btn>
                <v-btn color="error" flat="flat" @click="confirmdeletesingleclass">
                    Yes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-flex xs12 sm12 md12>
        <h1 style="text-align:center;" class="font-weight-light">My Classes</h1>
        <v-progress-linear v-if="loading" color="accent" class="mt-0" height="3" :indeterminate="loading"></v-progress-linear>
        <v-container>

            <v-layout row wrap v-if="classesarray.length > 0">
                <v-flex v-for="c in classesarray" :key="c.acronym" xs12 sm4 class="px-3 mb-4">
                    <v-card hover raised>
                        <router-link :to="'/studentinfo/'+c.reference">
                        <v-jumbotron :gradient="gradient" dark height="150px">
                            <v-container fill-height>
                                <v-layout align-center>
                                    <v-flex text-xs-center>
                                        <h3 class="display-3">{{c.acronym}}</h3>
                                        <span class="white--text">{{c.name}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-jumbotron>
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-layout>
                                        <v-flex xs12 class="px-4 text-xs-center">                                            
                                                  <h2 class="font-weight-light"><span>Students : </span><span>{{c.students.length}}</span></h2>                                            
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
                                    <v-btn flat color="error" @click="deletesingleclass({classobj:c, courseref:id})">
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
                    <v-icon size="220">people</v-icon>
                </div>
                <br>
                <h2 style="text-align:center;" class="font-weight-light">No Sections</h2>
                <br>
                <p style="text-align:center;" class="font-weight-light">To add sections, click on &nbsp<b>+</b>&nbsp button down below</p>

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
            deletesingleclassdialog: false,
            classtobedeleted: '',
            id: null,
            addclassdialog: false,
            classselected: "",
            classvalid: false,
            classrules: [value => !!value || "Please select a course."]
        };
    },
    created() {
        this.id = this.$route.params.coursereference
        //console.log(this.id)
        this.$store.dispatch("setcurrentclassarray", this.id)
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
        classesarray() {
            return this.$store.getters.getcurrentclassarray;
        },
        allclasslist() {
            return this.$store.getters.getAllClassList;
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
        deletesingleclass(payload) {
            this.deletesingleclassdialog = true
            this.classtobedeleted = payload
        },
        confirmdeletesingleclass() {
            this.$store.dispatch('deleteSingleClass', this.classtobedeleted)
            this.deletesingleclassdialog = false
        },
        fetchAllClasses() {
            this.$refs.form.reset()
 
            this.addclassdialog = true
            var list = this.$store.getters.getAllClassList
            if (typeof list === 'undefined' || list.length <= 0 || list === null || list === '') {
                this.$store.dispatch('getAllCourseList')
            }
        },
        addclass() {
            var arr = this.$store.getters.getTeacherCourses;
            var flag = false;
            var myid = this.id;
            var classlist = this.$store.getters.getAllClassList;
            var classobj = null
            classlist.forEach(element => {
                if (element.acronym === this.classselected) {
                    classobj = element
                }
            });

            function search(namekey, myarray) {
                for (var i = 0; i < myarray.length; i++) {
                    if (myarray[i].reference === myid) {
                        for (var j = 0; j < myarray[i].classes.length; j++) {
                            if (myarray[i].classes[j].acronym === namekey) {
                                flag = true;
                                return;
                            }
                        }
                    }
                }
            }
            search(this.classselected, arr);
            if (flag == false) {
                this.$store.dispatch("addNewClass", {
                    acronym: this.classselected,
                    name: classobj.name,
                    courseref: this.id
                })
            } else {
                this.$store.commit("setError", {
                    message: "Topic with this name already exists. Try another name."
                })
            }
            this.addclassdialog = false
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
