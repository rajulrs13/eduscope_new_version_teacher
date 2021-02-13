<template>
<v-layout row>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-flex xs12>
        <h1 style="text-align:center;" class="font-weight-light">{{ classinfo.acronym }}</h1>
        <!-- Progress Bar-->
        <v-progress-linear v-if="loading" color="accent" class="mt-0" height="3" :indeterminate="loading"></v-progress-linear>
        <v-container>
            <!-- Add from excel button -->
            <v-btn fab large @click='addnewstudentexceldialog = true' color="green darken-4" bottom right fixed raised ripple>
                <v-icon color="white">description</v-icon>
            </v-btn>
            <v-card raised>
                <v-toolbar flat color="white">
                    <v-spacer></v-spacer>
                    <div style="width:70%">
                        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn flat @click='addnewstudentdialog = true'>
                        <v-icon flat color="accent">add</v-icon>
                    </v-btn>
                    <!-- Add New Student Dialog -->

                    <v-dialog v-model="addnewstudentdialog" max-width="500px" persistent>
                        <v-form ref="form1" v-model="addnewstudentvalid">
                            <v-card>
                                <v-card-title class="grey lighten-3">
                                    <h2><span class="font-weight-light">New Student</span></h2>
                                </v-card-title>

                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout class="px-3" wrap>
                                            <v-flex xs12>
                                                <v-text-field v-model="editedItem.regno" type="number" :rules="regnorules" label="Registration Number"></v-text-field>
                                            </v-flex>
                                            <v-spacer></v-spacer>
                                            <v-flex xs12>
                                                <v-text-field v-model="editedItem.name" :rules="namerules" label="Student Name"></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="accent" flat @click.native="newStudentDialogClose">Cancel</v-btn>
                                    <v-btn color="accent" flat @click.native="addstudent" :disabled="!addnewstudentvalid || loading">Add</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-dialog>

                    <!-- Add New Student Excel Dialog -->
                    <v-dialog v-model="addnewstudentexceldialog" max-width="500px" persistent>
                            <v-card>
                                <v-card-title class="grey lighten-3">
                                    <h2><span class="font-weight-light">Upload Student Data</span></h2>
                                </v-card-title>
                                <v-container>
                                    <h4><span class="font-weight-light text-xs-center">Download the excel sheet from here.</span></h4>
                                    <v-btn class="text-xs-center" color="accent" flat name="Download" href="https://www.mujquiz.com/studentlist.xlsx">Download</v-btn>
                                    <h4><span class="font-weight-light text-xs-center">Fill it carefully, following all the instructions.</span></h4>
                                    <br>
                                    <h4><span class="font-weight-light text-xs-center">Upload it in <b>'.csv'</b> format below.</span></h4>
                                    <br>
                                    <v-text-field label="Select CSV File" @click='pickFile' v-model='filename' prepend-icon='attach_file'></v-text-field>
                                <input type="file" id="file" style="display: none" accept=".csv" name="file" ref="file" v-on:change="handleFileUpload()"/>
                                </v-container>

                                
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="accent" flat @click.native="cancelnewstudentexceldialog">Cancel</v-btn>
                                    <v-btn color="accent" flat name="Import" @click.native="submitFile" :disabled="loading">Upload</v-btn>
                                </v-card-actions>
                            </v-card>
                    </v-dialog>

                    <!-- Delete Single Topic Dialog-->
                    <v-dialog v-model="deletesinglestudentdialog" max-width="290">
                        <v-card>
                            <h2>
                                <v-card-title class="font-weight-light">Do you want delete data of this student ?</v-card-title>
                            </h2>

                            <v-card-text>
                                This means all the detail of this student will be deleted permanently. Once deleted, you cannot restore them.
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="success" flat="flat" @click="donotdeletestudent">
                                    No
                                </v-btn>
                                <v-btn color="error" flat="flat" @click="confirmdeletesinglestudent">
                                    Yes
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- Edit Student Dialog -->
                    <v-form ref="form" v-model="editstudentvalid">
                        <v-dialog v-model="editstudentdialog" max-width="500px" persistent>

                            <v-card>
                                <v-card-title class="grey lighten-3">
                                    <h2><span class="font-weight-light">Edit Student</span></h2>
                                </v-card-title>

                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout class="px-3" wrap>
                                            <v-flex xs12>
                                                <v-text-field v-model="editedItem.regno" :rules="regnorules" disabled label="Registration Number"></v-text-field>
                                            </v-flex>
                                            <v-spacer></v-spacer>
                                            <v-flex xs12>
                                                <v-text-field v-model="editedItem.name" :rules="namerules" label="Student Name"></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="accent" flat @click.native="closeeditstudentdialog" :disabled="loading">Cancel</v-btn>
                                    <v-btn color="accent" flat @click.native="updatestudentdetail" :disabled="!editstudentvalid || loading">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-form>
                </v-toolbar>
            </v-card>

            <!-- Data Table -->
            <v-data-table :headers="headers" :items="classinfo.students" class="elevation-10" :search="search" item-key="regno">

                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.regno }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon small class="mr-2" @click="editname(props.item)" color="info">
                            edit
                        </v-icon>
                        <v-icon small @click="deleteItem(props.item)" color="error">
                            delete
                        </v-icon>
                    </td>
                </template>
                <template slot="no-data">
                    <div class="text-xs-center">No Student Records</div>
                </template>
            </v-data-table>
        </v-container>
    </v-flex>
