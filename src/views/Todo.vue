<template>
  <div>
    <div v-if="$store.state.tasksModule.tasks.length > 0">
      <v-list flat class="pt-0">
        <div v-for="task in $store.state.tasksModule.tasks" :key="task.id">
          <v-list-item
            @click="doneTask(task.id)"
            :class="{ 'blue lighten-5': task.done }"
          >
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox
                  :input-value="task.done"
                  color="primary"
                ></v-checkbox>
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
                    <v-list-item-group>
                      <v-list-item v-for="(item, i) in items" :key="i">
                        <v-list-item-icon>
                          <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.text"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </template>
          </v-list-item>
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
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-pencil",
          text: "Edit",
        },
        {
          icon: "mdi-calendar",
          text: "Due Date",
        },
        {
          icon: "mdi-delete",
          text: "Delete",
        },
        {
          icon: "mdi-sort",
          text: "Sort",
        },
      ],
      // model: 0,
    };
  },
  methods: {
    doneTask(id) {
      this.$store.commit("tasksModule/doneTask", id);
    },
  },
};
</script>

<style>
</style>