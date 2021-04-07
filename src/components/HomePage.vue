<template>
  <div>
    <section id="container">
      <loading :opacity=1 background-color="black" :height=255 :width=255 color="aquamarine" :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    </section>
  </div>
</template>

<script>
import * as Three from 'three'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'ThreeTest',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      isLoading: true,
      fullPage: false
    }
  },
  components: {
    Loading
  },
  methods: {
    init: function () {
      let container = document.getElementById('container')

      this.camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
      this.camera.position.z = 1.5

      this.scene = new Three.Scene()

      let loader = new Three.TextureLoader()
      let earthMap = loader.load('./../../public/2_no_clouds_4k.jpg')
      let earthBump = loader.load('./../../public/elev_bump_4k.jpg')
      let earthSpec = loader.load('./../../public/water_4k.png')
      let earthCloud = loader.load('./../../public/fair_clouds_4k.png')

      this.scene.add(new Three.AmbientLight(0x333333))
      var light = new Three.DirectionalLight(0xffffff, 1)
      light.position.set(5, -3, 5)
      this.scene.add(light)

      let geometry = new Three.SphereGeometry(0.5, 32, 32)
      let material = new Three.MeshPhongMaterial()
      material.color.set(0xffffff)
      material.map = earthMap
      material.bumpMap = earthBump
      material.bumpScale = 0.0025
      material.specularMap = earthSpec
      material.specular = new Three.Color('grey')

      var geometryCloud = new Three.SphereGeometry(0.506, 32, 32)
      var materialCloud = new Three.MeshPhongMaterial({
        map: earthCloud,
        side: Three.DoubleSide,
        transparent: true,
        depthWrite: false
      })
      this.cloudMesh = new Three.Mesh(geometryCloud, materialCloud)

      this.mesh = new Three.Mesh(geometry, material)
      this.scene.add(this.mesh)
      this.mesh.add(this.cloudMesh)

      this.renderer = new Three.WebGLRenderer({antialias: true, alpha: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(container.clientWidth - 10, window.innerHeight)

      let aquaCard = document.createElement('div')
      aquaCard.style.position = 'absolute'
      aquaCard.style.top = '5%'
      aquaCard.style.right = 0
      aquaCard.style.left = 0
      aquaCard.style.backgroundColor = 'rgb(127,255,212,0.25)'
      aquaCard.setAttribute('id', 'aqua')

      let text = document.createElement('h1')
      text.innerText = 'WELCOME TO OUR WEBSITE'
      aquaCard.appendChild(text)
      text = document.createElement('h2')
      text.innerText = 'This site is still in development, please be patient while more features are implemented'
      aquaCard.appendChild(text)
      text = document.createElement('h2')
      text.innerText = 'We develop tailor made digital solutions for any need only short of the imagination'
      aquaCard.appendChild(text)

      container.appendChild(this.renderer.domElement)
      container.appendChild(aquaCard)
    },
    animate: async function () {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.y -= 0.001
      this.cloudMesh.rotation.y += 0.00039
      this.renderer.render(this.scene, this.camera)
    },
    resize: function (width, height) {
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    this.init()
    this.animate().then(
      this.isLoading = false
    )
    let container = document.getElementById('container')
    window.addEventListener('resize', () => {
      this.resize(container.clientWidth, window.innerHeight)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  position: relative;
  margin: 0;
  padding: 0;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
