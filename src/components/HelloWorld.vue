<template>
  <div class="hello">
    
<p>Конвертер по умолчанию выводит в рубли . После выбора желаемой пары ,выводит в формате выбранной пары .</p>
     <div class="box">


</div>
    <div class="ConvertorBox">
 
<input type="text" @input="handleSelect" @focus="selectedValue=''" v-model="selectedValue" list="valuteSelect">
    <datalist    id="valuteSelect" class="ValuteList">
      <option :key="item"  v-for="item in valuteListAbbrFull" :value="item" class="ValuteList-Option">
{{item}}
      </option>
    </datalist>

    <input type="text" class="ConvertorBox-ValuteField"   @keypress="isNumber($event)" @input="convertValute" v-model="Convertor.modelNominal" name="number" id="">
   <img src="../assets/cycle (1).png" alt="" @click="revertConvertor" class="ConvertorBox-Revert">   <input type="number" class="ConvertorBox-ValuteField"  disabled  v-model="Convertor.modelPrice" name="numberRub" id="">
     
       <input type="text" @input="handleSelect2" @focus="selectedValueConv=''"  v-model="selectedValueConv" list="valuteSelect">
    <datalist    id="valuteSelect" class="ValuteList">
                    <option value="Россиский Рубль,RUB">Россиский Рубль,RUB</option>

      <option :key="item"   v-for="item in valuteListAbbrFull" :value="item" class="ValuteList-Option">

{{item}}
      </option>
    </datalist>
    </div>
    


<div class="ValuteCardListBox" >
      <input type="text" v-model="ListLogic.query" @input="searchFromInput(ListLogic.query)" v-show="ListLogic.searchInit" class="ConvertorBox-ValuteField ConvertorBox-ValuteField__Search" name="" id="">
 
<div class="ValuteCardList"     :style="(!ListLogic.searchInit)?'overflowY:auto;':'overflowY:scroll;height:300px;'" >
<div class="ValuteCard"   v-show="ListLogic.searchInit" @click="fg(item.valuteName)" v-for="item in ValuteListData" :key="item.valuteCode" >
  <div class="ValuteCard-ValuteInfo ValuteCard-ValuteInfo_Divider">
    <p  class="ValuteCard-TextName ValuteCard-TextName_First">{{`${item.valuteNominal}${item.valuteName}`}}</p>
    </div>
    <div class="ValuteCard-ValuteInfo ValuteCard-ValuteInfo_Divider2">
    <p class="ValuteCard-TextName">{{`${item.valuteValue}`}}</p>
    </div>
    <div class="ValuteCard-ValuteInfo">
    <p :style="Decreased" v-show="item.valuteDinamic<0" class="ValuteCard-TextName">{{`${item.valuteDinamic}`}}</p>
    <p :style="Increased" v-show="item.valuteDinamic>0" class="ValuteCard-TextName">{{`${item.valuteDinamic}`}}</p>
    </div>
     <div class="ValuteCard-ValuteInfo">
    <img v-show="item.valuteDinamic<0" src="../assets/decrease.png" alt="" class="ValuteCard-DynamicsIcon">
    <img v-show="item.valuteDinamic>0" src="../assets/increase.png" alt="" class="ValuteCard-DynamicsIcon">

    </div>
     
</div>
 
<div class="ValuteCard" v-show="!ListLogic.searchInit" @click="ListLogic.searchInit=true;newSearch();" v-for="item in ValuteListData.slice(0,1)" :key="item.valuteName+'ui'" >
  <div class="ValuteCard-ValuteInfo ValuteCard-ValuteInfo_Divider">
    <p class="ValuteCard-TextName ValuteCard-TextName_First">{{`${item.valuteNominal}${item.valuteName}`}}</p>
    </div>
<img src="../assets/revertArr.png" class="Revert" @click="doRev($event,item.valuteName);" alt="">

    <div class="ValuteCard-ValuteInfo ValuteCard-ValuteInfo_Divider2">
    <p class="ValuteCard-TextName">{{`${item.valuteValue}`}}</p>
    </div>
    <div class="ValuteCard-ValuteInfo">
    <p :style="Decreased" v-show="item.valuteDinamic<0" class="ValuteCard-TextName">{{`${item.valuteDinamic}`}}</p>
    <p :style="Increased" v-show="item.valuteDinamic>0" class="ValuteCard-TextName">{{`${item.valuteDinamic}`}}</p>
    </div>
     <div class="ValuteCard-ValuteInfo">
    <img v-show="item.valuteDinamic<0" src="../assets/decrease.png" alt="" class="ValuteCard-DynamicsIcon">
    <img v-show="item.valuteDinamic>0" src="../assets/increase.png" alt="" class="ValuteCard-DynamicsIcon">

    </div>
     
</div>

</div>
 </div>
 

    </div>
    
 
  
</template>

