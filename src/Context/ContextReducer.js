let ContextReducer=(state,action)=>{
    let transactions
    switch(action.type){
        case 'Delete_Transaction':
            transactions=state.filter((t)=>t.id!==action.payload)
            localStorage.setItem('transactions',JSON.stringify(transactions))
            return transactions
        case 'Add_Transaction':
            transactions=[action.payload,...state]
            localStorage.setItem('transactions',JSON.stringify(transactions))

            return transactions
    }

}
export default ContextReducer