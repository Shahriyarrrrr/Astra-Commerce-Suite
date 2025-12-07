exports.process=async(data)=>{
  return {ok:true,tx:"tx_"+Math.random().toString(36).slice(2),amount:data.amount,currency:data.currency}
}
