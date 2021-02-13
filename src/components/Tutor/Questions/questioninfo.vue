<template>
<v-container id="create">
    <v-dialog v-model="deletealltopicsdialog" max-width="290">
        <v-card>
            <v-card-title class="headline">Do you want to delete all the topics ?</v-card-title>

            <v-card-text>
                This means all questions of every topic that you have created under this course will be deleted permanently. Once deleted you cannot restore them.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" flat="flat" @click="deletealltopicsdialog = false">
                    No
                </v-btn>
                <v-btn color="success" flat="flat" @click="deletealltopicsdialog = false">
                    Yes                                                                                                                                                                                         
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-layout>
        <v-flex xs12>
            <v-expansion-panel popout focusable>
                <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
                    <div slot="header">Topic</div>
                    <v-container>
                        <v-card raised>
                            <v-toolbar flat color="white" class="accent"
                                <div style="width:80%">
                                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                                </div>
                                <v-spacer></v-spacer>
                                 <v-btn fab>
                                     <v-icon flat color="primary" class="mb-2">add</v-icon>
                                 </v-btn>
                                                                    
                            </v-toolbar>
                        </v-card>
                        <v-data-table :headers="headers" :items="questioninfo" class="elevation-5" :search="search" item-key="question">

                            <template slot="items" slot-scope="props">
                                <td class="text-xs-center">{{ props.item.question }}</td>
                                <td class="text-xs-center">{{ props.item.image }}</td>
                                <td class="text-xs-center">{{ props.item.opt1 }}</td>
                                <td class="text-xs-center">{{ props.item.opt2 }}</td>
                                <td class="text-xs-center">{{ props.item.opt3 }}</td>
                                <td class="text-xs-center">{{ props.item.opt4 }}</td>
                                <td class="text-xs-center">{{ props.item.answer }}</td>
                                <td class="text-xs-center">{{ props.item.type }}</td>
                                <td class="justify-center layout px-0">
                                    <v-icon small class="mr-2" @click="editItem(props.item)" color="info">
                                        edit
                                    </v-icon>
                                    <v-icon small @click="deleteItem(props.item)" color="error">
                                        delete
                                    </v-icon>
                                </td>
                            </template>
                            <template slot="no-data">
                                <v-btn color="primary" @click="initialize">Reset</v-btn>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-flex>
    </v-layout>
    <v-speed-dial v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction" :open-on-hover="hover" :transition="transition">
        <v-btn slot="activator" v-model="fab" color="accent" large fab>
            <v-icon>keyboard_arrow_left</v-icon>
            <v-icon>close</v-icon>
        </v-btn>
        <v-btn fab dark small color="primary">
            <v-icon>add</v-icon>
        </v-btn>
        <v-btn fab dark small color="error" @click="deletealltopicsdialog = true">
            <v-icon>delete</v-icon>
        </v-btn>
    </v-speed-dial>
</v-container>
</template>

<script>
export default {
    data: () => ({
        deletealltopicsdialog:false,
        direction: 'left',
        fab: false,
        fling: false,
        hover: true,
        tabs: null,
        top: false,
        right: true,
        bottom: true,
        left: false,
        transition: 'slide-y-transition',
        addquesdialog: false,
        selected: [],
        search: "",
        headers: [{
                text: "Question",
                value: "question",
                align: "center",
                sortable: true
            },
            {
                text: "Image",
                value: "name",
                align: "center",
                sortable: false
            },
            {
                text: "Opt1",
                value: "opt1",
                align: "center",
                sortable: true
            },
            {
                text: "Opt2",
                value: "opt2",
                align: "center",
                sortable: true
            },
            {
                text: "Opt3",
                value: "opt3",
                align: "center",
                sortable: true
            },
            {
                text: "Opt4",
                value: "opt4",
                align: "center",
                sortable: true
            },
            {
                text: "Answer",
                value: "answer",
                align: "center",
                sortable: true
            },
            {
                text: "Type",
                value: "type",
                align: "center",
                sortable: true
            },
            {
                text: "Actions",
                value: "question",
                align: "center",
                sortable: false
            }
        ],
        questioninfo: [],
        editedIndex: -1,
        editedItem: {
            question: "",
            image: "",
            opt1: "",
            opt2: "",
            opt3: "",
            opt4: "",
            answer: "",
            type: ""
        },
        defaultItem: {
            question: "",
            image: "",
            opt1: "",
            opt2: "",
            opt3: "",
            opt4: "",
            answer: "",
            type: ""
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Question" : "Edit Question";
        }
    },
    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.questioninfo = [{
                    question: "What is the tallest man made structure?",
                    image: "img.jpg",
                    opt1: "Burj Khalifa",
                    opt2: "Twin Towers",
                    opt3: "Qutub Minar",
                    opt4: "Titanic",
                    answer: "A",
                    type: "S"
                },
                {
                    question: "What is the tallest man made structure?",
                    image: "img.jpg",
                    opt1: "Burj Khalifa",
                    opt2: "Twin Towers",
                    opt3: "Qutub Minar",
                    opt4: "Titanic",
                    answer: "A",
                    type: "S"
                },
                {
                    question: "What is the tallest man made structure?",
                    image: "img.jpg",
                    opt1: "Burj Khalifa",
                    opt2: "Twin Towers",
                    opt3: "Qutub Minar",
                    opt4: "Titanic",
                    answer: "A",
                    type: "S"
                },
                {
                    question: "What is the tallest man made structure?",
                    image: "img.jpg",
                    opt1: "Burj Khalifa",
                    opt2: "Twin Towers",
                    opt3: "Qutub Minar",
                    opt4: "Titanic",
                    answer: "A",
                    type: "S"
                },
                {
                    question: "What is the tallest man made structure?",
                    image: "img.jpg",
                    opt1: "Burj Khalifa",
                    opt2: "Twin Towers",
                    opt3: "Qutub Minar",
                    opt4: "Titanic",
                    answer: "A",
                    type: "S"
                },
                {
                    question: "What is the tallest man made structure?",
                    image: "img.jpg",
                    opt1: "Burj Khalifa fyghujhgfdtrfgh",
                    opt2: "for(int i=0;i<a;i++)",
                    opt3: "Qutub Minara",
                    opt4: "Titanic",
                    answer: "A",
                    type: "S"
                }
            ];
        },

        editItem(item) {
            this.editedIndex = this.questioninfo.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.questioninfo.indexOf(item);
            confirm("Are you sure you want to delete this question?") &&
                this.questioninfo.splice(index, 1);
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.questioninfo[this.editedIndex], this.editedItem);
            } else {
                this.questioninfo.push(this.editedItem);
            }
            this.close();
        }
    }
};
</script>

<style>
#create .v-speed-dial {
    position: fixed;
}

#create .v-btn--floating {
    position: relative;
}
</style>
