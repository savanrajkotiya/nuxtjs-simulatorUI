<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6">
      <div>
        <v-spacer></v-spacer>
        <v-btn icon class="float-right" @click="addServer">
          <v-icon fab>mdi-plus</v-icon>
          Add Server
        </v-btn>
        <br />
        <v-btn icon class="float-right" @click="destroyServer">
          <v-icon fab>mdi-minus</v-icon>
          Destroy
        </v-btn>
        <v-spacer></v-spacer>
        <v-row>
          <v-col md="6">
            <v-card
              class="mx-auto"
              max-width="350"
              outlined
              v-for="(app, index) in appsData"
              :key="index"
            >
              <v-list-item>
                <v-list-item-content>
                  <span>{{ app.name }}</span>
                </v-list-item-content>
                <v-list-item-content>
                  <v-btn fab small @click="addApp(app)">
                    <v-icon fab>mdi-plus</v-icon>
                  </v-btn>
                  <br />
                  <v-btn fab small @click="removeApp(app)">
                    <v-icon fab>mdi-minus</v-icon>
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <!-- Servers List -->
          <v-col md="6">
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
              v-for="(server, index) in serverList"
              :key="index"
            >
              <serverCanvas :serverData="server" />
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
// components
import serverCanvas from "../components/serverCanvas.vue";

import { applications, serverList } from "../constants/appsdata";
export default {
  data() {
    return {
      appsData: applications,
      serverList: serverList
    };
  },
  components: {
    serverCanvas
  },
  methods: {
    addServer() {
      this.serverList.push({
        name: "",
        app: [],
        isEmpty: true,
        id: this.serverList.length + 1
      });
    },
    destroyServer() {
      this.serverList = this.serverList.filter(
        obj => obj.id !== this.serverList.length
      );
    },
    addApp(appData) {
      let serverAvailable = this.serverList.some(
        element => element.app.length < 2
      );
      if (serverAvailable) {
        for (let i = 0; i < this.serverList.length; i++) {
          if (this.serverList[i].app.length < 2) {
            this.serverList[i].app.push(appData);
            if (this.serverList[i].app.length === 2) {
              this.serverList[i].isEmpty = false;
            }
            break;
          }
        }
      } else {
        console.log("server is not available!");
      }
    },
    removeApp(appData) {
      serverLoop: for (const [i, server] of this.serverList.entries()) {
        if (server.app.length > 0) {
          appLoop: for (const [i, app] of server.app.entries()) {
            if (app.name === appData.name) {
              server.app.splice(i, 1);
              break serverLoop;
              break appLoop;
            }
          }
        }
      }
    }
  }
};
</script>
