<template>
  <div>
    <GoogleMap
      api-key="AIzaSyAAAdIjvwLUt30ZN8Q8pOkY1hAPzV3Klgw"
      style="width: 100%; height: 500px"
      :center="center"
      :libraries="['geometry', 'drawing', 'places']"
      @dragend="getPoint"
      :zoom="15"
    >
      <Marker :options="markerOptions" />
    </GoogleMap>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
export default defineComponent({
  components: { GoogleMap, Marker },
  name: 'BudApply',
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 }
    const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY', draggable: true }
    const getPoint = () => {
      console.log('111')
    }
    return { center, markerOptions, getPoint }
  }
})
</script>
