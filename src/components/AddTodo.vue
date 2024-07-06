<template>
  <div class="mt-6">
    <div class="flex gap-4">
      <!-- <div class="line"></div> -->
      <!-- <label
        for="add-task"
        class="text-lg text-center mb-2 font-semibold text-blue-400"
        >Add Task</label
      > -->
      <input
        type="text"
        id="add-task"
        class="bg-blue-100 justify-start text-blue-700 flex-1 py-2 px-4 focus:outline-none rounded-lg placeholder:text-blue-300"
        placeholder="Type your task here"
        @keyup.enter="handleTodoAdded"
        v-model="todoName"
      />
      <div class="grid place-items-center">
        <div
          class="grid w-[15rem] grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2"
        >
          <div>
            <input
              type="radio"
              name="option"
              id="1"
              v-model="todoCategory"
              value="Personal"
              class="peer hidden"
              checked
            />
            <label
              for="1"
              class="block font-semibold cursor-pointer select-none rounded-xl p-1 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
              >Personal</label
            >
          </div>

          <div>
            <input
              type="radio"
              name="option"
              id="2"
              v-model="todoCategory"
              value="Business"
              class="peer hidden"
            />
            <label
              for="2"
              class="block font-semibold cursor-pointer select-none rounded-xl p-1 text-center peer-checked:bg-pink-500 peer-checked:font-bold peer-checked:text-white"
              >Business</label
            >
          </div>
        </div>
      </div>
    </div>
    <button
      class="bg-blue-700 mt-6 w-full rounded-lg hover:bg-blue-600 transition duration-200 font-semibold text-white block py-3 px-6"
      @click.prevent="handleTodoAdded"
    >
      Add Task
    </button>
    <ViewTodo
      @todo-done="handleTodoDone"
      :todos="todos"
      :delete-todo="deleteTodo"
    ></ViewTodo>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps(["todos", "deleteTodo"]);

  import ViewTodo from "./ViewTodo.vue";

  let todoName = ref("");

  const todoCategory = ref("Personal");

  const todoDone = ref(false);

  const emit = defineEmits(["todo-added", "todo-done"]);

  const id = ref(1);

  function handleTodoAdded() {
    if (todoName.value.trim() !== "") {
      emit("todo-added", {
        id: id.value++,
        todoName: todoName.value,
        todoCategory: todoCategory.value,
        todoDone: false,
      });

      todoName.value = "";
    } else {
      alert("Please fill in your todo name !");
    }
  }

  function handleTodoDone(payload) {
    emit("todo-done", payload);
  }
</script>
