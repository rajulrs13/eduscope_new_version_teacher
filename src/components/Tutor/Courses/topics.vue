<template>
  <v-layout row>
    <!--Alert components-->
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-flex xs12 sm12 md12>
      <h1 style="text-align:center;" class="font-weight-light">{{courseName}}</h1>
      <br v-if="topicarray.length > 0">
      <h3 style="text-align:center;" class="font-weight-light" v-if="topicarray.length > 0">Topics</h3>
      <!-- Progress Bar-->
      <v-progress-linear
        v-if="loading"
        class="mt-0"
        height="3"
        color="accent"
        :indeterminate="loading"
      ></v-progress-linear>
      <v-container id="create">
        <!-- Download Question bank -->
        <v-dialog v-model="downloadquesbank" max-width="300">
          <v-card>
            <v-card-title class="headline">Do you want to download the entire question bank?</v-card-title>
            <v-card-text
              class="px-2"
            >This means that the entire questionbank will be downloaded in Excel format.</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" flat="flat" @click="downloadquesbank=false">No</v-btn>
              <download-excel
                :data="json_data"
                class="text-xs-center"
                :fields="json_fields"
                name="questionbank.xlsx"
              >
                <v-btn dark flat color="accent" v-if="topicarray.length">Download</v-btn>
              </download-excel>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Delete question dialog -->
        <v-dialog v-model="deletequesdialog" max-width="300">
          <v-card>
            <v-card-title class="headline">Do you want to delete this question ?</v-card-title>

            <v-card-text>This means this question will be deleted permanently from your questionbank. Once deleted, you cannot restore it.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" flat="flat" @click="notdeleteques">No</v-btn>
              <v-btn color="error" flat="flat" @click="deletequesdialogconfirm">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Cannot delete question when quiz exists dialog -->
        <v-dialog persistent v-model="cannotdeletedialogbox" max-width="500px">
          <v-card>
            <v-card-title class="error">
              <h1 class="font-weight-light white--text">Can't delete questions !</h1>
            </v-card-title>
            <v-card-text>
              <v-container
                grid-list-md
              >You cannot delete any question from this topic because this topic exists in your currently made quizzes.However you can add and edit questions.</v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" flat @click="cannotdeletedialogbox=false">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Add Topic Dialog-->
        <v-dialog v-model="addtopicdialog" max-width="500px">
          <v-card>
            <v-form @submit.prevent="addtopic" ref="form" v-model="topicvalid">
              <v-card-title class="grey lighten-3">
                <h1 class="font-weight-light">New Topic</h1>
              </v-card-title>
              <v-progress-linear v-if="loading" class="mt-0" height="3" :indeterminate="loading"></v-progress-linear>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        name="name"
                        label="Topic Name"
                        id="topicname"
                        v-model="topicname"
                        type="text"
                        :rules="topicrules"
                        :disabled="loading"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="accent" flat @click.native="addtopicdialog = false">Close</v-btn>
                <v-btn color="accent" flat type="submit" :disabled="!topicvalid || loading">Add</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <!-- Delete all  Topics of the course Dialog-->
        <v-dialog v-model="deletealltopicsdialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Do you want to delete all the topics ?</v-card-title>

            <v-card-text>This means all questions of every topic that you have created under this course will be deleted permanently. Once deleted, you cannot restore them.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" flat="flat" @click="deletealltopicsdialog = false">No</v-btn>
              <v-btn color="error" flat="flat" @click="deletealltopics">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Delete Single Topic Dialog-->
        <v-dialog v-model="deletesingletopicdialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Do you want to delete this topics ?</v-card-title>

            <v-card-text>This means all the questions of this topic will be deleted permanently. Once deleted, you cannot restore them.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" flat="flat" @click="deletesingletopicdialog = false">No</v-btn>
              <v-btn color="error" flat="flat" @click="confirmdeletesingletopic">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Add questions dialog -->
        <v-form ref="form" v-model="validquestion">
          <v-dialog
            v-model="addquesdialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar color="primary">
                <v-icon
                  @click.native="addquesdialogmethod"
                  size="25px"
                  class="mr-3"
                  color="white"
                  style="cursor:pointer"
                >close</v-icon>
                <h2 class="white--text font-weight-light">Add to - {{addtotopic.name}}</h2>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-textarea
                    background-color="white"
                    v-model="qname"
                    clearable
                    :rules="requiredrules"
                    box
                    autofocus
                    light
                    rows="4"
                    label="Question *"
                    auto-grow
                    value
                  ></v-textarea>
                  <div>
                    <v-btn
                      @click.native="selectFileques"
                      v-if="!uploadEndques && !uploadingques"
                    >Add Image (Question)
                      <v-icon right aria-hidden="true">add_a_photo</v-icon>
                    </v-btn>
                    <input
                      id="fileques"
                      type="file"
                      name="fileques"
                      ref="uploadInputques"
                      accept="image/*"
                      :multiple="false"
                      @change="detectFileques($event)"
                    >
                    <v-progress-circular
                      v-if="uploadingques && !uploadEndques"
                      :size="100"
                      :width="15"
                      :rotate="360"
                      :value="progressUploadques"
                      color="primary"
                    >%</v-progress-circular>
                    <img v-if="uploadEndques" :src="downloadURLques" width="100%">
                    <div v-if="uploadEndques">
                      <v-btn class="ma-0" dark small color="error" @click="deleteImageques()">Delete</v-btn>
                    </div>
                  </div>
                  <v-textarea
                    background-color="white"
                    v-model="opt1"
                    clearable
                    :rules="requiredrules"
                    box
                    autofocus
                    light
                    rows="1"
                    label="Option 1 *"
                    auto-grow
                    value
                  ></v-textarea>
                  <div>
                    <v-btn
                      @click.native="selectFileopt1"
                      v-if="!uploadEndopt1 && !uploadingopt1"
                    >Add Image (Opt1)
                      <v-icon right aria-hidden="true">add_a_photo</v-icon>
                    </v-btn>
                    <input
                      id="fileopt1"
                      type="file"
                      name="fileopt1"
                      ref="uploadInputopt1"
                      accept="image/*"
                      :multiple="false"
                      @change="detectFileopt1($event)"
                    >
                    <v-progress-circular
                      v-if="uploadingopt1 && !uploadEndopt1"
                      :size="100"
                      :width="15"
                      :rotate="360"
                      :value="progressUploadopt1"
                      color="primary"
                    >%</v-progress-circular>
                    <img v-if="uploadEndopt1" :src="downloadURLopt1" width="100%">
                    <div v-if="uploadEndopt1">
                      <v-btn class="ma-0" dark small color="error" @click="deleteImageopt1()">Delete</v-btn>
                    </div>
                  </div>
                  <v-textarea
                    background-color="white"
                    v-model="opt2"
                    clearable
                    :rules="requiredrules"
                    box
                    autofocus
                    light
                    rows="1"
                    label="Option 2 *"
                    auto-grow
                    value
                  ></v-textarea>
                  <div>
                    <v-btn
                      @click.native="selectFileopt2"
                      v-if="!uploadEndopt2 && !uploadingopt2"
                    >Add Image (Opt2)
                      <v-icon right aria-hidden="true">add_a_photo</v-icon>
                    </v-btn>
                    <input
                      id="fileopt2"
                      type="file"
                      name="fileopt2"
                      ref="uploadInputopt2"
                      accept="image/*"
                      :multiple="false"
                      @change="detectFileopt2($event)"
                    >
                    <v-progress-circular
                      v-if="uploadingopt2 && !uploadEndopt2"
                      :size="100"
                      :width="15"
                      :rotate="360"
                      :value="progressUploadopt2"
                      color="primary"
                    >%</v-progress-circular>
                    <img v-if="uploadEndopt2" :src="downloadURLopt2" width="100%">
                    <div v-if="uploadEndopt2">
                      <v-btn class="ma-0" dark small color="error" @click="deleteImageopt2()">Delete</v-btn>
                    </div>
                  </div>
                  <v-textarea
                    background-color="white"
                    v-model="opt3"
                    clearable
                    box
                    autofocus
                    light
                    rows="1"
                    label="Option 3 (optional)"
                    auto-grow
                    value
                  ></v-textarea>
                  <div>
                    <v-btn
                      @click.native="selectFileopt3"
                      v-if="!uploadEndopt3 && !uploadingopt3"
                    >Add Image (Opt3)
                      <v-icon right aria-hidden="true">add_a_photo</v-icon>
                    </v-btn>
                    <input
                      id="fileopt3"
                      type="file"
                      name="fileopt3"
                      ref="uploadInputopt3"
                      accept="image/*"
                      :multiple="false"
                      @change="detectFileopt3($event)"
                    >
                    <v-progress-circular
                      v-if="uploadingopt3 && !uploadEndopt3"
                      :size="100"
                      :width="15"
                      :rotate="360"
                      :value="progressUploadopt3"
                      color="primary"
                    >%</v-progress-circular>
                    <img v-if="uploadEndopt3" :src="downloadURLopt3" width="100%">
                    <div v-if="uploadEndopt3">
                      <v-btn class="ma-0" dark small color="error" @click="deleteImageopt3()">Delete</v-btn>
                    </div>
                  </div>
                  <v-textarea
                    background-color="white"
                    v-model="opt4"
                    clearable
                    box
                    autofocus
                    light
                    rows="1"
                    label="Option 4 (optional)"
                    auto-grow
                    value
                  ></v-textarea>
                  <div>
                    <v-btn
                      @click.native="selectFileopt4"
                      v-if="!uploadEndopt4 && !uploadingopt4"
                    >Add Image (Opt4)
                      <v-icon right aria-hidden="true">add_a_photo</v-icon>
                    </v-btn>
                    <input
                      id="fileopt4"
                      type="file"
                      name="fileopt4"
                      ref="uploadInputopt4"
                      accept="image/*"
                      :multiple="false"
                      @change="detectFileopt4($event)"
                    >
                    <v-progress-circular
                      v-if="uploadingopt4 && !uploadEndopt4"
                      :size="100"
                      :width="15"
                      :rotate="360"
                      :value="progressUploadopt4"
                      color="primary"
                    >%</v-progress-circular>
                    <img v-if="uploadEndopt4" :src="downloadURLopt4" width="100%">
                    <div v-if="uploadEndopt4">
                      <v-btn class="ma-0" dark small color="error" @click="deleteImageopt4()">Delete</v-btn>
                    </div>
                  </div>
                  <v-layout row wrap>
                    <v-flex xs12 sm4 md4 offset-sm1>
                      <v-select
                        :rules="requiredrules"
                        v-model="type"
                        :items="items1"
                        item-text="type"
                        item-value="type"
                        label="Select question type *"
                        single-line
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm4 md4 offset-sm1>
                      <v-select
                        v-if="type=='Multiple Correct'"
                        :rules="requiredrules"
                        v-model="answer"
                        :items="items"
                        item-text="ans"
                        item-value="ans"
                        label="Select answer *"
                        single-line
                      ></v-select>
                      <v-select
                        v-if="type=='Single Correct'"
                        :rules="requiredrules"
                        v-model="answer"
                        :items="items3"
                        item-text="ans"
                        item-value="ans"
                        label="Select answer *"
                        single-line
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-layout align-end justify-end row fill-height>
                  <v-flex xs12>
                    <v-btn
                      :disabled="!validquestion || loading"
                      dark
                      color="success"
                      :loading="loading"
                      @click="addquestion"
                      raised
                      ripple
                    >Add to Question Bank</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>

        <!-- Edit Question dialog -->
        <v-form @submit.prevent ref="form" v-model="validedit">
          <v-dialog
            v-model="editquesdialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar color="primary">
                <v-icon
                  @click.native="editquesdialog = false"
                  size="25px"
                  class="mr-3"
                  color="white"
                  style="cursor:pointer"
                >close</v-icon>
                <h2 class="white--text font-weight-light">Edit</h2>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-textarea
                    background-color="white"
                    v-model="qname"
                    clearable
                    :rules="requiredrules"
                    box
                    autofocus
                    light
                    rows="4"
                    label="Question *"
                    auto-grow
                    :value="qname"
                  ></v-textarea>
                  <v-textarea
                    background-color="white"
                    v-model="opt1"
                    clearable
                    :rules="requiredrules"
                    box
                    autofocus
                    light
                    rows="1"
                    label="Option 1 *"
                    auto-grow
                    :value="opt1"
                  ></v-textarea>
                  <v-textarea
                    background-color="white"
                    v-model="opt2"
                    clearable
                    :rules="requiredrules"
                    box
                    autofocus
                    light
                    rows="1"
                    label="Option 2 *"
                    auto-grow
                    :value="opt2"
                  ></v-textarea>
                  <v-textarea
                    background-color="white"
                    v-model="opt3"
                    clearable
                    box
                    autofocus
                    light
                    rows="1"
                    label="Option 3 (optional)"
                    auto-grow
                    :value="opt3"
                  ></v-textarea>
                  <v-textarea
                    background-color="white"
                    v-model="opt4"
                    clearable
                    box
                    autofocus
                    light
                    rows="1"
                    label="Option 4 (optional)"
                    auto-grow
                    :value="opt4"
                  ></v-textarea>
                  <v-layout row wrap>
                    <v-flex xs12 sm4 md4 offset-sm1>
                      <v-select
                        :rules="requiredrules"
                        v-model="type"
                        :items="items1"
                        item-text="type"
                        :item-value="type"
                        label="Select question type *"
                        single-line
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm4 md4 offset-sm1>
                      <v-select
                        v-if="type=='Multiple Correct'"
                        :rules="requiredrules"
                        v-model="answer"
                        :items="items"
                        item-text="ans"
                        :item-value="ans"
                        label="Select answer *"
                        single-line
                      ></v-select>
                      <v-select
                        v-if="type=='Single Correct'"
                        :rules="requiredrules"
                        v-model="answer"
                        :items="items3"
                        item-text="ans"
                        :item-value="ans"
                        label="Select answer *"
                        single-line
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-layout align-end justify-end row fill-height>
                  <v-flex xs12>
                    <v-btn
                      :disabled="!validedit || loading"
                      dark
                      color="success"
                      :loading="loading"
                      @click="addeditedquestion"
                      raised
                      ripple
                    >Save Changes</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>

        <!-- Add New Questions Excel Dialog -->
        <v-dialog v-model="addnewquestionexceldialog" max-width="500px" persistent>
          <v-card>
            <v-card-title class="grey lighten-3">
              <h2>
                <span class="font-weight-light">Upload Question Bank</span>
              </h2>
            </v-card-title>
            <v-container>
              <h4>
                <span class="font-weight-light text-xs-center">1. Download the <i>questionbank.xlxs </i> from here.</span>
              </h4>
              <v-btn
                class="text-xs-center"
                color="accent"
                flat
                name="Download"
                href="https://www.mujquiz.com/questionbank.xlsx"
              >Download</v-btn>

              <h4>
                <span class="font-weight-light text-xs-center">
                  2. Open the dowloaded file. <b>(Using Google Sheet is recommmended) *</b>   
                  <br>     
                  <span class="error--text">
                  <i>Using MS Office <b>(with no unicode support)</b> will result in some missing/unwanted symbols in the question bank.</i>
                  </span>           
                </span>
              </h4>
              <br>
              <h4>
                <span
                  class="font-weight-light text-xs-center"
                >3. Fill it carefully, following all the instructions.</span>
              </h4>
              <br>              
              <h4>
                <span class="font-weight-light text-xs-center">
                  4. Upload it in
                  <b>'.csv'</b> format below.
                  <br>
                  <span class="error--text">
                  <i>If using MS Office save it in <b>'CSV UTF-8(Comma delimited)(*.csv)'  </b> format <b>only.</b></i>
                  </span>
                </span>
              </h4>
              <br>
              <v-text-field
                label="Select CSV File"
                @click="pickFile"
                v-model="filename"
                prepend-icon="attach_file"
              ></v-text-field>
              <input
                type="file"
                id="file"
                style="display: none"
                accept=".csv"
                name="file"
                ref="file"
                v-on:change="handleFileUpload()"
              >
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" flat @click.native="cancelnewquestionexceldialog">Cancel</v-btn>
              <v-btn
                color="accent"
                flat
                name="Import"
                @click.native="submitFile"
                :disabled="loading"
              >Upload</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Add New Questions Excel Dialog -->
        <v-dialog v-model="imagepreviewdiaglog" max-width="500px">
          <v-card color flat tile>
            <v-window v-model="onboarding">
              <v-window-item v-for="(n,index) in previewurls" :key="`card-${index}`">
                <v-card color="transparent">
                  <v-layout align-center justify-center fill-height tag="v-card-text">
                    <span v-if="index==0 && n==0">No Image available for Question</span>
                    <span v-if="index==1 && n==0">No Image available for Option 1</span>
                    <span v-if="index==2 && n==0">No Image available for Option 2</span>
                    <span v-if="index==3 && n==0">No Image available for Option 3</span>
                    <span v-if="index==4 && n==0">No Image available for Option 4</span>
                    <img v-if="n!=0" :src="n" alt width="100%" height="auto">
                  </v-layout>
                </v-card>
              </v-window-item>
            </v-window>

            <v-card-actions class="justify-space-between">
              <v-btn flat @click="prev">
                <v-icon small>chevron_left</v-icon>
              </v-btn>

              <v-btn flat @click="next">
                <v-icon small>chevron_right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Topic Display for the course -->
        <v-layout v-if="topicarray.length > 0">
          <v-flex xs12>
            <v-expansion-panel popout focusable>
              <v-expansion-panel-content v-for="item in topicarray" :key="item.answer">
                <div slot="header">{{item.name}}</div>
                <v-container>
                  <v-card raised>
                    <v-toolbar flat color="white">
                      <div style="width:70%">
                        <v-text-field
                          v-model="search"
                          append-icon="search"
                          label="Search"
                          single-line
                          hide-details
                        ></v-text-field>
                      </div>
                      <v-spacer></v-spacer>
                      <v-icon color="accent" class="mr-3 mt-3" @click="addquesbutton(item)">add</v-icon>
                    </v-toolbar>
                  </v-card>

                  <!-- Question table-->
                  <v-data-table
                    :headers="headers"
                    :items="item.questions"
                    class="elevation-5"
                    :search="search"
                    item-key="question"
                  >
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-center">{{ props.item.qname }}</td>
                      <td class="text-xs-center">{{ props.item.opt1 }}</td>
                      <td class="text-xs-center">{{ props.item.opt2 }}</td>
                      <td class="text-xs-center">{{ props.item.opt3 }}</td>
                      <td class="text-xs-center">{{ props.item.opt4 }}</td>
                      <td class="text-xs-center">{{ props.item.answer }}</td>
                      <td class="text-xs-center">{{ props.item.type }}</td>
                      <td class="justify-center layout px-0">
                        <v-icon
                          small
                          class="mr-2"
                          v-if="props.item.imgurls[0]!=0 || props.item.imgurls[1]!=0 || props.item.imgurls[2]!=0 || props.item.imgurls[3]!=0 ||props.item.imgurls[4]!=0"
                          @click="displayimg(props.item,item)"
                          color="success"
                        >image_search</v-icon>
                        <v-icon
                          small
                          class="mr-2"
                          @click="editItem(props.item,item)"
                          color="info"
                        >edit</v-icon>
                        <!-- Sending question object and topic object when delete button is pressed -->
                        <v-icon small @click="deleteItem(props.item,item)" color="error">delete</v-icon>
                      </td>
                    </template>
                    <template slot="no-data">No Questions</template>
                    <template slot="footer">
                      <td colspan="100%" class="text-sm-center">
                        <v-btn
                          flat
                          color="red"
                          @click="deletesingletopic({topicobj:item, courseref:id})"
                        >
                          <v-icon fab color="error" class="mr-2">delete</v-icon>Delete topic
                        </v-btn>
                      </td>
                    </template>
                  </v-data-table>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>

        <v-layout align-center justify-center column fill-height v-else>
          <br>
          <div class="text-xs-center">
            <v-icon size="220">clear_all</v-icon>
          </div>
          <br>
          <h2 style="text-align:center;" class="font-weight-light">No Question Bank</h2>
          <br>
          <p style="text-align:center;" class="font-weight-light">
            To create a questionbank, click on &nbsp
            <b><</b>&nbsp button down below
          </p>
        </v-layout>

        <v-speed-dial
          v-model="fab"
          :top="top"
          :bottom="bottom"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
        >
          <v-btn slot="activator" v-model="fab" color="accent" large fab>
            <v-icon>keyboard_arrow_left</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn fab dark small color="primary" @click="addtopicdialog=true">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn
            v-if="topicarray.length>0"
            fab
            dark
            small
            color="error"
            @click="deletealltopicsdialog = true"
          >
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn fab dark small color="green darken-4" @click="addnewquestionexceldialog = true">
            <v-icon>description</v-icon>
          </v-btn>

          <v-btn
            @click="downloadbank"
            fab
            dark
            small
            color="blue darken-4"
            v-if="topicarray.length"
          >
            <v-icon>cloud_download</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "./../../../firebase/firebase";
