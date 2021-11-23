import Vue from "vue";
import Vuex from "vuex";
import {GET_VALUTE,GET_VALUTE_PRICE, GetValuteAction} from "./actions/getValute";
import {COMMIT_VALUTE_NAMES,COMMIT_VALUTE_PRICE, ValutsNameMutation} from "./mutations/commitValuts";
 import axios from "axios";
import namesStorage from "./namesStorage/valutsNames";

Vue.use(Vuex);
const COMMIT_DATALIST_FILTER="COMMIT_DATALIST_FILTER";
const COMMIT_DATALIST_REVERT="COMMIT_DATALIST_REVERT";

const COMMIT_DATALIST_FILTER_FROM_INPUT="COMMIT_DATALIST_FILTER_FROM_INPUT";
 
const COMMIT_DATALIST_PURE="COMMIT_DATALIST_PURE";
const COMMIT_VALUTE_GET_CONV2="COMMIT_VALUTE_GET_CONV2"
export default new Vuex.Store({
  state: {
    namesStorage,
    initialValuteObject:[],
    valutePrice:[],
    valuteObject:[],
    valuteObjectPure:[],
    valuteConv2:[]
  },


  mutations: {
    [COMMIT_VALUTE_NAMES](state,payload){
  ValutsNameMutation(state,payload);
      },
[COMMIT_VALUTE_PRICE](state,payload){
 state.valutePrice=payload;
 console.log(state.valutePrice);
},
[COMMIT_VALUTE_GET_CONV2](state,payload){
  state.valuteConv2=state.valuteObjectPure.filter(item=>item.valuteName.match(payload));
  console.log(state.valuteConv2);
 },

[COMMIT_DATALIST_FILTER](state,payload){
  state.valuteObject=state.valuteObject.filter(item=>item.valuteName===payload);
   state.valuteObject=state.valuteObject.map(item=>({
    valuteName:item.valuteName.slice(0,3).trim(),
    valuteValue:item.valuteValue,
    valutePrevious:item.valutePrevious,
    valuteNominal:item.valuteNominal,
    valuteDinamic:((item.valuteValue.slice(0,-3).trim())-item.valutePrevious).toFixed(3),
    valuteCode:item.valuteCode

  })); 
  console.log(state.valuteObject);
 },

 [COMMIT_DATALIST_REVERT](state,payload){
  state.valuteObject=state.valuteObject.filter(item=>item.valuteName===payload.name);
   (payload.toggle!==false)?
   state.valuteObject=state.valuteObject.map(item=>({
    valuteName:item.valuteValue.slice(item.valuteValue.length-3,item.valuteValue.length).trim(),
    valuteValue:`${(item.valuteNominal/parseFloat(item.valuteValue)).toFixed(3)}${item.valuteName.slice(0,3).trim()}`,
    valutePrevious:item.valutePrevious,
    valuteNominal:1,
    valuteDinamic:item.valuteDinamic,
    valuteCode:item.valuteCode,
    stupidNumbersJS:(item.valuteNominal/parseFloat(item.valuteValue))-(item.valuteNominal/parseFloat(item.valuteValue)).toFixed(3),
    valuteValueReverted:item.valuteValue,
    jsonNominal:item.valuteNominal
  })):
  state.valuteObject=state.valuteObject.map(item=>({
    valuteName:item.valuteValue.slice(item.valuteValue.length-3,item.valuteValue.length).trim(),
    valuteValue:item.valuteValueReverted,

   valutePrevious:item.valutePrevious,
    valuteNominal:item.jsonNominal,
    valuteDinamic:item.valuteDinamic,
    valuteCode:item.valuteCode,
    stupidNumbersJS:(item.valuteNominal/parseFloat(item.valuteValue))-(item.valuteNominal/parseFloat(item.valuteValue)).toFixed(3),
    valuteValueReverted:item.valuteValue

  }))
console.log(state.valuteObject);
  },
 [COMMIT_DATALIST_FILTER_FROM_INPUT](state,payload){
  (isNaN(payload))?
  state.valuteObject=state.valuteObjectPure.filter(item=>item.valuteName.match(new RegExp(payload, 'i'))):
  state.valuteObject=state.valuteObjectPure.filter(item=>item.valuteCode.match(payload));
console.log(typeof payload);
 },
 [COMMIT_DATALIST_PURE](state){
  state.valuteObject=state.valuteObjectPure;

  },

  },


  actions: {
    [GET_VALUTE]({commit}){
      GetValuteAction(commit,axios,COMMIT_VALUTE_NAMES);
      },

[GET_VALUTE_PRICE]({commit,state},dispatchPayload){
const subs=dispatchPayload.slice(0,3).trim();
const price = state.initialValuteObject[subs].Value;
const previous=state.initialValuteObject[subs].Previous;
const nominal=state.initialValuteObject[subs].Nominal;
 
 

 const payload={
  nominal,
  price,
  previous
}
console.log(payload);

commit(COMMIT_VALUTE_PRICE,payload);
},

  },

  modules: {},


  getters: {
    getValuts: (state) => {
      return state.namesStorage.valutsShort;
    },
    getValutsLongName: (state) => {
      return state.namesStorage.valutsLongName;
    },
    getValutsAbbrFull: (state) => {
      return state.namesStorage.abbrFull;
    },
    getValutePrice: (state) => {
      return state.valutePrice;
    },
    getValuteConv2: (state) => {
      return state.valuteConv2;
    },
    getValuteListObject:(state)=>{
      return state.valuteObject;
    }
  },
});
