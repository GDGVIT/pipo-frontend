<template>
  <div class="px-10 py-5 h-full relative">
    <!-- Go back -->
    <router-link to="/user/profile">
      <Icon name="leftArrow" class="absolute top-10 left-10" />
    </router-link>
    <div class="font-glight">
      <!-- Introduction -->
      <div
        class="w-4/5 m-auto text-center flex justify-center items-center gap-x-4"
      >
        <div class="text-3xl font-gbold my-5">Todolist</div>
        <div @click="showTodoInfo = true">
          <Icon name="info" />
        </div>
      </div>
      <!-- Create a todo -->
      <div>
        <div class="w-11/12 md:w-2/3 my-7 relative m-auto" data-aos="fade-up">
          <textarea
            class="shadow-md rounded-lg focus:outline-none resize-none p-5 w-full"
            rows="2"
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

      <!-- Delete all -->
      <div
        class="absolute top-10 right-10 bg-white text-black"
        @click="deleteAllTodos()"
      >
        <Popper :hover="true" placement="top">
          <button>
            <Icon name="bin" />
          </button>
          <template #content>
            <div
              class="w-28 font-glight text-xs bg-myBlue text-white p-2 break-normal rounded-md"
            >
              Delete all todos
            </div>
          </template>
        </Popper>
      </div>
      <!-- Todolist -->
      <div class="break-words text-black rounded-md h-72 overflow-y-auto">
        <!-- If no todos -->
        <div
          v-if="todolist.length === 0"
          data-aos="zoom-in"
          class="w-full md:w-2/3 m-auto text-center font-gbold p-6 overflow-y-auto rounded-md bg-myRed text-white"
        >
          Work at your peak performance 🔥. List your tasks down here and work
          on them from time to time.
          <div class="text-right mt-2">
            Your cute lil guy PiPo 🐧
          </div>
        </div>
        <!-- Display todos -->
        <div class="relative grid gap-3 w-11/12 sm:w-2/3 lg:w-1/2 mx-auto">
          <div
            class="post font-gbold rounded-lg border-2 border-red-100 text-myRed"
            v-for="(todo, index) in todolist"
            :key="index"
          >
            <div class="relative px-8 py-3">
              <span>{{ todo }}</span>
              <span
                class="cursor-pointer absolute font-glight top-2 right-2 grid place-items-center text-sm text-red-300"
                @click="del(index)"
              >
                <Icon name="close" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Info on todo -->
  <InfoModal
    @close="showTodoInfo = false"
    v-if="showTodoInfo"
    modal="todoInfo"
  />
</template>

<script>
import Icon from "@/components/user/userIcons";
import InfoModal from "@/components/modals/userRelatedInfoModal";
import { getTodos } from "@/composables/activities";
import { ref, watchEffect } from "vue";
import { setUser } from "@/composables/auth";
import { isBlank } from "@/composables/posts";

export default {
  components: { Icon, InfoModal },
  setup() {
    const newTodo = ref("");
    const { isLoggedIn } = setUser();
    const {
      loadTodos,
      todolist,
      addTodo,
      deleteTodo,
      deleteAllTodos,
    } = getTodos();
    const showTodoInfo = ref(false);

    const add = async () => {
      console.log("Adding todo");
      if (!isBlank(newTodo.value)) {
        await addTodo(newTodo.value);
        newTodo.value = "";
      }
    };

    const stopLoading = watchEffect(async () => {
      if (isLoggedIn.value && todolist.value.length === 0) {
        console.log("Loading todos");
        await loadTodos();
        stopLoading();
      }
    });

    const del = async (index) => {
      await deleteTodo(index);
    };

    return {
      newTodo,
      add,
      del,
      deleteAllTodos,
      todolist,
      showTodoInfo,
    };
  },
};
</script>

<style></style>
