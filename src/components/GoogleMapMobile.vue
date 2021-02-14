<template>
  <div class="p-3">
    <GmapMap
      :center="{ lat, lng }"
      :zoom="14"
      map-type-id="hybrid"
      style="width: 100%; height: 450px;"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markerDatas"
        :position="m.position"
        :label="{ text: m.position.name, color: '#fff' }"
        :clickable="true"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: ["markers", "lat", "lng"],
  computed: {
    markerDatas() {
      return [
        {
          position: {
            name: "You are here!",
            lat: Number(this.lat),
            lng: Number(this.lng)
          }
        },
        ...this.markers.map(data => {
          return {
            position: {
              name: data.name,
              lat: Number(data.lat),
              lng: Number(data.lng)
            }
          };
        })
      ];
    }
  }
};
</script>
