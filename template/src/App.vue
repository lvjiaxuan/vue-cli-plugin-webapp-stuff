<template>
  <main id="app">

    <%_ if(imgspreload) { _%>
    <imgs-preload ref="imgs-preload" :preload-visible="preloadVisible" @imgsLoadedAll="preloadVisible = false">
      <template #default="{ imgsPercentage }">{{ imgsPercentage }}</template>
    </imgs-preload>

    <template v-if="!preloadVisible">
      <%_ if(router) { _%>
      <router-view/>
      <%_ } else { _%>
      App page
      <%_ } _%>
    </template>
    <%_ } else { _%>
      <%_ if(router) { _%>
      <router-view/>
      <%_ } else { _%>
      App page
      <%_ } _%>
    <%_ } _%>
  </main>
</template>

<script>
<%_ if(imgspreload) { _%>
import ImgsPreload from 'vue-imgs-preload'

export default {

  name: 'App',

  components: {
    ImgsPreload,
  },

  data() {
    return {

      preloadVisible: true
    }
  }
}
<%_ } else { _%>
export default {

  name: 'App',

}
<%_ } _%>

</script>

<style>
</style>