</v-layout>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        classref: '',
        editstudentvalid: false,
        addnewstudentvalid: false,
        addnewstudentexceldialog: false,
        regnorules: [
            value => !!value || "Registration number is Required",
            v => (v && v.length == 9) || "It must be of 9 digits."
        ],
        namerules: [value => !!value || "Name is required."],
        addnewstudentdialog: false,
        addnewstudentexcelvalid: false,
        editstudentdialog: false,
        deletesinglestudentdialog: false,
        selected: [],
        search: '',
        headers: [{
                text: 'Reg. No',
                align: 'center',
                sortable: true,
                value: 'regno'
            },
            {
                text: 'Name',
                value: 'name',
                align: 'center',
                sortable: true
            },
            {
                text: 'Actions',
                value: 'regno',
                align: 'center',
                sortable: false
            }
        ],
        itemtobedeleted: '',
        classinfo: [],
        editedIndex: -1,
        editedItem: {
            regno: '',
            name: ''
        },
        defaultItem: {
            regno: '',
            name: ''
        },

        // file upload
        file: '',
        filename: ''
    }),

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
    created() {
        this.classref = this.$route.params.classreference
        this.$store.dispatch('setcurrentclassarrayRefresh', this.classref)
        var currentclassarray = this.$store.getters.getcurrentclassarray
        this.initialize(currentclassarray)
    },

    methods: {
        initialize(payload) {
            var myclassid = this.classref
            payload.forEach(element => {
                if (element.reference == myclassid) {
                    this.classinfo = element
                    return
                }
            });
        },
        pickFile () {
            this.$refs.file.click()
        },
        // Submits the file to the server
        submitFile() {
            // Initialize the form data
            let formData = new FormData();
            // Add the form data we need to submit
            formData.append('file', this.file);
            // Make the request to the POST /single-file URL
            var self = this
            this.$store.commit('setLoading', true)
            axios.post('https://www.mujquiz.com/importstud.php',
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function (response) {
                    if(response.data.elseerror == null){
                        if(response.data.data != null){
                            response.data.data.forEach(element => {
                                self.addnewstudentviaexcel(element)
                            });
                            self.cancelnewstudentexceldialog()
                            self.$store.commit('setLoading', false)
                            setTimeout(() => {
                                self.$store.commit('setSuccess',{message: response.data.message, status: true})
                            }, 500);
                        }
                        else{
                            var nameErr = ''
                            var regnoErr = ''
                            if(response.data.error.regno_err != ''){
                                regnoErr = response.data.error.regno_err + ' '
                            }
                            if(response.data.error.name_err != ''){
                                nameErr = response.data.error.name_err + ' '
                            }

                            // var qnameErr = ''
                            // var opt1Err = ''
                            // var opt2Err = ''
                            // var opt3Err = ''
                            // var opt4Err = ''
                            // var answerErr = ''
                            // var typeErr = ''
                            // if(response.data.error.qname_err != ''){
                            //     qnameErr = response.data.error.qname_err + ' '
                            // }
                            // if(response.data.error.opt1_err != ''){
                            //     opt1Err = response.data.error.opt1_err + ' '
                            // }
                            // if(response.data.error.opt2_err != ''){
                            //     opt2Err = response.data.error.opt2_err + ' '
                            // }
                            // if(response.data.error.opt3_err != ''){
                            //     opt3Err = response.data.error.opt3_err + ' '
                            // }
                            // if(response.data.error.opt4_err != ''){
                            //     opt4Err = response.data.error.opt4_err + ' '
                            // }
                            // if(response.data.error.answer_err != ''){
                            //     answerErr = response.data.error.answer_err + ' '
                            // }
                            // if(response.data.error.type_err != ''){
                            //     typeErr = response.data.error.type_err + ' '
                            // }
                            // var error_string = 'Error in line ' + response.data.error.line + ' => ' + qnameErr + opt1Err + opt2Err + opt3Err + opt4Err  + answerErr + typeErr
                            var error_string = 'Error in line ' + response.data.error.line + ' => ' + regnoErr + nameErr
                            self.cancelnewstudentexceldialog()
                            self.$store.commit('setLoading', false)
                            setTimeout(() => {
                                self.$store.commit('setError',{message: response.data.message})
                            }, 500);
                            setTimeout(() => {
                                self.$store.commit('setError',{message: error_string})
                            }, 4500);
                        }
                    }
                    else{
                        self.cancelnewstudentexceldialog()
                        self.$store.commit('setLoading', false)
                        setTimeout(() => {
                            self.$store.commit('setError',{message: response.data.elseerror})
                        }, 500); 
                    }
                    
                })
                .catch(function (error) {
                    self.cancelnewstudentexceldialog()
                    self.$store.commit('setLoading', false)
                    self.$store.commit('setError',error)
                });
        },
        addnewstudentviaexcel(payload){
            var flag = true
            // Check if same student already exists or not
            function mysearch(keytosearch, myarray){
                myarray.forEach(element => {
                    if (element.regno == keytosearch) {
                        flag = false
                        return
                    }
                });
            }
            mysearch(payload.regno, this.classinfo.students)
            // New Student
            if (flag == true) {
                var myclassid = this.classref
                var studentobj = {
                    studentdetails: payload,
                    classref: myclassid
                }
                this.$store.dispatch('addsinglestudent', studentobj)
                var currentclassarray = this.$store.getters.getcurrentclassarray
                this.initialize(currentclassarray)
            }
        },
        // Handles a change on the file upload
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            this.filename = this.$refs.file.files[0].name;
        },
        cancelnewstudentexceldialog() {
            this.addnewstudentexceldialog = false
            const input = this.$refs.file;
            input.type = 'text';
            input.type = 'file';
        },
        newStudentDialogClose() {
            this.addnewstudentdialog = false
            this.editedItem = {
                regno: '',
                name: ''
            }
        },
        addstudent() {
            var flag = true
            // Check if same student already exists or not
            this.classinfo.students.forEach(element => {
                if (element.regno == this.editedItem.regno) {
                    this.$store.dispatch('sameregnoerror')
                    this.editedItem = {
                        regno: '',
                        name: ''
                    }
                    flag = false
                }
            });
            // New Student
            if (flag == true) {
                var myclassid = this.classref
                var studentobj = {
                    studentdetails: this.editedItem,
                    classref: myclassid
                }
                this.$store.dispatch('addsinglestudent', studentobj)
                var currentclassarray = this.$store.getters.getcurrentclassarray
                this.initialize(currentclassarray)
                this.addnewstudentdialog = false
                this.editedItem = {
                    regno: '',
                    name: ''
                }
                this.$refs.form1.reset()
            }
        },
        editname(payload) {
            this.editstudentdialog = true
            this.editedItem.regno = payload.regno
            this.editedItem.name = payload.name
        },
        updatestudentdetail() {
            var myclassid = this.classref
            var studentobj = {
                studentdetails: this.editedItem,
                classref: myclassid
            }
            this.$store.dispatch('editsinglestudent', studentobj)
            var currentclassarray = this.$store.getters.getcurrentclassarray
            this.initialize(currentclassarray)
            this.editstudentdialog = false
            this.editedItem = {
                regno: '',
                name: ''
            }
        },
        closeeditstudentdialog() {
            this.editstudentdialog = false
            this.editedItem = {
                regno: '',
                name: ''
            }
        },
        deleteItem(payload) {
            this.deletesinglestudentdialog = true
            this.editedItem.regno = payload.regno
            this.editedItem.name = payload.name
        },
        confirmdeletesinglestudent() {
            var myclassid = this.classref
            var studentobj = {
                studentdetails: this.editedItem,
                classref: myclassid
            }
            this.$store.dispatch('deletesinglestudent', studentobj)
            var currentclassarray = this.$store.getters.getcurrentclassarray
            this.initialize(currentclassarray)
            this.deletesinglestudentdialog = false
            this.editedItem = {
                regno: '',
                name: ''
            }
        },
        donotdeletestudent() {
            this.deletesinglestudentdialog = false
            this.editedItem = {
                regno: '',
                name: ''
            }
        }
    }
}
</script>
