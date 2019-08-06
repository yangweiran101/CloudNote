<template>
  <div>我是默认页</div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "default",
    data() {
      return {

      }
    },
    methods: {

    },
    created() {

    },
    computed: {
      ...mapState({
        username: 'username',
        mobile: 'mobile'
      })
    }
  }
</script>

<style scoped>

</style>