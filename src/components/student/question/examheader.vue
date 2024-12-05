<template>
  <div class="examheader my-2" align="center">
    <v-row>
      <v-col class="left"></v-col>
      <v-col class="Title" cols="5">
        <h1>SUBJECT</h1>
        <div class="pa-2">
          <v-row>
            <h3>Student Name: chanthakhan</h3>
            <v-spacer></v-spacer>
            <h3>class: 17C1</h3>
          </v-row>
          <v-row>
            <h3>Student Code: 123456</h3>
            <v-spacer></v-spacer>
            <h3>Something:.......</h3>
          </v-row>
        </div>
      </v-col>
      <v-col class="right"></v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
.examheader {
  /* background-color: #f04770; */
  font-size: 1rem;
}
.left,
.right {
  border: 0.5rem ridge #d3a29d;
  background: repeating-linear-gradient(
      45deg,
      #0000 calc(-650% / 13) calc(50% / 13),
      #822b6d 0 calc(100% / 13),
      #0000 0 calc(150% / 13),
      #822b6d 0 calc(200% / 13),
      #0000 0 calc(250% / 13),
      #822b6d 0 calc(300% / 13)
    ),
    repeating-linear-gradient(
        45deg,
        #0000 calc(-650% / 13) calc(50% / 13),
        #822b6d 0 calc(100% / 13),
        #0000 0 calc(150% / 13),
        #822b6d 0 calc(200% / 13),
        #0000 0 calc(250% / 13),
        #822b6d 0 calc(300% / 13)
      )
      31px 31px,
    repeating-linear-gradient(
      -45deg,
      #0000 calc(-650% / 13) calc(50% / 13),
      #822b6d 0 calc(100% / 13),
      #0000 0 calc(150% / 13),
      #822b6d 0 calc(200% / 13),
      #0000 0 calc(250% / 13),
      #822b6d 0 calc(300% / 13)
    ),
    repeating-linear-gradient(
        -45deg,
        #0000 calc(-650% / 13) calc(50% / 13),
        #822b6d 0 calc(100% / 13),
        #0000 0 calc(150% / 13),
        #822b6d 0 calc(200% / 13),
        #0000 0 calc(250% / 13),
        #822b6d 0 calc(300% / 13)
      )
      31px 31px #ef7214;
  background-size: 62px 62px;
}
.Title {
  border: 0.5rem ridge #d3a29d;
  border-left: none;
  border-right: none;
  /* border-bottom: none;
  border-left: none;
  border-right: none; */
  /* background-color: #f04770; */
}
</style>



                 