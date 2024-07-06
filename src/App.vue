<template>
  <main class="container subpixel-antialiased mx-auto max-w-[650px]">
    <h3 class="text-center text-5xl mt-10 text-blue-700 lato-bold font-[800]">
      Vue Js Todo App
    </h3>
    <div class="bg-white drop-shadow-md p-6 rounded-xl mt-10">
      <!-- Start App Header -->
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
      <!-- End App Header -->
      <!-- Start Create Todo -->
      <section class="create-todo">
        <div class="mt-6">
          <div class="flex gap-4">
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
          <!-- End Create Todo -->
          <!-- Start View Todos -->
          <div class="view-todos">
            <h4 class="mt-4 mb-5 font-bold text-blue-700 text-xl">
              Your Todos :
            </h4>
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
                hover:cursor-pointer`"
            >
              <div>
                <span
                  @click="todo.todoDone = !todo.todoDone"
                  :class="`${
                    todo.todoDone ? 'line-through text-gray-400' : ''
                  }`"
                >
                  {{ todo.todoName }}
                </span>
              </div>
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
          </div>
          <!-- End View Todos -->
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue";

  const name = ref("");

  let todoName = ref("");

  const todoCategory = ref("Personal");

  const todos = ref([]);

  onMounted(() => {
    if (localStorage.getItem("userName")) {
      name.value = localStorage.getItem("userName");
    }

    if (localStorage.getItem("todos")) {
      todos.value.push(...JSON.parse(localStorage.getItem("todos")));
    }
  });

  watch(name, (newName) => {
    // Remember to add debouncing
    localStorage.setItem("userName", newName);
  });

  watch(todos.value, () => {
    localStorage.setItem("todos", JSON.stringify(todos.value));
  });

  function handleTodoAdded() {
    if (todoName.value.trim() !== "") {
      todos.value.push({
        todoName: todoName.value,
        todoCategory: todoCategory.value,
        todoDone: false,
      });
      todoName.value = "";
    } else {
      alert("Please fill in your todo name !");
    }
  }

  function deleteTodo(index) {
    todos.value.splice(index, 1);
  }
</script>
