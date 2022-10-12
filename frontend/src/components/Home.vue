<template>
  <div>

    <Header/>
    <v-main style="padding: 0">
      <router-view></router-view>
    </v-main>
    <Footer/>
  </div>
</template>
<script>
import Header from './Header';
import Footer from './Footer';


export default {
  components: {
    Header,
    Footer
  },
}

</script>

<style>
.happysell h1 {
  text-align: center;
  /*background: #ff9000;*/
  font-size: 30px;
  padding: 10px;
  margin: 0;
}
.happysell{
  background:#1c5876;
}
.gplay {
  text-align: right;
}
.copyright {
  /*background: #ff9000;*/
  margin: 0;
}
.row.copyright p {
  margin: 0;
  padding: 0;
  /* background: red; */
  text-align: center;
}
</style>
