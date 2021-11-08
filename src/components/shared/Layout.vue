<template>
    <div class="layout">
        <!-- header -->
        <Header />
        <!-- view -->
        <router-view class="layout__view"/>
        <!-- footer -->
        <Footer />
    </div>
</template>
<script>
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

export default {
  components: {
    Header,
    Footer
  },
}
</script>
<style lang="scss" scoped>
.layout {
  &__view {
    margin-top: 60px;
    margin-bottom: 120px;
  }
}
@media screen and (max-width: 768px){
  .layout {
    &__view {
      margin-top: 6px;
      margin-bottom: 72px;
    }
  }
}
@media screen and (max-width: 576px){
  .layout {
  }
}
</style>