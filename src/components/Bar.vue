<script>
import { Bar, mixins } from "vue-chartjs";
import { mapGetters } from "vuex";

const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["chartData"],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    ...mapGetters(["getchartPerMonth", "chartBrgyData"])
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
