<template>
  <nav class="indigo darken-4">
    <div class="nav-wrapper">
      <router-link to="/" href="#" class="brand-logo">Контакты</router-link>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active">
          <a href="#">Создать</a>
        </router-link>
        <router-link tag="li" to="/list" active-class="active">
          <a href="#">Посмотреть список</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2rem;
}
</style>