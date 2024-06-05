import React, {useContext, useState} from "react";
import icons from "assets/tokenIcons"
import poolInfos from "./poolInfos.json"
import {Link} from "react-router-dom"


function ProductBox() {
    

    const [investedAsset, setInvestedAsset] = useState({
        "isInvested": false,
        "totalInvested": 0,
        "totalDailyIncome": 0,
        "totalApr": 0,
        "klayInvestedinKlay": 0,
        "klayInvestedinKRW": 0,
        "klayDailyIncomeKlay": 0,
        "klayDailyIncomeKRW": 0,
        "KlayTotalApr": 0,
        "investCategory": {
            "klayStaking": 0,
            "ousdtStaking": 0
        },
        "klayStaking": {
            "Min": 0,
            "Max": 0,
            "balance": 0
        },
        "ousdtStaking": {
            "Min": 0,
            "Max": 0,
            "balance": 0
        },
        "klayAprStatus": {
          "myStatus": 0,
          "maxApr": 0
        },
        "klayProtocolCategorySummary":[
          {"":0},{"":0}
        ],
        "klayProtocolCategory": [
          {
            "poolName": "hashed-Ozys (Klaystation)",
            "category": "노드 스테이킹",
            "investedKLAY": 0,
            "tvlKLAY": 0,
            "tvlKRW": 0,
            "apr":0,
            "liqToken": "sKLAY",
            "unStakingOption": [
                "스왑",
                "7일대기"
            ]
          }
      ]
    })

  return (
    <>
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700" style={{marginLeft:"15px"}}>

        {investedAsset.klayProtocolCategory.map((res)=>(
        <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                    {res.poolName === "Kokoa Finance" ?
                    <img class="w-8 h-8 rounded-full" src={icons["Kokoa"]} alt=""/> :      
                    res.poolName === "Kleva" ?      
                    <img class="w-8 h-8 rounded-full" src={icons["kleva"]} alt=""/> :  
                    res.poolName === "Klaymore stakehouse" ?      
                    <img class="w-8 h-8 rounded-full" src={icons["Klaymore"]} alt=""/> :  
                    res.poolName === "Stake.ly" ?      
                    <img class="w-8 h-8 rounded-full" src={icons["stakely"]} alt=""/> :  
                    res.poolName === "Swapscanner" ?      
                    <img class="w-8 h-8 rounded-full" src={icons["Swapscanner"]} alt=""/> :  
                    res.poolName === "Klayswap" ?      
                    <img class="w-8 h-8 rounded-full" src={icons["Klayswap"]} alt=""/> :  
                    res.poolName === "BiFi" ?      
                    <img class="w-8 h-8 rounded-full" src={icons["BiFi"]} alt=""/> :  
                    res.poolName === "Klaybank" ?      
                    <img class="w-8 h-8 rounded-full" src={icons["Klaybank"]} alt=""/> :  
                    <img class="w-8 h-8 rounded-full" src={icons["Klaystation"]} alt=""/>
                    }
                </div>
                
                <div class="flex-1 min-w-0">
                <div>
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {res.category === "빌려주기" ?
                    <>담보물 제공</>
                    :
                    res.category
                    }
                    </span>
                </div>
                {res.investedKLAY * 1000 > 1 ?
                    <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    {res.investedKLAY.toFixed(2)} KLAY 예치중
                    </span> :
                    res.investedKLAY > 0 ?
                    <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    0.001 KLAY 이하 예치중
                    </span> :
                    <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-gray-300">
                    예치 없음
                    </span>
                }
                    <p class="mt-2 text-sm font-medium text-gray-900 truncate dark:text-white">
                        {res.poolName}
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    
                    <div class="">
                    <div class="">
                    <div class="">
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                    <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>

                        <TransScale data={Number(res.tvlKRW.toFixed(0))}/>
                        </div>

                    <div class="mt-2 flex items-center text-sm text-gray-500">
                        <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                        </svg>
                        연 수익율 : 현재 {Number(res.apr.toFixed(2)).toLocaleString()} %
                        </div>


                        <div class="mt-2 flex items-center text-sm text-gray-500">
                        <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"></path>
                        </svg>
                        인출방법 : {poolInfos[res.poolName].wdMethod}
                        
                        </div>

                    </div>
                    </div>
                </div>
                        
                        
                    </p>
                </div>
                <Link to={`/detail/${res.contractAddress}`}>
                <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    예치하기
                </a>
                </Link>
            </div>
        </li>
        ))}

        </ul>
  </>
  )
}

function TransScale(props) {

    return (
      <>
        풀 규모 :   
        {props.data > 100000000 ?
          " " + (props.data / 100000000).toFixed(2) + " 억원"
          : props.data >  10000 ?
          " " + (props.data / 10000).toFixed(2) + " 만원"
          :
          " " + props.data
        }
      </>
    )
  
  }
  


export default ProductBox;