import React, { useReducer, createContext, Children } from 'react';
import ContextReducer from './ContextReducer'

let initialstate=JSON.parse(localStorage.getItem('transactions'))||[{ amount: 500, category: 'Salary', type: 'Income', date: '2022-3-16', id: '44c68123-5b86-4cc8-b915-bb9e16cebe6a' }, { amount: 225, category: 'Investments', type: 'Income', date: '2022-3-16', id: '33b295b8-a8cb-49f0-8f0d-bb268686de1a' }, { amount: 50, category: 'Salary', type: 'Income', date: '2022-3-13', id: '270304a8-b11d-4e16-9341-33df641ede64' }, { amount: 123, category: 'Car', type: 'Expense', date: '2022-3-16', id: '0f72e66e-e144-4a72-bbc1-c3c92018635e' }, { amount: 50, category: 'Pets', type: 'Expense', date: '2022-3-13', id: 'c5647dde-d857-463d-8b4e-1c866cc5f83e' }, { amount: 500, category: 'Travel', type: 'Expense', date: '2022-3-13', id: '365a4ebd-9892-4471-ad55-36077e4121a9' }, { amount: 50, category: 'Investments', type: 'Income', date: '2022-3-23', id: '80cf7e33-fc3e-4f9f-a2aa-ecf140711460' }, { amount: 500, category: 'Savings', type: 'Income', date: '2022-3-23', id: 'ef090181-21d1-4568-85c4-5646232085b2' }, { amount: 5, category: 'Savings', type: 'Income', date: '2022-3-23', id: '037a35a3-40ec-4212-abe0-cc485a98aeee' }];

export let ExpenseTrackerContext=createContext(initialstate)

export let Provider = (props)=>{
    let {children}=props
    let [state,dispatch]=useReducer(ContextReducer,initialstate)

    let DeleteTransaction=(id)=>dispatch({type:'Delete_Transaction',payload:id})
    let AddTransaction=(transaction)=>dispatch({type:'Add_Transaction',payload:transaction})

    let balance=state.reduce((acc,curr)=>curr.type==='Expense'?acc-curr.amount:acc+curr.amount,0)

    return(
        <ExpenseTrackerContext.Provider value={{DeleteTransaction,AddTransaction,state,balance}}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}