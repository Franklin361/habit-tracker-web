import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getRandomColor } from '../utils/get-random-color';

interface IHabit {
  id: string;
  title: string;
  color: string;
}

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

type Day = (typeof DAYS)[number];

const initialSchedule: Record<Day, IHabit[]> = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const initializeHabit = () => {
  const habits = localStorage.getItem('habits');
  if (habits) {
    return JSON.parse(habits) as IHabit[];
  }
  return [];
};

const initializeSchedule = () => {
  const schedule = localStorage.getItem('schedule');
  if (schedule) {
    return JSON.parse(schedule) as Record<Day, IHabit[]>;
  }
  return initialSchedule;
};

export const useHabitStore = defineStore('habit-store', () => {
  const habits = ref<IHabit[]>(initializeHabit());
  const schedule = ref<Record<Day, IHabit[]>>(initializeSchedule());
  const daySelected = ref<Day | null>(null);

  const alreadyExistHabitInDay = (habitId: IHabit['id']) => {
    if (!daySelected.value) return false;
    return Boolean(
      schedule.value[daySelected.value].find((item) => item.id === habitId)
    );
  };

  const getTimesHabitPerWeek = (habitId: IHabit['id']) => {
    let times = 0;
    for (const key in schedule.value) {
      const item = schedule.value[key as Day];
      item.forEach(({ id }) => {
        if (id === habitId) times++;
      });
    }

    return times;
  };

  const getHabitsFromSchedule = () => {
    return schedule.value[daySelected.value || 'Monday'];
  };

  const onSelectDay = (day: any) => {
    daySelected.value = day;
  };

  const addNewHabitToDay = (habitId: IHabit['id'], day: Day) => {
    const habit = habits.value.find((item) => item.id === habitId);
    if (habit) schedule.value[day].unshift(habit);
  };

  const removeHabitFromDay = (habitId: IHabit['id'], day: Day) => {
    schedule.value[day] = schedule.value[day].filter(
      (item) => item.id !== habitId
    );
  };

  const addNewHabit = (title: IHabit['title']) => {
    habits.value.unshift({
      id: crypto.randomUUID(),
      title,
      color: getRandomColor(),
    });
  };

  const updateHabit = (habit: IHabit) => {
    const newHabit = habits.value.findIndex((item) => item.id === habit.id);
    if (newHabit !== -1) {
      habits.value[newHabit] = habit;
    }
  };

  const removeHabit = (id: IHabit['id']) => {
    habits.value = habits.value.filter((item) => item.id !== id);

    for (const key in schedule.value) {
      schedule.value[key as Day] = schedule.value[key as Day].filter(
        (item) => item.id !== id
      );
    }
  };

  return {
    habits,
    addNewHabit,
    removeHabit,
    updateHabit,
    daySelected,
    onSelectDay,
    schedule,
    addNewHabitToDay,
    removeHabitFromDay,
    getHabitsFromSchedule,
    getTimesHabitPerWeek,
    alreadyExistHabitInDay,
  };
});
