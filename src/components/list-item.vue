<template>
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
        <v-menu>
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
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </template>
  </v-list-item>
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