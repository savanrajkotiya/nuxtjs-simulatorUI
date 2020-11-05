<template>
  <div>
    <v-list-item>
      <v-list-item-content v-for="(obj, index) in serverData.app" :key="index">
        <p>{{ obj.abbreviation }}</p>
        <span>{{ obj.name }}</span>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// components
// import Shift from "./Shift.vue";

import { applications, serverList } from "../constants/appsdata";
export default {
  data() {
    return {
      appsData: applications,
      serverList: serverList
    };
  },
  props: {
    serverData: {
      type: Object,
      required: true
    }
  }
};
</script>
