<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import { apiGetSpotList } from "@/api/api"; 

export default {
  components: {
    // HelloWorld
  },
  mounted() {
    this.callApiGetSpotList();
  },
  methods: {
    callApiGetSpotList() {
      let param = "$top=30";

      apiGetSpotList(param)
      .then(res=> {
        console.error(res);
      })
      .catch(err=> {
        // 發生錯誤
        console.error(err)
      })
    }
  },
}
</script>
