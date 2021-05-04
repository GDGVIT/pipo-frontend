<template>
  <!-- Go back -->
  <router-link to="/user/profile">
    <Icon name="leftArrow" class="absolute top-6 left-10" />
  </router-link>
  <div class="font-glight">
    <!-- Introduction -->
    <div class="w-4/5 m-auto text-center">
      <div class="text-3xl font-gbold my-5">Todolist</div>
      <div class="text-lg">
        Tasks, Tasks and Tasks. Limit break your productivity and manage all
        tasks here on your todolist
      </div>
    </div>
    <!-- Create a todo -->
    <div>
      <div class="w-96 my-7 relative m-auto">
        <textarea
          class="shadow-md rounded-lg focus:outline-none resize-none p-5"
          cols="40"
          rows="3"
          placeholder="Enter your todo here.."
          v-model="newTodo"
        ></textarea>
        <Icon
          name="plus"
          class="absolute -bottom-2 right-0 streak-btn flex justify-items-center cursor-pointer"
          @click="addTodo()"
        />
      </div>
    </div>

    <!-- Todolist -->
    <div class="overflow-y-auto relative h-60">
      <!-- Delete all -->
      <div class="absolute top-0 right-0" @click="deleteAllTodos()">
        <Icon name="bin" />
      </div>
      <!-- If no interests -->
      <div v-if="todos.hasOwnProperty('message')">
        {{ interests.message }}
      </div>
      <!-- Display todos -->
      <div
        class="flex justify-between px-3 py-2 mx-20 my-4 shadow-md rounded-lg text-gray-500"
        v-for="(todo, index) in todos"
        :key="index"
      >
        <span>{{ todo }}</span>
        <span class="cursor-pointer" @click="deleteTodo(todo)">x</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import { mapState } from "vuex";
import api from "@/api";

export default {
  components: { Icon },
  computed: mapState({
    config: (state) => state.auth.config,
  }),
  data() {
    return {
      todos: [],
      newTodo: "",
    };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      try {
        const res = await api.get("/todo", this.config);
        console.log("Reponse from backend on getting todos", res);
        this.todos = res.data;
      } catch (error) {
        console.log("Error occured while fetching todos from backend", error);
      }
    },
    async addTodo() {
      try {
        const res = await api.post(
          "/todo",
          { todo: this.newTodo },
          this.config
        );
        console.log("Response from backend on adding todoitem", res);
        this.todos.push(this.newTodo);
        this.newTodo = "";
      } catch (error) {
        console.log("Error occured while adding todo", error);
      }
    },
    async deleteTodo(todo) {
      try {
        const index = this.todos.indexOf(todo);
        const res = await api.delete("/todo", this.config, { arrIndex: index });
        console.log("Response from backend while deleting todos", res);
        this.todos.splice(index, 1);
      } catch (error) {
        console.log("Error occured while deleting todo", error);
      }
    },
    async deleteAllTodos() {
      try {
        const res = await api.delete("/todo/all", this.config);
        console.log("Response from backend while deleting all todos", res);
        this.todos = [];
      } catch (error) {
        console.log("Error occured while deleting all todos", error);
      }
    },
  },
};
</script>

<style></style>
