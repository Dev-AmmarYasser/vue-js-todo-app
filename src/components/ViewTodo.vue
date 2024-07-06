<template>
  <h4 class="mt-4 mb-5 font-bold text-blue-700 text-xl">Your Todos :</h4>
  <div
    v-for="(todo, index) in todos"
    :key="index"
    v-if="todos.length > 0"
    :class="`flex justify-between items-center  ${
      todo.todoCategory == 'Personal'
        ? 'bg-blue-50 text-blue-700 ring-blue-700'
        : 'bg-pink-50 text-pink-700 ring-pink-600'
    } ring-1   py-3 px-4 text-[18px] rounded-lg select-none ${
      index == todos.length - 1 ? 'mb-0' : 'mb-6'
    } font-semibold
hover:cursor-pointer
  `"
    @click="ToggleDone(todo)"
  >
    <span :class="`${todo.todoDone ? 'line-through text-gray-400' : ''}`">
      {{ todo.todoName }}
    </span>
    <button
      class="px-2 py-1 rounded-md text-white text-[16px] bg-red-600 hover:bg-red-700 transition duration-200"
      @click="deleteTodo(index)"
    >
      Delete
    </button>
  </div>
  <div
    v-else
    class="text-center font-bold letter tracking-wide text-xl uppercase text-gray-400"
  >
    No todos to show !
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps(["todos", "deleteTodo"]);

  // const todoDone = ref(false);

  const emit = defineEmits(["todo-done"]);

  function ToggleDone(todo) {
    emit("todo-done", todo);
  }
</script>
