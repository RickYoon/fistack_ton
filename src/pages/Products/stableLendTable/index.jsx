import React, {useContext, useState, useEffect} from "react";
import icons from "assets/tokenIcons"
import poolInfos from "./poolInfos.json"
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import {useNavigate} from 'react-router-dom';

function StableLendTable(props) {

  const navigate = useNavigate();

  const pooldata = props.data
  console.log("pooldata",pooldata)

  function clickHandler(poolName,e) {

    const poolToAddr = {
      "Ozys (klaystation)" : "0xe33337cb6fbb68954fe1c3fde2b21f56586632cd",
      "swapscanner" : "0xf50782a24afcb26acb85d086cf892bfffb5731b5",
      "FSN (klaystation)" : "0x962cdb28e662b026df276e5ee7fdf13a06341d68",
      "hankyung (klaystation)": "0xeffa404dac6ba720002974c54d57b20e89b22862",
      "Klayswap": "0xe4c3f5454a752bddda18ccd239bb1e00ca42d371",
      "Kokoa Finance": "0x7087d5a9e3203d39ec825d02d92f66ed3203b18a",
      "stakely": "0xf80f2b22932fcec6189b9153aa18662b15cc9c00",
      "Jump (Klaystation)": "0x0795aea6948fc1d31809383edc4183b220abd71f",
      "BiFi": "0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13",
      "Kleva": "0xa691c5891d8a98109663d07bcf3ed8d3edef820a",
      "Klaymore stakehouse": "0x74ba03198fed2b15a51af242b9c63faf3c8f4d34",
      "Klaybank": "0x6d219198816947d8bb4f88ba502a0518a7c516b1" 
    }

      e.preventDefault();
      navigate(`/detail/lending/${poolName}`);
    }

    return (

<>
    <div class="h-screen">
        <div class="p-3 px-0">
      <table class="w-full">

        <thead class="border-y border-gray-200 bg-white">
          <tr>
            <th class="bg-blue-gray-50/50 pl-4">
              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Collateral / Borrow</p>
            </th>
            <th class="bg-blue-gray-50/50 p-4">
              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Protocol</p>
            </th>
            <th class="bg-blue-gray-50/50 p-4">
              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Type</p>
            </th>
            <th class="bg-blue-gray-50/50 p-4">
              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-right">Borrow APR</p>
            </th>
            <th class="bg-blue-gray-50/50 p-4">
              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-right">Max LTV</p>
            </th>
            <th class="bg-blue-gray-50/50 p-4">
              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-right">Liq %</p>
            </th>
          </tr>
        </thead>
        
        <tbody>

          {pooldata.map((res) => (
          <tr class="border-b border-gray-100 cursor-pointer hover:bg-white hover:border border-gray-200" onClick={(e)=>{clickHandler(res.poolName, e)}}>
            <td>
              <div className="flex items-center gap-3 p-5">
              <PoolinfoBox>
                      <Iconbox>
                        <div class="flex-shrink-0">
                          <img class="w-8 h-8 rounded-full" src={icons["KLAY"]} alt=""/>
                        </div>
                      </Iconbox>
                      <Iconbox>
                        <div class="flex-shrink-0">
                          <img class="w-8 h-8 rounded-full" src={icons["oUSDT"]} alt=""/>
                        </div>
                      </Iconbox>
                      
                        <Explainbox>
                        <Protocol style={{fontWeight:"500", fontSize:"14px"}}>
                            KLAY / OUSDT
                        </Protocol>
                        <Token>
                            Klaytn
                        </Token>
                        </Explainbox>
                      </PoolinfoBox>
            </div>
            </td>

            <td className="p-4">
            <Th style={{fontSize:"15px", fontWeight:"500"}}>
                  <Iconbox>
                        <div class="flex-shrink-0">
                              {res.poolName === "Kokoa Finance" ?
                              <img class="w-8 h-8 rounded-full" src={icons["Kokoa"]} alt=""/> :      
                              res.poolName === "Kleva" ?      
                              <img class="w-8 h-8 rounded-full" src={icons["kleva"]} alt=""/> :  
                              res.poolName === "Klaymore stakehouse" ?      
                              <img class="w-8 h-8 rounded-full" src={icons["Klaymore"]} alt=""/> :  
                              res.poolName === "stakely" ?      
                              <img class="w-8 h-8 rounded-full" src={icons["stakely"]} alt=""/> :  
                              res.poolName === "swapscanner" ?      
                              <img class="w-8 h-8 rounded-full" src={icons["swapscanner"]} alt=""/> :  
                              res.poolName === "Klayswap" ?      
                              <img class="w-8 h-8 rounded-full" src={icons["Klayswap"]} alt=""/> :  
                              res.poolName === "BiFi" ?      
                              <img class="w-8 h-8 rounded-full" src={icons["BiFi"]} alt=""/> :  
                              res.poolName === "Klaybank" ?      
                              <img class="w-8 h-8 rounded-full" src={icons["Klaybank"]} alt=""/> :  
                              <img class="w-8 h-8 rounded-full" src={icons["Klaystation"]} alt=""/>
                              }
                          </div>
                  </Iconbox>
            </Th>
            </td>
            <td className="p-4">
              <Th style={{fontSize:"15px", fontWeight:"500"}}>
                  Lending
              </Th>
            </td>
            <td className="p-4 text-right">
              <div className="">
                <div style={{fontSize:"15px", fontWeight:"500"}}>
                    3.9 %
                </div>
              </div>
            </td>
            <td className="p-4 text-right">
              <div className="">
                <div style={{fontSize:"15px", fontWeight:"500"}}>
                    60 %
                </div>
              </div>
            </td>
            <td className="p-4 text-right">
              <div className="">
                <div style={{fontSize:"15px", fontWeight:"500"}}>
                    65 %
                </div>
              </div>
            </td>

        </tr>
        
          ))}
        </tbody>
      </table>

    </div>

    </div>
  </>
  )
}


const Protocol = styled.div`
  padding-left: 15px;
  /* text-decoration: underline; */
  font-size: 12px;
  
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


export default StableLendTable;