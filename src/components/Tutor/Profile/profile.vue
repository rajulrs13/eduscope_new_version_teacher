<template>
<v-layout row>
    <!--Change Password form -->
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-dialog v-model="changepassworddialog" max-width="500px">
        <v-card>
            <v-form @submit.prevent="updatepassword" ref="form" v-model="passwordvalid">
                <v-card-title class="grey lighten-3">
                    <h1 class="font-weight-light">Update Password</h1>
                </v-card-title>
                
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Current Password" type="password" v-model="currentpassword" :rules="currentpasswordrules"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="New Password" type="password" v-model="newpassword" :rules="newpasswordrules"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Confirm New Password" type="password" v-model="confirmnewpassword" :rules="comparePasswords"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="accent" flat @click.native="changepassworddialog = false">Close</v-btn>
                    <v-btn color="accent" flat type="submit" :disabled="!passwordvalid || loading">Update</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>

    <!--Update Profile form -->
    <v-dialog v-model="changenameandcontactdialog" max-width="500px">
        <v-card>
            <v-form @submit.prevent="updatenameandcontact" ref="form" v-model="updatevalid">
                <v-card-title class="grey lighten-3">
                    <h1 class="font-weight-light">Update Profile</h1>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>

                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field name="name" label="New Name" id="name" v-model="newname" type="text" :rules="namerules" :disabled="loading" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field name="contact" label="New Contact Number" id="contact" v-model="newcontact" type="number" :disabled="loading" :counter="10" :rules="contactrules" required></v-text-field>
                            </v-flex>
                        </v-layout>

                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="accent" flat @click.native="changenameandcontactdialog = false">Close</v-btn>
                    <v-btn color="accent" flat type="submit" :disabled="!updatevalid || loading">Update</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>

    <!--Main profle Card -->
    <v-flex xs12>
        <v-card raised hover>
            <v-img :src="drawer" height="250px">
                <v-layout column fill-height justify-space-around align-center>

                    <v-avatar size="150">
                        <img :src="avatar">
            </v-avatar>

                        <v-card-title class="white--text">
                            <div>{{ email }}</div>
                        </v-card-title>
                </v-layout>
            </v-img>
            <v-progress-linear v-if="loading" color="accent" class="mt-0" height="3" :indeterminate="loading"></v-progress-linear>
            <v-form>
                <v-container>
                    <v-layout wrap>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field :value="name" label="Name" readonly></v-text-field>
                        </v-flex>
                        <br>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field :value="contact" label="Contact" readonly></v-text-field>
                        </v-flex>
                        <br>
                    </v-layout>
                </v-container>

            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
                <v-layout align-center justify-end row wrap fill-height>

                    <v-flex xs12 sm3 class="text-xs-center">
                        <v-btn color="accent" flat @click="changepassworddialog=true">
                            <v-icon left="">lock</v-icon>
                            Change Password
                        </v-btn>
                    </v-flex>

                    <br>

                    <v-flex xs12 sm3 class="text-xs-center">
                        <v-btn color="accent" flat @click="changenameandcontactdialog=true">
                            <v-icon left="">update</v-icon>
                            Update Profile
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-flex>
</v-layout>
</template>

<script>
import drawer from "../../../assets/profile_background.jpg";
import avatar from "../../../assets/avatar.png";
export default {
    data() {
        return {
            drawer : drawer,
            avatar : avatar,
            newname: "",
            newcontact: "",
            currentpassword: "",
            newpassword: "",
            confirmnewpassword: "",
            updatevalid: false,
            passwordvalid: false,           
            changepassworddialog: false,
            changenameandcontactdialog: false,
            currentpasswordrules: [value => !!value || "Password is required."],
            newpasswordrules: [
                value => !!value || "Field is Required",
                v => (v && v.length >= 6) || "It must be atleat 6 characters long."
            ],

            namerules: [value => !!value || "Name is required."],
            contactrules: [
                value => !!value || "Contact is required.",
                v => (v && v.length == 10) || "It must be of 10 digits."
            ]
        };
    },

    methods: {
        remove(item) {
            const index = this.courses.indexOf(item.code);
            if (index >= 0) this.courses.splice(index, 1);
        },
        updatenameandcontact() {
            this.changenameandcontactdialog = false;
            this.$store.dispatch("updatenameandcontact", {
                newname: this.newname,
                newcontact: this.newcontact
            });
        },
        updatepassword() {
            this.changepassworddialog = false;
            this.$store.dispatch("updatepassword", {
                oldpassword: this.currentpassword,
                newpassword: this.newpassword
            });
        }
    },
    computed: {
        name() {
            return this.$store.getters.getName;
        },
        email() {
            return this.$store.getters.getEmail;
        },
        contact() {
            return this.$store.getters.getContact;
        },        
        comparePasswords() {
            if (this.newpassword !== this.confirmnewpassword)
                return ["Passwords do not match"];
            else return "";
        },
        loading() {
            return this.$store.getters.loading;
        },
        error(){
            return this.$store.getters.error;
        },
        success(){
            return this.$store.getters.success;
        }
    },
    watch: {
        success(con) {
            if (!!con) {
                setTimeout(() => (this.$store.dispatch('clearSuccess')), 2000)

            }
        },
        error(err) {
            if (!!err) {
                setTimeout(() => (this.$store.dispatch('clearError')), 3000)

            }
        }
    }
};
</script>
