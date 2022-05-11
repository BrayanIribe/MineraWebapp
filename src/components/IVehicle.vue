<template>
  <a href="#" class="i-semaphore card p-2 shadow d-flex flex-row w-100">
    <div class="d-flex align-items-center justify-content-center">
      <img src="/cart-tiny.png" style="width: 32px; height: 32px" />
    </div>
    <div class="ml-3 text-dark w-100">
      <h4 class="m-0">{{ data.matricula }}</h4>
      <small>Última actualización a las {{ data.posicion.timeAt }}</small>
    </div>
  </a>
</template>

<script>
export default {
  name: "IVehicle",
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