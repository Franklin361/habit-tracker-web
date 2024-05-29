<script setup lang="ts">
import { useHabitStore } from '../store/habit';

const useHabit = useHabitStore()

const onDeleteHabit = (habitId: string) => {
  useHabit.removeHabit(habitId)
}

</script>

<template>
  <div>
    <div class="md:my-5 my-10">
      <h4 class="text-lg font-semibold mb-2 opacity-50">Habits</h4>
      <ul class="flex flex-col gap-y-[1px] bg-white/20" v-if="useHabit.habits.length > 0">
        <li :style="[{ color: item.color }]" v-for="(item, index) in useHabit.habits" :key="index"
          class="p-2 group  bg-[#0C0C0C] relative">
          <div class="">
            <p class="flex items-center justify-start gap-2">
              <span class="text-xl">👉</span>
              <span class="text-xl font-medium">{{ item.title }}</span>
            </p>
            <span class="text-xs text-white">Times to week: {{ useHabit.getTimesHabitPerWeek(item.id) }}</span>
          </div>
          <button
            class="text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-600 transition-all text-sm group-hover:opacity-100 opacity-0 p-1  px-2 rounded-lg  absolute top-1/2 -translate-y-1/2 right-2"
            @click.prevent="onDeleteHabit(item.id)">delete</button>
        </li>
      </ul>
      <div v-else>
        <span class="text-center w-full block my-5 opacity-50">No Habits added ⏱...</span>
      </div>
    </div>
  </div>
</template>