<template>
  <div  style=" background: url(https://www.kibrispdr.org/dwn/0/wallpaper-for-whatsapp-chat-background.jpg)">
    <div class="container">
      <div class="row">
        <div>

        </div>
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
          <div id ="sid" class="scrollingContainer" ref="container"  style="height:500px; display: flex; flex-direction: column-reverse;overflow:auto;">
            <div>
              <h1 style="text-align: center;color: #000">Chat With Customer</h1>
              <p style="text-align: center;color: red"> Customer Id : {{id}}</p>
                <div v-for="am in all_msg" :key="am" >
                  <div v-if="am['type']==='customer'">
                    <div  style="color: white;margin-top: 10px;background: #ff2292d9;padding-left: 10px;border-radius: 33px;padding-top: 5px;padding-bottom: 5px" readonly>
                       {{am['message']}}
                    </div>
                  </div>

                  <div v-else>
                    <div v-if="am['message']!== null">
                    <div style="margin-left: 70px;margin-top: 10px;margin-bottom: 5px; color: white;background: #007bff;padding-left: 10px;border-radius: 33px;
padding-top: 5px;padding-bottom: 5px">
                      {{am['message']}}
                    </div>
                    </div>
                  </div>
                </div>
<!--              </div>-->
            </div>
          </div>
          <input  type="text" v-model="messages" class="form-control" placeholder="Chat" style="border: 2px solid" required>
          <div style="text-align: end">
            <input type="submit" value="Send" class="btn btn-primary" @click.prevent="doSend">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import axios from "axios";
import apiClient from "@/components/internal/helper/api_index";

export default {

  mounted(){
    this.scrollSet();
    this.id=this.$route.params.id;
    this.PreviousMsg()
    window.Echo.channel('chat23').listen('ChatEvent', (e) => {
          this.PreviousMsg();})
  },
  created(){
    this.scrollSet();
  },
  props: ["userdata"],
  data() {
    return {
      messages:'',
      id:'',
      live_message:[],
      all_msg:[],
      all_rcv_msg :[],
    };
  },
  methods:{
   doSend(){
     apiClient.post('/api/admin/live-chat', {
       user_id: this.userdata.id,
       customer_id:this.id,
       messages:this.messages,
     }).then((data)=>{
       this.messages='';
       // window.Echo.channel('chat23').listen('ChatEvent', (e) => {
       //   this.all_msg = e;
       this.PreviousMsg();
       // })
     }).catch(error =>
         this.$toast("Invalid Message", {
           timeout: 1000,
         }),)
   },
    PreviousMsg(){
      apiClient.post('/api/admin/previous-msg/' +  this.id).then((response)=>{
        console.log( typeof (this.id)+ "admin_rcv");
        this.all_msg= response.data.all_msg
      })
    },
    scrollSet(){
    }

  },
};
</script>
