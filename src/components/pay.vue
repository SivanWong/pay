<template>
  <div class="pay">
    <div class="header">
      <div class="back">
        <div @click="back()"></div>
      </div>
      <div class="title">临停缴费</div>
    </div>
    <div class="main">
      <div class="infoContainer">
        <div class="info">
          <img src="../assets/top.png" class="top">
          <img src="../assets/bottom.png" class="bottom">
          <div class="infoHeader">
            <div class="number">{{this.car.number}}</div>
            <div class="paid">{{this.car.paid}}</div>
          </div>
          <div class="line"></div>
          <div class="infoContent">
            <div class="timeContainer">
              <div>
                <div class="label">进场时间：</div>
                <div class="time">{{this.car.enterTime}}</div>
              </div>
              <div>
                <div class="label">出场时间：</div>
                <div class="time">{{this.car.leaveTime}}</div>
              </div>
            </div>
            <div class="moneyContainer">
              <span class="moneyIcon">￥</span>
              <span class="money">{{this.car.money}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="selectContainer" v-if="this.paid">
        <div class="select" v-for="(item,index) in radios" :key="item.key">
          <span class="icon"></span>
          <div class="options" @click="check(index)">
            <div class="item">
              <label :for="item.key">{{item.label}}</label>
              <input type="radio" :id="item.key" :checked="item.checked">
              <span class="radio" :class="{'checked':item.checked}"></span>
            </div>
            <div class="comment">{{item.comment}}</div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer" v-if="this.paid">
      <button class="paybtn" @click="summit()">支付</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'pay',
  data () {
    return {
      car: {},
      paid: true,
      radio: {},
      radios: []
    }
  },
  methods: {
    check(index){
      this.radios.forEach((item) => {
        item.checked = false;
      });
      this.radios[index].checked = true;
      this.radio = this.radios[index];
    },
    summit(){
      if(this.radio.key == "alipay"){
        alert("无法支付");
      }else if(this.radio.key == "wechat"){
        alert("支付成功");
      }
    },
    back(){
      this.$router.push({path:'/'});
    }
  },
  created(){
    this.$http.get('./api/car')
    .then((res) => {
      for(var i in res.data.data){
         if(res.data.data[i].number == this.$route.query.id){
          this.car = res.data.data[i];
          if(this.car.paid == "未缴费"){
            this.paid = true;
            this.$http.get('./api/selectList')
            .then((res) => {
              this.radios = res.data.data;
            }).catch((err) => {
            console.log(err);
            });
          }else{
            this.paid = false;
          }
        }
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  width: 100%;
  height: 88px;
}
.back {
  float:left;
  top: 0;
  left: 0;
  position: relative;
  width: 86px;
  height: 45px;
  margin: 19px 56px 22px 32px;
}
.back > div{
  display: inline-block;
  position: absolute; 
  top: 0;
  left: 0;
  border-left: 6px solid #333333;
  border-bottom: 6px solid #333333;
  width: 20px;
  height: 20px;
  transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);;
}
.title {
  height: 50px;
  margin:19px 174px;
  font-family: PingFangSC-Medium;
  font-size: 36px;
  color: #333333;
  letter-spacing: 0.58px;
  font-weight: bolder;
  text-align: center;
}
.infoContainer{
  height: 406px;
  background-color: rgb(240,240,240);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
  width: 686px;
  height: 341px;
  position: relative;
  background: linear-gradient(-180deg, #40BCF9 0%, #1E87F0 100%);
  box-shadow: 0 15px 59px 0 rgba(30,135,240,0.20);
  border-radius: 8px; 
}
.top {
  width: 534px;
  height: 341px;
  position: absolute;
  top: 0;
  right: 0;
}
.bottom {
  width: 267px;
  height: 170px;
  position: absolute;
  bottom: 0;
  right: 0;
}
.infoHeader {
  width: 100%;
  height: 85px;
}
.number {
  position: absolute;
  top: 24px;
  left: 32px;
  font-family: PingFangSC-Medium;
  font-size: 26px;
  color: #FFFFFF;
}
.paid {
  position: absolute;
  top: 24px;
  right: 32px;
  padding: 5px;
  opacity: 0.8;
  background: #FEFEFE;
  border-radius: 66px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #1890FF;
}
.line {
  position: absolute;
  top: 85px;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #FFFFFF;
}
.infoContent {
  width: 622px;
  position: absolute;
  top: 75px;
  left: 32px;
}
.timeContainer {
  float:left;
}
.timeContainer > div {
  width: 215px;
  height: 84px;
  position: relative;
  padding-bottom: 32px;
}
.label {
  width: 130px;
  height: 37px;
  position:absolute;
  left: 0;
  top: 32px;
  opacity: 0.8;
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: #FFFFFF;
}
.time {
  width: 315px;
  height: 37px;
  position:absolute;
  left: 0;
  top: 75px;
  font-family: PingFangSC-Medium;
  font-size: 26px;
  color: #FFFFFF;
  text-align: left;
}
.moneyContainer {
  position: absolute;
  bottom: 0;
  right: 0;
  
}
.moneyIcon {
  font-family: PingFangSC-Regular;
  font-size: 60px;
  color: #FFFFFF;
  text-align: right;
  line-height: 43px;
}
.money {
  font-family: PingFangSC-Medium;
  font-size: 96px;
  color: #FFFFFF;
  line-height: 68px;
}
.selectContainer{
  height: 680px;
}
.select{
  height: 129px;
}
.icon {
  margin: 24px 26px 60px 32px;
  float:left;
  height: 44px;
  width: 44px;
  border-radius: 50%;
  background-color: #D8D8D8;
}
.options{
  margin-left: 102px;
  height: 73px;
  padding: 24px 28px 28px 0;
  border-top: 1px #EEEEEE solid;
  
}
.item {
  height: 45px;
  position: relative;
}
.item  > label{
  position: absolute;
  left:0;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #333333;
}
.item  > input{
  display: none;
}
.radio{
    display: inline-block;
    content: "";
    height: 42px;
    width: 42px;
    position: absolute;
    right:0;
    border-radius: 50%;
    border: 1px solid #999999;
}
.checked::after{
  background-color: #21C4B3;
    display: inline-block;
    content: "";
    height: 28px;
    width: 28px;
    left: 7px;
    top: 7px;
    position: absolute;
    border-radius: 50%;
}
.comment {
  float:left;
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #999999;
}
.footer{
  position:fixed;
  left:0;
  bottom:0;
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.paybtn{
  height: 88px;
  width: 686px;
  background-color: #21C4B3;
  border: 1px #21C4B3 solid;
  color:white;
  font-size: 36px;
  border-radius: 4px;
}
</style>
