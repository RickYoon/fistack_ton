import React from "react";
import icons from "assets/tokenIcons"
import styled from 'styled-components';

const WalletHistory = (props) => {

  const historyData = props.data

  return (
    <>
    {historyData[0].date === "" ? 
    <ContentBox>

<div class="bg-white p-3 rounded-lg mb-5 mt-5">
      <div class="px-0">
        <table class="w-full">
            <thead class="bg-white border-b border-blue-gray-100">
                <tr>
                <th class="bg-blue-gray-50/50 pl-4">
                    <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                        type / date
                    </p>
                </th>
                <th class="bg-blue-gray-50/50 p-4">
                    <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                        Send
                    </p>
                </th>
                <th class="bg-blue-gray-50/50 p-4">
                    <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                        Receive
                    </p>
                </th>
                <th class="bg-blue-gray-50/50 p-4">
                    <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                        Interaction
                    </p>
                </th>
                </tr>
            </thead>
            <tbody class="bg-white">
                <tr>
                <td className="">
                    <div className="flex items-center gap-3 pl-4">
                    <div>
                    <div>
                        <div>
                        <div style={{fontSize:"13px"}}>
                        <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                            -
                            </p>
                        </div>
                        <div style={{fontSize:"10px"}}>
                            -
                        </div>
                        <div style={{fontSize:"10px"}}>
                            -
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </td>
                <td>
                    -
                </td>
                <td>
                    -
                </td>
                <td>
                    -
                </td>
                </tr>
                </tbody>
            </table>
            </div>
            </div>
    </ContentBox>
    :
    <ContentBox>
    <div class="bg-white p-3 rounded-lg mb-5 mt-5">
      <div class="px-0">
        <table class="w-full">
            <thead class="bg-white border-b border-blue-gray-100">
                <tr>
                <th class="bg-blue-gray-50/50 pl-4">
                    <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                        type / date
                    </p>
                </th>
                <th class="bg-blue-gray-50/50 p-4">
                    <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                        Send
                    </p>
                </th>
                <th class="bg-blue-gray-50/50 p-4">
                    <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                        Receive
                    </p>
                </th>
                <th class="bg-blue-gray-50/50 p-4">
                    <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                        Interaction
                    </p>
                </th>
                </tr>
            </thead>
            
      
            {historyData.map((data)=>(

            <tbody class="bg-white">
                <tr>
                <td className="border-b border-blue-gray-50">
                    <div className="flex items-center gap-3 pl-4">
                    <div>
                    <div>
                        <div>
                        <div style={{fontSize:"13px"}}>
                        <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                            {data.type}
                            </p>
                        </div>
                        <div style={{fontSize:"10px"}}>
                            {data.date}
                        </div>
                        <div style={{fontSize:"10px"}}>
                        {data.time}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </td>
        
                <td className="p-4 border-b border-blue-gray-50">
                <Th>
                {data.type === "approve" ?
                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                <>approve</>
                </p>
                :
                    data.send.length === 0 ?
                    <></>
                    :
                            <PoolinfoBox>
                            <Iconbox>
                                <Iconwrapper>
                                    {icons[data.send.tokenName] !== undefined ?
                                    <Img src={icons[data.send.tokenName]} alt="logo" fontSize="10px"/>
                                    :
                                    <Img src={icons["defToken"]} alt="logo" fontSize="10px"/>
                                    }
                                </Iconwrapper>
                            </Iconbox>
                            <Explainbox>
                            <Protocol>
                            <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                            - {data.send.tokenAmount} {data.send.tokenName}
                            </p>
                            </Protocol>
                            <Token>
                            {data.send.tokenChain}
                            </Token>
                            </Explainbox>
                            </PoolinfoBox>
                    }
                </Th>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                <Th>
                    {data.receive.length === 0 ?
                    <></>
                :
                <PoolinfoBox>
                            <Iconbox>
                                <Iconwrapper>
                                {icons[data.receive.tokenName] !== undefined ?
                                    <Img src={icons[data.receive.tokenName]} alt="logo" fontSize="10px"/>
                                    :
                                    <Img src={icons["defToken"]} alt="logo" fontSize="10px"/>
                                    }
                                </Iconwrapper>
                            </Iconbox>
                            <Explainbox>
                            <Protocol>
                            <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                            + {data.receive.tokenAmount} {data.receive.tokenName}
                            </p>
                            </Protocol>
                            <Token>
                            {data.receive.tokenChain}
                            </Token>
                            </Explainbox>
                            </PoolinfoBox>
                        }
                </Th>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <div>
                    <div>
                        <Explainbox>
                        <Token>
                            {data.interaction.type}
                        </Token>
                        <Protocol>
                        {data.interaction.detail}
                        </Protocol>
                        </Explainbox>
                    </div>
                    </div>
                </td>
                </tr>
            </tbody>
            ))}
            </table>
            </div>
        </div>
        </ContentBox>
            }
            
        </>
  )}
  

  const ContentBox = styled.div`
  height: auto;
  min-height: 500px;
  /* padding-bottom: 50px;  */
`


const Protocol = styled.div`
  padding-left: 15px;
  /* text-decoration: underline; */
  font-size: 12px;
  /* font-weight: medium; */
  
`

const Token = styled.div`
  padding-left: 15px;
    color: #657795;
    font-size: 11px;
    text-align: left;
`

const Explainbox = styled.div`
  display : flex;
  flex-direction : column;
`

const PoolinfoBox = styled.div`
  text-align: left;
  display : flex;
  flex-direction : row;
  align-items: center;
`

const Img = styled.img`
    height: 30px;
    border:1px solid #eaeaea;
    border-radius:50%;
    background-color: #f5f5f5;
  `

const Iconwrapper = styled.div`
    /* width: 30px;
    height: 20px; */
    /* overflow: hidden; */
`

const Iconbox = styled.div`
  display: flex;
  flex-direction: row;
`

const Th = styled.th`
  height:25px;
  vertical-align:middle;
  padding-left:5px;
  @media screen and (max-width: 500px){
    max-width: 150px;
  }

`;


export default WalletHistory;