import React from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import useStyles from './styles'
import Form from './Form/Form';
import List from './List/List';
import { ExpenseTrackerContext } from '../../Context/Context';
import { useContext } from 'react';
const Main = () => {
    let classes=useStyles()
    let {balance}=useContext(ExpenseTrackerContext)
  return (
      <Card className={classes.root}>
          <CardHeader align='center' title='Expense Tracker'/>
          <CardContent>
              <Typography align='center' variant='h5'>Total Balance : {balance}</Typography>
              <Typography variant='subtitle1' style={{lineheight:'1.5em', marginTop:'20px'}}></Typography>
              <Divider/>
              <Form/>
          </CardContent>

          <CardContent className={classes.cardContent}>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <List/>
                  </Grid>

              </Grid>

          </CardContent>
      </Card>
  )
}
export default Main