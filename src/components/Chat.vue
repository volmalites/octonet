<template>
    <div id="grid">
        <section>
            <h1>CHAT IS UNAVAILABLE, COME BACK SOON!</h1>
        </section>
    </div>
</template>

<script>
export default {
  name: 'Services',
  data () {
    return {
      isConnected: false
    }
  },
  sockets: {
    connect () {
      this.isConnected = true
    },
    disconnect () {
      this.isConnected = false
    },
    messageChannel (data) {
      this.socketMessage = data
    }
  },
  mounted() {
    this.$socket.client.on('log', (result) => {
      console.log(result)
    })
  }
}
</script>

<style scoped>
    
</style>
