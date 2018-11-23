export default (expenses) => {
    return expenses.reduce((total, num)=>{
        return num.amount + total;
    }, 0);
};
