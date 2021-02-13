<template>
<v-layout row>

    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>

    <!-- Add new quiz button-->
    <v-btn fab large color="accent" bottom right fixed raised ripple @click="add">
        <v-icon>add</v-icon>
    </v-btn>

    <!-- Add quiz dialog -->
    <v-dialog v-model="addquizdialog" max-width="800px">
        <v-form @submit.prevent="addquiz" ref="form">
            <v-card>
                <v-card-title class="grey lighten-3">
                    <h2><span class="font-weight-light ">New Quiz</span></h2>
                </v-card-title>
                <v-progress-linear v-if="loading" color="accent" class="mt-0" height="3" :indeterminate="loading"></v-progress-linear>
                <v-card-text>
                    <v-stepper v-model="e13" vertical>
                        <v-stepper-step step="1" :complete="e13>1" :color="color1">
                            Basic Details
                        </v-stepper-step>
                        <v-stepper-content step="1">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field ref="name" v-model="quizname" label="Quiz Name" :rules="[rules.required]"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="quizpassword" :append-icon="show ? 'visibility_off' : 'visibility'" :rules="[rules.required,rules.min]" :type="show ? 'text' : 'password'" label="Quiz Password" hint="At least 6 characters" counter @click:append="show = !show"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Quiz Duration" v-model="quizduration" :rules="[rules.required]" value="0" min=0 type="number" suffix="minutes"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select :items="ansitem" :rules="[rules.required]" v-model="showanswers" label="Do you want to display answers just after the quiz is submitted ?"></v-select>
                                </v-flex>
                                <v-flex xs6 class="text-xs-center">
                                    <v-btn color="error" fab @click.native="closestep1">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs6 class="text-xs-center">
                                    <v-btn color="accent" fab @click="step1down()">
                                        <v-icon>arrow_downward</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>

                        </v-stepper-content>

                        <v-stepper-step step="2" :complete="e13>2" :color="color2">Select Topics</v-stepper-step>
                        <v-stepper-content step="2">
                            <v-layout row wrap>
                                <v-flex xs12 v-for="topic in topics" :key="topic.name">
                                    <v-text-field :label="topic.name" v-model="topic.number" :hint="'Maximum - '+topic.total" min=0 :max="topic.total" value=0 type="number" suffix="Questions"></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="text-xs-center">
                                    <v-btn color="accent" @click="step2up()" fab>
                                        <v-icon>arrow_upward</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs6 class="text-xs-center">
                                    <v-btn color="accent" fab @click="step2down()">
                                        <v-icon>arrow_downward</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>

                        <v-stepper-step step="3" :complete="e13>3" :color="color3">Marks Distribution</v-stepper-step>
                        <v-stepper-content step="3">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field label="Passing Percentage" v-model="passpercentage" value="0" type="number" min=0 suffix="%"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Total Marks" v-model="totalmarks" value="0" type="number" suffix="marks" min=0></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select :items="displayclasslist" v-model="classesselected" label="Quiz Audience" multiple chips persistent-hint></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field name="" label="Total question selected" :value="this.sum" readonly outline></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field name="" label="Marks per question" :value="this.totalmarks / this.sum" readonly outline></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="text-xs-center">
                                    <v-btn color="accent" @click="step3up()" fab>
                                        <v-icon>arrow_upward</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs6 class="text-xs-center">
                                    <v-btn color="accent" fab @click="step3down()">
                                        <v-icon>visibility</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>

                        <v-stepper-step step="4" :color="color4">Review</v-stepper-step>
                        <v-stepper-content step="4">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field ref="name" v-model="quizname" label="Quiz Name" placeholder="" readonly outline disabled required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="quizpassword" :append-icon="show ? 'visibility_off' : 'visibility'" :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" label="Quiz Password" hint="At least 6 characters" counter @click:append="show = !show" readonly outline></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Quiz Duration" v-model="quizduration" value="0" type="number" suffix="min" readonly outline disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Do you want to display answers when quiz is submitted ?" v-model="showanswers" readonly outline disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 v-for="topic in topics" v-if="topic.number!=0" :key="topic.name">
                                    <v-text-field :label="topic.name" v-model="topic.number" value="0" type="number" suffix="Ques" readonly outline disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Passing Percentage" v-model="passpercentage" value="0" type="number" suffix="%" readonly outline disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Total Marks" v-model="totalmarks" value="0" type="number" suffix="marks" readonly outline disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select :items="displayclasslist" v-model="classesselected" label="Quiz Audience" readonly disabled multiple chips persistent-hint></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field name="" label="Total question selected" :value="this.sum" readonly outline disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field name="" label="Marks per question" :value="this.totalmarks / this.sum" readonly outline disabled></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="text-xs-center">
                                    <v-btn color="accent" fab @click="step4up()">
                                        <v-icon>arrow_upward</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs6 class="text-xs-center">
                                    <v-btn color="success" fab type="submit">
                                        <v-icon>check</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>

                    </v-stepper>
                </v-card-text>
            </v-card>
        </v-form>
    </v-dialog>

    <!-- Delete single quiz dialog -->
    <v-dialog v-model="deletequizdialog" max-width="300">
        <v-card>
            <v-card-title class="headline">Do you really want to delete this Quiz?</v-card-title>

            <v-card-text>
                This action will result in removing all data related to this quiz, including all reports associated with this quiz.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="success" flat="flat" @click="deletequizdialog = false">
                    No
                </v-btn>

                <v-btn color="error" flat="flat" @click="confirmdeletequiz">
                    Yes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Start quiz dialog -->
    <v-dialog v-model="startquizdialog" max-width="300">
        <v-card>
            <v-card-title class="headline" v-if="!start">Start Quiz ?</v-card-title>
            <v-card-title class="headline" v-if="start">Stop Quiz ?</v-card-title>
            <v-card-text v-if="!start">
                This action will open the quiz link and your class students with the quiz link can submit their responses.
            </v-card-text>
            <v-card-text v-if="start">
                This action will close the quiz link and students will not be able to submit their responses anymore..
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="error" flat="flat" @click="notchangestatus">
                    No
                </v-btn>

                <v-btn color="success" flat="flat" @click="confirmchangestatus">
                    Yes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- View quiz detail dialog -->
    <v-dialog v-model="viewquizdetailsdialog" max-width="550px">
        <v-card>
            <v-card-title class=" headline font-weight-light grey lighten-3" primary-title>
                {{viewquizdetailitem.name}}
            </v-card-title>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs8 sm3>
                        <h2 class="text-xs-left font-weight-light text-sm-center">Duration :</h2>
                    </v-flex>
                    <v-flex xs4 sm3>
                        <h2 class="text-sm-center">{{viewquizdetailitem.duration}} min</h2><br>
                    </v-flex>
                        <v-flex xs9 sm3>
                            <h2 class="text-xs-left font-weight-light text-sm-center">Questions :</h2>
                        </v-flex>
                        <v-flex xs3 sm3>
                            <h2 class="text-xs-right text-sm-center">{{viewquizdetailitem.noofquestions}}</h2><br>
                     </v-flex>
                            <v-flex xs12 sm10 offset-sm1>
                                <v-combobox v-model="viewquizdetailitem.topics" :items="viewquizdetailitem.topics" label="Topics selected" multiple chips readonly>
                                    <template slot="selection" slot-scope="data">
                                        <v-chip :selected="data.selected" :disabled="data.disabled" :key="JSON.stringify(data.item)" class="v-chip--select-multi" @input="data.parent.selectItem(data.item)">
                                            <v-avatar class="accent white--text" v-text="data.item.noofquestions"></v-avatar>
                                            {{ data.item.topicname }}
                                        </v-chip>
                                    </template>
                                </v-combobox>
                            </v-flex>

                            <v-flex xs12 sm10 offset-sm1>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-textarea name="input-7-1" :value="viewquizdetailitem.link" box label=" Quiz link" auto-grow readonly rows="2"></v-textarea>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6 sm3>
                                <h2 class="text-xs-left font-weight-light text-sm-center"> Password:</h2>
                            </v-flex>
                            <v-flex xs6 sm3>
                                <h2 class="text-xs-right text-sm-center">{{viewquizdetailitem.password}}</h2><br>
                    </v-flex>
                </v-layout>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" flat @click="viewquizdetailsdialog = false">

                    Okay
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Working area -->
    <v-flex xs12 sm12 md12>
        <h1 style="text-align:center;" class="font-weight-light">Quizzes</h1>
        <v-progress-linear v-if="loading" class="mt-0" height="3" color="accent" :indeterminate="loading"></v-progress-linear>
        <v-container>
            <v-layout row wrap v-if="quizlist.length > 0">
                <v-flex v-for="c in quizlist" :key="c.reference" xs12 sm4 class="px-3 mb-4">
                    <v-card hover raised>
                        <v-toolbar flat height="10" :color="c.status ? 'success' : 'error'">
                        </v-toolbar>
                        <v-card-title>
                            <v-layout align-center justify-space-around row fill-height wrap>
                                <v-flex xs12 class="text-xs-center">
                                    <h2 class="font-weight-light"> {{c.name}} </h2>
                                    <v-flex xs12 class="text-xs-center">
                                        <h3><span v-text="getclassname(c)"></span></h3>
                                    </v-flex>
                                    <br>
                                </v-flex>
                                    <v-flex xs12>
                                        <v-layout row wrap>
                                            <v-flex xs12 class="text-xs-center">
                                                <h2 class="font-weight-light"><span>{{'Questions : '+calcques(c.topics)}}</span></h2>
                                            </v-flex>
                                            <v-flex xs12 class="text-xs-center">
                                                <h2 class="font-weight-light"><span>Duration : {{c.duration}}</span></h2>
                                            </v-flex>
                                        </v-layout>
                                        <br>
                                    </v-flex>
                                        <v-flex xs12>
                                            <v-layout row wrap align-center justify-center>
                                                <v-flex xs4 class="text-xs-center">
                                                    <v-btn fab color="error" :disabled="loading" @click="deletequiz(c)">
                                                        <v-icon>delete</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                                <v-flex xs4 class="text-xs-center">
                                                    <v-btn fab color="info" :disabled="loading" @click="senddetailmail(c)">
                                                        <v-icon>mail</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                                <v-flex xs4 class="text-xs-center">
                                                    <!-- <v-switch color="success" ></v-switch> -->
                                                    <v-tooltip bottom>
                                                        <v-btn slot="activator" color="grey" fab v-model="c.status" :disabled="loading" @click="changestatus(c)">
                                                            <v-icon color="white">power_settings_new</v-icon>
                                                        </v-btn>
                                                        <span v-if="c.status">Stop Quiz</span>
                                                        <span v-else>Start Quiz</span>
                                                    </v-tooltip>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 class="text-xs-center">
                                    <v-btn flat ripple color="accent" :to="'/result/'+c.reference">
                                        <v-icon left>notes</v-icon> Result
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12 sm6 class="text-xs-center">
                                    <v-btn flat ripple color="accent" @click="displayquizdetails(c)">
                                        <v-icon left>visibility</v-icon> Details
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
                    <v-icon size="220">live_help</v-icon>
                </div>
                <br>
                <h2 style="text-align:center;" class="font-weight-light">No Quiz Created</h2>
                <br>
                <p style="text-align:center;" class="font-weight-light">To create a quiz, click on &nbsp<b>+</b>&nbsp button down below</p>

            </v-layout>
        </v-container>
    </v-flex>

