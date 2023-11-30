export function formatCurrency(priceCents){
  //添加round帮助四舍五入
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency;