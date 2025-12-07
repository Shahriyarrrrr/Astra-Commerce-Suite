exports.paginate = function(items,page,perPage){
  const arr = Array.isArray(items)?items:[]
  const p = Math.max(1,Number(page)||1)
  const pp = Math.max(1,Number(perPage)||10)
  const total = arr.length
  const pages = Math.ceil(total/pp)
  const start = (p-1)*pp
  const data = arr.slice(start,start+pp)
  return {page:p,perPage:pp,total,pages,data}
}
