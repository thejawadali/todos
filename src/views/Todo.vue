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
      <div
        class="d-flex full-page w-100 d-flex justify-center align-center flex-column"
      >
        <v-icon color="cyan" large>mdi-check</v-icon>
        <h2 class="cyan--text">no tasks</h2>
      </div>
    </div>
  </div>
</template>

<script>
import listItem from "@/components/list-item";
import { mapActions } from "vuex";
export default {
  components: {
    listItem,
  },
  mounted() {
    this.loadTasks();
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("tasksModule", ["loadTasks"]),
  },
};
</script>

<style>
.full-page {
  width: 100%;
  height: calc(100vh - 200px);
}
</style>