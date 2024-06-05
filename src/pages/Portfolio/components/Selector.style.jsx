import Styled from 'styled-components';

export const Container = Styled.div`
  position: relative;
  width: 788px;
  display: flex;
  margin: 0 auto;
  /* border: solid;
  border-color: gray; */
  justify-content: space-enenly;
  border-radius: 8px;
  margin-top: 15px;
  /* border-width:1px; */
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  flex-direction: row;
  
  @media screen and (max-width: 500px){
  width: 100%;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
}
`

export const Item = Styled.div`
  background-color:${props => props.primary ? "white" : ""};
  color:${props => props.primary ? "#316395" : "gray"};
  border-width: 4px;
  border-radius: 8px;
  border-color: ${props => props.primary ? "black" : ""};
  flex-basis: 50%;
  height: 40px;  
  padding-top: 10px;
  display: table-cell;
  vertical-align: middle;
  text-align:center;
  align-self: center;
  @media screen and (max-width: 500px){
  width: 360px;
  }
`