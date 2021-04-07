<template>
    <div id="grid">
        <section>
            <h1>Main Headquarters</h1>
            <h2>All general enquiries</h2>
            <h2>Chat with us</h2>
            <a id="chat" alt="chat" href="/chat" title="Chat With Octonet"><vue-fontawesome class="chat-icon" icon="comments" size="9" color="white"></vue-fontawesome></a>
            <address>
                <span class="block tel">
                    <a alt="+27719335371" href="tel:+27719335371" title="+27719335371"><vue-fontawesome class="icon" icon="phone" size="2" color="white"></vue-fontawesome>+27719335371</a>
                </span>
                <span class="block email">
                    <a alt="office@octonet.co.za" href="mailto:office@octonet.co.za" title="office@octonet.co.za"><vue-fontawesome class="icon" icon="envelope" size="2" color="white"></vue-fontawesome>office@octonet.co.za</a>
                </span>
                <span class="block address">
                    <span><vue-fontawesome class="icon" icon="map-marker" size="2" color="white"></vue-fontawesome> 682 Keet Avenue</span>
                    <span>Les Marais</span>
                    <span>Pretoria</span>
                    <span>0084</span>
                </span>
            </address>
        </section>
    </div>
</template>

<script>
export default {
  name: 'Services',
  mounted() {
      const chatIcon = document.getElementById('chat')
      chatIcon.addEventListener('mouseover', () => {
          chatIcon.firstElementChild.setAttribute('style', 'color: black; font-size: 9rem;')
          chatIcon.style.border = '3px solid limegreen'
          chatIcon.style.backgroundColor = 'limegreen'
      })
      chatIcon.addEventListener('mouseout', () => {
          chatIcon.firstElementChild.setAttribute('style', 'color: white; font-size: 9rem;')
          chatIcon.style.border = '3px solid white'
          chatIcon.style.backgroundColor = 'rgba(0, 0, 0, 0)'
      })
  }
}
</script>

<style scoped>
    address {
        display: table;
        margin: 0 auto;
    }

    #chat {
        display: table;
        padding: 15px 50px;
        border: 3px solid white;
        border-radius: 5px;
        margin: 0 auto 10px;
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