<script>
 
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data(){
    return{
     selectedValue:'EUR,Евро',
     selectedValueConv:'Росcийский Рубль,RUB',
     ListLogic:{
searchInit:false,
query:'',
isRevert:false,
initialValue:''
     },
        isMinus:true,
      isMinusColor:'color:rgb(33, 253, 81;',
      Decreased:'color:red;',
      Increased:'color:green',
      Convertor:{
        modelNominal:'loading',
        modelPrice:'loading',
        Converted:'',
        isReverted:false,
        RUB:'RUB'
      },
       Convertor2:{
        modelNominal:'loading',
        modelPrice:'loading',
        Converted:'',
        isConv2:false,
        RUB:'RUB'
      }
    }
  },
  computed:{
    valuteList(){
 return this.$store.getters.getValuts
    },
    
    valuteListLongN(){
 return this.$store.getters.getValutsLongName
    },

    valuteListAbbrFull(){
 return this.$store.getters.getValutsAbbrFull
    },
    valuteListAbbrFullConv(){
 return this.$store.getters.getValutsAbbrFull
    },

    ValutePrice(){
 return this.$store.getters.getValutePrice
    },
    ValuteConv2(){
 return this.$store.getters.getValuteConv2
    },
    ValuteListData:{
    get(){ 
      return this.$store.getters.getValuteListObject;
      } 
     
       
       
    }

  },
  methods:{
    doRev(event,...props){
event.stopPropagation();
 if(this.ListLogic.isRevert===false){
  this.ListLogic.isRevert=true
}else{
  this.ListLogic.isRevert=false;

}
console.log(props);
    let payload={
      name:props[0],
      toggle:this.ListLogic.isRevert,
     }
console.log(this.ListLogic.isRevert)
    this.$store.commit("COMMIT_DATALIST_REVERT",payload);

    },
 fg(payload){
   this.$store.commit("COMMIT_DATALIST_FILTER",payload);
   this.ListLogic.searchInit=false;
 },
 newSearch(){
      this.$store.commit("COMMIT_DATALIST_PURE");
  this.ListLogic.isRevert=false;

 },
searchFromInput(payload){
this.$store.commit("COMMIT_DATALIST_FILTER_FROM_INPUT",payload);
},
     isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },


    handleSelect(){


 this.$store.dispatch("GET_VALUTE_PRICE",this.selectedValue);
 this.Convertor.isReverted=false;    
 
  },
   handleSelect2(){


 this.$store.commit("COMMIT_VALUTE_GET_CONV2",this.selectedValueConv.slice(0,this.selectedValueConv.length-4));
 this.Convertor.isReverted=false;  
 
  },

  compareDynamic(){

    if(this.ValutePrice.price>this.ValutePrice.previous){
    
    this.isMinus=false;
             this.isMinusColor="color:rgb(33, 253, 81;"

    }else{

      this.isMinus=true;
      this.isMinusColor="color:red;"

    }
  },

  convertValute(){

    if(!this.Convertor.isReverted){
      console.log(this.ValuteConv2);
 
   this.Convertor.modelPrice=((this.Convertor.modelNominal*this.ValutePrice.price)/(this.ValuteConv2[0].valuteNominal*parseFloat(this.ValuteConv2[0].valuteValue))).toFixed(3);
 console.log(this.Convertor2.modelPrice);
  if (this.ValutePrice.nominal>1&&this.ValuteConv2[0].valuteNominal>1) {
        this.Convertor.modelPrice=((this.Convertor.modelNominal*(this.ValutePrice.price/this.ValutePrice.nominal))/(parseFloat(this.ValuteConv2[0].valuteValue)/this.ValuteConv2[0].valuteNominal)).toFixed(3);

   }
if (this.ValutePrice.nominal>1&&this.ValuteConv2[0].valuteNominal==1) {
        this.Convertor.modelPrice=((this.Convertor.modelNominal*(this.ValutePrice.price/this.ValutePrice.nominal))/(parseFloat(this.ValuteConv2[0].valuteValue)*this.ValuteConv2[0].valuteNominal)).toFixed(3);

   }
    
    if (this.ValutePrice.nominal==1&&this.ValuteConv2[0].valuteNominal>1) {
        this.Convertor.modelPrice=((this.Convertor.modelNominal*this.ValutePrice.price)/(parseFloat(this.ValuteConv2[0].valuteValue)/this.ValuteConv2[0].valuteNominal)).toFixed(3);

   }
    
    }else{
this.Convertor.modelPrice=(((this.ValutePrice.price/this.ValutePrice.nominal)*this.Convertor.modelNominal)*(parseFloat(this.ValuteConv2[0].valuteValue)/this.ValuteConv2[0].valuteNominal)).toFixed(3)
   if (this.ValutePrice.nominal==1&&this.ValuteConv2[0].valuteNominal>1) {
 this.Convertor.modelPrice=(((parseFloat(this.ValuteConv2[0].valuteValue)/this.ValuteConv2[0].valuteNominal)/this.ValutePrice.price)*this.Convertor.modelNominal).toFixed(3)

   }
    }
  },
  
  revertConvertor(){

  (!this.Convertor.isReverted)?this.Convertor.isReverted=true:this.Convertor.isReverted=false;
  this.convertValute();
   }

},

