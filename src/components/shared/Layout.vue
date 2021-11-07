<template>
    <div class="layout">
        <!-- header -->
        <Header />
        <!-- view -->
        <router-view />
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
<style lang="scss">
.layout {

}
</style>