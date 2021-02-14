<template>
  <b-container fluid>
    <b-row>
      <b-col lg="6">
        <h4>
          Barangay
          <span
            ><b-button size="sm" variant="primary" @click="add">
              <b-icon icon="plus" variant="light"> </b-icon> </b-button
          ></span>
        </h4>
      </b-col>
      <b-col lg="6">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-2"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="collections"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      bordered
      responsive
      head-variant="light"
      :busy="loading"
      outlined
      show-empty
      @filtered="onFiltered"
    >
      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="edit(row.item, row.index, $event.target)"
          class="mr-1"
          variant="success"
        >
          <b-icon icon="pencil" variant="light"></b-icon>
        </b-button>
      </template>

      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <span class="ml-2">Please wait...</span>
        </div>
      </template>
    </b-table>

    <b-row>
      <b-col lg="5" sm="12" md="12">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
        ></b-pagination>
      </b-col>
    </b-row>

    <b-modal
      :id="infoModal.id"
      size="lg"
      :title="infoModal.title"
      @hide="resetInfoModal"
    >
      <b-container class="mb-4">
        <b-row>
          <b-col lg="4">
            <b-form @submit.prevent="save" ref="formBrgy" id="form-brgy">
              <b-form-input
                type="text"
                size="sm"
                placeholder="barangay"
                v-model="form.brgy"
                autocomplete="off"
                block
                required
              ></b-form-input>
            </b-form>
          </b-col>
          <b-col lg="4" class="text-center mt-1"
            >Latitude : {{ initialLat }}</b-col
          >
          <b-col lg="4" class="text-center mt-1"
            >Longtitude : {{ initalLng }}</b-col
          >
        </b-row>
      </b-container>

      <b-container>
        <google-map-barangays
          :lat="initialLat"
          :lng="initalLng"
          :label="form.brgy"
          @getLocationMarker="location"
        />
      </b-container>

      <template #modal-footer="{ cancel }">
        <div class="mt-2" v-show="loading">
          <b-spinner small variant="primary" label="Spinning"></b-spinner>
          <span class="text-primary ml-2 mr-2" style="font-size: .8em"
            >Please wait...</span
          >
        </div>
        <b-button size="md" variant="light" @click="cancel()">
          Cancel
        </b-button>
        <b-button
          size="md"
          variant="primary"
          @click="$refs.formBrgy.requestSubmit()"
        >
          Save
        </b-button>
      </template>
    </b-modal>

    <b-alert
      v-model="alertShow"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      :variant="alertType"
      dismissible
    >
      {{ alertMsg }}
    </b-alert>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import GoogleMapBarangays from "../components/GoogleMapBarangays.vue";

export default {
  components: {
    GoogleMapBarangays
  },
  props: {
    collections: Array
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "num",
          label: "#",
          sortable: true
        },
        {
          key: "name",
          label: "Barangay",
          sortable: true
        },
        {
          key: "location",
          label: "Location"
        },
        { key: "actions", label: "Actions" }
      ],
      loading: false,
      alertShow: false,
      alertType: "",
      alertMsg: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      filter: null,
      filterOn: [],
      infoModal: {
        id: "modal-form",
        title: "",
        content: ""
      },
      form: {
        id: "",
        brgy: "",
        request: ""
      },
      initialLat: null,
      initalLng: null,
      unitialBrgyLabel: ""
    };
  },
  mounted() {
    this.totalRows = this.items.length;
  },
  methods: {
    ...mapActions(["addBarangay", "editBarangay"]),
    edit(item, index, button) {
      this.infoModal.title = "Edit Barangay";
      this.initialLat = item.lat;
      this.initalLng = item.lng;
      this.unitialBrgyLabel = item.name;
      this.form.brgy = item.name;
      this.form.id = item.id;
      this.form.request = "edit";
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
      this.form.brgy = "";
      this.form.id = 0;
      this.form.request = "";
      this.initialLat = null;
      this.initalLng = null;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    location(event) {
      this.initialLat = event.lat;
      this.initalLng = event.lng;
    },
    add(e) {
      this.infoModal.title = "Add Barangay";
      this.form.request = "create";
      this.$root.$emit("bv::show::modal", this.infoModal.id, e.target);
    },
    save(e) {
      e.preventDefault();

      this.loading = true;

      if (this.initialLat === null || this.initialLat === null) {
        this.alertShow = true;
        this.alertType = "warning";
        this.alertMsg = "Please select location";
        this.alertShow = true;

        return;
      }

      if (this.form.request === "create") {
        const formRequest = {
          name: this.form.brgy,
          request: this.form.request,
          lat: this.initialLat,
          lng: this.initalLng
        };

        setTimeout(() => {
          this.addBarangay(formRequest);
          this.$bvModal.hide(this.infoModal.id);
          this.loading = false;
          this.alertShow = true;
          this.alertType = "success";
          this.alertMsg = "Successfully Saved!";
        }, 500);
      } else {
        const formRequest = {
          id: this.form.id,
          name: this.form.brgy,
          request: this.form.request,
          lat: this.initialLat,
          lng: this.initalLng
        };

        setTimeout(() => {
          this.editBarangay(formRequest);
          this.$bvModal.hide(this.infoModal.id);
          this.loading = false;
          this.alertShow = true;
          this.alertType = "success";
          this.alertMsg = "Successfully Saved!";
        }, 500);
      }
    }
  }
};
</script>
