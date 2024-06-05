import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import icons from "assets/tokenIcons"
import React, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import axios from 'axios';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import WalletManageBox from './components/WalletManageBox'
import WalletBalance from './components/WalletBalance'
import WalletHistory from './components/WalletHistory'
import TotalBalanceBox from './components/TotalBalanceBox'
import PositionList from './components/PositionList'

import 'App.css'; 
import './index.css';

function Portfolio() {

  const [isloading, setIsloading] = useState(false)

  const [userBalance, setUserBalance] = useState({
    "klayTotalBalance": 0,
    "klayTokenList": [
        {
            "tokenSymbol": "KLAY",
            "tokenPrice": 0,
            "tokenAmount": 0,
            "tokenValue": 0
        }
    ],
    "klayWalletHistory":[
      {
        "type": "stake",
        "date": "2023-11-29",
        "time": "11:22",
        "send": {
            "tokenAmount": "1.000",
            "toAddr": "0xf80f2b22932fcec6189b9153aa18662b15cc9c00",
            "tokenName": "KLAY"
        },
        "receive": {
            "tokenAmount": "1.000",
            "fromAddr": "0x0000000000000000000000000000000000000000",
            "tokenName": "stKLAY"
        },
        "interaction": {
            "type": "application",
            "detail": "stakely"
        }
    }],
    "klayProtocolPosition": [{
      type: 'lending',
      protocol: 'klaybank',
      totalStats: {
        totalCollateralUSD: 0,
        totalDebtUSD: 0,
        netValue: 0,
        netApr:0
      },
      detailStats: {
        CollateralList: [{"tokenName":"KLAY","tokenAmount":0,"tokenPrice":0,"tokenValue": 0}],
        DebtList: [{"tokenName":"oUSDT","tokenAmount":0,"tokenPrice":0,"tokenValue":0}],
        healthRate: 0
      },
      klaySupplyApr : 0,
      ousdtDebtApr : 0,
      poolAddress: ''
    }],
    "klayStakingPosition": {
      type: "staking",
      totalSupplyToken : 0,
      totalSupplyValue : 0,
      netApr: 0,
      dailyIncome :0
    }
})


const userAccount = useSelector(state => state.account) // 지갑주소

useEffect(() => {

  updateStatus()
  
}, [userAccount])



async function updateStatus () {

  setIsloading(true)

  if(userAccount === ""){

    setUserBalance({
      "klayTotalBalance": 0,
      "klayTokenList": [
          {
              "tokenSymbol": "KLAY",
              "tokenPrice": 0,
              "tokenAmount": 0,
              "tokenValue": 0
          }
      ],
      "klayWalletHistory":[
        {
          "type": "",
          "date": "",
          "time": "",
          "send": {
              "tokenAmount": "",
              "toAddr": "",
              "tokenName": ""
          },
          "receive": {
              "tokenAmount": "",
              "fromAddr": "",
              "tokenName": ""
          },
          "interaction": {
              "type": "",
              "detail": ""
          }
      }],
      "klayProtocolPosition": [{
        type: 'lending',
        protocol: 'klaybank',
        totalStats: {
          totalCollateralUSD: 0,
          totalDebtUSD: 0,
          netValue: 0,
          netApr:0
        },
        detailStats: {
          CollateralList: [{"tokenName":"KLAY","tokenAmount":0,"tokenPrice":0,"tokenValue": 0}],
          DebtList: [{"tokenName":"oUSDT","tokenAmount":0,"tokenPrice":0,"tokenValue":0}],
          healthRate: 0
        },
        klaySupplyApr : 0,
        ousdtDebtApr : 0,
        poolAddress: ''
      }],
      "klayStakingPosition": {
        type: "staking",
        totalSupplyToken : 0,
        totalSupplyValue : 0,
        netApr: 0,
        dailyIncome :0
      }
  })

  } else {
      const assetList = await axios.post(`https://vsgawlk38f.execute-api.ap-northeast-2.amazonaws.com/deploy/portfolio`,{
        type : "single",
        walletName : "kaikas",
        address : userAccount
      })

      let response = assetList.data.body
      const balanceList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/investInfo?userAddr=${userAccount}`)
      console.log("balanceList",balanceList)

      response["klayStakingPosition"] = {
        type: "staking",
        totalSupplyToken :  formatNumber(balanceList.data.klayInvestedinKlay),
        totalSupplyValue : formatNumber(balanceList.data.klayInvestedinKRW/1300),
        netApr: formatNumber(balanceList.data.KlayTotalApr),
        dailyIncome : balanceList.data.klayDailyIncomeKlay.toFixed(4)
      }

      setUserBalance(response)          

      }

    setIsloading(false)
}

function formatNumber(number) {

  const formattedNumber = Number(number).toFixed(2);
  const numberWithCommas = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return numberWithCommas;
}

  return (
    <>
    <ContentBox class="">
      <div class="bg-gray-50 h-full">
        <div class="p-4">   
          <OverBox class="bg-gradient-to-r from-green-100 to-blue-200" >
            <SubTemplateBlockVertical>     

              <Wrappertitle >
                  <Title>Portfolio</Title>               
              </Wrappertitle>

              {/* <WalletManageBox /> */}

              <TotalBalanceBox data={formatNumber(userBalance.klayTotalBalance)}/>

              <Tabs class="pt-5">

                <TabList>
                  <Tab>Positions</Tab>
                  <Tab>Wallet</Tab>
                  <Tab>History</Tab>
                </TabList>

                <TabPanels>

                  <TabPanel> 
                    <PositionList lendData={userBalance.klayProtocolPosition} klayData={userBalance.klayStakingPosition} isloading={isloading}/>           
                  </TabPanel>

                  <TabPanel>
                    <WalletBalance data={userBalance.klayTokenList}/>
                  </TabPanel>

                  <TabPanel>
                    <WalletHistory data={userBalance.klayWalletHistory}/>
                  </TabPanel>
                  
                </TabPanels>

              </Tabs>
           </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>
      </ContentBox>
    </>
  );
}


const ContentBox = styled.div`
  /* height: ;
  min-height: 100vh; */
  /* padding-bottom: 50px;  */
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

`

const SubTemplateBlockVertical = styled.div`
    margin: 10px auto;
    max-width: 800px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    
  @media screen and (max-width: 500px){
      width: 100%;
      font-size: 12px;
    }
`;


export default Portfolio;

