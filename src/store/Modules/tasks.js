import axios from "axios";
import chance from "chance";
import dayjs from "dayjs";
export default {
  namespaced: true,
  state: {
    tasks: [
      // {
      //   id: "aabd0fa1-a064-4045-a8f6-016e17e68f18",
      //   title: "Task 1",
      //   done: false,
      // },
      // {
      //   id: "bc75af2c-ebec-4a38-86ae-7fc1117cd0f5",
      //   title: "Task 2",
      //   done: false,
      // },
      // {
      //   id: "6a2ca066-96e6-4f4e-90f5-731f7251a3b6",
      //   title: "Task 3",
      //   done: false,
      // },
    ],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    doneTask(state, taskId) {
      const task = state.tasks.find((task) => task.id === taskId);
      task.done = !task.done;
    },
    addTask(state, taskTitle) {
      const newTask = {
        id: chance().guid(),
        title: taskTitle,
        done: false,
      };
      state.tasks.push(newTask);
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id.toString() !== taskId);
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
        console.log(e);
        commit("setTasks", []);
      }
    },
  },
};
