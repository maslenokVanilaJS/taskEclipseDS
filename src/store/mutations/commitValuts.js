const COMMIT_VALUTE_NAMES="COMMIT_VALUTE_NAMES";
const COMMIT_VALUTE_PRICE="COMMIT_VALUTE_PRICE";


function ValutsNameMutation(state,payload) {
    state.namesStorage.valutsShort=payload.shortName;
    state.namesStorage.valutsLongName=payload.longName;
    state.namesStorage.abbrFull=payload.valuteAbbrFull;
    state.initialValuteObject=payload.initData;
    state.valuteObject=payload.valutesObj;
    state.valuteObjectPure=payload.valutesObjPure;

 }
export { COMMIT_VALUTE_NAMES,COMMIT_VALUTE_PRICE,ValutsNameMutation};