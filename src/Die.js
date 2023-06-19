import React from "react";
import Dice1 from '../src/images/dice1.png';
import Dice2 from '../src/images/dice2.png';
import Dice3 from '../src/images/dice3.png';
import Dice4 from '../src/images/dice4.png';
import Dice5 from '../src/images/dice5.png';
import Dice6 from '../src/images/dice6.png';

export default function Die(props){
    const styles={
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    function Dice(){
        if(props.value===1){
            return <img className="die-img" src={Dice1}/>
        } else if(props.value===2){
            return <img className="die-img" src={Dice2}/>
        }
         else if(props.value===3){
            return <img className="die-img" src={Dice3}/>
        }
        else if(props.value===4){
            return <img className="die-img" src={Dice4}/>
        }
        else if(props.value===5){
            return <img className="die-img" src={Dice5}/>
        }
        else if(props.value===6){
            return <img className="die-img" src={Dice6}/>
        }
    }
    return (
        <div className="die-face" style={styles} onClick={props.holdDice}>
           <Dice/>
        </div>
    )
}