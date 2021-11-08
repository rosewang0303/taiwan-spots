<!-- 整個專案的進入點 -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    
  },
  computed: {
  },
}
</script>
<style lang="scss">
// app css
#app {
  font-family: 'Noto Sans TC', 'Playfair Display', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $black;
  width: 100%;
  height: 100%;
}
</style>
