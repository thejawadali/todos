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
    <v-dialog
      v-model="dueDateDialog"
      max-width="300px"
      transition="dialog-transition"
    >
      <v-date-picker v-model="picker" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="cancel('dueDate')"> Cancel </v-btn>
        <v-btn text color="success" @click="save('dueDate')"> OK </v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="editDialog"
      max-width="300px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title> Edit Task </v-card-title>
        <v-card-subtitle> Edit the title of task: </v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="newTitle"
            label="Task Title"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="cancel('edit')"> Cancel </v-btn>
          <v-btn text color="success" @click="save('edit')"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      max-width="300px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title> Delete Task? </v-card-title>
        <v-card-text>
          <p>Are you sure you want to delete that task?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="cancel('delete')"> Cancel </v-btn>
          <v-btn text color="success" @click="save('delete')"> OK </v-btn>
        </v-card-actions>
      </v-card>
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
      dueDateDialog: false,
      editDialog: false,
      deleteDialog: false,
      newTitle: "",
      picker: new Date().toISOString().substr(0, 10),
      items: [
        {
          icon: "mdi-pencil",
          text: "Edit",
          cb: (id) => {
            // open edit dialog
            this.taskId = "";
            this.editDialog = true;
            this.taskId = id;
          },
        },
        {
          icon: "mdi-calendar",
          text: "Due Date",
          cb: (id) => {
            // open date picker
            this.taskId = "";
            this.dueDateDialog = true;
            this.taskId = id;
          },
        },
        {
          icon: "mdi-delete",
          text: "Delete",
          cb: (id) => {
            // open confirmation dialog box
            this.taskId = "";
            this.deleteDialog = true;
            this.taskId = id;
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
    save(type) {
      if (type === "dueDate") {
        // save due date of task
        this.$store.commit("tasksModule/addDueDate", {
          taskId: this.taskId,
          dueDate: this.picker,
        });
        this.dueDateDialog = false;
      } else if (type === "edit") {
        this.$store.commit("tasksModule/editTask", {
          taskId: this.taskId,
          title: this.newTitle,
        });
        this.editDialog = false;
      } else {
        // delete
        this.$store.commit("tasksModule/deleteTask", this.taskId);
        this.deleteDialog = false;
      }
    },
    cancel(type) {
      if (type === "dueDate") {
        this.dueDateDialog = false;
      } else if (type === "edit") {
        this.editDialog = false;
      } else {
        // delete
        this.deleteDialog = false;
      }
    },
  },
};
</script>

<style>
</style>