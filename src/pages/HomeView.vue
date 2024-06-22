<template>
  <div class="text-center text-red-500">{{ this.$store.state.category.title }}</div>
</template>

<script>
export default {

  mounted (){
    console.log(this.$store.state.category.title);

  }
}
</script>

<style>

</style>