<template>
<v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" fixed clipped app width="240">
        <v-img :aspect-ratio="16/9" :src="drawerimg">
            <v-layout pa-2 column fill-height class="lightbox white--text">
                <v-spacer></v-spacer>
                <v-flex shrink v-if="!mini">
                    <div class="subheading">{{ name }}</div>
                    <div class="body-1">{{ email }}</div>
                </v-flex>
            </v-layout>
        </v-img>
        <v-progress-linear v-if="loading" class="mt-0" height="2" color="accent" :indeterminate="loading"></v-progress-linear>
        <div></div>

        <v-list>
            <template v-if="!userIsAuthenticated" v-for="(item, i) in menuItems">
                <v-divider v-if="item.divider" :key="i"></v-divider>
                <v-list-tile v-else :key="item.title" :to="item.link">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title color="primary">{{ item.text }}</v-list-tile-title>
                </v-list-tile>
            </template>
            <template>
                <v-list-tile v-if="userIsAuthenticated" to="/dashboard">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title color="primary">Dashboard</v-list-tile-title>
                </v-list-tile>
            </template>
            <template>
                <v-list-tile v-if="userIsAuthenticated" to="/profile">
                    <v-list-tile-action>
                        <v-icon>person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title color="primary">Profile</v-list-tile-title>
                </v-list-tile>
            </template>
            <template>
                <v-list-tile v-if="userIsAuthenticated" to="/courses">
                    <v-list-tile-action>
                        <v-icon>vertical_split</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title color="primary">Question Bank</v-list-tile-title>
                </v-list-tile>
            </template>
            <template>
                <v-list-tile v-if="userIsAuthenticated" to="/classes">
                    <v-list-tile-action>
                        <v-icon>people</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title color="primary">Classes</v-list-tile-title>
                </v-list-tile>
            </template>
            <template>
                <v-list-tile v-if="userIsAuthenticated" to="/quizzes">
                    <v-list-tile-action>
                        <v-icon>live_help</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title color="primary">Quizzes</v-list-tile-title>
                </v-list-tile>
            </template>
            <!-- <template>
          <v-list-tile v-if="userIsAuthenticated" href="manual.pdf" download target="_blank">
            <v-list-tile-action>
              <v-icon>save_alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-title color="primary">Download Manual</v-list-tile-title>
          </v-list-tile>
        </template> -->
            <template>
                <v-list-tile v-if="userIsAuthenticated" to="/contactus">
                    <v-list-tile-action>
                        <v-icon>comment</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title color="primary">Support</v-list-tile-title>
                </v-list-tile>
            </template>

            <v-divider v-if="userIsAuthenticated"></v-divider>
            <template>
                <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
                    <v-list-tile-action>
                        <v-icon color="error">power_settings_new</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title color="primary">Logout</v-list-tile-title>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar flat class="primary" app clipped-left fixed>
        <v-toolbar-side-icon v-if="!mini" @click.native="drawer = !drawer" class="white--text"></v-toolbar-side-icon>
        <router-link to="/">
            <span class="title ml-3 mr-5 white--text">Eduscope</span>
        </router-link>
        <v-spacer></v-spacer>

        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
            <v-icon class="fas fa-sign-out-alt white--text mr-2"></v-icon>
            <span class="white--text mr-1">LOGOUT</span>
        </v-btn>
    </v-toolbar>
    <v-content>
        <!-- <v-progress-linear v-if="loading" class="mt-0" height="3" color="accent" :indeterminate="loading"></v-progress-linear> -->
        <v-container fluid fill-height>
            <router-view></router-view>
        </v-container>
    </v-content>
</v-app>
</template>

<script>
import drawerimg from "../../../assets/profile_background.jpg";
export default {
    data: () => ({
        drawer: null,
        drawerimg: drawerimg
        // mini: false
    }),
    computed: {
        menuItems() {
            let menuItems = [{
                    icon: "person_outline",
                    text: "Sign In",
                    link: "/signin"
                },
                {
                    icon: "comment",
                    text: "Contact Us",
                    link: "/contactus"
                }
            ];
            return menuItems;
        },
        userIsAuthenticated() {
            return (
                this.$store.getters.getUserId !== null &&
                this.$store.getters.getUserId !== undefined
            );
        },
        name() {
            return this.$store.getters.getName;
        },
        email() {
            return this.$store.getters.getEmail;
        },
        contact() {
            return this.$store.getters.getContact;
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        onLogout() {
            this.$store.dispatch("logout");
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
    }
};
</script>
