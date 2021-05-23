<template>
  <div class="row mb-4">
    <div class="col-lg-8">
      <GmapMap
        :center="{ lat: 16.9351916, lng: 121.7743975 }"
        :zoom="14"
        map-type-id="hybrid"
        style="width: 100%; height: 450px"
        :options="{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: false,
        }"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :label="{ text: m.position.name, color: '#fff' }"
          :clickable="true"
          @click="showMarkerInfo(m)"
        />
      </GmapMap>
    </div>

    <div class="col-lg-4 mt-md-4 mt-sm-4">
      <p style="font-weight:600;">Barangay : {{ makerInfo.name }}</p>
      <p style="font-weight:600;">
        Location : [ {{ makerInfo.lng }} , {{ makerInfo.lat }} ]
      </p>
      <hr />
      <p style="font-weight:600;">Dengue Case</p>
      <div class="ml-2">
        <p style="font-weight:600;">
          Total Cases :
          <span class="text-danger">{{ makerInfo.dengueRecord.cases }}</span>
        </p>
        <p style="font-weight:600;">
          Total Recovery :
          <span class="text-success">{{
            makerInfo.dengueRecord.recovery
          }}</span>
        </p>
        <p style="font-weight:600;">
          Total Death :
          <span class="text-warning"> {{ makerInfo.dengueRecord.death }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["markerDatas"],
  data() {
    return {
      makerInfo: {
        lng: 0,
        lat: 0,
        name: "",
        dengueRecord: {
          cases: 0,
          recovery: 0,
          death: 0,
        },
      },
    };
  },
  computed: {
    markers() {
      return this.markerDatas;
    },
  },
  methods: {
    showMarkerInfo({ position }) {
      this.makerInfo.lng = position.lng;
      this.makerInfo.lat = position.lat;
      this.makerInfo.name = position.name;
      this.makerInfo.dengueRecord.cases = position.dengueRecord.cases;
      this.makerInfo.dengueRecord.recovery = position.dengueRecord.recovery;
      this.makerInfo.dengueRecord.death = position.dengueRecord.death;
    },
    // mark(event){
    //@click="mark" put it to COmponent
    //  console.log(event.latLng.lat());
    //  console.log(event.latLng.lng());
    // }
  },
};
</script>
