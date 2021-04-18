<template>
  <div>
    <div id="grid">
      <section>
        <h1>Main Headquarters</h1>
        <h2>All general enquiries</h2>
        <address>
          <span class="block tel">
            <a alt="+27877001597" href="tel:+27877001597" title="+27877001597"
              ><vue-fontawesome
                class="icon"
                icon="phone"
                size="2"
                color="white"
              ></vue-fontawesome
              >+27 (0)87 700 1597</a
            >
          </span>
          <span class="block email">
            <a
              alt="office@octonet.co.za"
              href="mailto:office@octonet.co.za"
              title="office@octonet.co.za"
              ><vue-fontawesome
                class="icon"
                icon="envelope"
                size="2"
                color="white"
              ></vue-fontawesome
              >office@octonet.co.za</a
            >
          </span>
          <span class="block address">
            <span
              ><vue-fontawesome
                class="icon"
                icon="map-marker"
                size="2"
                color="white"
              ></vue-fontawesome>
              682 Keet Avenue</span
            >
            <span>Les Marais</span>
            <span>Pretoria</span>
            <span>0084</span>
          </span>
          <span class="block chat">
            <span id="chat"><vue-fontawesome
                class="icon"
                icon="comments"
                size="5"
                color="white"
              ></vue-fontawesome>
            <p>Web Chat Hours</p>
            <p>Weekdays: {{this.weekDays}}</p>
            <p>Note: the time shown above is adapted to your current time zone</p></span>
          </span>
        </address>
      </section>
    </div>
    <WebChat />
  </div>
</template>

<script>
import WebChat from "./WebChat";

export default {
  name: "Services",
  components: {
    WebChat: WebChat,
  },
  data() {
    return {
      weekDays: `From ${new Date(Date.UTC(0, 0, 0, 5, 30, 0)).toLocaleTimeString()} To ${new Date(Date.UTC(0, 0, 0, 15, 30, 0)).toLocaleTimeString()}`
    }
  }
};
</script>

<style scoped>
a:hover {
  cursor: pointer;
}

address {
  display: table;
  margin: 0 auto;
}

#chat {
  display: table;
  margin: 0 auto;
}

span {
  display: block;
}

.block {
  margin: 0 0 20px;
  font-size: 1.3em;
}

.icon {
  margin: 5px 10px 5px 0px;
}
</style>
