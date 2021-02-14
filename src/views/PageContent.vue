<template>
  <div>
    <navigation />

    <b-container class="mt-5">
      <div class="row">
        <div class="col-lg-6">
          <h4 class="mb-3">{{ formDetails.header }}</h4>

          <b-form @submit.prevent="save" ref="formContent" id="form-case">
            <b-form-group label="Title">
              <b-form-input
                type="text"
                v-model="formContent.title"
                placeholder="Title"
                required
              />
            </b-form-group>

            <b-form-group label="Category">
              <b-form-select v-model="formContent.content_category_id" required>
                <template #first>
                  <b-form-select-option :value="null" disabled
                    >-- Please select an option --</b-form-select-option
                  >
                </template>
                <b-form-select-option
                  v-for="category in content_categories"
                  :key="category.id"
                  :value="category.id"
                  >{{ category.name }}</b-form-select-option
                >
              </b-form-select>
            </b-form-group>
            <editor :updateContent="updateContent" ref="editor" />
          </b-form>
          <!-- <div class="mt-2" v-show="loading">
            <b-spinner small variant="primary" label="Spinning"></b-spinner>
            <span class="text-primary ml-2 mr-2" style="font-size: .8em"
              >Please wait...</span
            >
          </div> -->
          <div class="d-flex justify-content-between mt-3">
            <b-button size="md" variant="light" @click="cancel()">
              Cancel
            </b-button>
            <b-button
              size="md"
              variant="primary"
              @click="$refs.formContent.requestSubmit()"
              >Save</b-button
            >
          </div>
        </div>

        <div class="col-lg-6">
          <h4>Posts ({{ contents.length }})</h4>
          <post-list
            :posts="contents"
            :editContent="editContent"
            :deleteContent="deleteContent"
          />
        </div>
      </div>
    </b-container>

    <b-alert
      v-model="alertShow"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      :variant="alertType"
      dismissible
    >
      {{ alertMsg }}
    </b-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Editor from "../components/editor.vue";
import Navigation from "../components/Navigation.vue";
import PostList from "../components/PostList.vue";

export default {
  components: {
    Navigation,
    Editor,
    PostList
  },
  data() {
    return {
      formDetails: {
        header: ""
      },
      formContent: {
        id: null,
        title: "",
        request: "",
        content: "",
        user_id: null,
        content_category_id: null
      },
      alertShow: false,
      alertType: "",
      alertMsg: ""
    };
  },
  computed: {
    ...mapGetters(["content_categories", "contents"])
  },
  async mounted() {
    this.formContent.request = "create";
    this.formDetails.header = "Create Content";
    this.$store.dispatch("getContentCategories");
    this.$store.dispatch("getPosts", "");
  },
  methods: {
    async save(e) {
      e.preventDefault();
      const authCredentials = JSON.parse(
        sessionStorage.getItem("usercredentials")
      );
      this.formContent.user_id = authCredentials.id;
      let response = null;

      if (this.formContent.request === "create") {
        response = await this.$store.dispatch("addContent", this.formContent);
      } else if (this.formContent.request === "edit") {
        response = await this.$store.dispatch("editContent", this.formContent);
      }

      this.alertType = response.status === 200 ? "success" : "danger";
      this.alertMsg = response.message;
      this.alertShow = true;

      this.$store.dispatch("getPosts", "");
      this.cancel();
    },
    updateContent(content) {
      this.formContent.content = content;
    },
    cancel() {
      this.formDetails.header = "Create Content";
      this.formContent.id = null;
      this.formContent.title = "";
      this.formContent.content = "";
      this.formContent.user_id = null;
      this.formContent.request = "create";
      this.$refs.editor.changeContent("");
      this.formContent.content_category_id = null;
    },
    editContent(data) {
      this.formDetails.header = "Edit Content";
      this.formContent.id = data.id;
      this.formContent.title = data.TITLE;
      this.formContent.request = "edit";
      this.formContent.content = data.CONTENT;
      this.$refs.editor.changeContent(data.CONTENT);
      this.formContent.content_category_id = data.category_id;
    },
    async deleteContent(data) {
      this.formContent.id = data.id;
      this.formContent.request = "destroy";
      const response = await this.$store.dispatch(
        "editContent",
        this.formContent
      );
      this.alertType = response.status === 200 ? "success" : "danger";
      this.alertMsg = response.message;
      this.alertShow = true;
      this.$store.dispatch("getPosts", "");
    }
  }
};
</script>