</v-layout>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            showanswers: '',
            ansitem: ['Yes', 'No'],
            viewquizdetailitem: "",
            viewquizdetailsdialog: false,
            start: false,
            courseref: "",
            deletequizdialog: false,
            deletequizselected: "",
            startquizdialog: false,
            addquizdialog: false,
            color1: "accent",
            color2: "accent",
            color3: "accent",
            color4: "accent",
            quizname: "",
            quizduration: 0,
            quizpassword: "",
            show: false,
            e13: 1,
            totalmarks: 0,
            passpercentage: 0,
            audience: "",
            topics: [],
            quizchangestatusselected: "",
            sum: 0,
            rules: {
                required: value => !!value || "Required.",
                min: v => v.length >= 6 || "Min 6 characters"
            },
            classlist: "",
            displayclasslist: "",
            classesselected: []
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
        quizlist() {
            return this.$store.getters.getcurrentquizarray;
        }
    },
    created() {
        this.topics = [];
        this.courseref = this.$route.params.coursereference;
        this.$store.dispatch("setcurrenttopicarray", this.courseref);
        this.$store.dispatch("setcurrentclassarray", this.courseref);
        this.$store.dispatch("setcurrentquizarray", this.courseref);
        this.intialisetopics();
        this.intialiseclasses();
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
        senddetailmail(payload) {
            var text = "";
            var text1="";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 3; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            for (var i = 0; i < 2; i++)
                text1 += possible.charAt(Math.floor(Math.random() * possible.length));
            var yolo=text+payload.reference+text1
            var s= yolo.split("").reverse().join("");
            var classname = this.getclassname(payload)
            var formData = new FormData();
            var email = this.$store.getters.getEmail;
            var link = "https://students.mujquiz.com/quiz/" + s;
            var duration = payload.duration;
            var password = payload.password;
            var quizname = payload.name;
            formData.append('email', email);
            formData.append('link', link);
            formData.append('duration', duration);
            formData.append('password', password);
            formData.append('quizname', quizname);
            formData.append('classname', classname);

            self = this;
            axios
                .post('https://www.mujquiz.com/quizdetailmail.php',
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            "Access-Control-Allow-Origin": "*"
                        }
                    })
                .then(function (response) {
                    if (response.data.status == 'true') {
                        self.$store.commit("setSuccess", {
                            message: "You will receive Quiz Details via Email shortly.",
                            status: true
                        });
                    }
                }).catch((error) => {
                    self.$store.commit("setError", {
                        message: "Server Not Responding. Try Again Later",
                        status: true
                    });
                });
        },
        calcques(payload) {
            var sum = 0;
            payload.forEach(element => {
                sum = sum + element.noofquestions;
            });
            return sum;
        },
        displayquizdetails(payload) {
            this.viewquizdetailsdialog = true;
            this.viewquizdetailitem = "";
            var sum = 0;
            var q = payload.topics;
            q.forEach(element => {
                sum = sum + element.noofquestions;
            });
            this.$store.getters.getTopics.forEach(element => {
                for (var index = 0; index < q.length; index++) {
                    if (q[index].reference == element.reference) {
                        Object.assign(q[index], {
                            topicname: element.name
                        });
                    }
                }
            });

            var text = "";
            var text1="";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 3; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            for (var i = 0; i < 2; i++)
                text1 += possible.charAt(Math.floor(Math.random() * possible.length));
            var yolo=text+payload.reference+text1
            var s= yolo.split("").reverse().join("");
            this.viewquizdetailitem = {
                duration: payload.duration,
                name: payload.name,
                password: payload.password,
                noofquestions: sum,
                topics: q,
                link: "https://students.mujquiz.com" + "/" + "quiz/" +s
            };
            console.log(this.viewquizdetailitem)
        },
        add() {
            this.$refs.form.reset();
            this.e13 = 1;
            this.color1 = 'accent'
            this.color2 = 'accent'
            this.color3 = 'accent'
            this.color4 = 'accent'
            this.addquizdialog = !this.addquizdialog;
        },
        closestep1() {
            this.$refs.form.reset();
            this.e13 = 1;
            this.color1 = 'accent'
            this.color2 = 'accent'
            this.color3 = 'accent'
            this.color4 = 'accent'
            this.addquizdialog = !this.addquizdialog;
        },
        changestatus(payload) {
            this.quizchangestatusselected = payload;
            this.startquizdialog = true;
            this.start = payload.status;
        },
        confirmchangestatus() {
            this.$store.dispatch("changeQuizStatus", this.quizchangestatusselected);
            this.startquizdialog = false;
        },
        getclassname(payload) {
            var q = this.$store.getters.getClasses;
            for (var index = 0; index < q.length; index++) {
                if (q[index].reference === payload.classref) {
                    return q[index].acronym;
                }
            }
        },
        notchangestatus() {
            this.startquizdialog = false;
            this.quizchangestatusselected = "";
        },
        deletequiz(payload) {
            this.deletequizselected = payload;
            this.deletequizdialog = true;
        },
        confirmdeletequiz() {
            this.$store.dispatch("deleteQuiz", this.deletequizselected);
            this.deletequizdialog = false;
        },
        addquiz() {
            var arr = [];
            this.topics.forEach(element => {
                if (element.number > 0) {
                    var obj = {
                        reference: element.reference,
                        noofquestions: parseInt(element.number)
                    };
                    arr.push(obj);
                }
            });
            this.classesselected.forEach(element => {
                this.classlist.forEach(el => {
                    if (el.acronym === element) {
                        var quizobj = {
                            name: this.quizname,
                            password: this.quizpassword,
                            duration: parseInt(this.quizduration),
                            passpercent: parseInt(this.passpercentage),
                            totalmarks: parseInt(this.totalmarks),
                            topics: arr,
                            students: el.students,
                            link: "",
                            classref: el.reference,
                            courseRef: this.courseref,
                            status: false,
                            showanswers: this.showanswers
                        };
                        this.$store.dispatch("addNewQuiz", quizobj);
                    }
                });
            });
            this.addquizdialog = false;
        },
        intialisetopics() {
            var curtopics = this.$store.getters.getcurrenttopicarray;
            curtopics.forEach(element => {
                var obj = {
                    name: element.name,
                    total: element.questions.length,
                    reference: element.reference,
                    number: 0
                };
                this.topics.push(obj);
            });
        },
        intialiseclasses() {
            this.classlist = this.$store.getters.getcurrentclassarray;
            var j = [];
            this.classlist.forEach(element => {
                j.push(element.acronym);
            });
            this.displayclasslist = j;
        },
        step1down: function () {
            if (
                this.quizname.length > 0 &&
                this.quizpassword.length >= 6 &&
                this.quizduration > 0 &&
                this.showanswers.length > 0
            ) {
                this.e13 = 2;
                this.color1 = "success";
            } else {
                this.e13 = 1;
                this.$store.commit("setError", {
                    message: 'Field(s) cannot be empty.',
                    status: true
                });
            }
        },
        step3down: function () {
            if (
                this.passpercentage > 0 &&
                this.totalmarks > 0 &&
                this.classesselected.length > 0
            ) {
                this.e13 = 4;
                this.color3 = "success";
            } else {
                this.e13 = 3;
                this.$store.commit("setError", {
                    message: 'Field cannot be empty.',
                    status: true
                });
            }
        },
        step2down: function () {
            var x = 0;
            var y = 0;
            var flag = 0
            for (var i = 0; i < this.topics.length; i++) {
                console.log(this.topics[i])
                if (this.topics[i].number == undefined || this.topics[i].number.length <= 0) {
                    x = x + 0
                    this.topics[i].number = 0
                }
                if (parseInt(this.topics[i].number) < 0) {
                    flag = 1
                }
                if (parseInt(this.topics[i].number) > parseInt(this.topics[i].total)) {
                    flag = 1
                }
                x = x + parseInt(this.topics[i].number);
                // y = y + parseInt(this.topics[i].total)
            }
            // console.log(y)
            // console.log('x=', x)
            // console.log('flag =', flag)
            if (x <= 0 || flag == 1 || x == 0) {
                this.e13 = 2;
                if (flag == 1) {
                    this.$store.commit("setError", {
                        message: 'Please check the number of question selected. It must be within limit',
                        status: true
                    });
                }
                if (x < 0) {
                    this.$store.commit("setError", {
                        message: 'Field cannot be empty.',
                        status: true
                    });
                }
            } else {
                this.e13 = 3;
                this.color2 = "success";
                this.sum = x;
            }
        },
        step2up: function () {
            this.e13 = 1;
            this.color1 = "accent";
        },
        step3up: function () {
            this.e13 = 2;
            this.color2 = "accent";
        },
        step4up: function () {
            this.e13 = 3;
            this.color3 = "accent";
        }
    }
};
</script>
