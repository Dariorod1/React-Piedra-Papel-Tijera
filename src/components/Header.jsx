import React from 'react';
import styled from 'styled-components';
import Score from './Score';
const HeaderStyled = styled.div`
    color: white;
    padding: 12px 12px 12px 23px;
    border: 3px solid rgba(255,255,255,.29);
    border-radius: .5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        font-size: 18px;
        line-height: 16px;
        font-weight: 700;
        text-transform: uppercase;
    }
    @media screen and (min-width: 768px){
        padding : 24px;
        h1{
            font-size: 36px;
            line-height: .9;
            
        }
    }

`

function Header() {
    return(
        <HeaderStyled>
        <h1>
            Piedra <br/> Papel <br/> Tijeras
        </h1>
        <Score/>
        
        </HeaderStyled>
    )
}
export default Header;