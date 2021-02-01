<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{ task.title }}</h1>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            v-model="subtitle"
            id="subtitle"
            type="text"
            class="validate"
          />
          <label for="subtitle">Название организации</label>
          <span class="helper-text" data-error="Вы ничего не ввели"></span>
        </div>
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
            style="min-height: 150px"
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

        <div v-if="task.status !== completed">
          <button class="btn" type="submit" style="margin-right: 1rem">
            Обновить
          </button>
          <button class="btn blue" type="submit" @click="completeTask">
            Закрыть контакт
          </button>
        </div>
      </form>
    </div>
    <p v-else>контакт не найден</p>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },
  data: () => ({
    description: "",
    subtitle: "",
    chips: null,
    date: null,
  }),
  mounted() {
    (this.subtitle = this.subtitle),
    (this.description = this.task.description);
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "'WhatsApp', 'VK'... ",
      data: this.task.tags,
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.task.date),
      setDefaultDate: true,
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    submitHandler() {
      this.$store.dispatch("updateTask", {
        id: this.task.id,
        subtitle: this.subtitle,
        description: this.description,
        date: this.date.date,
      });
      this.$router.push("/list");
    },
    completeTask() {
      this.$store.dispatch("completeTask", this.task.id);
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

<style>
</style>