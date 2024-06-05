import 'App.css'; 
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import React from "react";
import icons from "assets/tokenIcons"
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import axios from 'axios';


function Invest() {

  const [isloading, setIsloading] = useState(false)

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더

  const [investedAsset, setInvestedAsset] = useState({
      "isInvested": false,
      "totalInvested": 0,
      "totalDailyIncome": 0,
      "totalApr": 0,
      "totalAsset": 0,
      "totalInvestCategory": {
          "klayStaking": 0,
          "ousdtStaking": 0
      },
      "klayStaking": {
          "Min": 0,
          "Max": 0,
          "balance": 0
      },
      "oUsdtStaking": {
          "Min": 0,
          "Max": 0,
          "balance": 0
      }
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
        "totalAsset": 0,
        "totalInvestCategory": {
            "klayStaking": 0,
            "ousdtStaking": 0
        },
        "klayStaking": {
            "Min": 0,
            "Max": 0,
            "balance": 0
        },
        "oUsdtStaking": {
            "Min": 0,
            "Max": 0,
            "balance": 0
        }
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

    // const assetList = await axios.get(`http://localhost:3000/v1/service/investInfo?userAddr=0xc847d70d3ceb7e543e7ede2ad0ac596e2ffbcec8`)
    // const assetList = {data : {"isInvested":true,"totalInvested":784984.7458947534,"totalDailyIncome":154.0368830554755,"totalApr":7.162363677674151,"klayInvestedinKlay":2008.391644997094,"klayInvestedinKRW":515955.8135997534,"klayDailyIncomeKlay":0.41339559243565865,"klayDailyIncomeKRW":106.2013276967207,"KlayTotalApr":7.5129465716948705,"oUsdtInvestedinoUsdt":200.021511,"oUsdtInvestedinKRW":269028.932295,"oUsdtDailyIncomeoUsdt":0.035565468668219184,"oUsdtDailyIncomeKRW":47.8355553587548,"oUsdtTotalApr":6.49,"klayProtocolCategorySummary":[{"Swapscanner":99.49993617917542},{"hashed-Ozys (Klaystation)":0.4994045869979962},{"Stake.ly":0.000632346785132059},{"Kokoa Finance":0.00002678900932616046},{"Klayswap":9.80321264284511e-8}],"oUsdtProtocolCategorySummary":[{"Klaybank":100}],"totalInvestCategory":{"klayStaking":65.72813246347211,"ousdtStaking":34.2718675365279},"klayStaking":{"Min":0.7,"Max":7.52,"balance":0.8934066},"oUsdtStaking":{"Min":-9.3,"Max":8.575557219428216,"balance":368.744119},"klayAprStatus":{"myStatus":7.5129465716948705,"maxApr":7.52},"oUsdtAprStatus":{"myStatus":6.49,"maxApr":8.575557219428216},"klayProtocolCategory":[{"poolName":"hashed-Ozys (Klaystation)","contractAddress":"0xe33337cb6fbb68954fe1c3fde2b21f56586632cd","category":"노드 스테이킹","investedKlay":10.03,"tvlKLAY":136950507.0273753,"tvlKRW":35182585255.33272,"apr":6.11,"liqToken":"sKLAY","unStakingOption":["스왑","7일대기"]},{"poolName":"Hankyung (Klaystation)","contractAddress":"0xeffa404dac6ba720002974c54d57b20e89b22862","category":"노드 스테이킹","investedKlay":0,"tvlKLAY":24611139.655280113,"tvlKRW":6322601777.441461,"apr":5.46,"liqToken":"X","unStakingOption":["7일대기"]},{"poolName":"FSN (Klaystation)","contractAddress":"0x962cdb28e662b026df276e5ee7fdf13a06341d68","category":"노드 스테이킹","investedKlay":0,"tvlKLAY":20184993.2266302,"tvlKRW":5185524759.921298,"apr":5.65,"liqToken":"X","unStakingOption":["7일대기"]},{"poolName":"Jump (Klaystation)","contractAddress":"0x0795aea6948fc1d31809383edc4183b220abd71f","category":"노드 스테이킹","investedKlay":0,"tvlKLAY":17357922.85614072,"tvlKRW":4459250381.742551,"apr":6.23,"liqToken":"X","unStakingOption":["7일대기"]},{"poolName":"Stake.ly","contractAddress":"0xf80f2b22932fcec6189b9153aa18662b15cc9c00","category":"노드 스테이킹","investedKlay":0.0127,"tvlKLAY":88561590,"tvlKRW":22751472470.999996,"apr":5.94,"liqToken":"stKLAY","unStakingOption":["7일대기"]},{"poolName":"Kleva","contractAddress":"0xa691c5891d8a98109663d07bcf3ed8d3edef820a","category":"빌려주기","investedKlay":0,"tvlKlay":13482193.653138217,"tvlKRW":3463575549.4912076,"apr":1.5},{"poolName":"BiFi","contractAddress":"0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13","category":"빌려주기","investedKlay":0,"tvlKlay":223571.94522558505,"tvlKRW":57435632.728452794,"apr":1.7445387899711675},{"poolName":"Klaymore stakehouse","contractAddress":"0x74ba03198fed2b15a51af242b9c63faf3c8f4d34","category":"노드 스테이킹","investedKlay":0,"tvlKLAY":20146784.379348762,"tvlKRW":5175708907.054697,"apr":5.532493555770537,"liqToken":"AKLAY","unStakingOption":["스왑"]},{"poolName":"Kokoa Finance","contractAddress":"0x7087d5a9e3203d39ec825d02d92f66ed3203b18a","category":"노드 스테이킹","investedKlay":0.000538028225084099,"tvlKlay":13970819128572604000,"tvlKRW":3.589103434130302e+21,"apr":0.7,"liqToken":"KSD 토큰","unStakingOption":["7일대기"]},{"poolName":"Klaybank","contractAddress":"0x6d219198816947d8bb4f88ba502a0518a7c516b1","category":"빌려주기","investedKlay":0,"tvlKlay":1928798.128,"tvlKRW":495508239.0832,"apr":1.55},{"poolName":"Swapscanner","contractAddress":"0xf50782a24afcb26acb85d086cf892bfffb5731b5","category":"노드 스테이킹","investedKlay":1998.348405,"tvlKLAY":56878431,"tvlKRW":14612068923.9,"apr":7.52,"liqToken":"X","unStakingOption":["스왑","7일대기"]},{"poolName":"Klayswap","contractAddress":"0xe4c3f5454a752bddda18ccd239bb1e00ca42d371","category":"빌려주기","investedKlay":0.000001968869036602,"tvlKlay":23080068.8485,"tvlKRW":5929269687.179649,"apr":1.87}],"oUsdtProtocolCategory":[{"poolName":"Kleva","contractAddress":"0xaee24956f6ccc58deac3c49ddb65a5c72d8bdd30","category":"빌려주기","investedoUSDT":0,"tvloUSDT":8730391.609106,"tvlKRW":11742376714.24757,"apr":1.51},{"poolName":"BiFi","contractAddress":"0xe0e67b991d6b5cf73d8a17a10c3de74616c1ec11","category":"빌려주기","investedoUSDT":0,"tvloUSDT":3064923.8911345857,"tvlKRW":4122322633.576018,"apr":8.575557219428216},{"poolName":"Kokoa Finance","contractAddress":"0xaee24956f6ccc58deac3c49ddb65a5c72d8bdd30","category":"노드 스테이킹","investedoUSDT":0,"tvloUSDT":144472.428844,"tvlKRW":194315416.79518002,"apr":-9.3,"liqToken":"KSD 토큰","unStakingOption":["7일대기"]},{"poolName":"Klaybank","contractAddress":"0x4b6ece52d0ef60ae054f45c45d6ba4f7a0c2cc67","category":"빌려주기","investedoUSDT":200.021511,"tvloUSDT":95600.495,"tvlKRW":128582665.77499999,"apr":6.49},{"poolName":"Klayswap","contractAddress":"0x4b419986e15018e6dc1c9dab1fa4824d8e2e06b5","category":"빌려주기","investedoUSDT":0,"tvloUSDT":7815978.6211,"tvlKRW":10512491245.3795,"apr":1.58}]}}
    const assetList = {
      data : {
      "isInvested": true,
      "totalAssetKRW": 1972130.4748568858,
      "totalInvested": 487509.32476154104,
      "totalDailyIncome": 83.26445627075155,
      "totalApr": 6.234040047067806,
      "totalTvl": 123179896377.17743,
      "klayInvestedinKlay": 2135.389070352786,
      "klayInvestedinKRW": 487509.32476154104,
      "klayDailyIncomeKlay": 0.36471509536027835,
      "klayDailyIncomeKRW": 83.26445627075155,
      "KlayTotalApr": 6.234040047067806,
      "oUsdtInvestedinoUsdt": 0,
      "oUsdtInvestedinKRW": 0,
      "oUsdtDailyIncomeoUsdt": 0,
      "oUsdtDailyIncomeKRW": 0,
      "oUsdtTotalApr": 0,
      "klayProtocolCategorySummary": [
          {
              "Swapscanner": 99.23229168958528
          },
          {
              "hashed-Ozys (Klaystation)": 0.3371750890721986
          },
          {
              "Klaymore stakehouse": 0.0961800999443862
          },
          {
              "Hankyung (Klaystation)": 0.09600124063861211
          },
          {
              "Kokoa Finance": 0.0936849427582102
          },
          {
              "FSN (Klaystation)": 0.048234769686717305
          },
          {
              "Jump (Klaystation)": 0.048234769686717305
          },
          {
              "Stake.ly": 0.048197305787931494
          },
          {
              "Klayswap": 9.283993133019425e-8
          }
      ],
      "oUsdtProtocolCategorySummary": [],
      "totalInvestCategory": {
          "klayStaking": 100,
          "ousdtStaking": 0
      },
      "klayStaking": {
          "Min": 0.5539356976979788,
          "Max": 6.242580760723835,
          "balance": 6502.939772647152
      },
      "oUsdtStaking": {
          "Min": 2.25,
          "Max": 22.42,
          "balance": 0
      },
      "klayAprStatus": {
          "myStatus": 6.234040047067806,
          "maxApr": 6.242580760723835
      },
      "oUsdtAprStatus": {
          "myStatus": 0,
          "maxApr": 22.42
      },
      "klayProtocolCategory": [
          {
              "poolName": "hashed-Ozys (Klaystation)",
              "contractAddress": "0xe33337cb6fbb68954fe1c3fde2b21f56586632cd",
              "category": "노드 스테이킹",
              "investedKLAY": 7.2,
              "tvlKLAY": 166053093,
              "tvlKRW": 37909921131.9,
              "apr": 5.67,
              "liqToken": "sKLAY",
              "unStakingOption": [
                  "스왑",
                  "7일대기"
              ]
          },
          {
              "poolName": "Hankyung (Klaystation)",
              "contractAddress": "0xeffa404dac6ba720002974c54d57b20e89b22862",
              "category": "노드 스테이킹",
              "investedKLAY": 2.05,
              "tvlKLAY": 22939946,
              "tvlKRW": 5237189671.8,
              "apr": 5.08,
              "liqToken": "X",
              "unStakingOption": [
                  "7일대기"
              ]
          },
          {
              "poolName": "FSN (Klaystation)",
              "contractAddress": "0x962cdb28e662b026df276e5ee7fdf13a06341d68",
              "category": "노드 스테이킹",
              "investedKLAY": 1.03,
              "tvlKLAY": 14857464,
              "tvlKRW": 3391959031.2000003,
              "apr": 5.5,
              "liqToken": "X",
              "unStakingOption": [
                  "7일대기"
              ]
          },
          {
              "poolName": "Jump (Klaystation)",
              "contractAddress": "0x0795aea6948fc1d31809383edc4183b220abd71f",
              "category": "노드 스테이킹",
              "investedKLAY": 1.03,
              "tvlKLAY": 19007592,
              "tvlKRW": 4339433253.6,
              "apr": 5.61,
              "liqToken": "X",
              "unStakingOption": [
                  "7일대기"
              ]
          },
          {
              "poolName": "Stake.ly",
              "contractAddress": "0xf80f2b22932fcec6189b9153aa18662b15cc9c00",
              "category": "노드 스테이킹",
              "investedKLAY": 1.0292,
              "tvlKLAY": 86769464,
              "tvlKRW": 19809468631.2,
              "apr": 6,
              "liqToken": "stKLAY",
              "unStakingOption": [
                  "7일대기"
              ]
          },
          {
              "poolName": "Kleva",
              "contractAddress": "0xa691c5891d8a98109663d07bcf3ed8d3edef820a",
              "category": "빌려주기",
              "investedKLAY": 0,
              "tvlKLAY": 20768613.682808194,
              "tvlKRW": 4741474503.785111,
              "apr": 2.05
          },
          {
              "poolName": "BiFi",
              "contractAddress": "0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13",
              "category": "빌려주기",
              "investedKLAY": 0,
              "tvlKLAY": 92215.74340825377,
              "tvlKRW": 21052854.220104337,
              "apr": 0.5539356976979788
          },
          {
              "poolName": "Klaymore stakehouse",
              "contractAddress": "0x74ba03198fed2b15a51af242b9c63faf3c8f4d34",
              "category": "노드 스테이킹",
              "investedKLAY": 2.053819342066809,
              "tvlKLAY": 19110389.655794032,
              "tvlKRW": 4362901958.417778,
              "apr": 5.230575944270078,
              "liqToken": "AKLAY",
              "unStakingOption": [
                  "스왑"
              ]
          },
          {
              "poolName": "Kokoa Finance",
              "contractAddress": "0x7087d5a9e3203d39ec825d02d92f66ed3203b18a",
              "category": "노드 스테이킹",
              "investedKLAY": 2.000538028225084,
              "tvlKLAY": 14725997.58565309,
              "tvlKRW": 3361945248.8046007,
              "apr": 2.25,
              "liqToken": "KSD 토큰",
              "unStakingOption": [
                  "7일대기"
              ]
          },
          {
              "poolName": "Klaybank",
              "contractAddress": "0x6d219198816947d8bb4f88ba502a0518a7c516b1",
              "category": "빌려주기",
              "investedKLAY": 0,
              "tvlKLAY": 2582034.806,
              "tvlKRW": 589478546.2098,
              "apr": 1.47
          },
          {
              "poolName": "Swapscanner",
              "contractAddress": "0xf50782a24afcb26acb85d086cf892bfffb5731b5",
              "category": "노드 스테이킹",
              "investedKLAY": 2118.995511,
              "tvlKLAY": 73203690.37578553,
              "tvlKRW": 16712402512.791838,
              "apr": 6.242580760723835,
              "liqToken": "X",
              "unStakingOption": [
                  "스왑",
                  "7일대기"
              ]
          },
          {
              "poolName": "Klayswap",
              "contractAddress": "0xe4c3f5454a752bddda18ccd239bb1e00ca42d371",
              "category": "빌려주기",
              "investedKLAY": 0.000001982493746548,
              "tvlKLAY": 23934822.7031,
              "tvlKRW": 5464320023.11773,
              "apr": 1.52
          }
      ],
      "oUsdtProtocolCategory": [
          {
              "poolName": "Kleva",
              "contractAddress": "0xfaeec9b2623b66bbb3545ca24cfc32a8504fcf1b",
              "category": "빌려주기",
              "investedoUSDT": 0,
              "tvloUSDT": 5368863.204963,
              "tvlKRW": 7156694652.215678,
              "apr": 4.68
          },
          {
              "poolName": "BiFi",
              "contractAddress": "0xe0e67b991d6b5cf73d8a17a10c3de74616c1ec11",
              "category": "빌려주기",
              "investedoUSDT": 0,
              "tvloUSDT": 663136.6837579338,
              "tvlKRW": 883961199.4493257,
              "apr": 8.430395905861745
          },
          {
              "poolName": "Kokoa Finance",
              "contractAddress": "0xaee24956f6ccc58deac3c49ddb65a5c72d8bdd30",
              "category": "노드 스테이킹",
              "investedoUSDT": 0,
              "tvloUSDT": 132317.554466,
              "tvlKRW": 176379300.103178,
              "apr": 2.25,
              "liqToken": "KSD 토큰",
              "unStakingOption": [
                  "7일대기"
              ]
          },
          {
              "poolName": "Klaybank",
              "contractAddress": "0x4b6ece52d0ef60ae054f45c45d6ba4f7a0c2cc67",
              "category": "빌려주기",
              "investedoUSDT": 0,
              "tvloUSDT": 43366.519,
              "tvlKRW": 57807569.827,
              "apr": 22.42
          },
          {
              "poolName": "Klayswap",
              "contractAddress": "0x4b419986e15018e6dc1c9dab1fa4824d8e2e06b5",
              "category": "빌려주기",
              "investedoUSDT": 0,
              "tvloUSDT": 6724310.7941,
              "tvlKRW": 8963506288.5353,
              "apr": 2.56
          }
      ]
  }}

    assetList.data.klayProtocolCategory.sort(function(a,b){
      if(a.investedKLAY < b.investedKLAY) return 1;
      if(a.investedKLAY === b.investedKLAY) return 0;
      if(a.investedKLAY > b.investedKLAY) return -1;
    })

    assetList.data.oUsdtProtocolCategory.sort(function(a,b){
      if(a.investedoUSDT < b.investedoUSDT) return 1;
      if(a.investedoUSDT === b.investedoUSDT) return 0;
      if(a.investedoUSDT > b.investedoUSDT) return -1;
    })    

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
      <div>
        <div class="p-4">   
               

          <OverBox>
              {/* <div style={{paddingTop:"30px"}}/> */}
              <SubTemplateBlockVertical>                

                <Wrappertitle>
                    <Title>Lend
                    </Title>
                </Wrappertitle>
                
                <div style={{paddingTop:"20px"}}/>

                  {/* <div style={{marginTop:"20px"}}></div> */}

                  <div class="block p-6 bg-blue-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div style={{justifyContent:"space-between"}} class="flex flex-row mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">
                      <div>순자산</div>                      
                      <div>
                      {isloading ? 
                          <><ProductSkeleton width="80%" height="30px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <div style={{float:"right"}}> {Number(investedAsset.totalInvested).toLocaleString()} 원 </div>
                            :  
                            "-"
                        }
                      </div>
                    </div>

                    <hr />
                    
                    <div style={{justifyContent:"space-between"}} class="flex flex-row mt-2 text-1xl font-bold tracking-tight text-white dark:text-white">
                      <div>총 담보금</div>                      
                      <div>
                      {isloading ? 
                          <><ProductSkeleton width="80%" height="30px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <div style={{float:"right"}}> {Number(investedAsset.totalInvested).toLocaleString()} 원 </div>
                            :  
                            "-"
                        }
                      </div>
                    </div>

                    <div style={{justifyContent:"space-between"}} class="flex flex-row text-1xl font-bold tracking-tight text-white dark:text-white">
                      <div>총 대출액</div>                      
                      <div>
                      {isloading ? 
                          <><ProductSkeleton width="80%" height="30px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <div style={{float:"right"}}> {Number(investedAsset.totalInvested).toLocaleString()} 원 </div>
                            :  
                            "-"
                        }
                      </div>
                    </div>


                  </div>
                  <div style={{marginTop:"20px"}}></div>
                  <div className="border border-blue-200 rounded-lg p-6">
                  <h5 class="mb-2 text-1xl font-bold tracking-tight text-black dark:text-white">LTV 현황</h5>

                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-5 dark:bg-gray-700">

                        {isloading ? 
                            <>
                              <div class="bg-blue-400 h-2.5 rounded-full" style={{width:"0%"}}>
                                {/* <div class="bg-blue-600 h-2.5 rounded-full" style={{width:`${investedAsset.totalInvestCategory.klayStaking}%`}}> */}
                                {/* </div> */}
                              </div>
                            </> 
                            :
                            userAccount !== "" ?
                            <>  
                              <div class="bg-blue-400 h-2.5 rounded-full" style={{width:"100%"}}>
                                <div class="bg-blue-600 h-2.5 rounded-full" style={{width:`${investedAsset.totalInvestCategory.klayStaking}%`}}>
                                </div>
                              </div>
                            </>
                            :
                            <>
                            </>
                        } 

                        {
                        userAccount !== "" ?
                        <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white pt-2 gap-1">
                            <span class="pt-1 w-2.5 h-2.5 bg-blue-600 rounded-full mr-1.5"></span>
                            {isloading ? 
                            <><ProductSkeleton width="20%"/></> 
                            :
                            userAccount !== "" ?
                            <> Klay ({`${investedAsset.totalInvestCategory.klayStaking.toFixed(1)}`}%)</>
                            :
                            ""
                            }
                            
                            <span class="pt-1 w-2.5 h-2.5 bg-blue-400 rounded-full ml-1.5 mr-1.5"></span>
                            {isloading ? 
                            <><ProductSkeleton width="20%"/></> 
                            :
                            userAccount !== "" ?
                            <> oUSDT ({`${investedAsset.totalInvestCategory.ousdtStaking.toFixed(1)}`}%)</>
                            :
                            ""
                            }
                        </span>
                        :
                        <></>
                        }
                  </div>
                </div>

                <div style={{marginTop:"30px"}}></div>

                <div class="w-full bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-between mb-4">
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-black dark:text-white">Positions</h5>
                </div>
                <div class="flow-root">
                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700" style={{marginLeft:"15px"}}>
                        <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img class="w-8 h-8 rounded-full" src={icons["KLAY"]} alt=""/>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Klaybank (LTV : 75%)
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            lend : $ 21,000 (123 Klay)
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            borrow : $ 15,000 (123 Klay)
                                        </p>
                                    </div>
                                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                      관리하기
                                    </a>
                                </div>
                            </li>
                            
                        </ul>
                </div>
            </div>


            </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>
    </>
  );
}

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


const Dot = styled.div`
  height: 15px;
  width: 15px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
`

const ChartCover = styled.div`
  height: 40px;
  border: 2px solid white;
  border-radius: 10px;
  overflow: hidden;
  /* New code below: */
  display: grid;
  grid-template-columns: ${props=> props.a}fr ${props=> props.b}fr ${props=> props.c}fr;
  /* grid-template-columns: ${props=> props.a}fr ${props=> props.b}fr ${props=> props.c}fr; */
`

const AppleChart = styled.div`
  background: #111539;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
`

const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
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
    max-width: 500px;
    /* padding-bottom: 10px; */
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    /* padding:15px; */
    /* display:flex; */
    /* flex-direction:column; */

    /* padding: 20px 25px !important;
    background: #fff; */

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
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

const SubTemplateBlockSub = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    margin: 10px auto;
    width: 1136px;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:column;

    padding: 20px 25px !important;

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    border: 0.1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;





export default Invest;

