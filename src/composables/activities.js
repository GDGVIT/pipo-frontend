import api from "@/api.js";
import { computed, readonly, ref } from "vue";
import { setUser } from "./auth";

const todos = ref([]);
const interests = ref([]);

const getTodos = () => {
  const { config } = setUser();
  const loadTodos = async () => {
    try {
      const res = await api.get("/todo", config.value);
      todos.value = res.data.message ? [] : res.data.reverse();
    } catch (error) {
      console.log("Error while loading todos from backend", error);
    }
  };

  const addTodo = async (data) => {
    try {
      const res = await api.post("/todo", { todo: data }, config.value);
      console.log("Response on adding a todo", res);
      todos.value.unshift(data);
    } catch (error) {
      console.log("Error while adding todo to backend", error);
    }
  };

  const deleteTodo = async (index) => {
    try {
      const res = await api.delete("/todo", config.value, {
        arrIndex: index,
      });
      console.log("Response on deleting a todo", res);
      todos.value.splice(index, 1);
      loadTodos();
    } catch (error) {
      console.log("Error while deleting todo from backend", error);
    }
  };

  const deleteAllTodos = async () => {
    try {
      await api.delete("/todo/all", config.value);
      todos.value = [];
    } catch (error) {
      console.log("Error while deleting all todos from backend", error);
    }
  };

  const todolist = readonly(todos);
  const todos5 = computed(() =>
    todos.value.message ? todos.value : todos.value.slice(0, 5)
  );

  return { loadTodos, todolist, todos5, addTodo, deleteTodo, deleteAllTodos };
};

const getInterests = () => {
  const { config } = setUser();
  const loadInterests = async () => {
    if (interests.value.length === 0) {
      try {
        const res = await api.get("/tags", config.value);
        console.log(res);
        interests.value = res.data.message ? [] : res.data?.reverse();
      } catch (error) {
        console.log("Error while loading interests from backend", error);
      }
    }
  };

  const addInterests = async (data) => {
    try {
      const res = await api.post("/tags", { tag: data }, config.value);
      console.log("Added interest", res);
      interests.value.unshift(data);
    } catch (error) {
      console.log("Error while adding interest to backend", error);
    }
  };

  const deleteInterest = async (index) => {
    const actualIndex = interests.value.length - index - 1;
    try {
      console.log("deleting interest at index", actualIndex);
      await api.delete("/tags", config.value, { arrIndex: index });
      interests.value.splice(index, 1);
    } catch (error) {
      console.log("Error while deleting interests from backend", error);
    }
  };

  const deleteAllInterests = async () => {
    try {
      await api.delete("/tags/all", config.value);
      interests.value = [];
    } catch (error) {
      console.log("Error while deleting all interests from backend", error);
    }
  };

  const interestList = readonly(interests);
  const interestList5 = computed(() =>
    interests.value.message ? interests.value : interests.value.slice(0, 5)
  );

  return {
    loadInterests,
    interestList,
    interestList5,
    addInterests,
    deleteInterest,
    deleteAllInterests,
  };
};

export { getTodos, getInterests };
