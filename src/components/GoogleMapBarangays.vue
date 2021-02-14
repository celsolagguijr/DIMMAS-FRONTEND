<template>
  <div class="row mb-4">
    <GmapMap
      :center="center"
      :zoom="15"
      map-type-id="hybrid"
      style="width: 100%; height: 350px"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }"
      @click="mark"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :label="markerLabel"
        :position="m.position"
        :clickable="true"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "GoogleMapBarangays",
  props: ["lat", "lng", "label"],
  data() {
    return {
      markers: []
    };
  },
  mounted() {
    this.markers = [
      {
        position: {
          lat: Number(this.lat),
          lng: Number(this.lng)
        }
      }
    ];
  },
  computed: {
    markerLabel() {
      return this.label === ""
        ? { text: "Input Barangay Name", color: "#FFFF00" }
        : { text: this.label, color: "#fff" };
    },
    center() {
      return !this.lat && !this.lng
        ? { lat: 16.9351916, lng: 121.7743975 }
        : { lat: Number(this.lat), lng: Number(this.lng) };
    }
  },
  methods: {
    mark(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.markers = [{ position: { lat, lng } }];
      this.$emit("getLocationMarker", { lat, lng });
    }
  }
};
</script>
