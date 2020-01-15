import React from 'react';
import BuildControl from './BuildControl';
import classes from './BuildControls.css';
const controls=[
    {label:'Salad',type:'salad'},
    {label:'Cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'}
]
const buildControls=(props)=>{
   return(<div className={classes.BuildControls}>
       <p>Current Price: <strong> {props.price.toFixed(2)}</strong></p>
    { controls.map((ctrl)=>{
     return <BuildControl key={ctrl.label} 
            label={ctrl.label}
            added={()=>props.ingredientAdded(ctrl.type)}
            removed={()=>props.ingredientRemoved(ctrl.type)} 
            disabled={props.disabled[ctrl.type]}/>
 })}
 {console.log(props.price)}
 <button onClick={props.ordered} disabled={props.price<=4.00} className={classes.OrderButton}>{props.isAuth? 'ORDER NOW' :'SIGN UP TO ORDER NOW'}</button>
</div>)
}

export default buildControls;