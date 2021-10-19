<template>
  <div id="map" class="map"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Loader, LoaderOptions } from 'google-maps'

export default defineComponent({
  components: {},
  name: 'BudApply',
  setup() {
    const options: LoaderOptions = {
      /* todo */
    }
    const loader = new Loader('AIzaSyAAAdIjvwLUt30ZN8Q8pOkY1hAPzV3Klgw', options)

    loader.load().then(function (google) {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      })
    })
    return {}
  }
})
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>
