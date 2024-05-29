<script setup lang="ts">
import { ref } from 'vue';
import draggable from "vuedraggable";
import { useHabitStore } from '../store/habit';

const useHabit = useHabitStore()

const habitSelected = ref('0')
const onSaveHabitInDay = () => {
  if (habitSelected.value === '0') return

  if (useHabit.alreadyExistHabitInDay(habitSelected.value)) {
    alert(`This habit has already added to ${useHabit.daySelected}`)
    habitSelected.value = '0'
    return
  }

  useHabit.addNewHabitToDay(habitSelected.value, useHabit.daySelected!)
  habitSelected.value = '0'
}

const onRemoveHabit = (habitId: string) => {
  useHabit.removeHabitFromDay(habitId, useHabit.daySelected!)
}
</script>

<template>
  <div class="p-5 pt-14  w-full">
    <h6 class="font-secondary text-4xl leading-none bg-black p-2 px-4 absolute -top-10 rounded-md left-4">{{
      useHabit.daySelected }}</h6>

    <section class="flex flex-wrap gap-10 rounded-md  w-full">

      <div class="bg-[#222831] p-4 rounded-md md:flex-1 flex-none md:min-w-[400px] h-fit w-full">
        <form action="" class="flex flex-col gap-5" @submit.prevent="onSaveHabitInDay">
          <select v-model="habitSelected" class="outline-none p-2 bg-transparent text-white border rounded-md">
            <option class="text-black" value="0">Select one habit for {{ useHabit.daySelected }}</option>
            <option class="text-black" v-for="(item) in useHabit.habits" :key="item.id" :value="item.id">
              {{ item.title }}
            </option>
          </select>
          <button :disabled="habitSelected === '0'"
            class="transition-all bg-black p-2 rounded hover:bg-black/90 active:bg-black/80 disabled:pointer-events-none disabled:opacity-50">
            Add habit to this day
          </button>
        </form>
      </div>

      <div
        class="bg-[#222831] p-4 rounded-md md:flex-1 flex-none md:min-w-[400px] space-y-2 overflow-y-auto max-h-[40dvh] w-full"
        v-if="useHabit.getHabitsFromSchedule().length > 0">

        <draggable :list="useHabit.getHabitsFromSchedule()" item-key="name" ghost-class="ghost"
          @end="(e) => console.log(e)" class="space-y-2">
          <template #item="{ element }">
            <div class="flex items-center gap-5 justify-between group p-2 bg-black/50 rounded-md border-2"
              :style="[{ borderColor: element.color, color: element.color }]">
              <p class=" font-semibold">{{ element.title }}</p>
              <button
                class="text-sm bg-rose-600 hover:bg-rose-700 active:bg-rose-600 transition-all p-1 px-2 rounded-lg group-hover:opacity-100 opacity-0 text-white"
                @click="onRemoveHabit(element.id)">
                Remove
              </button>
            </div>
          </template>
        </draggable>


      </div>
      <div v-else
        class="bg-[#222831] p-4 rounded-md md:flex-1 flex-none md:min-w-[400px] space-y-2 overflow-y-auto max-h-[40dvh] w-full">
        <span class="text-center w-full block my-5 opacity-50">No
          Habits added ⏱...</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
h6 {
  box-shadow: 5px -5px 15px 0px rgba(255, 255, 255, 0.1);
}
</style>