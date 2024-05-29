<script setup lang="ts">
import PanelDaySelected from './PanelDaySelected.vue';

interface Props {
  open: boolean
}
defineProps<Props>()

interface Emits {
  (e: 'on-close'): void
}
defineEmits<Emits>()

</script>

<template>
  <teleport to='body'>
    <transition name="fade">
      <div @click="$emit('on-close')" class="bg-black/50 backdrop-blur w-screen h-screen fixed top-0 left-0"
        v-show="open"></div>
    </transition>
    <transition name="drawer">
      <div v-show="open"
        class="drawer fixed bg-black w-full md:min-h-[65dvh] min-h-[80vh] max-h-[80dvh] bottom-0 left-0">

        <PanelDaySelected />

        <button class="absolute top-4 right-4" type="button" @click="$emit('on-close')">Close</button>
      </div>
    </transition>

  </teleport>
</template>

<style>
.drawer {
  box-shadow: 2px 9px 15px 10px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease-in-out;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s ease-in-out;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
}

.drawer-enter-to,
.drawer-leave-from {
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}
</style>