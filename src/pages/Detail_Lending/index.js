import axios from 'axios';
import react, {useState, useEffect} from "react";
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import WalletManageBox from "./Components_UI/WalletManageBox"
import PositionList from './ManualComponent/PositionList';
import AutoWalletManage from './AutoComponent/AutoWalletManage';
import { useParams, useNavigate } from "react-router-dom";
// import metamaskDepositExecutor from './metamaskExecutor.js';
// import poolInfos from "./poolInfos.json"

function DetailLending() {

  // 클릭을 할때, lending / klaybank 로 이동하게 만든다.
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState(0)

  const [userPosition, setUserPosition] = useState({
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
  })


  const userAccount = useSelector(state => state.account) // 지갑주소

  useEffect(() => {

    // console.log("id",id)
    if(tabIndex ===0){

      updateStatus()
    
    }
    // updateAutoStatus()
  
  }, [userAccount, tabIndex])



  async function updateStatus () {

    if(userAccount === ""){

      setUserPosition({
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
      })

    } else {
        // console.log("klaybankResponse", )
        const assetList = await axios.post(`https://vsgawlk38f.execute-api.ap-northeast-2.amazonaws.com/deploy/protocolPortfolio`,{
          "address" : userAccount,
          "protocolId" : "klay_klaybank"
        })
        // console.log("assetList",)

        // console.log(assetList.data.body)
        if(assetList.data.body === null || assetList.data.body === undefined){
          setUserPosition({
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
          })
        }
        
        else {

          // console.log(assetList.data.body)
          setUserPosition(assetList.data.body)          
        
        }       
    }
  }








  // 이 페이지에서는 klaybank 라는 것을 URL 을 통해서 알아낸다. 
  // 유저의 klaybank 에 필요한 데이터를 호출해서 가져온다.
  // 그냥과 Active 주소가 있도록 하자.

  let trxReturn = {}
  // const userAccount = useSelector(state => state.account) // 지갑주소
  


  async function executeDeposit() {

    try {

      const aa = await axios.get("https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/activeWallet?userAddr=0x177f4b180657264C78ce2D3B7B48c460a323F753")      
      console.log("aa",aa)

    } catch (error) {

      console.log("error",error.response.data.message)

    }

  }


  return (
    <>
      <div class="bg-gray-50 h-screen">
        <div class="p-4">
          <OverBox>
              <SubTemplateBlockVertical>
              <WalletManageBox />
              <div>
              <Tabs class="pt-5" onChange={(index) => setTabIndex(index)} >
                
              <TabList>
                <Tab>Manual</Tab>
                <Tab>Automate</Tab>
              </TabList>

              <TabPanels>
                <TabPanel> 
                <div style={{height:"15px"}} />
                  <PositionList data={userPosition}/>
                </TabPanel>
                
                <TabPanel>
                    <div style={{height:"15px"}} />
                    <AutoWalletManage index={tabIndex}/>
                </TabPanel>
                
              </TabPanels>

              </Tabs>
              </div>
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

  @media screen and (max-width: 950px){
    width: calc(100%);
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 10px;
  }
`



const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
     margin: 10px auto;
    max-width: 800px;
    /* padding-bottom: 10px; */
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    /* padding:15px; */
    /* display:flex; */
    /* flex-direction:column; */

    /* padding: 20px 25px !important;
    background: #fff; */

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    /* background-color: rgb(255, 255, 255); */
    /* background-clip: border-box; */
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

export default DetailLending;

