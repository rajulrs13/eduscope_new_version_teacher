    <template>
<v-layout row wrap>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-flex xs12>
        <h1 style="text-align:center;" class="font-weight-light">{{name}}</h1>
        <v-progress-linear v-if="loading" class="mt-0" height="3" color="accent" :indeterminate="loading"></v-progress-linear>
    </v-flex>

    <v-flex xs12 class="mt-3">
        <template>
            <v-card>
                <v-card-title>
                    <h2 class="font-weight-light"> Quiz Result Out of - {{totalmarks}} marks</h2>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="results" :search="search">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.regno}}</td>
                        <td class="text-xs-center">{{ props.item.name }}</td>
                        <td class="text-xs-center">{{ props.item.score }}</td>
                        <td class="text-xs-center">{{ props.item.correct }}</td>
                        <td class="text-xs-center">{{ props.item.incorrect }}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}", found no results.
                    </v-alert>
                </v-data-table>
            </v-card>
        </template>
    </v-flex>

    <!-- <v-flex xs12 sm6 class="mt-3 mb-1 text-xs-center">
        <h3 class="font-weight-light text-xs-center">Analysis</h3>
        <v-btn dark small color="primary" @click="dialog=true">
            <v-icon>pie_chart</v-icon>
        </v-btn>
        </download-excel>
    </v-flex> -->

    <v-flex xs12 class="mt-4">
        <h1 style="text-align:center;" class="font-weight-light">Graphical Analysis</h1>
    </v-flex>

    <!-- Pie Chart -->
    <v-flex xs12 sm6>
        <div class="text-xs-center">
            <section class="container">
                <div class="columns">
                    <div class="column">
                        <chartjs-doughnut :backgroundcolor="['#8BC34A','#E53935']" :labels="labels"  :hoverbackgroundcolor="['#8BC34A','#E53935']"  :data="dataset" :bind="true"></chartjs-doughnut>
                    </div>
                </div>
            </section>
        </div>
    </v-flex>

    <!-- Bar Chart -->
    <v-flex xs12 sm6>
        <div class="text-xs-center">
            <section class="container">
                <div class="columns">
                    <div class="column">
                        <chartjs-bar :backgroundcolor="['#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5',]"  :labels="label" :data="dataset2" :bind="true"></chartjs-bar>
                    </div>
                </div>
            </section>
        </div>
    </v-flex>
    <v-container>
    <v-flex xs12  >
        <div class="text-xs-center" >
            <section class="container">
                <div class="columns">
                    <div class="column">
                        <chartjs-line :backgroundcolor="['#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5',]"  :labels="label" :data="dataset2" :bind="true"></chartjs-line>
                    </div>
                </div>
            </section>
        </div>
    </v-flex>
    </v-container>

    <!-- Download Excel -->
    <v-flex xs12 class="mt-3 mb-1">
        <!-- <h3 class="font-weight-light text-xs-center">Download Result</h3> -->
        <download-excel :data="json_data" class="text-xs-center" :fields="json_fields" type="csv">
            <v-btn dark falt color="info">
                <v-icon left class="mr-2">cloud_download</v-icon>
                Export Result as Excel
            </v-btn>
        </download-excel>
    </v-flex>

</v-layout>
</template>

