function EmiCalculator(p,n,r){
    const mName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let date=new Date()
  let currYear=parseInt(date.getFullYear())
  let currMonth=date.getMonth()
  r = r/(12*100)
  let t=n*12
  let total=0
  let amount=p
  let details={loanEmi:0,dataTable:[],}
 let emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1)+0.00000414;
  for(let i=n*12;i>0;i--){
      if(currMonth==12){
          currMonth=0;
          currYear++
      }
    //   let principle=parseInt(amount/i)
       let interest = amount*r
      let principle=emi-interest
      total+=principle+interest
       console.log({
           year: currYear, 
           month:mName[currMonth] ,
           principle,
           interest,
           totalPayment:principle+interest,
           remaining:(amount-principle),
           
       })
       
       amount-=principle
       currMonth++;
  }
  
  
  
  return parseInt(total+0.5)
}



console.log(EmiCalculator(200000,2,10))