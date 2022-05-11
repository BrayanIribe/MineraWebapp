<template>
  <div class="container pt-5" id="app">
    <ILoginModal
      :show="showLoginModal"
      @onLogin="
        () => {
          this.showLoginModal = false;
          this.isLogin = true;
          this.actualizar();
        }
      "
    />
    <div class="row" v-if="isLogin">
      <div class="col-sm-8">
        <h2 class="text-pink mb-1">Minera</h2>
        <p class="mb-4" style="color: #7c7a7a; line-height: 1rem">
          Conozca en tiempo real el estado del sistema MVTS / Map View Traffic
          System
        </p>
        <IMap
          class="mb-3"
          :vehiculos="vehiculos"
          :semaforos="semaforos"
          @onClickSemaforo="actualizarSemaforo"
        />
        <p v-if="updatedAt">Actualizado localmente el {{ updatedAt }}</p>
      </div>
      <div class="col-sm-4">
        <h2 class="text-pink mb-1">Semáforos</h2>
        <p style="color: #7c7a7a; line-height: 1rem">
          Haga clic sobre los semáforos en el mapa o en los botones para cambiar
          su estado.
        </p>
        <ISemaphore
          class="mb-3"
          v-for="semaforo of semaforos"
          :key="'semaforo_card_' + semaforo.idSemaforo"
          :data="semaforo"
          @onClickSemaforo="actualizarSemaforo"
        />
        <h2 class="text-pink mb-1 mt-4 d-block">Vehículos</h2>
        <p style="color: #7c7a7a; line-height: 1rem">
          Conozca el estado de cada vehículo, en tiempo real.
        </p>
        <IVehicle
          class="mb-3"
          v-for="vehiculo of vehiculos"
          :key="'vehiculo_card_' + vehiculo.idVehiculo"
          :data="vehiculo"
        />
      </div>
      <div class="col-sm-12">
        <p style="line-height: 1.2rem; color: #7c7a7a">
          "Minera" es un proyecto del sexto semestre del ITSON, para las
          materias de Sistemas Distribuidos y Arquitecturas Empresariales. En
          este proyecto se empleó la arquitectura Cliente-Servidor con MVC,
          utilizando Vue.js en el frontend y Spring boot Java en el backend. Una
          aplicación móvil para Android, desarrollada en Kotlin es utilizada
          para registrar la ubicación de cada vehículo en tiempo real. Los
          integrantes del equipo son Brayan Iribe 216663, Miguel Sanez 216756 y
          Andrés Urías 216769.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Minera from "./services/minera";
import ILoginModal from "./components/ILoginModal.vue";
import IMap from "./components/IMap.vue";
import ISemaphore from "./components/ISemaphore.vue";
import IVehicle from "./components/IVehicle.vue";

export default {
  name: "App",
  components: {
    IMap,
    ISemaphore,
    IVehicle,
    ILoginModal,
  },
  data() {
    return {
      loading: false,
      semaforos: [],
      vehiculos: [],
      updatedAt: null,
      showLoginModal: false,
      isLogin: false,
    };
  },
  methods: {
    async actualizarSemaforo(semaforo) {
      semaforo.estado = semaforo.estado === "verde" ? "rojo" : "verde";
      await Minera.actualizarSemaforo(semaforo);
    },
    async actualizar() {
      if (this.loading || !this.isLogin) return;

      this.loading = true;
      try {
        const semaforos = await Minera.obtenerSemaforos();
        for (const semaforo of semaforos.data) {
          const idx = this.semaforos.findIndex(
            (e) => e.idSemaforo === semaforo.idSemaforo
          );
          if (idx !== -1) {
            this.semaforos[idx].estado = semaforo.estado;
            continue;
          }
          this.semaforos.push(semaforo);
        }
        const vehiculos = await Minera.obtenerVehiculos();

        for (const row of vehiculos.data) {
          const idx = this.vehiculos.findIndex(
            (e) => e.idVehiculo === row.vehiculo.idVehiculo
          );
          if (idx !== -1) {
            this.vehiculos[idx].posicion = row.posicion;
            continue;
          }
          this.vehiculos.push({ ...row.vehiculo, posicion: row.posicion });
        }

        this.updatedAt = new Date().toISOString();
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    setTimeout(() => {
      this.showLoginModal = true;
    }, 10);
    setInterval(this.actualizar, 5000);
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.i-title {
  font-size: 4rem;
  font-style: italic;
}

.text-pink {
  color: #ff5d73;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
