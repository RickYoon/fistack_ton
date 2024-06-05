import 'App.css'; 
import React, {useState, useEffect} from "react";
import styled, { keyframes } from 'styled-components';

import { useDispatch , useSelector } from 'react-redux';
import hashed from 'assets/ci/hashed.png'
import icons from "assets/tokenIcons"

import { useParams } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import axios from 'axios';

import { WsV2 } from "chainrunner-sdk";
import BigNumber from "bignumber.js";

import ProductTable from "./components/ProductTable"
import ProductBox from "./components/ProductBox"
import Example from "./Example"

function Products() {

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const { id } = useParams();  
  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false)

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더
  const [klayStakingList, setKlayStakingList] = useState([
    {
        "poolName": "",
        "contractAddress": "",
        "category": "",
        "investedKLAY": 0,
        "tvlKLAY": 0,
        "tvlKRW": 0,
        "apr":0,
        "liqToken": "",
        "unStakingOption": []
    }])

  // nodeklay => "클레이 노드 스테이킹"
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

useEffect(() => {



  console.log("userAccount",userAccount)
  console.log("localStorage.getItem.address", localStorage.getItem("address") === "")

  // 1) local storage address check
  // null 이면 아예 접속한 적이 없는 것. // "" 이면 접속했엇으나 지갑해제한것.

  // 이 상황이라면 아무 것도 안한다. 
  
  // address 가 바뀌었다.
  if(userAccount === ""){ // 아무것도 아닌 거라면,
    // target 주소가 아무 것도 아닌 것이라면 아무 것도 안한다.
    setInvestedAsset({
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
      "klayProtocolCategorySummary":[{"":0},{"":0}],
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

  } else if (userAccount !== undefined || userAccount !== "") { // 지갑 주소가 로딩 되었는데,

    console.log("지갑주소가 바뀜", userAccount)

    if(localStorage.getItem("address") === localStorage.getItem("lastAddress")){ // 마지막에 불러온 주소랑 상태 주소가 같은가?
      console.log("마지막 지갑 주소랑 같음", userAccount)

      const time = Date.now();

      if((time - localStorage.getItem("assetTimestamp")) > 60000){ // 불러온 이력이 있다면 불러온지 1분이 넘었는가?
        loadAsset() // 그러면 다시 자산을 불러온다.

      } else { // 불러온 이력이 없거나 1분 이내라면 기존 데이터를 불러온다.
        setInvestedAsset(JSON.parse(localStorage.getItem("assetList"))) 
      }

    } else { // 그러면 다시 자산을 불러온다.
      loadAsset() 
    }
  }

}, [userAccount])

const loadAsset = async () => {

  console.log("loading 시작")
  setIsloading(true)
  const time = Date.now();

  // const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/investInfo?userAddr=${userAccount}`)
  const assetList = {data : {"isInvested":true,"totalInvested":784984.7458947534,"totalDailyIncome":154.0368830554755,"totalApr":7.162363677674151,"klayInvestedinKlay":2008.391644997094,"klayInvestedinKRW":515955.8135997534,"klayDailyIncomeKlay":0.41339559243565865,"klayDailyIncomeKRW":106.2013276967207,"KlayTotalApr":7.5129465716948705,"oUsdtInvestedinoUsdt":200.021511,"oUsdtInvestedinKRW":269028.932295,"oUsdtDailyIncomeoUsdt":0.035565468668219184,"oUsdtDailyIncomeKRW":47.8355553587548,"oUsdtTotalApr":6.49,"klayProtocolCategorySummary":[{"Swapscanner":99.49993617917542},{"hashed-Ozys (Klaystation)":0.4994045869979962},{"Stake.ly":0.000632346785132059},{"Kokoa Finance":0.00002678900932616046},{"Klayswap":9.80321264284511e-8}],"oUsdtProtocolCategorySummary":[{"Klaybank":100}],"totalInvestCategory":{"klayStaking":65.72813246347211,"ousdtStaking":34.2718675365279},"klayStaking":{"Min":0.7,"Max":7.52,"balance":0.8934066},"oUsdtStaking":{"Min":-9.3,"Max":8.575557219428216,"balance":368.744119},"klayAprStatus":{"myStatus":7.5129465716948705,"maxApr":7.52},"oUsdtAprStatus":{"myStatus":6.49,"maxApr":8.575557219428216},"klayProtocolCategory":[{"poolName":"hashed-Ozys (Klaystation)","contractAddress":"0xe33337cb6fbb68954fe1c3fde2b21f56586632cd","category":"노드 스테이킹","investedKlay":10.03,"tvlKLAY":136950507.0273753,"tvlKRW":35182585255.33272,"apr":6.11,"liqToken":"sKLAY","unStakingOption":["스왑","7일대기"]},{"poolName":"Hankyung (Klaystation)","contractAddress":"0xeffa404dac6ba720002974c54d57b20e89b22862","category":"노드 스테이킹","investedKlay":0,"tvlKLAY":24611139.655280113,"tvlKRW":6322601777.441461,"apr":5.46,"liqToken":"X","unStakingOption":["7일대기"]},{"poolName":"FSN (Klaystation)","contractAddress":"0x962cdb28e662b026df276e5ee7fdf13a06341d68","category":"노드 스테이킹","investedKlay":0,"tvlKLAY":20184993.2266302,"tvlKRW":5185524759.921298,"apr":5.65,"liqToken":"X","unStakingOption":["7일대기"]},{"poolName":"Jump (Klaystation)","contractAddress":"0x0795aea6948fc1d31809383edc4183b220abd71f","category":"노드 스테이킹","investedKlay":0,"tvlKLAY":17357922.85614072,"tvlKRW":4459250381.742551,"apr":6.23,"liqToken":"X","unStakingOption":["7일대기"]},{"poolName":"Stake.ly","contractAddress":"0xf80f2b22932fcec6189b9153aa18662b15cc9c00","category":"노드 스테이킹","investedKlay":0.0127,"tvlKLAY":88561590,"tvlKRW":22751472470.999996,"apr":5.94,"liqToken":"stKLAY","unStakingOption":["7일대기"]},{"poolName":"Kleva","contractAddress":"0xa691c5891d8a98109663d07bcf3ed8d3edef820a","category":"빌려주기","investedKlay":0,"tvlKlay":13482193.653138217,"tvlKRW":3463575549.4912076,"apr":1.5},{"poolName":"BiFi","contractAddress":"0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13","category":"빌려주기","investedKlay":0,"tvlKlay":223571.94522558505,"tvlKRW":57435632.728452794,"apr":1.7445387899711675},{"poolName":"Klaymore stakehouse","contractAddress":"0x74ba03198fed2b15a51af242b9c63faf3c8f4d34","category":"노드 스테이킹","investedKlay":0,"tvlKLAY":20146784.379348762,"tvlKRW":5175708907.054697,"apr":5.532493555770537,"liqToken":"AKLAY","unStakingOption":["스왑"]},{"poolName":"Kokoa Finance","contractAddress":"0x7087d5a9e3203d39ec825d02d92f66ed3203b18a","category":"노드 스테이킹","investedKlay":0.000538028225084099,"tvlKlay":13970819128572604000,"tvlKRW":3.589103434130302e+21,"apr":0.7,"liqToken":"KSD 토큰","unStakingOption":["7일대기"]},{"poolName":"Klaybank","contractAddress":"0x6d219198816947d8bb4f88ba502a0518a7c516b1","category":"빌려주기","investedKlay":0,"tvlKlay":1928798.128,"tvlKRW":495508239.0832,"apr":1.55},{"poolName":"Swapscanner","contractAddress":"0xf50782a24afcb26acb85d086cf892bfffb5731b5","category":"노드 스테이킹","investedKlay":1998.348405,"tvlKLAY":56878431,"tvlKRW":14612068923.9,"apr":7.52,"liqToken":"X","unStakingOption":["스왑","7일대기"]},{"poolName":"Klayswap","contractAddress":"0xe4c3f5454a752bddda18ccd239bb1e00ca42d371","category":"빌려주기","investedKlay":0.000001968869036602,"tvlKlay":23080068.8485,"tvlKRW":5929269687.179649,"apr":1.87}],"oUsdtProtocolCategory":[{"poolName":"Kleva","contractAddress":"0xaee24956f6ccc58deac3c49ddb65a5c72d8bdd30","category":"빌려주기","investedoUSDT":0,"tvloUSDT":8730391.609106,"tvlKRW":11742376714.24757,"apr":1.51},{"poolName":"BiFi","contractAddress":"0xe0e67b991d6b5cf73d8a17a10c3de74616c1ec11","category":"빌려주기","investedoUSDT":0,"tvloUSDT":3064923.8911345857,"tvlKRW":4122322633.576018,"apr":8.575557219428216},{"poolName":"Kokoa Finance","contractAddress":"0xaee24956f6ccc58deac3c49ddb65a5c72d8bdd30","category":"노드 스테이킹","investedoUSDT":0,"tvloUSDT":144472.428844,"tvlKRW":194315416.79518002,"apr":-9.3,"liqToken":"KSD 토큰","unStakingOption":["7일대기"]},{"poolName":"Klaybank","contractAddress":"0x4b6ece52d0ef60ae054f45c45d6ba4f7a0c2cc67","category":"빌려주기","investedoUSDT":200.021511,"tvloUSDT":95600.495,"tvlKRW":128582665.77499999,"apr":6.49},{"poolName":"Klayswap","contractAddress":"0x4b419986e15018e6dc1c9dab1fa4824d8e2e06b5","category":"빌려주기","investedoUSDT":0,"tvloUSDT":7815978.6211,"tvlKRW":10512491245.3795,"apr":1.58}]}}

  setInvestedAsset(assetList.data)
  localStorage.setItem("lastAddress", userAccount)
  localStorage.setItem("assetList", JSON.stringify(assetList.data))
  localStorage.setItem("assetTimestamp", time)

  // console.log("storage assetList", localStorage.getItem("assetList"))
  // console.log("storage assetList", time - localStorage.getItem("assetTimestamp")) // 1000

  console.log("assetList",assetList)
  console.log("loading 종료")
  setIsloading(false)
}



  return (
    <>  
      <div class="bg-gray-50 h-screen">
        <div class="p-4">   
          <OverBox class="bg-gradient-to-r from-green-100 to-blue-200">
            <SubTemplateBlockVertical>
              <div className="flex relative inline-block text-center mx-auto">
                
                <div className="mx-auto font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-4xl">
                
                I want to{' '}
      
                <Example />
            {' '}{' '} with {' '}{' '}
            <button
              type="button"
              onClick={toggleDropdown}
              className="text-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg inline-flex items-center"
              id="dropdownDefaultButton"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? 'true' : 'false'}
            >
            Klay
            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
              </svg>

            </button>
          </div>

          {isDropdownOpen && (
            <div
              className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
              style={{ top: '2.5rem' }} // Adjust the value based on your design
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Earn
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Earnings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>


     <div class="p-5 mt-10 w-full rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4"></div>

        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}> 
              
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
                List
              </h5>
                <div style={{position:"relative"}} >
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-blue-700 border border-blue-200 bg-white hover:bg-blue-100 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center" type="button">
                <svg className="w-3 h-3 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v12m0 0 4-4m-4 4L1 9"/>
                </svg>
                {' '} Yield
                </button>  
                </div>
              </div>

            
        <div class="flow-root">
          {isloading ? 
              <>
                <ProductSkeleton width="90%" height="50px" style={{marginLeft:"20px"}}/>
              </> : 
              userAccount !== "" ?
              <>

              
                </>
                :
                <></>
              }
              </div>
            </div>
            <ProductTable data={investedAsset}/>

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
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;


const ManageTitle = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`


const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
`

const Wrappertitle = styled.div`
  /* margin: 0px auto 10px auto; */
  /* width: 1136px; */
  @media screen and (max-width: 950px){
    width: 100%;
    padding-top: 20px;
    color: black;
  }
  @media screen and (max-width: 500px){
    width: 100%;
    padding-top: 20px;
    /* color: gray; */
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






export default Products;