<script>
export default {
    data() {
        return {
            passpercent: 0,
            students: null,
            dataentry: "",
            datalabel: "",
            labels: ["Pass", "Fail"],
            label: [
                "0-10 %",
                "11-20 %",
                "21-30 %",
                "31-40 %",
                "41-50 %",
                "51-60 %",
                "61-70 %",
                "71-80 %",
                "81-90 %",
                "91-100 %"
            ],
            dataset: [],
            dataset2: [],
            search: "",
            quizref: "",
            results: "",
            name: "",
            totalmarks: 0,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            headers: [{
                    text: "Student ID",
                    align: "center",
                    value: "regno"
                },
                {
                    text: "Name",
                    align: "center",
                    value: "name"
                },
                {
                    text: "Score",
                    align: "center",
                    value: "score"
                },
                {
                    text: "Correct",
                    align: "center",
                    value: "correct",
                    sortable: false
                },
                {
                    text: "In-correct",
                    align: "center",
                    value: "incorrect",
                    sortable: false
                }
            ],
            json_fields: {
                "Student Id": "regno",
                Name: "name",
                Score: "score",
                Correct: "correct",
                Incorrect: "incorrect"
            },
            json_data: [],
            json_meta: [
                [{
                    key: "charset",
                    value: "utf-8"
                }]
            ]
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
            return this.$store.getters.getQuizzes;
        }
    },
    created() {
        this.$store.dispatch("fetchTeacherQuizzes");
        this.quizref = this.$route.params.quizreference;
        this.$store.dispatch("resultArrayRefresh", this.quizref);
        this.initialiseresultarray();
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
        initialiseresultarray() {
            this.quizlist.forEach(element => {
                if (element.reference == this.quizref) {
                    this.name = element.name;
                    this.results = element.results;
                    this.totalmarks = element.totalmarks;
                    this.students = element.students;
                    this.passpercent = element.passpercent;
                    var l = this.students.length;
                    var pass = 0;
                    var fail = 0;
                    var one = 0;
                    var two = 0;
                    var three = 0;
                    var four = 0;
                    var five = 0;
                    var six = 0;
                    var seven = 0;
                    var eight = 0;
                    var nine = 0;
                    var ten = 0;
                    // var abs = 0;
                    // Pie chart data initialise
                    if (
                        this.results == null ||
                        this.results == undefined ||
                        this.results.length <= 0
                    ) {
                        this.dataset.push(0);
                        this.dataset.push(0);
                        //this.dataset.push(0);
                    } else {
                        this.results.forEach(el => {
                            if ((el.score / this.totalmarks) * 100 >= this.passpercent) {
                                pass = pass + 1;
                            } else {
                                fail = fail + 1;
                            }
                        });
                        this.dataset.push(pass);
                        this.dataset.push(fail);                        
                    }

                    // Bar Chart data intialise
                    if (
                        this.results == null ||
                        this.results == undefined ||
                        this.results.length <= 0
                    ) {
                        for (var index = 0; index < 10; index++) {
                            this.dataset2.push(0);
                        }
                    } else {
                        this.results.forEach(el => {
                            var t = (el.score / this.totalmarks) * 100;
                            if (t >= 0 && t <= 10) {
                                one = one + 1;
                            } else if (t > 10 && t <= 20) {
                                two = two + 1;
                            } else if (t > 20 && t <= 30) {
                                three = three + 1;
                            } else if (t > 30 && t <= 40) {
                                four = four + 1;
                            } else if (t > 40 && t <= 50) {
                                five = five + 1;
                            } else if (t > 50 && t <= 60) {
                                six = six + 1;
                            } else if (t > 60 && t <= 70) {
                                seven = seven + 1;
                            } else if (t > 70 && t <= 80) {
                                eight = eight + 1;
                            } else if (t > 80 && t <= 90) {
                                nine = nine + 1;
                            } else if (t > 90 && t <= 100) {
                                ten = ten + 1;
                            }
                        });
                        this.dataset2.push(one);
                        this.dataset2.push(two);
                        this.dataset2.push(three);
                        this.dataset2.push(four);
                        this.dataset2.push(five);
                        this.dataset2.push(six);
                        this.dataset2.push(seven);
                        this.dataset2.push(eight);
                        this.dataset2.push(nine);
                        this.dataset2.push(ten);
                    }
                }
            });
            this.json_data = this.results;
            //console.log(this.results)
        }
        // addData: function addData() {
        //     this.dataset.push(this.dataentry);
        //     this.labels.push(this.datalabel);
        //     this.datalabel = "";
        //     this.dataentry = "";
        // }
    }
};
</script>
