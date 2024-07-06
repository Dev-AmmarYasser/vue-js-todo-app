<template>
  <main class="container subpixel-antialiased mx-auto max-w-[650px]">
    <h3 class="text-center text-5xl mt-10 text-blue-700 lato-bold font-[800]">
      Vue Js Todo App
    </h3>

    <div class="bg-white drop-shadow-md p-6 rounded-xl mt-10">
      <section class="greeting">
        <h2 class="text-2xl font-bold text-blue-700">
          Welcome
          <input
            type="text"
            class="bg-white focus:outline-none max-w-[126px] placeholder:text-blue-300"
            placeholder="Name here"
            v-model="name"
          />
        </h2>
      </section>
      <section class="create-todo">
        <AddTodo
          @todo-done="handleTodoDone"
          @todo-added="handleTodoAdded"
          :todos="todos"
          :delete-todo="deleteTodo"
        ></AddTodo>
      </section>
    </div>
  </main>
</template>

<script setup>
  import { ref, onMounted, computed, watch } from "vue";
  import AddTodo from "./components/AddTodo.vue";

  const name = ref("");

  const todos = ref([
    { todoName: "Eat Launch", todoCategory: "Personal", todoDone: false },
  ]);

  watch(name, (newName) => {
    // Remember to add debouncing
    localStorage.setItem("userName", newName);
  });

  onMounted(() => {
    if (localStorage.getItem("userName")) {
      name.value = localStorage.getItem("userName");
    }
  });

  function handleTodoAdded(todoObj) {
    todos.value.push(todoObj);
  }

  function deleteTodo(index) {
    todos.value.splice(index, 1);
  }

  function handleTodoDone(payload) {
    if (todos.value.length > 0) {
      todos.value[todos.value.indexOf(payload)].todoDone =
        !todos.value[todos.value.indexOf(payload)].todoDone;
      console.log(todos.value[todos.value.indexOf(payload)].todoDone);
    }
  }
</script>
