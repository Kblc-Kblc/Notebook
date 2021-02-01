<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Создать контакт</h1>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            v-model="title"
            id="title"
            type="text"
            class="validate"
            required
          />
          <label for="title">Имя, Фамилия, Отчество</label>
          <span class="helper-text" data-error="Вы ничего не ввели"></span>
        </div>
        <div class="input-field">
          <input
            v-model="subtitle"
            id="subtitle"
            type="text"
            class="validate"
            required
          />
          <label for="subtitle">Название организации</label>
          <span class="helper-text" data-error="Вы ничего не ввели"></span>
        </div>
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
            v-model="description"
            id="description"
            class="materialize-textarea"
          ></textarea>
          <label for="description">Номер, id, ...</label>
          <span class="character-counter" style="float: right; font-size: 12px"
            >{{ description.length }}/бесконечно=)</span
          >
        </div>

        <input type="text" ref="datepicker" />

        <button class="btn" type="submit">Создать запись</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "create",
  data: () => ({
    description: "",
    title: "",
    subtitle: "",
    chips: null,
    date: null,
  }),
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "'WhatsApp', 'VK'... ",
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true,
    });
  },
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        id: Date.now(),
        status: "Активный",
        tags: this.chips.chipsData,
        date: this.date.date,
      };
      this.$store.dispatch("createTask", task);
      this.$router.push("/list");
    },
    destroyed() {
      if (this.date && this.date.destroy) {
        this.date.destroy();
      }
      if (this.chips && this.chips.destroy) {
        this.chips.destroy();
      }
    },
  },
};
</script>
