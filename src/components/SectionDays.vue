<script setup lang="ts">
import { ref } from 'vue';
import { useHabitStore } from '../store/habit';
import DrawerDaySelected from '../components/DrawerDaySelected.vue'

const openDrawer = ref(false)

const useHabit = useHabitStore()

const onSelectDay = (day: string) => {

  if (!(useHabit.habits.length > 0)) {
    alert('First add some habits')
    return
  }

  openDrawer.value = true
  useHabit.onSelectDay(day)

}

</script>

<template>
  <section class="bg-[#222831] rounded-md h-fit">
    <!-- <h4>Days</h4> -->
    <div class="p-4 flex gap-5 flex-wrap">

      <div @click="onSelectDay(day)" class="bg-[#0C0C0C] flex-1 min-w-[200px] border border-white/30 p-4 rounded-md"
        v-for="(habits, day) in useHabit.schedule" :key="day">
        <span class="font-medium  text-xl">{{ day }}</span>
        <p class="font-secondary text-xl leading-none">Total habits: <span>{{ habits.length }}</span></p>
      </div>

    </div>
    <DrawerDaySelected @on-close="openDrawer = false" :open="openDrawer" />
  </section>
</template>