<template>
  <a
    href="#"
    @click="$emit('onClickSemaforo', data)"
    class="i-semaphore card p-2 shadow d-flex flex-row w-100"
  >
    <div>
      <img
        :src="'/' + data.estado + '.png'"
        style="width: 11px; height: 32px"
      />
    </div>
    <div class="ml-3 text-dark w-100">
      <div
        class="d-flex flex-row align-items-center justify-content-between w-100"
      >
        <h4 class="m-0">{{ data.nombre }}</h4>
        <p
          class="d-inline-block text-white p-1 m-0"
          style="width: 5rem; text-align: center"
          :class="{
            'bg-success': data.estado === 'verde',
            'bg-danger': data.estado === 'rojo',
          }"
        >
          {{ data.estado.toUpperCase() }}
        </p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "ISemaphore",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
.i-semaphore {
  text-decoration: none !important;
}
</style>