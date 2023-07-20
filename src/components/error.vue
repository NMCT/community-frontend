<script lang="ts">
export default {
  props: {
    title: String,
    msg: String,
  },
}
// todo: add styles
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ msg }}</p>
  </div>
</template>

<style scoped></style>
