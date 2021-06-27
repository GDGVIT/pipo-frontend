<template>
  <div class="px-10 py-5 h-full relative">
    <!-- Go back -->
    <router-link to="/user/profile">
      <Icon name="leftArrow" class="absolute top-10 left-20" />
    </router-link>
    <div class="font-glight">
      <!-- Introduction -->
      <div class="w-4/5 m-auto text-center">
        <div class="text-3xl font-gbold my-5">Todolist</div>
        <div class="text-sm md:text-base lg:text-lg">
          Tasks, Tasks and Tasks. Limit break your productivity and manage all
          tasks here on your todolist
        </div>
      </div>
      <!-- Create a todo -->
      <div>
        <div class="w-2/3 my-7 relative m-auto" data-aos="fade-up">
          <textarea
            class="shadow-md rounded-lg focus:outline-none resize-none p-5 w-full"
            rows="1"
            placeholder="Enter your todo here.."
            v-model="newTodo"
            @keydown.enter="add()"
          ></textarea>
          <div
            @click="add()"
            class="absolute w-8 h-8 right-3 -bottom-3 md:-bottom-3 md:right-10 md:w-10 md:h-10 bg-myRed grid place-items-center rounded-full text-white cursor-pointer"
          >
            <Icon name="plus" />
          </div>
        </div>
      </div>

      <!-- Todolist -->
      <div class="break-words text-black rounded-md h-72 overflow-y-auto p-10">
        <!-- Delete all -->
        <div
          class="absolute top-10 right-10 bg-white text-black rounded-full"
          @click="deleteAllTodos()"
        >
          <Icon name="bin" />
        </div>
        <!-- If no todos -->
        <div
          v-if="todolist.length === 0"
          data-aos="fade-up"
          class="md:w-2/3 m-auto text-center font-gbold p-6 rounded-md bg-myRed text-white"
        >
          Get a hold of your tasks and work at your peak performance 🔥. List
          them down here and work on them from time to time. Avoiding burning
          out 💣 and keep your todos and small as possible
          <div class="text-right mt-2">
            Your cute lil guy PiPo 🐧
          </div>
        </div>
        <!-- Display todos -->
        <div
          ref="masonry"
          class="relative grid sm:grid-cols-2 md:grid-cols-3 auto-rows-1 gap-3"
        >
          <div
            class="post font-gbold rounded-lg bg-myRed text-white"
            v-for="(todo, index) in todolist"
            :key="index"
            data-aos="zoom-in"
          >
            <div class="relative px-8 py-5">
              <span>{{ todo }}</span>
              <span
                class="cursor-pointer absolute font-gregular top-2 right-2 grid place-items-center text-sm w-6 h-6 rounded-full"
                @click="del(index)"
                >x</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import { getTodos } from "../../../composables/activities";
import { onMounted, ref, watchEffect } from "vue";
import { setUser } from "../../../composables/auth";
import { resizing } from "../../../composables/posts";

export default {
  components: { Icon },
  setup() {
    const newTodo = ref("");
    const { isLoggedIn } = setUser();
    const masonry = ref(null);
    const { resizeGridItem } = resizing();
    const {
      loadTodos,
      todolist,
      addTodo,
      deleteTodo,
      deleteAllTodos,
    } = getTodos();

    const add = async () => {
      console.log("Adding todo");
      await addTodo(newTodo.value);
      newTodo.value = "";
      resizeGridItem(masonry.value);
    };

    onMounted(() => resizeGridItem(masonry.value));

    const stopLoading = watchEffect(async () => {
      if (isLoggedIn.value && todolist.value.length === 0) {
        console.log("Loading todos");
        await loadTodos();
        resizeGridItem(masonry.value);
        stopLoading();
      }
    });

    const del = async (index) => {
      await deleteTodo(index);
      resizeGridItem(masonry.value);
    };

    // For resizing the masonry
    window.addEventListener("resize", () => resizeGridItem(masonry.value));

    return {
      resizeGridItem,
      masonry,
      newTodo,
      add,
      del,
      deleteAllTodos,
      todolist,
    };
  },
};
</script>

<style></style>
