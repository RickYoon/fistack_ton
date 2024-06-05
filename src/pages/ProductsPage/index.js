import styled from 'styled-components';
import React, {useRef,useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Features from './components/features/index'
import KlayStakingTable from "./klayStakingTable"
import StableLendTable from "./stableLendTable"
import Products from './products'
import { useDispatch , useSelector } from 'react-redux';

import klaytnLogo from "../../assets/ci/klaytn-logo.png"
import wemixLogo from "../../assets/ci/wemix-icon.webp"

const selector = [
  { type: 'Earn',
    token: "KLAY"
  },
  { type: 'Borrow',
    token: "STABLE" }
]

function ProductsPage() {

  const [isLoading, setIsLoading] = useState(false)
  const [select, setSelect] = useState(selector[0])

  const userAccount = useSelector(state => state.account) // 지갑주소

  const [klaystaking, setKlaystaking] = useState([{
      "poolName": "Klaymore stakehouse",
      "klayAmount": 19634899.511379745,
      "apr": 5.265849838582299,
      "type": "node-staking",
      "klayTVL": 3966249.7012987086
  }])

  const [stableBorrow, setStableBorrow] = useState([{
    "poolName": "Klaybank",
    "type": "lending",
    "avLiq": 831100,
    "brApr": 12.1,
    "liqThres": 75,
    "project": "BiFi",
    "token": "ousdt"
   }])

  useEffect(() => {

    updateAsset()

  }, [userAccount])


  async function updateAsset () {


    if(userAccount === ""){

      const assetList = await axios.get(`https://nyzomcdsf8.execute-api.ap-northeast-2.amazonaws.com/production/linkryptopoolinfos`)
      const resultArray = convertAndSort(assetList.data.body.klayStakingPool);   
      // const resultArrayBorrow = convertAndSort(assetList.data.body.stableLendProtocol);   
    
      setKlaystaking(resultArray)

    } else {

      setIsLoading(true)
      
      const assetList = await axios.get(`https://nyzomcdsf8.execute-api.ap-northeast-2.amazonaws.com/production/linkryptopoolinfos`)
      const resultArray = convertAndSort(assetList.data.body.klayStakingPool);   

      setKlaystaking(resultArray)

      const balanceList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/investInfo?userAddr=${userAccount}`)
      // const balanceList = await axios.get(`http://localhost:3000/v1/service/investInfo?userAddr=${userAccount}`)

      // console.log("klaystaking",klaystaking)
      const mergedResult = mergeArrays(resultArray, balanceList.data.klayProtocolCategory);
      console.log("mergedResult",mergedResult)

      setKlaystaking(mergedResult)
      setIsLoading(false)

    }


  }

  function resetInvestedKLAYToZero(data) {
    // 복제된 데이터를 수정하여 원본 데이터를 변경하지 않도록 합니다.
    const newData = JSON.parse(JSON.stringify(data));
  
    // 배열 내의 각 객체의 investedKLAY를 0으로 설정합니다.
    newData.forEach(item => {
      item.investedKLAY = 0;
    });
  
    return newData;
  }

  function mergeArrays(arr1, arr2) {
    const mergedArray = [];
  
    for (const item1 of arr1) {
      const matchingItem = arr2.find(item2 => item1.poolName === item2.poolName);
  
      if (matchingItem) {
        const mergedItem = {
          poolName: item1.poolName,
          contractAddress: matchingItem.contractAddress,
          investedKLAY: matchingItem.investedKLAY,  // Convert to KLAY
          klayTVL: item1.klayTVL,
          type: item1.type,
          apr: item1.apr,
        };
  
        mergedArray.push(mergedItem);
      }
    }
  
    return mergedArray;
  }
  
  


  function convertAndSort(poolData) {
    const poolArray = Object.entries(poolData).map(([poolName, data]) => ({
        poolName,
        klayAmount: data.klayAmount,
        apr: data.apr,
        type : data.type,
        klayTVL : data.klayTVL
    }));

    poolArray.sort((a, b) => b.apr - a.apr);

    return poolArray;
  }

  useEffect(() => {

    // console.log("select",select)

  }, [select])
  

  return (
    <>  
    <div class="bg-gray-50 py-20 sm:py-20 h-full">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-4xl lg:text-center">
        
          <Products select={select} setSelect={setSelect}/>

          {select.type === "Earn" ?
            <KlayStakingTable data={klaystaking} isLoading={isLoading}/>
            :
            <StableLendTable data={stableBorrow} />
          }

        </div>
      </div>
    </div>

  </>
  );
}


export default ProductsPage;

