<template>
  <b-container fluid>
    <b-row>
      <b-col lg="6">
        <h4>
          Users
          <span
            ><b-button size="sm" variant="primary" @click="addUser">
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
      :busy="!collections"
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
  </b-container>
</template>

<script>
export default {
  props: ["collections", "addModal"],
  data() {
    return {
      fields: [
        {
          key: "FULLNAME",
          label: "Fullname",
          sortable: true
        },
        {
          key: "USERNAME",
          label: "Username"
        },
        {
          key: "USERTYPE",
          label: "Usertype"
        },
        {
          key: "BARANGAY",
          label: "Barangay"
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
      filterOn: []
    };
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    addUser(e) {
      this.$emit("addModal", e);
    },
    edit(datas, index, button) {
      this.$emit("editModal", { button, datas });
    }
  },
  mounted() {
    this.totalRows = this.collections.length;
  }
};
</script>

<style></style>
