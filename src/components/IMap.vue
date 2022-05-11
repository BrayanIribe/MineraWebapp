<template>
  <div class="i-map shadow-lg">
    <GmapMap
      :center="posicionItson"
      :zoom="15"
      style="width: 100%; height: 500px"
      @click="onClick"
    >
      <GmapMarker
        v-for="vehiculo of vehiculos"
        :key="'vehiculo_' + vehiculo.idVehiculo"
        :position="{
          lat: vehiculo.posicion.latitud,
          lng: vehiculo.posicion.longitud,
        }"
        :clickable="true"
        icon="/cart-tiny.png"
      />
      <GmapMarker
        v-for="vehiculo of vehiculos"
        :key="'vehiculo_' + vehiculo.idVehiculo"
        :position="{
          lat: vehiculo.posicion.latitud + 0.0012,
          lng: vehiculo.posicion.longitud,
        }"
        :icon="'/dot.png'"
        :clickable="true"
        :label="{
          color: 'white',
          fontWeight: 'bold',
          text: vehiculo.matricula,
          fontSize: '15px',
          margin: '20px',
        }"
        @click="$emit('onClickSemaforo', semaforo)"
      />
      <GmapMarker
        v-for="semaforo of semaforos"
        :key="'semaforo_' + semaforo.idSemaforo"
        :position="{ lat: semaforo.latitud, lng: semaforo.longitud }"
        :clickable="true"
        :icon="'/' + semaforo.estado + '.png'"
        @click="$emit('onClickSemaforo', semaforo)"
      />
      <GmapMarker
        v-for="semaforo of semaforos"
        :key="'semaforo_lbl_' + semaforo.idSemaforo"
        :position="{ lat: semaforo.latitud + 0.0012, lng: semaforo.longitud }"
        :icon="'/dot.png'"
        :clickable="true"
        :label="{
          color: 'white',
          fontWeight: 'bold',
          text: semaforo.nombre,
          fontSize: '15px',
          margin: '20px',
        }"
        @click="$emit('onClickSemaforo', semaforo)"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "IMap",
  props: {
    semaforos: {
      type: Array,
      default() {
        return [];
      },
    },
    vehiculos: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      posicionItson: { lat: 27.492863, lng: -109.970778 },
    };
  },
  methods: {
    onClick(e) {
      console.log(e);
    },
  },
};
</script>

<style>
.i-map {
  border-radius: 0.5rem;
  border-collapse: collapse;
  overflow: hidden;
}
</style>