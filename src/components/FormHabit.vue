<script setup lang="ts">
import { ref } from 'vue';
import { useHabitStore } from '../store/habit';

const { addNewHabit } = useHabitStore()

const task = ref('')

const onSubmit = () => {
  if (task.value) {
    addNewHabit(task.value)
    task.value = ''
  }
}

</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-wrap gap-5 ">
    <input v-model="task" type="text"
      class="p-2 rounded-md font-medium md:min-w-[350px] w-full md:flex-1 flex-none text-lg "
      placeholder="Add your new habit">
    <button
      class="transition-all bg-[#910A67] hover:bg-[#910a66e7] active:bg-[#910A67] px-3 md:p-1 p-2 rounded-md flex-1">Add</button>
  </form>
</template>