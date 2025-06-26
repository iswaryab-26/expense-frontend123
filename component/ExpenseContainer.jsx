import React from 'react'
import { useState, useEffect} from 'react'
import ExpenseForm from './ExpenseForm.jsx'

import History from './History.jsx';
import BalanceContainer from './BalanceContainer.jsx';

function ExpenseContainer() {
  
  const [expense, setExpense ]= useState([])

  const fetchExpense = async()=>{
    try {
      const response = await fetch('http://localhost:4000/Expense');
      const data = await response.json();
      setExpense(data);
    } catch (error) {
      console.error('Failed to fetch data',error);
    }
  }

  useEffect(()=> {
    fetchExpense();
  }, []);

  const addExpense = async(title, amount)=>{
    try {
      const response = await fetch('http://localhost:4000/Expense',{
        method:'POST', 
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title, amount})
      });
      if(response.ok){
        const newItem = await response.json();
        setExpense((prev)=>[...prev, newItem])
      }else{
        console.error('Failed to fetch')
      }
    } catch (error) {
      console.error('Failed to add expense ',error)
    }
  }

   const deleteExpense=(id)=>{
    setExpense(expense.filter((exp)=>exp.id!==id))
   }
  return (
    <div className='expense-container'>
        <h1>Expense Tracker</h1>
        <BalanceContainer expense={expense}/>
        <History expense={expense} deleteExpense={deleteExpense} />
        <ExpenseForm addExpense={addExpense}/> 
    </div>
  )
}

export default ExpenseContainer
 

