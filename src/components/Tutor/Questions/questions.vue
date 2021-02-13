<template>
<v-layout row>
    <v-flex xs12 sm12 md12>
        <h2 style="text-align:center;">Courses</h2>
        <v-container>
            <v-layout row wrap>

                <v-flex v-for="c in courseList" :key="c.course" xs12 sm4 class="px-3 mb-4">
                    <v-card hover raised>
                        <v-jumbotron :gradient="gradient" dark height="150px">
                            <v-container fill-height>
                                <v-layout align-center>
                                    <v-flex text-xs-center>
                                        <h3 class="display-3">{{c.group}}</h3>
                                        <span class="white--text">{{c.course}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-jumbotron>
                        <v-card-title>
                            <v-layout row wrap>

                                <v-flex xs6>
                                    <v-layout>
                                        <v-flex xs12 class="px-4">
                                            <v-badge color="info" right>
                                                <span slot="badge">6</span>
                                                <h4><span >Questions{{c.noofquestion}}</span></h4>
                                            </v-badge>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            

                            <v-flex xs6>
                                <v-layout>
                                    <v-flex xs12 class="px-4">
                                        <v-badge color="info" right>
                                            <span slot="badge">6</span>
                                            <h4><span >Topics{{c.noofquestion}}</span></h4>
                                        </v-badge>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
            </v-layout>

            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
                <h2></h2>
                <v-spacer></v-spacer>

                <v-btn flat color="accent">
                    <v-icon left>visibility</v-icon>View
                </v-btn>
            </v-card-actions>
            </v-card>
    </v-flex>
</v-layout>
</v-container>
</v-flex>
</v-layout>
</template>

<script>
export default {
    data() {
        return {
            courseList: [{
                    course: 'CS 1505',
                    noofquestions: 110,
                    group: 'SE'
                },
                {
                    course: 'CS 1505',
                    noofquestions: 110,
                    group: 'DAA'
                },
                {
                    course: 'CS 1505',
                    noofquestions: 110,
                    group: 'DCOM'
                },
                {
                    course: 'CS 1505',
                    noofquestions: 110,
                    group: 'ACD'
                },
                {
                    course: 'CS 1505',
                    noofquestions: 110,
                    group: 'EM3'
                },
                {
                    course: 'CS 1505',
                    noofquestions: 110,
                    group: 'STLD'
                },
                {
                    course: 'CS 1505',
                    noofquestions: 110,
                    group: 'OOPJ'
                },
                {
                    course: 'CS 1505',
                    noofquestions: 110,
                    group: 'RDBMS'
                },
                {
                    course: 'CS 1505',
                    noofquestions: 110,
                    group: 'DS'
                },
                {
                    course: 'CS 1505',
                    noofquestions: 110,
                    group: 'ECO'
                }
            ],
            gradient: 'to top, #01579B, #B3E5FC'
        }
    }
}
</script>
