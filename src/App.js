import './App.css';
import Die from './Die';
import React from 'react';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import useWindowSize from 'react-use/lib/useWindowSize'

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [count,setCount]=React.useState(0)
  const [seconds,setSeconds]=React.useState(0)
  const [minutes,setMinutes]=React.useState(0)
  const time=localStorage.getItem("BestTime")
  const score=localStorage.getItem("BestScore")
  
  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
      }
  }, [dice])
 
  
  function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
  }
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }
  
  var timer;
  React.useEffect(()=>{
    if(!tenzies){
    timer=setInterval(()=>{
        setSeconds(seconds+1);
        if(seconds===59){
            setMinutes(minutes+1)
            setSeconds(0);
        }
    },1000)}else{
        if(((minutes*60)+seconds)<time){
          localStorage.setItem("BestTime",`${(minutes*60)+seconds}`)
        }
        if(count<score){
            localStorage.setItem("BestScore",`${count}`);
        }
    }
    return ()=> clearInterval(timer);
  })
 

  function rollDice() {
    if(!tenzies){
        setCount(count+1)
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
            die :
            generateNewDie()
        }))
    }else{
      setTenzies(false)
      setDice(allNewDice())
      setCount(0)
      setMinutes(0)
      setSeconds(0)
    }
  }
  
  function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }
  
  const diceElements = dice.map(die => (
      <Die 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          holdDice={() => holdDice(die.id)}
      />
  ))
  
  
  const { width,height}=useWindowSize()
  return (
      <main>
          {tenzies && <Confetti width={width} height={height} />}
          
          <div className='timer'>    
          {minutes<10 ? "0"+minutes : minutes}
          :
          {seconds<10 ? "0"+seconds : seconds}
          </div>
         
            {tenzies && <div className='bestT'>BestTime {(Math.round(time/60))}:{(Math.round(time%60))}</div>}
            <h1 className="title">Tenzies</h1>
        
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>
          {tenzies && <div className='score'>Best Score: {score}</div>}
          <button 
              className="roll-dice" 
              onClick={rollDice}
              >
              {tenzies ? "New Game" : "Roll"}
          </button>
          <div className='Count'>Roll Count: {count}</div>
      </main>
  )
}