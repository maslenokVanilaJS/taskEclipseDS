 const GET_VALUTE="GET_VALUTE";
 const GET_VALUTE_PRICE="GET_VALUTE_PRICE";

 function GetValuteAction(commit,axios,Mutation){
    axios.get("https://www.cbr-xml-daily.ru/daily_json.js").then(
        res=> {
      const initData=res.data.Valute;   
      const fullNameArr=Object.values(res.data.Valute).map(item=>item.Name);
      const shortNameArr=Object.keys(res.data.Valute);   
          const abbrFull=Object.values(res.data.Valute).map((item,index)=>`${shortNameArr[index]},${item.Name},${item.NumCode}`);
          const valutesObj=Object.values(res.data.Valute).map(item=>(
            {valuteName:`${item.CharCode},${item.Name}`,
             valuteValue:`${item.Value.toFixed(3)}RUB`,
             valutePrevious:item.Previous.toFixed(3),
             valuteNominal:item.Nominal,
             valuteDinamic:(item.Value-item.Previous).toFixed(3),
             valuteCode:item.NumCode

           }) );
           const valutesObjPure=Object.values(res.data.Valute).map(item=>(
            {valuteName:`${item.CharCode},${item.Name}`,
             valuteValue:`${item.Value.toFixed(3)}RUB`,
             valutePrevious:item.Previous.toFixed(3),
             valuteNominal:item.Nominal,
             valuteDinamic:(item.Value-item.Previous).toFixed(3),
             valuteCode:item.NumCode
           }) )
     
          const payload={longName:fullNameArr,
        shortName:shortNameArr,
        valuteAbbrFull:abbrFull,
        initData:initData,
        valutesObj:valutesObj,
        valutesObjPure:valutesObjPure
      } 
     
   
  
    
   console.log(valutesObj);
           console.log(abbrFull);
             commit(Mutation,payload);
     
        
        } 
        
    
      ).catch(err=>commit(Mutation,{payload:err.response}));
 }
 export {GET_VALUTE,GET_VALUTE_PRICE,GetValuteAction} ;
   