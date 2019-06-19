<template>
<div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="#694393">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form >
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field v-model="password" label="Password" id="password" type="password" required @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#694393" style="color:white;" @click="onSubmit">Login</v-btn>
                    <v-btn color="#694393" style="color:white;" @click="onReset">Clear</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
              
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      admin: {
        name: "admin@admin.com",
        pw: "admin"
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      if (
        this.email == this.admin.name &&
        this.password == this.admin.pw
      ) {
        this.$emit("Admin", this.show);
      } else {
        alert("Not the admin");
      }
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.email = "";
      this.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
<style></style>
