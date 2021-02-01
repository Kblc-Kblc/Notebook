<template>
  <div>
    <h2>Список</h2>
    <div class="row">
      <div class="input-field s6 col">
        <select ref="select" v-model="filter">
          <option value="" disabled selected>Выберете фильтр</option>
          <option value="active">Активный</option>
          <option value="outdated">Обновленный</option>
          <option value="completed">Завершенный</option>
        </select>
        <label>Фильтр</label>
      </div>
    </div>

    <button v-if="filter" class="btn btn-small red" @click="filter = null">
      Отчистить фильтер
    </button>

    <hr />
    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>И.Ф.О.</th>
          <th>Дата регистрации</th>
          <th>Контакты</th>
          <th>Статус</th>
          <th>Название организации</th>
          <th>Ссылка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, idx) of displayTasks" :key="task.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ task.title }}</td>

          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td class="td">
            <div class="text">{{ task.description }}</div>
          </td>
          <td>{{ task.status }}</td>
          <td>{{ task.subtitle }}</td>
          <td>
            <router-link
              tag="button"
              class="btn btn-small"
              :to="'/task/' + task.id"
            >
              Открыть
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Нет контактов</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    filter: null,
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      return this.tasks.filter((t) => {
        if (!this.filter) {
          return true;
        }
        return t.status === this.filter;
      });
    },
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
  },
};
</script>

<style scoped>
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.td {
  max-width: 400px;
}
</style>