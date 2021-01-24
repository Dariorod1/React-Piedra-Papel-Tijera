import React, {useState,useContext} from 'react';
import styled from 'styled-components';
import Token from './Token';
import Button , {WhiteButton}from './Button';
import {ScoreContext} from '../App'

const TableStyled = styled.div`
  display: grid;
  grid-template-columns: 130px 130px;
  justify-content: center;
  justify-items: center;
  grid-gap: 30px 50px;
  margin: 2em 0;
  position: relative;
  & div:nth-of-type(3) {
    grid-column: span 2;
  }
  .in-game {
    text-align: center;
    text-transform: uppercase;
    font-size: .8em;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .results {
    text-align: center;
    h2 {
      text-transform: uppercase;
      font-size: 56px;
      margin: 10px;
    }
  }
  .line {
    display: ${({ playing }) => !playing ? 'block' : 'none'};
    height: 14px;
    background: rgba(0,0,0,.2);
    position: absolute;
    width: 200px;
    top: 58px;
    &:before {
      content: '';
      height: 14px;
      background: rgba(0,0,0,.2);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      transform: rotate(60deg);
      transform-origin: left top;
    }
    &:after {
      content: '';
      height: 14px;
      background: rgba(0,0,0,.2);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      transform: rotate(-60deg);
      transform-origin: right top;
    }
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 300px 300px;
    ${({ playing, results }) => (playing && results) && 'grid-template-columns: 300px 110px 110px 300px;'}
    & div:nth-of-type(3) {
      ${({ playing, results }) => (playing && results) && 'grid-column: 2 / 4; grid-row: 1;'}
    }
    .line {
      width: 300px;
    }
    .results {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .in-game {
      font-size: 1.2em;
      display: flex;
      flex-direction: column;
      div {
        order: 2;
      }
      p {
        order: 1;
        margin-bottom: 2em;
      }
    }
  }
`
const elements = [
    "paper",
    "scissors",
    "rock"
]
function Table() {
    //const[score,setScore] = useState(0)
    const {score, setScore} = useContext(ScoreContext)
    const [results, setResults] = useState("...")
    const [housePick, setHousePick] = useState('default')
    const [playing, setPlaying] = useState(false);
    const [pick, setPick] = useState('');
    function getRandomInt(min,max){
        return Math.floor(Math.random()*(max-min)+min)
    }
    function launchHousePick() {
        return new Promise ((resolve, reject) => {
            let pick;
            const interval = setInterval(() => {
                pick = elements[getRandomInt(0,3)]
                setHousePick(pick)
            },75)
            setTimeout(() => {
                clearInterval(interval)
                resolve(pick)
            },2000)
        })     
    }
    async function onClick(name) {
        setPlaying(true)
        setPick(name)
        const house = await launchHousePick()
        const results = playWithIA(name, house)
        setResults(results)
        if(results === 'Tu ganas'){
           setScore(score + 1); 
        }
                
           
    }
    function playWithIA(pick,housePick){
        console.log()
        if(housePick === pick){
            return "Empate"
        }
        if(pick === 'paper'){
            if(housePick === 'scissors'){
                return 'Tu pierdes'
            }
            if(housePick === 'rock'){
                return 'Tu ganas'
            }
        }
        if(pick === 'rock'){
            if(housePick === 'scissors'){
                return 'Tu ganas'
            }
            if(housePick === 'paper'){
                return 'Tu pierdes'
            }
        }
        if(pick === 'scissors'){
            if(housePick === 'rock'){
                return 'Tu pierdes'
            }
            if(housePick === 'paper'){
                return 'Tu ganas'
            }
        }
    }

    function handleTryAgainClick() {
        setResults('...')
        setPlaying(false)

    }
    return(
        <TableStyled playing={playing} results="...">
        <span className="line"></span>
        {
            !playing ? (
                <>
                    <Token name = "paper" onClick={onClick} />
                    <Token name = "scissors" onClick={onClick}/>
                    <Token name = "rock" onClick={onClick}/>
                </>
            ) : (
               <>
                <div className="in-game">
                <Token name = {pick} isShadowAnimated = {(results === "Tu ganas")} />
                <p>Tú</p>
                </div>
                <div className="in-game">
                    <Token name={housePick} isShadowAnimated = {(results === "Tu pierdes")}/>
                    <p>Pc</p>
                </div>
                <div className="results">
                {
                results && (
                <>
                    <h2>{results}</h2>
                    <WhiteButton onClick={handleTryAgainClick}>
                        JUGAR DE NUEVO
                    </WhiteButton>
                </>
                    )
                }
                    
                </div>
               </>

            )
        }
            
        </TableStyled>
    )
}
export default Table;