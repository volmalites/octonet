<template>
  <div>
    <section>
      <h1>Octonet</h1>
      <h2>An all in one networking solution, tailor made for you!</h2>
    </section>
    <div id="grid">
      <section>
        <h1>Bjorn Lottering</h1>
        <h2>Full Stack Developer</h2>
        <p>Bjorn has several years of experience maintaining web servers, networks, databases and web applications. The need for this arose when certain administrative tasks needed to be automated in order to reduce work load in a company directed by Bjorn.</p>
        <p>After completing several courses and with the experience obtained, Octonet was created as a passion project in order to persue web development full-time and to focus on bringing digital solutions to service providers.</p>
      </section>
      <section>
        <h1>Samantha Prinsloo</h1>
        <h2>Digital Marketer | Front End Developer</h2>
        <p>Samantha has several years of experience in the signage industry and has gained strategical marketing experience thereby. Coupled with this knowledge Samantha has drawn interest towards the world of digital marketing.</p>
        <p>She has also gained knowledge of front end development and <abbr title="Search Engine Optimisation">SEO</abbr> (Search Engine Optimisation).</p>
        <p>Are you in need of signage? Visit Spectral Signs <a href="https://spectralsigns.co.za" target="_blank">HERE</a></p>
      </section>
    </div>
    <section>
      <h2>The greatest gift you have is that of your own self-transformation</h2>
    </section>
    <WebChat />
  </div>
</template>

<script>
import WebChat from './WebChat'

export default {
  name: 'About',
  components: {
    'WebChat': WebChat
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
