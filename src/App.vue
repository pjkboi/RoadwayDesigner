<template>
  <div id="app">
    <!-- navbar made with bootstrap -->
    <div id="navbar">
      <b-navbar toggleable="md" type="dark" id="navbar">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#">VIDEA</b-navbar-brand>
        <vue-xlsx-table
          @on-select-file="handleSelectedFile"
          v-show="openFilebtn"
          >open dbf</vue-xlsx-table
        >
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto">
            <!-- at click call pageSwitcher -->
            <span class="nav-item" @click="pageSwitcher('ProjectPicker')">
              <img src="./icons/map.png" />Map
            </span>
            <span class="nav-item" @click="pageSwitcher('roadwayDesigner')">
              <img src="./icons/roadway.png" /> Roadway Designer
            </span>
            <span class="nav-item" @click="pageSwitcher('Dashboard')">
              <img src="./icons/dashboard.png" /> Dashboard
            </span>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- inserting components in the body of the application -->
    <ProjectPicker
      v-show="projectPickerSwitch"
      v-on:EditProject="dataSorter($event)"
      v-on:onChange="selectedIdRetriever($event)"
      :getIds="getIds"
    ></ProjectPicker>
    <!-- projectpicker component which passes a string back to change whats on screen to the next component -->
    <RoadwayDesigner
      v-show="roadWayDesignerSwitch"
      :getData="getData"
      :convertedDataStorage="convertedDataStorage"
    ></RoadwayDesigner>
    <Admin v-if="adminPg" v-on:Admin="AdminSwitch($event)"></Admin>
    <b-button id="adminbtn" v-show="adminbtn" @click="pageSwitcher('Admin')"
      >Admin</b-button
    >
  </div>
</template>

<script>
//importing all crucial components from src file
import ProjectPicker from "./projectPicker.vue";
import RoadwayDesigner from "./RoadwayDesigner.vue";
import Admin from "./Admin.vue";
export default {
  //declaring the components
  components: {
    ProjectPicker,
    RoadwayDesigner,
    Admin
  },
  name: "app",
  data() {
    return {
      //declaring switch variables
      projectPickerSwitch: true, // true is active
      roadWayDesignerSwitch: false, // false is inactive
      dashboardSwitch: false,
      adminbtn: true,
      adminPg: false,
      openFilebtn: false,
      crossSectionArray: [], //this is going to be the container that holds all the instances of the dbf file
      getData: {}, // data object var
      getName: [], // name of columns array
      getValue: [], // values of querry
      getIds: [],
      convertedDataStorage: {}
    };
  },
  methods: {
    // a method switches the components within the application
    pageSwitcher(switcher) {
      switch (switcher) {
        case "ProjectPicker":
          (this.projectPickerSwitch = true),
            (this.roadWayDesignerSwitch = false),
            (this.dashboardSwitch = false),
            (this.adminbtn = true),
            (this.adminPg = false);
          break;
        case "roadwayDesigner":
          (this.projectPickerSwitch = false),
            (this.roadWayDesignerSwitch = true),
            (this.dashboardSwitch = false),
            (this.adminbtn = false),
            (this.adminPg = false);

          break;
        case "Dashboard":
          (this.projectPickerSwitch = false),
            (this.roadWayDesignerSwitch = false),
            (this.dashboardSwitch = true),
            (this.adminbtn = false),
            (this.adminPg = false);
          break;
        case "Admin":
          (this.projectPickerSwitch = false),
            (this.roadWayDesignerSwitch = false),
            (this.dashboardSwitch = false),
            (this.adminbtn = false),
            (this.adminPg = true);
          break;
      }
    },
    AdminSwitch(e) {
      this.openFilebtn = e;
    },
    selectedIdRetriever(e) {
      for (var i = 0; i < this.convertedDataStorage.body.length; i++) {
        if (this.convertedDataStorage.body[i]["name"] == e) {
          this.getData = this.convertedDataStorage.body[i];
        }
      }
    },
    dataSorter(switcher) {
      this.pageSwitcher(switcher);
      document.getElementById("btnReset").click();
      document.getElementById("RDPrepopulation").click();
    },
    prePopulate(switcher) {
      this.pageSwitcher(switcher);

      // getting data from hidden text fields
      var b = document.getElementById("Result").innerText;
      var c = document.getElementById("SResult").innerText;
      // splitting and organazing data
      this.getName = b.split(",");
      this.getValue = c.split(",");
      var objectLength = Object.keys(this.getData).length;
      // combining the 2 string arrays to an object for ease of use
      for (var i = 0; i < this.getName.length; i++) {
        this.getData[this.getName[i]] = this.getValue[i];
      }
      //checking if object contain more then just a road
      if (this.getName.length == 3 && objectLength > 3) {
        delete this.getData.Shape__Area;
      }
      //call RoadDesigner function
      document.getElementById("RDPrepopulation").click();
    },
    handleSelectedFile(convertedData) {
      this.convertedDataStorage = convertedData;
      this.getIds = [];
      if (convertedData.header[0] == "name") {
        for (var i = 0; i < convertedData.body.length; i++) {
          this.getIds.push(convertedData.body[i]["name"]);
        }
      }
    }
  }
};
</script>

<style lang="scss">
#navbar {
  background-color: #694393;
  z-index: 100;
}
.nav-item {
  padding-left: 10px;
  color: white;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#adminbtn {
  position: fixed;
  top: 90%;
  margin: 1em;
}
</style>
