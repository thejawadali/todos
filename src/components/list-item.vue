<template>
  <div>
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
          >
            <v-row align="center">
              <v-col cols="10">
                {{ task.title }}
              </v-col>
              <v-col v-if="task.dueDate">
                <v-row align="center">
                  <v-icon left small> mdi-calendar </v-icon>
                  <pre>{{ task.dueDate }}</pre>
                </v-row>
                <!-- <v-row align="center"
                ><v-icon>mdi-calendar</v-icon>
              </v-row> -->
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="primary">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item-group>
                <v-list-item
                  @click="item.cb(task.id)"
                  v-for="(item, i) in items"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-dialog v-model="dialog" max-width="300px">
      <v-date-picker v-model="picker" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="cancel = false"> Cancel </v-btn>
        <v-btn text color="success" @click="save"> OK </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      id: Number,
      title: String,
      done: Boolean,
    },
  },
  data() {
    return {
      dialog: false,
      picker: new Date().toISOString().substr(0, 10),
      items: [
        {
          icon: "mdi-pencil",
          text: "Edit",
          cb: (id) => {
            console.log({ Edit: id });
          },
        },
        {
          icon: "mdi-calendar",
          text: "Due Date",
          cb: (id) => {
            // open date picker
            this.taskId = "";
            this.dialog = true;
            this.taskId = id;
          },
        },
        {
          icon: "mdi-delete",
          text: "Delete",
          cb: (id) => {
            this.$store.commit("tasksModule/deleteTask", id);
          },
        },
        {
          icon: "mdi-sort",
          text: "Sort",
          cb: (id) => {
            console.log({ Sort: id });
          },
        },
      ],
      taskId: "",
    };
  },
  methods: {
    doneTask(id) {
      this.$store.commit("tasksModule/doneTask", id);
    },
    save() {
      // save due date of task
      // console.log({
      //   dayjs: dayjs(this.picker).toDate(),
      //   nativeDate: dayjs().toDate(),
      //   taskId: this.taskId,
      // });
      this.$store.commit("tasksModule/addDueDate", {
        taskId: this.taskId,
        dueDate: this.picker,
      });
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>