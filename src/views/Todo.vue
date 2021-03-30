<template>
  <div>
    <v-list v-if="tasks.length > 0" flat class="pt-0">
      <div v-for="task in tasks" :key="task.id">
        <v-list-item
          @click="doneTask(task.id)"
          :class="{ 'blue lighten-5': task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': task.done }"
                >{{ task.title }}</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="primary">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-btn block flat>
                        <v-icon left>{{ item.icon }}</v-icon>
                        {{ item.title }}</v-btn
                      >
                    </v-list-item-content >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <div v-else>
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-col><h3>no tasks</h3></v-col>
        </v-row>
      </v-container>
    </div>
    <v-snackbar v-model="snackbar" timeout="1000" rounded="lg">
      A New Task Added!
      <template v-slot:action="{ attrs }">
        <v-btn color="success" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      newTaskTitle: "",
      tasks: [
        {
          id: 1,
          title: "Task 1",
          done: false,
        },
        {
          id: 2,
          title: "Task 2",
          done: false,
        },
        {
          id: 3,
          title: "Task 3",
          done: false,
        },
      ],
    };
  },
  methods: {
    doneTask(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.done = !task.done;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    addTask() {
      const newTask = {
        id: Date.now,
        title: this.newTaskTitle,
        done: false,
      };
      this.snackbar = true;
      this.tasks.push(newTask);
      this.newTaskTitle = "";
    },
  },
};
</script>

<style>
</style>