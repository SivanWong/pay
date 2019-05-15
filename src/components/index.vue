<template>
<div>
  <div>
    <router-link :to="{path:'/pay',query:{id:'粤B12344'}}">粤B12344</router-link>
  </div>
  <div>
    <router-link :to="{path:'/pay',query:{id:'粤B12345'}}">粤B12345</router-link>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
