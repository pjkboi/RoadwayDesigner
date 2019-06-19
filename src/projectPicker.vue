<!-- Project picking component (drop down menu and 2 buttons) -->
<template>
  <div id="projectPicker">
    <br />
    <h1>Please select a project</h1>
    <b-form-select
      v-model="selectID"
      id="dropDownPicker"
      @change="onChange($event)"
      :options="getIds"
    >
      <!-- dop down menu project location-->
    </b-form-select>
    <div id="map"><!-- map section --></div>
    <b-button id="nextBtn" @click="EditProject" :disabled="disabled"
      >Edit Project</b-button
    >
  </div>
</template>
<script>
export default {
  props: {
    getIds: Array
  },
  data() {
    return {
      selected: { location: [-80.543497, 43.468278], num: 1 }, //Where home is..
      refreshCounter: 0,
      selectID: 0,
      btnString: "roadwayDesigner",
      dataFromArc: "",
      disabled: false,
      // options that need to be selected by user from the dropdown
      projectLocation: [
        {
          value: { location: [-80.526941, 43.437329], num: 1, geoID: 20631 },
          text: "Victoria St S"
        },
        {
          value: { location: [-80.541652, 43.432637], num: 1, geoID: 6105 },
          text: "Victoria St S"
        },
        {
          value: { location: [-80.506918, 43.419523], num: 1, geoID: 6256 },
          text: "Ottawa St S"
        },
        {
          value: { location: [-80.491965, 43.356183], num: 1, geoID: 21493 },
          text: "New Dundee Rd"
        },
        {
          value: { location: [-80.5252, 43.477405], num: 1, geoID: 366 },
          text: "King St N"
        }
      ],
      dataObject: []
    };
  },
  methods: {
    // ???
    onChange(e) {
      this.$emit("onChange", e);
    },
    forceRefresh() {
      //
      document.getElementById("btnReset").click();
      this.refreshCounter += 1; //we increment this counter to make sure we have a different number for the streetviewer.vue to refresh as much as possible
      this.disabled = false;
    },
    // runs roadwayDesigner on click
    EditProject() {
      this.$emit("EditProject", "roadwayDesigner"); //This passes the string 'roadwayDesigner' back to the app.vue component to allow for the divs to switch
    }
  }
};
</script>
<style>
h1 {
  margin-top: 5%;
  color: #694393;
}
.map {
  margin: 1%;
}
#projectPicker {
  text-align: center;
}
.custom-select {
  width: 60%;
}
#dropDownPicker {
  height: 100%;
  border: 5px solid #694393;
}
#submitBtn {
  background-color: #694393;
  width: 100px;
}
#nextBtn {
  background-color: #694393;
  width: 100px;
}
</style>
