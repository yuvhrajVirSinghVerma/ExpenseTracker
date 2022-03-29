import React,{useState,useContext,useEffect} from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import useStyles from './styles'
import {ExpenseTrackerContext} from '../../../Context/Context'
import formatDate from '../../../utils/formatDate'

import {v4 as uuidv4} from 'uuid'

import{incomeCategories,expenseCategories} from '../../../constants/catrgories'

import {useSpeechContext} from '@speechly/react-client'


const Form = () => {
    let classes=useStyles()
    let {AddTransaction}=useContext(ExpenseTrackerContext)
    let initialstate={
        amount:'',
        category:'',
        type:'',
        date:formatDate(new Date())
    }
    let[formData,setformData]=useState(initialstate)

    let {segment}=useSpeechContext()

    useEffect(()=>{
        if(segment){
            if(segment.intent.intent==='add_expense'){
                setformData({...formData,type:'Expense'})
            }
            else if(segment.intent.intent==='add_income')
            {
                setformData({...formData,type:'Income'})
            }
            else if(segment.isFinal && segment.intent.intent==='create_transaction'){
                return createTransaction()
            }
            else if(segment.isFinal && segment.intent.intent==='cancel_transaction'){
                setformData(initialstate)
            }

            segment.entities.forEach((i)=>{
                let category=`${i.value.charAt(0)}${i.value.slice(1).toLocaleLowerCase()}`
                switch(i.type){
                    case 'amount':
                        setformData({...formData,amount:i.value})
                        break
                    case 'category':
                        if(incomeCategories.map((j)=>j.type.includes(category))){
                            setformData({...formData,type:'Income',category:category})

                        }else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                            setformData({ ...formData, type: 'Expense', category });
                          }
                        
                        break
                    case 'date':
                        setformData({...formData,date:i.value})
                }
            })
            if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
                createTransaction();
              }
        }

    },[segment])

    let createTransaction=()=>{
       if(formData.amount && formData.category && formData.date && formData.type){
            let AllTransactions={...formData,amount:Number(formData.amount),id:uuidv4()}
            AddTransaction(AllTransactions)
            setformData(initialstate)
       }

    }


    let selectCategory=formData.type=='Income'?incomeCategories:expenseCategories
  return (
      <Grid container spacing={2}>
          <Grid item xs={12}>
              <Typography align='center' variant='subtitle1'>...</Typography>
          </Grid>

          <Grid item xs={6}>
              <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select value={formData.type} onChange={(e)=>setformData(({...formData,type:e.target.value}))}>
                      <MenuItem value='Income'>Income</MenuItem>
                      <MenuItem value='Expense'>Expense</MenuItem>
                  </Select>
              </FormControl>
          </Grid>

          <Grid item xs={6}>
              <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select value={formData.category} onChange={(e)=>setformData(({...formData,category:e.target.value}))}>
                     {selectCategory.map(i=>(
                          <MenuItem key={i.type} value={i.type}>{i.type}</MenuItem>
                     ))}
                  </Select>
              </FormControl>
          </Grid>

          <Grid item xs={6}>
              <TextField value={formData.amount} onChange={(e)=>setformData({...formData,amount:e.target.value})} type='number' label='Amount' fullWidth/>
          </Grid>

          <Grid item xs={6}>
              <TextField value={formData.date} onChange={(e)=>setformData({...formData,date:formatDate(e.target.value)})} type='date' label='Date' fullWidth/>
          </Grid>
          
          <Button className={classes.button} variant='outlined' color='primary' onClick={createTransaction} fullWidth>Create</Button>

      </Grid>
  )
}

export default Form