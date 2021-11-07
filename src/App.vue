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
// google font外部引入字體
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');

// reset css
// html, body {
//   padding: 0;
//   margin: 0;
//   position: relative;
//   box-sizing: border-box;
//   width: 100%;
//   height: 100%;
//   color: $black;
// }
// * {
//   padding: 0;
//   margin: 0;
//   position: relative;
//   box-sizing: border-box;
// }

// app css
#app {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $black;
  width: 100%;
  height: 100%;
}
</style>
