<template>
  <div id="slide">
    <p>How big do you want the {{name}} in meters?</p>
    <vue-slide-bar
      id="slider"
      v-model="slider.value"
      :data="standards(name)"
      :range="standards(name)"
    >
    </vue-slide-bar>
    <div class="errorMessage" v-if="this.slider.value > this.totalWidth">The element is too big!!!</div>
    <b-button @click="getRange(),onClick()">Add {{name}}</b-button>
    <b-button @click="backbtn">Back</b-button>
  </div>
</template>
<script>
import VueSlideBar from "vue-slide-bar";
export default {
  components: {
    VueSlideBar
  },
  props: {
    name: String,
    totalWidth: Number,
    title: String
  },
  data() {
    return {
      back: false,
      standarts: null,
      slider: {
        value: 1
      },
      standardsArray: [
        {
          title: "comm_ext",
          roadStandard: [1, 2, 3, 4]
        },
        {
          title: "sdwlk_path_res",
          roadStandard: [1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4]
        },
        {
          title: "sdwlk_path_comm",
          roadStandard: [
            2.4,
            2.5,
            2.6,
            2.7,
            2.8,
            2.9,
            3,
            3.1,
            3.2,
            3.3,
            3.4,
            3.5,
            3.6,
            3.7,
            3.8,
            3.9,
            4,
            4.1,
            4.2,
            4.3,
            4.4,
            4.5
          ]
        },
        {
          title: "sdwlk_str_frntr",
          roadStandard: [0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5]
        },
        {
          title: "sdwlk_landbuff_util",
          roadStandard: [0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5]
        },
        {
          title: "sdwlk_landbuff",
          roadStandard: [1.5, 1.6, 1.7, 1.8, 1.9, 2]
        },
        {
          title: "sdwlk_landbuff_veg",
          roadStandard: [1.5, 1.6, 1.7, 1.8, 1.9, 2]
        },
        {
          title: "ped_isl",
          roadStandard: [1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4]
        },
        {
          title: "cycl_lane",
          roadStandard: [1.8, 1.9, 2]
        },
        {
          title: "cycl_trac",
          roadStandard: [1.8, 1.9, 2]
        },
        {
          title: "cycl_str",
          roadStandard: [2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3]
        },
        {
          title: "prot_cycl_trac",
          roadStandard: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]
        },
        {
          title: "bi_cycl_trac",
          roadStandard: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]
        },
        {
          title: "raise_cycl_trac",
          roadStandard: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]
        },
        {
          title: "curbuff_cycl_lane",
          roadStandard: [1, 1.2, 1.2]
        },
        {
          title: "contra_cycle_str",
          roadStandard: [3.5, 4, 4.5, 5, 5.5, 6]
        },
        {
          title: "tran_stp",
          roadStandard: [2, 2.1, 2.2, 2.3, 2.4, 2.5]
        },
        {
          title: "side_ded_transln",
          roadStandard: [3, 3.1, 3.2, 3.3]
        },
        {
          title: "cent_transln_cntbrd",
          roadStandard: [3.3, 3.4, 3.5]
        },
        {
          title: "cent_transln_pssgr",
          roadStandard: [10, 10.5, 11, 11.5, 12, 12.5]
        },
        {
          title: "shr_transln",
          roadStandard: [5.5, 5.6, 5.7, 5.8, 5.9, 6]
        },
        {
          title: "curb_ln",
          roadStandard: [3.4, 3.5, 3.6, 3.7]
        },
        {
          title: "pass_ln",
          roadStandard: [3, 3.1, 3.2, 3.3, 3.4]
        },
        {
          title: "lrg_veh_ln",
          roadStandard: [3, 3.1, 3.2, 3.3, 3.4, 3.5]
        },
        {
          title: "bi_trav_ln",
          roadStandard: [4.8, 4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5]
        },
        {
          title: "turn_ln",
          roadStandard: [3, 3.1, 3.2, 3.3, 3.4, 3.5]
        },
        {
          title: "frt_trav_ln",
          roadStandard: [3.3]
        },
        {
          title: "park_ln",
          roadStandard: [1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5]
        },
        {
          title: "Two-way left-turn Lane",
          roadStandard: [1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5]
        },
        {
          title: "Boulevard (Vegetation)",
          roadStandard: [3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4]
        },
        {
          title: "Centre Line",
          roadStandard: [0.05, 0.1]
        },
        {
          title: "Infrastructure",
          roadStandard: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6]
        },
        {
          title: "swale",
          roadStandard: [0.5, 1, 1.5]
        },
        {
          title: "rain_gdn",
          roadStandard: [1, 1.1, 1.2, 1.3, 1.4, 1.5]
        },
        {
          title: "perm_pav",
          roadStandard: [0.6, 0.7, 0.8, 0.9, 1]
        }
      ]
    };
  },
  methods: {
    getRange(){
      for (var i = 0; i < this.standardsArray.length; i++) {
        if (this.standardsArray[i].title == this.name) {
          this.standarts = this.standardsArray[i].roadStandard;
        }
      }
      this.$emit("title", this.standarts);
    },
    backbtn() {
      this.$emit("backbtn", this.back);
    },
    onClick() {
      this.$emit("onClick", this.slider.value);
    },
    standards() {
      for (var i = 0; i < this.standardsArray.length; i++) {
        if (this.name === this.standardsArray[i].title) {
          return this.standardsArray[i].roadStandard;
        }
      }
      return this.standardsArray[5].roadStandard;
    }
  }
};
</script>
<style>
.errorMessage {
  margin-bottom: 10px;
  color: red;
}
</style>
