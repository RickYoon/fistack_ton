import 'App.css'; 
import React, {Fragment, useState, useEffect} from "react";
import styled, { keyframes } from 'styled-components';
import axios from "axios";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';


const people = [
  { type: 'Earn',
    token: "USDT"
  }
]

let iconUrl = {
  "TON" : "https://ton.org/download/ton_symbol.png",
  "USDT" : "https://static-00.iconduck.com/assets.00/tether-cryptocurrency-icon-2048x2048-dp13oydi.png"
}

function Products({ select, setSelect }) {

  const [selected, setSelected] = useState(people[0])
  const [category, setCategory] = useState("simple")
  const [poolInfos, setPoolInfos] = useState([
    {
      "poolAddress": "EQD8TJ8xEWB1SpnRE4d89YO3jl0W0EiBnNS4IBaHaUmdfizE",
      "poolToken": [
          "TON",
          "USDT"
      ],
      "type": "LP farming",
      "projectName": "stonfi",
      "apr": 92.66690813742672
  }
  ])

  useEffect(() => {

    callPool()

  }, [])

  async function callPool(){

    let tempArray = [];
    const assetList = await axios.get(`https://nyzomcdsf8.execute-api.ap-northeast-2.amazonaws.com/production/fistackPool?address=001`)
    // console.log("assetList",assetList.data)
    assetList.data.forEach((res)=>{

      
      tempArray.push({
        "poolAddress": res.poolAddress,
        "poolToken": res.poolTokens,
        "type": res.type,
        "projectName": res.project,
        "apr": res.apr
      })
    })

    console.log("tempArray",tempArray)

  }

  // [
  //   {"poolAddress" : "EQD8TJ8xEWB1SpnRE4d89YO3jl0W0EiBnNS4IBaHaUmdfizE",
  //   "icon" : [{
  //     "type": 0,
  //     "tokenIcon": "https://static-00.iconduck.com/assets.00/tether-cryptocurrency-icon-2048x2048-dp13oydi.png",
  //     "projectIcon": "https://pbs.twimg.com/profile_images/1710312751636082688/zdCXb-2F_400x400.png"
  //   }],
  //   "strategy": "Lend USDT",
  //   "projectName": "EVAA",
  //   "apr": 10
  // }
  // ]

//   {
//     "poolTokens": [
//         "TON",
//         "USDT"
//     ],
//     "apr": 92.66690813742672,
//     "aprDetail": [
//         {
//             "fee": 6.748938137426719
//         },
//         {
//             "farm": 85.91797
//         }
//     ],
//     "project": "stonfi",
//     "poolAddress": "EQD8TJ8xEWB1SpnRE4d89YO3jl0W0EiBnNS4IBaHaUmdfizE",
//     "Volume24H": 14982460.654075965,
//     "tvl": 167011110.5482453,
//     "type": "LP farming",
//     "lpPriceUsd": 191758.882103793,
//     "status": "ok"
// }



  return (
    <>  
      <div class="bg-gray-50">
        <div class="">   
          <OverBox class="bg-gradient-to-r from-green-100 to-blue-500">
            
            <SubTemplateBlockVertical>
            <div className="flex relative inline-block text-center mx-auto">
            <h2 class="mx-auto text-base font-semibold leading-7 text-indigo-800 pb-3">What do you want?</h2>
            </div>
              <div className="flex relative inline-block text-center mx-auto">                
              <div className="mx-auto text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-roboto">
                Earn {' '}
                {' '}{' '} with {' '}{' '} {selected.token}
              </div>
        </div>
        <div className="flex relative inline-block text-center mx-auto">
          <div className="mx-auto text-base font-semibold leading-7 text-indigo-800 pt-10">
            {category === "simple" ? 
            <>
              <div class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center">
                Single
              </div>
                <div onClick={()=>setCategory("pro")} class="hover:cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-400 text-xm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-400 dark:text-blue-400 border border-gray-300 inline-flex items-center justify-center">
                Combine
              </div>
            </>
          :
          <>
            <div onClick={()=>setCategory("simple")} class="hover:cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-400 text-xm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-400 dark:text-blue-400 border border-gray-300 inline-flex items-center justify-center">
              Single
            </div>
              <div class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center">
              Combine
            </div>
          </>
          }
          </div>
        </div>

        {category === "simple" ?       
        <>  
        {poolInfos.map((poolinfo)=>
        <div className="border border-gray-200 rounded-lg pt-6 pb-6 bg-white mt-10">
          {poolinfo.type==="LP farming" ?          
            <Link to={`/detail/lpfarming/${poolinfo.poolAddress}`}>
              <div className="flex justify-evenly">
            
            <div className="flex">
              <div className="relative">
                  <div className="relative mr-1.5 rounded-full bg-white">
                    <div className="w-10 h-10 rounded-full" style={{ borderColor: 'rgb(204, 204, 204)' }}>
                    <img src={iconUrl[poolinfo.poolToken[0]]} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                    </div>
                  </div>
                </div>
                <div className="relative mr-1.5 rounded-full bg-white">
                  <div className="w-10 h-10 rounded-full" style={{ borderColor: 'rgb(204, 204, 204)' }}>
                  <img src={iconUrl[poolinfo.poolToken[1]]} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="mx-4 text-base font-bold text-neutral-800">
                  {poolInfos[0].type}
                  </p>
                </div>
                <div className="flex text-sm mx-4">
                  {poolInfos[0].projectName}
                </div>
              </div>  
              <div className="text-base text-neutral-800">{poolinfo.apr.toFixed(2)}%</div>

            </div>                  
          </Link>
          :
          <></>
          }
              

        </div>
        )}
        </>
        :
          <div className="border border-gray-200 rounded-lg p-5 bg-white mt-10">
            <Link to="/detail/deltaNeutral/0001">
            <div className="flex justify-evenly">
                <div className="flex">
                <div className="relative">
                    <div className="relative mr-1.5 rounded-full bg-white">
                      <div className="w-10 h-10 rounded-full" style={{ borderColor: 'rgb(204, 204, 204)' }}>
                      <img src={"https://img.cryptorank.io/coins/ston_fi1715854233885.png"} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                      </div>
                    </div>
                  </div>
                  <div className="relative mr-1.5 rounded-full bg-white">
                    <div className="w-10 h-10 rounded-full" style={{ borderColor: 'rgb(204, 204, 204)' }}>
                    <img src={"https://icons.llamao.fi/icons/protocols/storm-trade?w=48&h=48"} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                    </div>
                  </div>

                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    <p className="mx-4 text-xm font-bold text-neutral-800">Delta Neutral</p>
                  </div>
                  <div className="flex text-xm mx-4">
                    StonFi + Storm
                  </div>
                </div>  
                <p className="text-base text-neutral-800">66.21%</p>
              </div>                  
            </Link>
          </div>
        }


        {/* {category === "simple" ? 
        <>
            <div className="border border-gray-200 rounded-lg p-6 bg-white mt-10">
                  <Link to="/detail/0xae78736Cd615f374D3085123A210448E74Fc6393">
                  <div className="flex justify-evenly">
                      <div className="flex">
                      <div className="relative">
                          <div className="relative mr-1.5 rounded-full bg-white">
                              <img class="w-10 h-10 rounded-full" src={"https://pbs.twimg.com/profile_images/1710312751636082688/zdCXb-2F_400x400.png"} alt=""/>
                            <div className="absolute -right-2.5 -bottom-px">
                              <div className="w-6 h-6 p-[3px] border rounded-full z-10 bg-white" style={{ borderColor: 'rgb(221, 221, 221)' }}>
                              <img class="w-6 h-4 rounded-full" src={"https://static-00.iconduck.com/assets.00/tether-cryptocurrency-icon-2048x2048-dp13oydi.png"} alt=""/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="mx-4 text-base font-bold text-neutral-800">Lend USDT</p>
                        </div>
                        <div className="flex text-sm mx-4">
                          EEVA
                        </div>
                      </div>  
                      <div className="text-base text-neutral-800">22.61%</div>

                    </div>                  
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-white mt-5">
                  <Link to="/detail/0xae78736Cd615f374D3085123A210448E74Fc6393">
                  <div className="flex justify-evenly">
                      <div className="flex">
                      <div className="relative">
                          <div className="relative mr-1.5 rounded-full bg-white">
                              <img class="w-10 h-10 rounded-full" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpA7RYVXXbTW7j7MUM4JNPl8MZg9AHPRGO3Q&s"} alt=""/>
                            <div className="absolute -right-2.5 -bottom-px">
                              <div className="w-6 h-6 p-[3px] border rounded-full z-10 bg-white" style={{ borderColor: 'rgb(221, 221, 221)' }}>
                              <img class="w-6 h-4 rounded-full" src={"https://static-00.iconduck.com/assets.00/tether-cryptocurrency-icon-2048x2048-dp13oydi.png"} alt=""/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <p className="mx-4 text-base font-bold text-neutral-800">Deposit USDT</p>
                        </div>
                        <div className="flex text-sm mx-4">
                          Storm Trade
                        </div>
                      </div>
                      <div className="text-base text-neutral-800">63.35%</div>
  
                    </div>                  
                  </Link>
                </div>
                </>
                :
                <>
                <div className="border border-gray-200 rounded-lg p-5 bg-white mt-10">
                  <Link to="/detail/0xae78736Cd615f374D3085123A210448E74Fc6393">
                    <div className="flex justify-evenly">
                      <div className="flex">
                      <div className="relative">
                          <div className="relative mr-1.5 rounded-full bg-white">
                            <div className="w-10 h-10 rounded-full" style={{ borderColor: 'rgb(204, 204, 204)' }}>
                            <img src={"https://ton.org/download/ton_symbol.png"} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                            </div>
                          </div>
                        </div>
                        <div className="relative mr-1.5 rounded-full bg-white">
                          <div className="w-10 h-10 rounded-full" style={{ borderColor: 'rgb(204, 204, 204)' }}>
                          <img src={"https://static-00.iconduck.com/assets.00/tether-cryptocurrency-icon-2048x2048-dp13oydi.png"} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                          </div>
                        </div>

                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <p className="mx-4 text-base font-bold text-neutral-800">LP farming</p>
                        </div>
                        <div className="flex text-sm mx-4">
                          StonFi
                        </div>
                      </div>  
                      <div className="text-base text-neutral-800">96.15%</div>
                    </div>                  
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-white mt-5">
                  <Link to="/detail/0xae78736Cd615f374D3085123A210448E74Fc6393">
                    <div className="flex justify-evenly">
                      <div className="flex">
                      <div className="relative">
                          <div className="relative mr-1.5 rounded-full bg-white">
                            <div className="w-10 h-10 rounded-full" style={{ borderColor: 'rgb(204, 204, 204)' }}>
                            <img src={"https://ton.org/download/ton_symbol.png"} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                            </div>
                          </div>
                        </div>
                        <div className="relative mr-1.5 rounded-full bg-white">
                          <div className="w-10 h-10 rounded-full" style={{ borderColor: 'rgb(204, 204, 204)' }}>
                          <img src={"https://static-00.iconduck.com/assets.00/tether-cryptocurrency-icon-2048x2048-dp13oydi.png"} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                          </div>
                        </div>

                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <p className="mx-4 text-base font-bold text-neutral-800">LP farming</p>
                        </div>
                        <div className="flex text-sm mx-4">
                          DeDust
                        </div>
                      </div>  
                      <div className="text-base text-neutral-800">117.35%</div>
                    </div>                  
                  </Link>
                </div>

                

                </>
            } */}



    </SubTemplateBlockVertical>     
    </OverBox>
    </div>
    </div>



    </>
  );
}


const OverBox = styled.div`

  /* position: relative;
  margin: 10px auto; 
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: auto;
  padding: 30px; */

  /* @media screen and (max-width: 950px){
    width: calc(100%);
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 10px;
  } */
`



const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    margin: 10px auto;
    max-width: 800px;
    /* padding-bottom: 10px; */
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    /* display:flex; */
    /* flex-direction:column; */

    /* padding: 20px 25px !important;
    background: #fff; */

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    /* background-color: rgb(255, 255, 255);
    background-clip: border-box; */
    /* border: 1px solid rgba(0, 0, 0, 0.125); */
    /* border-radius: 0.75rem; */
    /* box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem; */
    /* overflow: visible; */
    
  @media screen and (max-width: 500px){
      /* width: 100%; */
      /* margin: 10px 10px; */
      font-size: 12px;
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






export default Products;

