<template>
  <div style=" background: url(https://www.kibrispdr.org/dwn/0/wallpaper-for-whatsapp-chat-background.jpg)">
    <div class="container">
      <div class="row">
        <div>

        </div>
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto" >
          <div style="height:500px; display: flex; flex-direction: column-reverse;overflow:auto;">
          <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
            <h1 style="text-align: center">Chat With Admin</h1>
              <p style="text-align: center;color: red"> YOUR ID : {{id}}</p>
            <div v-for="am in all_msg" :key="am" >
              <div v-if="am['type']==='admin'">
                <div  style="color: white;margin-top: 10px;background: #ff2292d9;padding-left: 10px;border-radius: 33px;padding-top: 5px;padding-bottom: 5px" readonly>
                  {{am['message']}}
                </div>
              </div>

              <div v-else>
                <div v-if="am['message']!== null">
                <div style="margin-left: 70px;margin-top: 10px;margin-bottom: 5px; color: white;background: #007bff;padding-left: 10px;border-radius: 33px;padding-top: 5px;padding-bottom: 5px">

                    {{am['message']}}
                  </div>
                </div>
              </div>
            </div>
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
  created(){
    this.id=this.$route.params.id;
  },

  mounted(){
    this.id=this.$route.params.id;
    this.PreviousMsg();
    window.Echo.channel('chatAdmin').listen('AdminChatEvent', (e) => {
      //this.all_msg = e;
      this.PreviousMsg();
    })
     //this.doReceive();
    // this.PreviousMsgAdmin();
  },
  data() {
    return {
      messages:'',
      id:'',
      live_message:[],
      all_msg:[],
      all_rcv_msg:[]
    };
  },


  methods:{
    doSend(){
      apiClient.post('/api/customer/live-chat', {
        id:this.$route.params.id,
        messages:this.messages,
      }).then((data)=>{
        this.messages='';
        this.PreviousMsg();
      }).catch(error =>
          this.$toast("Invalid Message 1", {
            timeout: 1000,
          }),)
    },
    PreviousMsg(){
      apiClient.post('/api/customer/previous-msg/' + this.id).then((response)=>{
             this.all_msg= response.data.all_msg
           })
    }
  }
};
</script>