import axios from 'axios';
export default {
  data: () => ({
    previewurls: null,
    length: 5,
    onboarding: 0,
    imagepreviewdiaglog: false,
    imgurls: [0, 0, 0, 0, 0],
    //   img opt4
    progressUploadopt4: 0,
    fileNameopt4: "",
    uploadTaskopt4: "",
    uploadingopt4: false,
    uploadEndopt4: false,
    downloadURLopt4: "",
    // img opt3
    progressUploadopt3: 0,
    fileNameopt3: "",
    uploadTaskopt3: "",
    uploadingopt3: false,
    uploadEndopt3: false,
    downloadURLopt3: "",
    // opt2img
    progressUploadopt2: 0,
    fileNameopt2: "",
    uploadTaskopt2: "",
    uploadingopt2: false,
    uploadEndopt2: false,
    downloadURLopt2: "",
    // opt1img
    progressUploadopt1: 0,
    fileNameopt1: "",
    uploadTaskopt1: "",
    uploadingopt1: false,
    uploadEndopt1: false,
    downloadURLopt1: "",
    // Quesfileupload
    progressUploadques: 0,
    fileNameques: "",
    uploadTaskques: "",
    uploadingques: false,
    uploadEndques: false,
    downloadURLques: "",
    //
    // question
    downloadquesbank: false,
    json_fields: {
      Qestion: "ques",
      "Option A": "opt1",
      "Option B": "opt2",
      "Option C": "opt3",
      "Option D": "opt4",
      "Answer:": "ans",
      Type: "type",
      Topic: "topicname"
    },
    json_data: [],
    json_meta: [
      [
        {
          key: "charset",
          value: "utf-8"
        }
      ]
    ],
    addnewquestionexceldialog: false,
    topicinwhichquesedited: "",
    addtotopic: "",
    editquesdialog: false,
    validedit: false,
    payload: "",
    deletequesdialog: false,
    qname: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
    hashanswer: "",
    magicnum: "",
    type: "",
    requiredrules: [v => !!v || "Field is required"],
    id: null,
    items: [
      {
        ans: "A"
      },
      {
        ans: "B"
      },
      {
        ans: "C"
      },
      {
        ans: "D"
      },
      {
        ans: "AB"
      },
      {
        ans: "AC"
      },
      {
        ans: "AD"
      },
      {
        ans: "BD"
      },
      {
        ans: "BC"
      },
      {
        ans: "CD"
      },
      {
        ans: "ABC"
      },
      {
        ans: "ABD"
      },
      {
        ans: "BCD"
      },
      {
        ans: "ACD"
      },
      {
        ans: "ABCD"
      }
    ],
    items3: [
      {
        ans: "A"
      },
      {
        ans: "B"
      },
      {
        ans: "C"
      },
      {
        ans: "D"
      }
    ],
    items1: [
      {
        type: "Single Correct"
      },
      {
        type: "Multiple Correct"
      }
    ],
    validquestion: false,
    // Floating button
    direction: "left",
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-transition",

    // Dialog
    deletealltopicsdialog: false,
    addtopicdialog: false,
    topicvalid: false,
    topicname: "",
    topicrules: [value => !!value || "Please enter a topic name."],
    addquesdialog: false,
    selected: [],
    search: "",
    headers: [
      {
        text: "Question",
        value: "question",
        align: "center",
        sortable: true
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
    cannotdeletedialogbox: false,
    deletesingletopicdialog: false,
    topictobedeleted: "",
    quesid: "",

    // file upload
    file: "",
    filename: ""
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Question" : "Edit Question";
    },
    // Get Course Name
    courseName() {
      var list = this.$store.getters.getTeacherCourses;
      var ink = "";
      //Getting name of the course from all course list through the course reference(via route parameter)
      function search(namekey, myarray) {
        for (var i = 0; i < myarray.length; i++) {
          if (myarray[i].reference == namekey) {
            ink = myarray[i];
          }
        }
      }
      search(this.$route.params.coursereference, list);
      return ink.name;
    },
    error() {
      return this.$store.getters.error;
    },
    success() {
      return this.$store.getters.success;
    },
    loading() {
      return this.$store.getters.loading;
    },
    topicarray() {
      return this.$store.getters.getcurrenttopicarray;
    }
  },

  created() {
    this.id = this.$route.params.coursereference;
    this.$store.dispatch("setcurrenttopicarray", this.id);
  },

  watch: {
    uploadTaskopt3: function() {
      this.uploadTaskopt3.on(
        "state_changed",
        sp => {
          this.progressUploadopt3 = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTaskopt3.snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              this.uploadEndopt3 = true;
              this.downloadURLopt3 = downloadURL;
              this.imgurls[3] = downloadURL;
              this.$emit("downloadURL", downloadURL);
            });
        }
      );
    },
    uploadTaskopt2: function() {
      this.uploadTaskopt2.on(
        "state_changed",
        sp => {
          this.progressUploadopt2 = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTaskopt2.snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              this.uploadEndopt2 = true;
              this.downloadURLopt2 = downloadURL;
              this.imgurls[2] = downloadURL;
              this.$emit("downloadURL", downloadURL);
            });
        }
      );
    },
    uploadTaskopt1: function() {
      this.uploadTaskopt1.on(
        "state_changed",
        sp => {
          this.progressUploadopt1 = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTaskopt1.snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              this.uploadEndopt1 = true;
              this.downloadURLopt1 = downloadURL;
              this.imgurls[1] = downloadURL;
              this.$emit("downloadURL", downloadURL);
            });
        }
      );
    },
    uploadTaskopt4: function() {
      this.uploadTaskopt4.on(
        "state_changed",
        sp => {
          this.progressUploadopt4 = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTaskopt4.snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              this.uploadEndopt4 = true;
              this.downloadURLopt4 = downloadURL;
              this.imgurls[4] = downloadURL;
              this.$emit("downloadURL", downloadURL);
            });
        }
      );
    },
    error(err) {
      if (!!err) {
        setTimeout(() => this.$store.dispatch("clearError"), 3000);
      }
    },
    success(con) {
      if (!!con) {
        setTimeout(() => this.$store.dispatch("clearSuccess"), 2000);
      }
    },
    uploadTaskques: function() {
      this.uploadTaskques.on(
        "state_changed",
        sp => {
          this.progressUploadques = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTaskques.snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              this.uploadEndques = true;
              this.downloadURLques = downloadURL;
              this.imgurls[0] = downloadURL;
              this.$emit("downloadURL", downloadURL);
            });
        }
      );
    }
  },

  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    addquesdialogmethod() {
      this.addquesdialog = false;
      this.imgurls = [0, 0, 0, 0, 0];
      this.uploadingques = false;
      this.uploadingopt1 = false;
      this.uploadingopt2 = false;
      this.uploadingopt3 = false;
      this.uploadingopt4 = false;
      this.uploadingques = false;
      this.uploadingopt1 = false;
      this.uploadingopt2 = false;
      this.uploadingopt3 = false;
      this.uploadingopt4 = false;
      this.uploadEndques = false;
      this.uploadEndopt1 = false;
      this.uploadEndopt2 = false;
      this.uploadEndopt3 = false;
      this.uploadEndopt4 = false;
      this.downloadURLques = "";
      this.downloadURLopt1 = "";
      this.downloadURLopt2 = "";
      this.downloadURLopt3 = "";
      this.downloadURLopt4 = "";
    },
    //   img opt4
    selectFileopt4() {
      this.$refs.uploadInputopt4.click();
    },
    detectFileopt4(e) {
      let fileList = e.target.files || e.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map(x => {
        this.uploadopt4(fileList[x]);
      });
    },
    uploadopt4(file) {
      this.fileNameopt4 = file.name;
      this.uploadingopt4 = true;
      this.uploadTaskopt4 = firebase
        .storage()
        .ref(this.$store.getters.getUserId + "/" + file.name)
        .put(file);
    },
    deleteImageopt4() {
      firebase
        .storage()
        .ref(this.$store.getters.getUserId + "/" + this.fileNameopt4)
        .delete()
        .then(() => {
          this.uploadingopt4 = false;
          this.uploadEndopt4 = false;
          this.downloadURLopt4 = "";
        })
        .catch(error => {
          console.error("file delete error occured: ${error}");
        });
    },
    // img opt3
    selectFileopt3() {
      this.$refs.uploadInputopt3.click();
    },
    detectFileopt3(e) {
      let fileList = e.target.files || e.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map(x => {
        this.uploadopt3(fileList[x]);
      });
    },
    uploadopt3(file) {
      this.fileNameopt3 = file.name;
      this.uploadingopt3 = true;
      this.uploadTaskopt3 = firebase
        .storage()
        .ref(this.$store.getters.getUserId + "/" + file.name)
        .put(file);
    },
    deleteImageopt3() {
      firebase
        .storage()
        .ref(this.$store.getters.getUserId + "/" + this.fileNameopt3)
        .delete()
        .then(() => {
          this.uploadingopt3 = false;
          this.uploadEndopt3 = false;
          this.downloadURLopt3 = "";
        })
        .catch(error => {
          console.error("file delete error occured: ${error}");
        });
    },
    // img opt2
    selectFileopt2() {
      this.$refs.uploadInputopt2.click();
    },
    detectFileopt2(e) {
      let fileList = e.target.files || e.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map(x => {
        this.uploadopt2(fileList[x]);
      });
    },
    uploadopt2(file) {
      this.fileNameopt2 = file.name;
      this.uploadingopt2 = true;
      this.uploadTaskopt2 = firebase
        .storage()
        .ref(this.$store.getters.getUserId + "/" + file.name)
        .put(file);
    },
    deleteImageopt2() {
      firebase
        .storage()
        .ref(this.$store.getters.getUserId + "/" + this.fileNameopt2)
        .delete();
      this.uploadingques = false;
      this.uploadingopt1 = false;
      this.uploadingopt2 = false;
      this.uploadingopt3 = false;
      this.uploadingopt4 = false
        .then(() => {
          this.uploadingopt2 = false;
          this.uploadEndopt2 = false;
          this.downloadURLopt2 = "";
        })
        .catch(error => {
          console.error("file delete error occured: ${error}");
        });
    },
    // img opt1
    selectFileopt1() {
      this.$refs.uploadInputopt1.click();
    },
    detectFileopt1(e) {
      let fileList = e.target.files || e.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map(x => {
        this.uploadopt1(fileList[x]);
      });
    },
    uploadopt1(file) {
      this.fileNameopt1 = file.name;
      this.uploadingopt1 = true;
      this.uploadTaskopt1 = firebase
        .storage()
        .ref(this.$store.getters.getUserId + "/" + file.name)
        .put(file);
    },
    deleteImageopt1() {
      firebase
        .storage()
        .ref(this.$store.getters.getUserId + "/" + this.fileNameopt1)
        .delete()
        .then(() => {
          this.uploadingopt1 = false;
          this.uploadEndopt1 = false;
          this.downloadURLopt1 = "";
        })
        .catch(error => {
          console.error("file delete error occured: ${error}");
        });
    },
    // Ques file upload
    selectFileques() {
      this.$refs.uploadInputques.click();
    },
    detectFileques(e) {
      let fileList = e.target.files || e.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map(x => {
        this.uploadques(fileList[x]);
      });
    },
    uploadques(file) {
      this.fileNameques = file.name;
      this.uploadingques = true;
      this.uploadTaskques = firebase
        .storage()
        .ref(this.$store.getters.getUserId + "/" + file.name)
        .put(file);
    },
    deleteImageques() {
      firebase
        .storage()
        .ref(this.$store.getters.getUserId + "/" + this.fileNameques)
        .delete()
        .then(() => {
          this.uploadingques = false;
          this.uploadEndques = false;
          this.downloadURLques = "";
        })
        .catch(error => {
          console.error("file delete error occured: ${error}");
        });
    },
    downloadbank() {
      this.downloadquesbank = true;
      this.intialisequesbank();
    },
    intialisequesbank() {
      var bank = [];
      this.$store.getters.getcurrenttopicarray.forEach(topic => {
        topic.questions.forEach(element => {
          var quesobj = {
            ques: element.qname,
            opt1: element.opt1,
            opt2: element.opt2,
            opt3: element.opt3,
            opt4: element.opt4,
            ans: element.answer,
            type: element.type,
            topicname: topic.name
          };
          bank.push(quesobj);
        });
      });
      this.json_data = bank;
    },
    pickFile() {
      this.$refs.file.click();
    },
    // Submits the file to the server
    submitFile() {
      // Initialize the form data
      let formData = new FormData();
      // Add the form data we need to submit
      formData.append("file", this.file);
      // Make the request to the POST /single-file URL
      var self = this;
      this.$store.commit("setLoading", true);
      axios
        .post("https://www.mujquiz.com/importques.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          if (response.data.elseerror == null) {
            if (response.data.data != null) {
              var topiclist = [];
              // push each topic in that array
              response.data.data.forEach(element => {
                topiclist.push(element.topic);
              });
              // filter unique topics
              topiclist = topiclist.filter((x, i, a) => a.indexOf(x) == i);

              var arr = self.$store.getters.getTeacherCourses;
              var arr1 = self.$store.getters.getTopics;
              var c = 0;
              var myid = self.id;
              var topicobj = null;
              //Check if topic exists
              function search(namekey, myarray) {
                for (var i = 0; i < myarray.length; i++) {
                  //Checking for course doc
                  if (myarray[i].reference === myid) {
                    for (var j = 0; j < myarray[i].topics.length; j++) {
                      if (myarray[i].topics[j].name === namekey) {
                        //topicobj = myarray[i].topics[j];
                        c = c + 1;
                        return;
                      }
                    }
                  }
                }
              }
              // Get last id
              var dict2 = {};

              function getlastid(topicname, alltopiclist) {
                console.log(alltopiclist);
                for (var i = 0; i < alltopiclist.length; i++) {
                  if (alltopiclist[i].name == topicname) {
                    dict2[alltopiclist[i].name] = alltopiclist[i].reference;
                    var l = alltopiclist[i].questions.length;
                    if (l == 0) {
                      return 0;
                    }
                    console.log(alltopiclist[i].questions);
                    console.log(l);
                    var qwerty = alltopiclist[i].questions[l - 1].quesid;
                    return qwerty;
                  }
                }
              }
              topiclist.forEach(element => {
                search(element, arr);
              });
              if (c != topiclist.length) {
                self.cancelnewquestionexceldialog();
                self.$store.commit("setLoading", false);
                self.$store.commit("setError", {
                  message:
                    "Topic(s) mentioned in CSV file does not exists. Create the missing topic(s) and try again.",
                  status: true
                });
              } else {
                // Making Dictionary for last id
                var dict = {};
                topiclist.forEach(element => {
                  var i = getlastid(element, arr1);
                  dict[element] = i;
                });
                console.log(dict);
                console.log(dict2);
                // Adding question
                response.data.data.forEach(element => {
                  var t = element.topic;
                  var genid = parseInt(dict[t]) + 1;
                  dict[t] = genid;
                  self.addnewquestionviaexcel(element, genid, dict2[t]);
                });
                self.cancelnewquestionexceldialog();
                self.$store.commit("setLoading", false);
                setTimeout(() => {
                  self.$store.commit("setSuccess", {
                    message: response.data.message,
                    status: true
                  });
                }, 500);
              }
            } else {
              var qnameErr = "";
              var opt1Err = "";
              var opt2Err = "";
              var opt3Err = "";
              var opt4Err = "";
              var answerErr = "";
              var typeErr = "";
              if (response.data.error.qname_err != "") {
                qnameErr = response.data.error.qname_err + " ";
              }
              if (response.data.error.opt1_err != "") {
                opt1Err = response.data.error.opt1_err + " ";
              }
              if (response.data.error.opt2_err != "") {
                opt2Err = response.data.error.opt2_err + " ";
              }
              if (response.data.error.opt3_err != "") {
                opt3Err = response.data.error.opt3_err + " ";
              }
              if (response.data.error.opt4_err != "") {
                opt4Err = response.data.error.opt4_err + " ";
              }
              if (response.data.error.answer_err != "") {
                answerErr = response.data.error.answer_err + " ";
              }
              if (response.data.error.type_err != "") {
                typeErr = response.data.error.type_err + " ";
              }
              var error_string =
                "Error in line " +
                response.data.error.line +
                " => " +
                qnameErr +
                opt1Err +
                opt2Err +
                opt3Err +
                opt4Err +
                answerErr +
                typeErr;
              self.cancelnewquestionexceldialog();
              self.$store.commit("setLoading", false);
              setTimeout(() => {
                self.$store.commit("setError", {
                  message: response.data.message
                });
              }, 500);
              setTimeout(() => {
                self.$store.commit("setError", {
                  message: error_string
                });
              }, 4500);
            }
          } else {
            self.cancelnewquestionexceldialog();
            self.$store.commit("setLoading", false);
            setTimeout(() => {
              self.$store.commit("setError", {
                message: response.data.elseerror
              });
            }, 500);
          }
        })
        .catch(function(error) {
          self.cancelnewquestionexceldialog();
          self.$store.commit("setLoading", false);
          self.$store.commit("setError", error);
        });
    },
    addnewquestionviaexcel(payload, id, ref) {
      var num = Math.floor(Math.random() * 1000) + 1;
      var h = this.md5(num + payload.answer);
      var quesobj = {
        qname: payload.qname,
        opt1: payload.opt1,
        opt2: payload.opt2,
        opt3: payload.opt3,
        opt4: payload.opt4,
        answer: payload.answer,
        hashanswer: h,
        magicnum: num,
        type: payload.type,
        quesid: id,
        imgurls: [0, 0, 0, 0, 0]
      };
      this.$store.dispatch("addquestion", {
        quesobj: quesobj,
        topicref: ref
      });
    },
    // Handles a change on the file upload
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.filename = this.$refs.file.files[0].name;
    },
    cancelnewquestionexceldialog() {
      this.addnewquestionexceldialog = false;
      const input = this.$refs.file;
      input.type = "text";
      input.type = "file";
    },
    md5(string) {
      function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
      }

      function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = lX & 0x80000000;
        lY8 = lY & 0x80000000;
        lX4 = lX & 0x40000000;
        lY4 = lY & 0x40000000;
        lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
        if (lX4 & lY4) {
          return lResult ^ 0x80000000 ^ lX8 ^ lY8;
        }
        if (lX4 | lY4) {
          if (lResult & 0x40000000) {
            return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
          } else {
            return lResult ^ 0x40000000 ^ lX8 ^ lY8;
          }
        } else {
          return lResult ^ lX8 ^ lY8;
        }
      }

      function F(x, y, z) {
        return (x & y) | (~x & z);
      }

      function G(x, y, z) {
        return (x & z) | (y & ~z);
      }

      function H(x, y, z) {
        return x ^ y ^ z;
      }

      function I(x, y, z) {
        return y ^ (x | ~z);
      }

      function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
      }

      function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
      }

      function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
      }

      function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
      }

      function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 =
          (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
          lWordCount = (lByteCount - (lByteCount % 4)) / 4;
          lBytePosition = (lByteCount % 4) * 8;
          lWordArray[lWordCount] =
            lWordArray[lWordCount] |
            (string.charCodeAt(lByteCount) << lBytePosition);
          lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] =
          lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
      }

      function WordToHex(lValue) {
        var WordToHexValue = "",
          WordToHexValue_temp = "",
          lByte,
          lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
          lByte = (lValue >>> (lCount * 8)) & 255;
          WordToHexValue_temp = "0" + lByte.toString(16);
          WordToHexValue =
            WordToHexValue +
            WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
      }

      function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);

          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
          } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }
        }

        return utftext;
      }

      var x = Array();
      var k, AA, BB, CC, DD, a, b, c, d;
      var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
      var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
      var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
      var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;

      string = Utf8Encode(string);

      x = ConvertToWordArray(string);

      a = 0x67452301;
      b = 0xefcdab89;
      c = 0x98badcfe;
      d = 0x10325476;

      for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
        b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
        a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
        c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
        c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
        a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
        a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
        a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
        a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
        c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
        c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
        b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
        c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
        d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
        c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
        a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
        d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
        b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
      }

      var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

      return temp.toLowerCase();
    },
    editItem(quesobj, topicobj) {
      this.topicinwhichquesedited = "";
      this.quesid = "";
      this.qname = quesobj.qname;
      this.opt1 = quesobj.opt1;
      this.opt2 = quesobj.opt2;
      this.opt3 = quesobj.opt3;
      this.opt4 = quesobj.opt4;
      this.answer = quesobj.answer;
      this.hashanswer = quesobj.hashanswer;
      this.magicnum = quesobj.magicnum;
      this.type = quesobj.type;
      this.topicinwhichquesedited = topicobj.reference;
      this.quesid = quesobj.quesid;
      this.imgurls = quesobj.imgurls;
      this.editquesdialog = true;
    },
    displayimg(quesobj, topicobj) {
      this.previewurls = quesobj.imgurls;
      this.imagepreviewdiaglog = true;
    },
    addeditedquestion() {
      var h = this.md5(this.magicnum + this.answer);
      var quesobj = {
        qname: this.qname,
        opt1: this.opt1,
        opt2: this.opt2,
        opt3: this.opt3,
        opt4: this.opt4,
        answer: this.answer,
        hashanswer: h,
        magicnum: this.magicnum,
        type: this.type,
        quesid: this.quesid,
        imgurls: this.imgurls
      };
      var payload = {
        topicref: this.topicinwhichquesedited,
        editedquesobj: quesobj
      };
      this.$store.dispatch("addeditedques", payload);
      this.editquesdialog = false;
    },
    notdeleteques() {
      this.payload = "";
      this.deletequesdialog = false;
    },
    deletequesdialogconfirm() {
      if (
        this.payload.topicobj.quizzes.length == 0 ||
        this.payload.topicobj.quizzes === null ||
        this.payload.topicobj.quizzes === undefined
      ) {
        this.$store.dispatch("deletequestion", this.payload);
      } else {
        this.cannotdeletedialogbox = true;
        return;
      }
      this.deletequesdialog = false;
    },
    addquesbutton(item) {
      (this.addtotopic = ""),
        (this.qname = ""),
        (this.opt1 = ""),
        (this.opt2 = ""),
        (this.opt3 = ""),
        (this.opt4 = ""),
        (this.answer = ""),
        (this.hashanswer = ""),
        (this.magicnum = ""),
        (this.type = "");
      this.imgurls = [0, 0, 0, 0, 0];
      this.uploadingques = false;
      this.uploadingopt1 = false;
      this.uploadingopt2 = false;
      this.uploadingopt3 = false;
      this.uploadingopt4 = false;
      this.uploadingques = false;
      this.uploadingopt1 = false;
      this.uploadingopt2 = false;
      this.uploadingopt3 = false;
      this.uploadingopt4 = false;
      this.uploadEndques = false;
      this.uploadEndopt1 = false;
      this.uploadEndopt2 = false;
      this.uploadEndopt3 = false;
      this.uploadEndopt4 = false;
      this.downloadURLques = "";
      this.downloadURLopt1 = "";
      this.downloadURLopt2 = "";
      this.downloadURLopt3 = "";
      this.downloadURLopt4 = "";
      this.addquesdialog = true;
      this.addtotopic = item;
    },
    addquestion() {
      var t = this.$store.getters.getTopics;
      var num = Math.floor(Math.random() * 1000) + 1;
      var h = this.md5(num + this.answer);
      var newarr = t.filter(
        hello => hello.reference == this.addtotopic.reference
      );
      var x = newarr[0];
      var id = 0;
      if (x.questions.length > 0) {
        id = x.questions[x.questions.length - 1].quesid + 1;
      }
      var quesobj = {
        qname: this.qname,
        opt1: this.opt1,
        opt2: this.opt2,
        opt3: this.opt3,
        opt4: this.opt4,
        answer: this.answer,
        hashanswer: h,
        magicnum: num,
        type: this.type,
        quesid: id,
        imgurls: this.imgurls
      };
      this.$store.dispatch("addquestion", {
        quesobj: quesobj,
        topicref: this.addtotopic.reference
      });
      this.addquesdialog = false;
      this.imgurls = [0, 0, 0, 0, 0];
      this.uploadingques = false;
      this.uploadingopt1 = false;
      this.uploadingopt2 = false;
      this.uploadingopt3 = false;
      this.uploadingopt4 = false;
      this.uploadEndques = false;
      this.uploadEndopt1 = false;
      this.uploadEndopt2 = false;
      this.uploadEndopt3 = false;
      this.uploadEndopt4 = false;
      this.downloadURLques = "";
      this.downloadURLopt1 = "";
      this.downloadURLopt2 = "";
      this.downloadURLopt3 = "";
      this.downloadURLopt4 = "";
    },
    clear() {
      this.$refs.form.reset();
    },
    deletealltopics() {
      var courses = this.$store.getters.getTeacherCourses;
      var t = this.$store.getters.getTopics;
      var topics;
      var flag = false;
      courses.forEach(element => {
        if (element.reference == this.id) {
          topics = element.topics;
        }
      });
      t.forEach(element => {
        topics.forEach(ele => {
          if (ele.reference == element.reference) {
            if (
              element.quizzes !== null &&
              element.quizzes !== undefined &&
              element.quizzes.length > 0
            ) {
              flag = true;
            }
          }
        });
      });
      if (flag == false) {
        this.$store.dispatch("deleteAllTopics", this.id);
        this.deletealltopicsdialog = false;
      } else {
        this.deletealltopicsdialog = false;
        setTimeout(() => {
          this.$store.commit("setError", {
            message:
              "You cannot delete all topics at once. Some topics are a part of your existing quiz"
          });
        }, 2000);
        setTimeout(() => {
          this.$store.commit("setError", {
            message:
              "Try deleting individual topics which are not part of any quiz."
          });
        }, 6000);
      }
    },
    deletesingletopic(payload) {
      this.deletesingletopicdialog = true;
      this.topictobedeleted = payload;
    },
    confirmdeletesingletopic() {
      var t = this.$store.getters.getTopics;
      var f = true;
      if (
        this.topictobedeleted.topicobj.quizzes !== undefined &&
        this.topictobedeleted.topicobj.quizzes !== null &&
        this.topictobedeleted.topicobj.quizzes.length != 0
      ) {
        this.$store.commit("setError", {
          message:
            "You cannot delete this topic.It is already selected in a your existing quizzes"
        });
        f = false;
        this.deletesingletopicdialog = false;
      }

      if (f == true) {
        this.$store.dispatch("deleteSingleTopic", this.topictobedeleted);
        this.deletesingletopicdialog = false;
      }
    },
    deleteItem(quesobj, topicobj) {
      this.payload = "";
      this.payload = {
        quesobj: quesobj,
        topicobj: topicobj
      };
      this.deletequesdialog = true;
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
    },
    //Add a topic to the course
    addtopic() {
      var arr = this.$store.getters.getTeacherCourses;

      var flag = false;
      var myid = this.id;

      function search(namekey, myarray) {
        for (var i = 0; i < myarray.length; i++) {
          //Checking for course doc
          if (myarray[i].reference === myid) {
            // console.log(myarray[i])
            for (var j = 0; j < myarray[i].topics.length; j++) {
              if (myarray[i].topics[j].name === namekey) {
                flag = true;
                return;
              }
            }
          }
        }
      }
      search(this.topicname, arr);
      if (flag == false) {
        this.$store.dispatch("addNewTopic", {
          topicname: this.topicname,
          courseRef: this.id
        });
      } else {
        this.$store.commit("setError", {
          message: "Topic with this name already exists. Try another name."
        });
      }
      this.addtopicdialog = false;
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

.progress-bar {
  margin: 10px 0;
}

input[type="file"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>
