<script setup lang="ts">
import SectionDays from './components/SectionDays.vue';
import SectionHabits from './components/SectionHabits.vue';
import { useHabitStore } from './store/habit';

const habitStore = useHabitStore()

habitStore.$subscribe((_mutation, state) => {
  localStorage.setItem('habits', JSON.stringify(state.habits))
  localStorage.setItem('schedule', JSON.stringify(state.schedule))
})

</script>

<template>
  <div class="container py-5">
    <!-- <h1 class="text-5xl font-title leading-none fixed bottom-2 left-4">Habit Tracker</h1> -->
    <div class="grid gap-10 md:grid-cols-[auto,1fr] grid-cols-1">
      <SectionHabits />
      <SectionDays />
    </div>
  </div>
</template>
