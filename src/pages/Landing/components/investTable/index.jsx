import React, {useContext, useState, useEffect} from "react";
// import icons from "assets/tokenIcons"
import poolInfos from "./poolInfos.json"
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import {useNavigate} from 'react-router-dom';

function InvestTable(props) {

    const navigate = useNavigate();

    const pooldata = props.data


    function clickHandler(contAddr,e) {
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
        navigate(`/detail/staking/${poolToAddr[contAddr]}`);
      }

    return (

    <>
    <div class="">
        <div class="p-3 px-0">
      <table class="w-full">

        <thead class="border-y border-gray-200 bg-white">
          <tr>
            <th class="bg-blue-gray-50/50 pl-4">
              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Token/Protocol</p>
            </th>
            <th class="bg-blue-gray-50/50 p-4">
            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Type</p>
            </th>
            <th class="bg-blue-gray-50/50 p-4">
            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">APR</p>
            </th>
            <th class="bg-blue-gray-50/50 p-4">
            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-right">Liquidity</p>
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
                        {/* https://media.licdn.com/dms/image/D4E0BAQGgeSx3ThfxfQ/company-logo_200_200/0/1704981883553/evaa_protocol_logo?e=2147483647&v=beta&t=srxYDjedvUee7GOuNEvifogZGxv5C_OlLvgcQjeyOU4 */}
                          
                          </div>
                        </Iconbox>
                        <Explainbox>
                        <Protocol style={{fontWeight:"500", fontSize:"14px"}}>
                            {res.poolName}
                            
                        </Protocol>
                        <Token>
                            TON
                        </Token>
                        </Explainbox>
                      </PoolinfoBox>
            </div>
            </td>

            <td className="p-4">
            <Th style={{fontSize:"15px", fontWeight:"500"}}>
                {res.type}
            </Th>
            </td>
            <td className="p-4">
            <Th style={{fontSize:"15px", fontWeight:"500"}}>
                {res.apr.toFixed(1)} %
            </Th>
            </td>
            <td className="p-4 text-right">
              <div className="">
                <div style={{fontSize:"15px", fontWeight:"500"}}>
                    $ {(res.klayTVL/1000000).toFixed(1)} M
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

const Img = styled.img`
    /* width: 50px; */
    height: 30px;
    /* width: */
    /* /* height:25px;  */
    border:1px solid #eaeaea;
    border-radius:50%;
    background-color: #f5f5f5;
    /* padding: 1px; */
    /* background-color:ㅎㄱ묘; */
  `

const Imgs = styled.img`
  width: 20px;
  height: 20px;
  border: 0.5px solid #eaeaea;
  border-radius:50%;
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


const TodoTemplateBlock = styled.div`
  /* width: 100%; */
  width:1024px;
  /* max-height: 1024px; */

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 1px 1px 1px gray;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  /* margin-top: 16px; */
  margin-bottom: 16px;
  padding-left:18px;
  padding-right:20px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;

  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-width: 0px;
  overflow-wrap: break-word;
  background-color: rgb(255, 255, 255);
  background-clip: border-box;
  border: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  overflow: visible;
  
  .loader {
    margin-left:200px;
  }
  
  @media screen and (max-width: 950px){
    width: 90%;
    padding-left:20px;
    padding-right:20px;
    border-radius: 8px;
    box-shadow: 1px 1px 1px gray;

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    border: 0px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;

    .loader {
      margin-left:135px;
    }
    .mobtrans{
      display:none;
    }
    .tablecss{
      font-size:13px;
      
    }
    /* .head{
    }
    .headcol:before {
      content: 'Row ';
    }
  .content {
    background: #8cdba3;
} */
  }
`;

const Th = styled.th`
  height:25px;
  vertical-align:middle;
  padding-left:5px;
  @media screen and (max-width: 500px){
    max-width: 150px;
  }

`;

const Tdc = styled.td`
  @media screen and (max-width: 500px){
    display:none;
  }
  height:25px;
  vertical-align:middle;
`;


const Td = styled.td`
  height:25px;
  vertical-align:middle;
`

const Tr = styled.tr`
  &:hover {
    background-color: #E8E8E8;
  }
`


const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;


export const ProductSkeleton = styled.div`
  display: inline-block;
  height: ${props => props.height || "20px"};
  width: ${props => props.width || "50%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: ${props => props.marginTop || "0"}
`;







  


export default InvestTable;