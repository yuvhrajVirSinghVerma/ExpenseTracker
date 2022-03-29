import React,{useContext} from 'react'
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';
import useStyles from './styles'
import {ExpenseTrackerContext} from '../../../Context/Context'

const List = () => {
    let classes=useStyles()
    let {DeleteTransaction,state}=useContext(ExpenseTrackerContext)
    
  return (
    <MUIList dense={false} className={classes.list}>
        {state.map(i=>(
            <Slide direction='down'in mountOnEnter unmountOnExit key={i.id}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={i.type==='Income'?classes.avatarIncome:classes.avatarExpense}>
                            <MoneyOff/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={i.category} secondary={`$${i.amount} - ${i.date}`}/>
                    <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='delete' onClick={()=>DeleteTransaction(i.id)}>
                            <Delete/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </Slide>
        ))}

    </MUIList>
  )
}

export default List