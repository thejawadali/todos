import chance from "chance";
export default {
  namespaced: true,
  state: {
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
      {
        id: 4,
        title: "Task 4",
        done: false,
      },
    ],
  },
  mutations: {
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
  },
};
