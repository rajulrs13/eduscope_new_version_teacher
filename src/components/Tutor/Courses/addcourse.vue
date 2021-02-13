<template>
<div>
    <v-btn fab large color="accent" bottom right fixed raised ripple @click="fetchAllCourses">
        <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="addcoursedialog" max-width="500px">
        <v-card>
            <v-form @submit.prevent="addcourse" ref="form" v-model="coursevalid">
                <v-card-title class="grey lighten-3">
                    <h1 class="font-weight-light">New Course</h1>
                </v-card-title>
                <v-progress-linear v-if="loading" class="mt-0" height="3" :indeterminate="loading"></v-progress-linear>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-autocomplete :disabled="loading" hint="Type course code" persistent-hint :items="allcourselist" v-model="courseselected" item-text="code" item-value="code" label="Select Course" :rules="courserules">
                                    <template slot="data.selected" slot-scope="data">{{data.item.name}}</template>
                                    <template slot="item" slot-scope="data">
                                        <template v-if="typeof data.item !== 'object'">
                                            <v-list-tile-content v-text="data.item">
                                            </v-list-tile-content>
                                        </template>
                                        <template v-else>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="data.item.name">
                                                </v-list-tile-title>
                                                <v-list-tile-sub-title v-html="data.item.code">
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
                    <v-btn color="accent" flat @click.native="addcoursedialog = false">Close</v-btn>
                    <v-btn color="accent" flat type="submit" :disabled="!coursevalid || loading">Add</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  data: () => {
    return {
      addcoursedialog: false,
      courseselected: "",
      coursevalid: false,
      courserules: [value => !!value || "Please select a course."]
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    allcourselist() {
      return this.$store.getters.getAllCourseList;
    }
  },
  methods: {
      fetchAllCourses(){
          this.addcoursedialog = true
          var list = this.$store.getters.getAllCourseList
          if(typeof list === 'undefined' || list.length <= 0 || list === null || list === ''){
              this.$store.dispatch('getAllCourseList')
          }
      },
    addcourse() {
      var arr = this.$store.getters.getTeacherCourses;

      function search(namekey, myarray) {
        for (var i = 0; i < myarray.length; i++) {
          if (myarray[i].code === namekey) {
            return myarray[i];
          }
        }
      }

      var courseObject = search(this.courseselected, arr);
      if (courseObject === null || courseObject === undefined) {
        this.addcoursedialog = false;
        var list = this.$store.getters.getAllCourseList;
        var resultObject = search(this.courseselected, list);
        if (resultObject !== undefined && resultObject !== null) {
          this.$store.dispatch("addNewCourse", resultObject);
        } else {
          this.$store.commit("setError", {
            message: "Something went wrong"
          });
        }
      } else {
        this.$store.commit("setError", {
          message: "This course already exists. Try another one."
        });
      }
    }
  }
};
</script>