beforeMount(){
          this.$store.dispatch("GET_VALUTE");
          

},

beforeUpdate(){
  this.compareDynamic();
 
 
},

watch:{
 ValutePrice: function() {

   if (this.ValutePrice.nominal!==undefined&&this.ValutePrice.price!==undefined) {
  this.Convertor.modelPrice=this.ValutePrice.price.toFixed(3);
  this.Convertor.modelNominal=this.ValutePrice.nominal;
}
 } ,

 valuteList:function () {
     this.$store.dispatch("GET_VALUTE_PRICE",this.selectedValue);

 }

},

}
</script>

 <style    lang="scss">
@import  '../scss/adaptive.scss' ;
@keyframes spin {
  from{
      transform: rotate(0deg);

  }

  from{
      transform: rotate(45deg);

  }
}

.box{
  @include boxS_320px{

  }
}
.fade-enter-active, .fade-leave-active {
  opacity: 0;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  transition: opacity 2s;
}


.ValuteCardListBox{
display:flex;
 flex-direction: column;
 width:810px;
 margin:auto;
 margin-top:10vh;
}
.ValuteCardList{
  height:90px;
transition: all 1s;
  overflow-x: hidden;
    }
    .ValuteCardList::-webkit-scrollbar {
  width: 1em;
}
 
.ValuteCardList::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
.ValuteCardList::-webkit-scrollbar-thumb {
  background-color: rgb(4, 36, 179);
  outline: 1px solid slategrey;
}
.ConvertorBox-ValuteField__Search{
     width:800px;
margin:auto;
}
 .ConvertorBox{
   @include convbox_320px{
     
   }
      margin:auto;

   margin-top: 5%;
   font-size: 24px;
   display: flex;
       width:800px;

    flex-direction: row;
    justify-content: space-evenly;

   &-ValuteField{
  @include  input_320px{

  }
    padding: 10px;
    border: 1px  solid #564848;
    border-radius: 5px;
   box-shadow: 0 5px 25px rgba(7, 77, 182, 0.2);
 &:hover{
      box-shadow:1px 1px 5px 2px rgba(19, 7, 179, 0.2);

  }

   }

    &-Revert{
     width:32px;
    height:32px;
    &:active{
      animation: spin 1s ;
}
    
 
   }
   &-Edit{
     color:rgba(9, 43, 238, 0.95);
     text-decoration: underline;
   }
 }
  .ValuteCard{
    @include card_320px{

    }
    margin: auto;
    width:800px;
    text-align: center;
     align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
              background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.9500175070028011) 0%, rgb(10, 54, 175) 100%);




    color: white;
  //  margin-top: 10%;
    font-size: 26px;
box-shadow: 10px 17px 8px 1px rgba(34, 60, 80, 0.2); 
&:hover{      
  box-shadow: 0 5px 25px rgba(7, 77, 182, 0.2);
     // background: rgb(66, 66, 219);
      background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.9500175070028011) 0%, rgba(0,212,255,1) 100%);

transition: 0.5s;
}

&-ValuteInfo{
  @include basisOnly_320px{}
  flex-basis: 120px;
}

&-ValuteInfo_Divider{
  @include divid_320px{

  }
      flex-basis: 600px;

}

&-ValuteInfo_Divider2{
      flex-basis: 150px;

}
&-TextName_First{
  @include textFirst_320px{

  }
  width: 90%;
  margin: auto;
  text-align: left;
}
 }
 .ValuteCard-DynamicsIcon{
   @include imgRevert_320px{

   }
   width:65px;
   height: auto;
  
 }
 .Revert{
   filter: grayscale(21%) hue-rotate(17deg);
-webkit-filter: grayscale(21%) hue-rotate(17deg);
-moz-filter: grayscale(21%) hue-rotate(17deg);
&:hover{
  filter: saturate(196%);
-webkit-filter: saturate(196%);
-moz-filter: saturate(196%);
}
 }

.ValuteList {
  @include select_320px{
     
   }
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.9500175070028011) 0%, rgba(0,212,255,1) 100%);
  color: white;
  padding: 12px;
  width: 350px;
  border: none;
  font-size: 20px;
  -webkit-appearance: button;
  appearance: button;
  outline: none;
   &:hover{
      box-shadow: 0 5px 25px rgba(7, 77, 182, 0.2);

  }
  &:focus{
    background-color: blue;
 }
}

 

 

.ValuteList-Option {
  
  padding: 30px;
 
}


</style>
