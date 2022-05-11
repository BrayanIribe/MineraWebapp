<template>
  <b-modal
    ref="modal"
    title="MVTS / Map View Traffic System"
    @ok="submit"
    ok-only
    ok-title="Iniciar sesión"
    hide-header-close
    no-close-on-backdrop
    no-close-on-esc
  >
    <div class="alert alert-info">
      Para acceder al sistema debe iniciar sesión.
    </div>
    <form class="row" @submit="submit" novalidate>
      <div class="col-sm-12">
        <b-form-group label="Usuario" label-for="user">
          <b-form-input
            id="user"
            v-model="form.user"
            :state="!form.user || form.user.length <= 0 ? false : undefined"
            :disabled="loading"
            autofocus
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-sm-12">
        <b-form-group label="Contraseña" label-for="passwd">
          <b-form-input
            id="passwd"
            type="password"
            v-model="form.passwd"
            :state="!form.passwd || form.passwd.length <= 0 ? false : undefined"
            :disabled="loading"
            required
          ></b-form-input>
        </b-form-group>
      </div>
      <input type="submit" class="d-none" />
    </form>
  </b-modal>
</template>

<script>
import minera from "@/services/minera";
export default {
  name: "ILoginModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        user: "",
        passwd: "",
      },
      loading: false,
    };
  },
  watch: {
    $show(v) {
      if (v === true) this.$refs.modal.show();
      else this.$refs.modal.hide();
    },
  },
  computed: {
    $show() {
      return this.show === true;
    },
  },
  methods: {
    async submit(e) {
      if (e) e.preventDefault();

      if (this.loading) return;

      try {
        this.loading = true;

        const { user, passwd } = this.form;
        const resp = await minera.login(user, passwd);
        if (resp.data.ok === true) {
          this.$emit("onLogin");
        } else {
          setTimeout(() => {
            document.getElementById("user").focus();
          }, 50);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>