<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list
        style="
          background-image: url(https://giventofly.github.io/pixelit/assets/px-normal.jpg);
        "
        dark
      >
        <v-list-item>
          <v-list-item-avatar size="77">
            <v-img src="@/assets/profile.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title"> Jawad Ali </v-list-item-title>
            <v-list-item-subtitle>alijamil734@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      prominent
      app
      color="primary"
      dark
      src="@/assets/appbar-bg-img.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <div class="w-100">
        <div class="d-flex w-100">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>
          Todo Application
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
        <div class="d-flex" style="width: 100%">
          <v-text-field
            class="pa-3"
            outlined
            hide-details=""
            label="Add task"
            append-icon="mdi-plus"
            solo-inverted
            full-width
            clearable
          />
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
  },
  data: () => ({
    drawer: true,
    items: [
      {
        title: "Todo",
        icon: "mdi-format-list-checks",
        to: "/",
      },
      {
        title: "About",
        icon: "mdi-information",
        to: "/about",
      },
    ],
  }),
};
</script>

<style>
.w-100 {
  width: 100% !important;
}
</style>