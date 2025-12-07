const stripeKey="sk_test_12345"
exports.key=stripeKey
exports.charge=(amount,currency)=>{
  return {ok:true,id:"ch_"+Math.random().toString(36).slice(2),amount,currency}
}
