import React from "react";
import icons from "assets/tokenIcons"
import styled, {keyframes} from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PositionList = ({lendData, klayData, isloading}) => {


const navigate = useNavigate();

  const positionData = lendData

  console.log("klayData",klayData)

  function goProtocol () {
    navigate("/detail/Lending/klaybank")
  }

  function goProduct () {
    navigate("/products")
  }

  return (
    <div class="h-screen">  
    <div class="bg-white p-3 cursor-pointer hover:border border-blue-300 rounded-lg mb-5" onClick={goProduct}>
        <table class="w-full">
        <thead class="">
                <tr>
                <th class="bg-blue-gray-50/50 p-2" colSpan={4} >
                    <div class="flex flex-row block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">                       
                       <Img src={icons["KLAY"]} alt="logo" /> 
                       <div style={{marginTop:"8px", marginLeft:"10px", marginRight:"10px"}}>Klay Earn Summary</div>                       
                    </div>
                </th>
                </tr>
            </thead>

                <tbody class="bg-white">
                    <tr>
                    <td className="">
                        <div className="flex items-center gap-3 pl-4">
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                </p>
                                staking
                            </Explainbox>
                        </PoolinfoBox>
                        </div>
                    </td>
            
                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Staking Amount</div>
                                </p>
                                {isloading ? <><ProductSkeleton/></> : klayData.totalSupplyToken}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>


                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Staking Value</div>
                                </p>
                                {isloading ? <><ProductSkeleton width="50" /></> : `$ ${klayData.totalSupplyValue}`}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Net APR</div>
                                </p>
                                {isloading ? <><ProductSkeleton width='50px' /></> : `${klayData.netApr} %`} 
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Daily Klay</div>
                                </p>
                                {isloading ? <><ProductSkeleton width='50px' /></> : klayData.dailyIncome}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    </tr>
                </tbody>
               
            </table>
            </div>
 
      {positionData[0] !== null ?
      positionData.map((data)=>(
         <div class="bg-white p-3 cursor-pointer hover:border border-blue-300 rounded-lg mb-5" onClick={goProtocol}>
        <table class="w-full">
        <thead class="">
                <tr>
                <th class="bg-blue-gray-50/50 p-2" colSpan={4} >
                    <div class="flex flex-row block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">                       
                       <Img src={icons["Klaybank"]} alt="logo" /> 
                       <div style={{marginTop:"8px", marginLeft:"10px", marginRight:"10px"}}>Klaybank</div>
                       <div style={{marginTop:"8px", marginLeft:"10px"}}>
                        <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Active</span>
                       </div>
                       <div style={{marginTop:"8px", marginLeft:"10px"}}>
                        <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Noti</span>
                       </div>
                       
                       
                    </div>
                </th>
                <th class="bg-blue-gray-50/50 p-2" >

                </th>
                </tr>
            </thead>

      
            

                <tbody class="bg-white">
                    <tr>
                    <td className="">
                        <div className="flex items-center gap-3 pl-4">
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                </p>
                                {data.type}
                            </Explainbox>
                        </PoolinfoBox>
                        </div>
                    </td>
            
                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Collateral</div>
                                </p>
                                {isloading ? <><ProductSkeleton width='50px' /></> : `$ ${data.totalStats.totalCollateralUSD.toFixed(2)}`}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Debt</div>
                                </p>

                                {isloading ? <><ProductSkeleton width='50px' /></> : `$ ${data.totalStats.totalDebtUSD.toFixed(2)}`}

                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Health Rate</div>
                                </p>

                                {isloading ? <><ProductSkeleton width='50px' /></> : `${data.detailStats.healthRate.toFixed(2)}`}

                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>APY</div>
                                </p>
                                {isloading ? <><ProductSkeleton width='50px' /></> : `${data.totalStats.netApr.toFixed(2)} %`}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    </tr>
                </tbody>
               
            </table>
            </div>
             ))
            :
            <>
            <div class="bg-white p-3 cursor-pointer hover:border border-blue-300 rounded-lg mb-5" onClick={goProtocol}>
        <table class="w-full">
        <thead class="">
                <tr>
                <th class="bg-blue-gray-50/50 p-2" colSpan={4} >
                    <div class="flex flex-row block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">                       
                       <Img src={icons["Klaybank"]} alt="logo" /> 
                       <div style={{marginTop:"8px", marginLeft:"10px", marginRight:"10px"}}>Klaybank</div>
                    </div>
                </th>
                <th class="bg-blue-gray-50/50 p-2" >

                </th>
                </tr>
            </thead>

                <tbody class="bg-white">
                    <tr>
                    <td className="">
                        <div className="flex items-center gap-3 pl-4">
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                </p>
                                -
                                {/* {data.type} */}
                            </Explainbox>
                        </PoolinfoBox>
                        </div>
                    </td>
            
                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Collateral</div>
                                </p>
                                $ -
                                {/* $ {data.totalStats.totalCollateralUSD.toFixed(2)} */}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Debt</div>
                                </p>
                                -

                                {/* $ {data.totalStats.totalDebtUSD.toFixed(2)} */}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Health Rate</div>
                                </p>
                                -

                                {/* {data.detailStats.healthRate.toFixed(2)} */}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>APY</div>
                                </p>
                                0 %
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    </tr>
                </tbody>
               
            </table>
            </div></>
            }
            
        </div>
  )}


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
    border-radius: 100%;
    background-color: #f5f5f5;
  `

const Th = styled.th`
  height:25px;
  vertical-align:middle;
  padding-left:5px;
  @media screen and (max-width: 500px){
    max-width: 150px;
  }

`;


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


export default PositionList;