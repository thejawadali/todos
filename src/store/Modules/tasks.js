import chance from "chance";
export default {
  namespaced: true,
  state: {
    tasks: [
      
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
