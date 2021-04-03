import axios from "axios";
import chance from "chance";
import dayjs from "dayjs";
export default {
  namespaced: true,
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    doneTask(state, taskId) {
      const task = state.tasks.find((task) => task.id === taskId);
      task.done = !task.done;
    },
    addDueDate(state, { taskId, dueDate }) {
      const task = state.tasks.find((task) => task.id === taskId);
      task.dueDate = dueDate;
    },
    editTask(state, { taskId, title }) {
      const task = state.tasks.find((task) => task.id === taskId);
      task.title = title ? title : task.title;
    },
  },
  actions: {
    async createTask(_, taskTitle) {
      try {
        const newTask = {
          id: chance().guid(),
          title: taskTitle,
          done: false,
          priority: "high",
        };
        const resp = await axios.post(`http://localhost:3000/tasks/`, newTask);
        console.log(resp);
      } catch (error) {
        console.error(error);
      }
    },
    async loadTasks({ commit }) {
      try {
        const { data } = await axios.get("http://localhost:3000/tasks");
        const tasks = data.map((task) => {
          return {
            ...task,
            dueDate: task.dueDate ? dayjs(task.dueDate).format("MMM DD") : null,
          };
        });
        commit("setTasks", tasks);
      } catch (e) {
        console.error(e);
        commit("setTasks", []);
      }
    },
    async doneTask(_, { taskId }) {
      try {
        const resp = await axios.patch(
          `http://localhost:3000/tasks/${taskId}`,
          {
            done: true,
          }
        );
        console.log(resp);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask(_, taskId) {
      try {
        const resp = await axios.delete(
          `http://localhost:3000/tasks/${taskId}`
        );
        console.log(resp);
      } catch (error) {
        console.error(error);
      }
    },
    async addDueDate(_, { taskId, dueDate }) {
      try {
        const resp = await axios.patch(
          `http://localhost:3000/tasks/${taskId}`,
          {
            dueDate: dueDate,
          }
        );
        console.log(resp);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
