import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import useStyles from './styles';
import useTransactions from '../../useTransaction';
import 'chart.js/auto';
const Details = (props) => {
  const classes = useStyles();
  let {title}=props
  let {total,chartData}=useTransactions(props.title)
  return (
    <Card className={title==='Income'?classes.income:classes.expense}>
        <CardHeader  title={title}/>
            <CardContent>
                <Typography variant='h5'>{total}</Typography>
                <Doughnut data={chartData}/>
            </CardContent>
    </Card>
  )
}

export default Details