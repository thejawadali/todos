<template>
  <div>
    <div v-if="$store.state.tasksModule.tasks.length > 0">
      <v-list flat class="pt-0">
        <div v-for="task in $store.state.tasksModule.tasks" :key="task.id">
          <list-item :task="task"></list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </div>
    <div v-else>
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-col><h3>no tasks</h3></v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import listItem from "@/components/list-item";
export default {
  components: {
  listItem
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>