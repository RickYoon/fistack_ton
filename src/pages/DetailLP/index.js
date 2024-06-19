import 'App.css'; 
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import TonWeb from "tonweb";

import { DEX, pTON } from "@ston-fi/sdk";
// import { StonApiClient } from '@ston-fi/api';


let iconUrl = {
  "TON" : "https://ton.org/download/ton_symbol.png",
  "USDT" : "https://static-00.iconduck.com/assets.00/tether-cryptocurrency-icon-2048x2048-dp13oydi.png"
}

function DetailStaking() {


  const { id } = useParams();
  const [balance, setBalance] = useState({
    "walletUSDT": 0,
    "walletTON": 0,
    "investedUSDT": 0,
    "investedTON":0
  })

  const [afterSwap, setAfterSwap] = useState({
    "USDT": 0,
    "TON": 0
  })


  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [depositmodal, setDepositmodal]= useState(false)
  const [amount, setAmount]= useState()
  const [maxAmount, setMaxAmount]= useState(0)
  const [selection, setSelection] = useState("deposit")
  const [depositAmount, setDepositAmount] = useState(NaN)
  const [withdrawalAmount, setWithdrawalAmount] = useState(NaN)

  const wallet = useTonAddress();

  const [deltaAmount, setDeltaAmount] = useState(0);
  const [longAmount, setLongAmount] = useState(0);
  const [shortAmount, setShortAmount] = useState(0);

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

    setLongAmount(deltaAmount/7.2*(2/3))
    setShortAmount(shortAmount/3/7)

  }, [deltaAmount])

  useEffect(()=>{

    updateRatio()

  }, [depositAmount])

  async function updateRatio(){

    if(depositAmount>0){

      // const client = new StonApiClient();

      // const simulateReture = await client.simulateSwap({
      //   "askAddress":"EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",
      //   "offerAddress":"EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
      //   "offerUnits": ((depositAmount/2)*1e+6).toString(),
      //   "slippageTolerance":"0.01",
      //   "referralAddress": "UQCeHendv97uqK8bU0I2xiRPVuWFMiHviEZKIwJUMl_CKLbd"
      // })

      // let tempRes = {
      //   "USDT": 0,
      //   "TON": 0
      // }

      // tempRes["USDT"] = depositAmount / 2;
      // tempRes["TON"] = simulateReture.askUnits/(1e+9);

      // setAfterSwap(tempRes)

      // console.log("simulateReture",(simulateReture.askUnits/(1e+9)))

      // const [afterSwap, setAfterSwap] = useState({
      //   "USDT": 0,
      //   "TON": 0
      // })

    } else {

      let tempRes = {
        "USDT": 0,
        "TON": 0
      }

      setAfterSwap(tempRes)

    }


    // const [afterSwap, setAfterSwap] = useState({
    //   "USDT": 0,
    //   "TON": 0
    // })

    // get list of all DEX assets
    // const swapDirectSimulation = await client.simulateSwap({"offer_address":"EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs","offer_units":"100000000000","ask_address":"EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c","slippage_tolerance":"0.01"});

    // console.log("assets : ", swapDirectSimulation)

  }


  useEffect(() => {

    callPool()
    updateBalance()

  }, [])

  useEffect(() => {

    callPool()
    updateBalance()

  }, [wallet])

  async function callPool(){

    const assetList = await axios.get(`https://nyzomcdsf8.execute-api.ap-northeast-2.amazonaws.com/production/fistackPool`)
    // console.log("assetList",assetList)

  }

  async function updateBalance(){

    if(wallet===""){

    } else {

      const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: '8c4c5ef79ae30a1657c4f3315dd1339b36868c1f4ec7bb39ddaa6af02a6d7218'}));
      const balance = await tonweb.getBalance(wallet);

      const apiRes = await axios.get(`https://tonapi.io/v2/accounts/${wallet}/jettons/0%3Ab113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe?currencies=usd`)
      const usdtBalance = Number(apiRes.data.balance)/1e+6  
      
      let tempBalance = {
        "walletUSDT": usdtBalance.toFixed(2),
        "walletTON": balance/1e+9,
        "investedUSDT": 0,
        "investedTON":0
      }

      setBalance(tempBalance)

      // console.log("balance",balance/1e+9)
    }


  }


  const goProtocol = () => {
    const stakingUrl = poolInfos[id].linkUrl;
    window.open(stakingUrl, '_blank');
  }
  
  const Backbutton = () => {
    const navigate = useNavigate();
    const onClickBtn = () => {
      navigate(-1);
    };
    return (
      <button onClick={onClickBtn} class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Back to List
      </button>
    )
  }

  function formatNumber(number) {

    const formattedNumber = Number(number).toFixed(2);
    const numberWithCommas = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return numberWithCommas;

  }

  const selectionDeposit = () => {
    setSelection("deposit")
  }

  const selectionWithdrawler = () => {
    setSelection("withdrawal")
  }

  const maxDepositHandler = () => {
    // setDepositAmount(detailAsset.availableToken)
  }

  const maxWithdrawerHandler = () => {
    // setWithdrawalAmount(detailAsset.investedToken)
  }

  async function sendTon(){

    await tonConnectUI.sendTransaction({
      validUntil: Date.now() + 1000000,
      messages: [
        {
            address: "UQCeHendv97uqK8bU0I2xiRPVuWFMiHviEZKIwJUMl_CKLbd",
            amount: "20000000" 
        }
      ],
    });

  }

  async function swapTrx(){

    const dex = new DEX.v1.Router({
      tonApiClient: new TonWeb.HttpProvider(),
    });
    
    const swapTxParams = await dex.buildSwapTonToJettonTxParams({
      offerAmount: TonWeb.utils.toNano('1'), // swap 1 TON
      askJettonAddress: 'EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO', // for a STON
      minAskAmount: TonWeb.utils.toNano('0.1'), // but not less than 0.1 STON
      proxyTonAddress: pTON.v1.address.toString(),
      userWalletAddress: wallet
    });

    await tonConnectUI.sendTransaction({
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: swapTxParams.to.toString(),
          amount: swapTxParams.gasAmount.toString(),
          payload: TonWeb.utils.bytesToBase64(
            await swapTxParams.payload.toBoc(),
          ),
        },
      ],
    });

  }

  // const [tonConnectUI, setOptions] = useTonConnectUI();
  // const wallet = useTonAddress();
  // const dex = new DEX.v1.Router({
  //   tonApiClient: new TonWeb.HttpProvider(),
  // });



  return (
    <>
      <div class="p-4 bg-gray-100">
        <OverBox>
          <SubTemplateBlockVertical>
            <ManageTitle>
              <Title> LP Farming
                <h3 class="text-base font-semibold leading-7 text-gray-900"></h3>
              </Title>
              <Backbutton class="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-100 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
            </ManageTitle> 
                
            <div>
              <div className="border border-gray-100 rounded-lg pt-6 pb-6 bg-white mt-10">
                <div className="flex justify-evenly">
                  <div className="flex">
                    <div className="relative">
                      <div className="relative mr-1.5 rounded-full bg-white">
                        <div className="w-10 h-10 rounded-full" style={{ borderColor: 'rgb(204, 204, 204)' }}>
                        <img src={iconUrl[poolInfos[0].poolToken[0]]} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                        </div>
                      </div>
                    </div>
                    <div className="relative mr-1.5 rounded-full bg-white">
                      <div className="w-10 h-10 rounded-full" style={{ borderColor: 'rgb(204, 204, 204)' }}>
                      <img src={iconUrl[poolInfos[0].poolToken[1]]} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
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
              <div className="text-base text-neutral-800">
                {poolInfos[0].apr.toFixed(2)}%
              </div>

            </div>                  

        </div>

            <div style={{marginTop:"10px"}}></div>
              <div class="sm:px-0">        
              <div className="border border-gray-100 rounded-lg p-6 bg-white">
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <p className="font-semibold col-span-1">Wallet</p>
                  <p className="font-neutral col-span-1">{balance.walletUSDT} USDT</p>
                  <p className="text-neutral-600 col-span-1">{balance.walletTON.toFixed(2)} TON</p>
                  {/* <p className="font-semibold col-span-1">Invested</p>
                  <p className="font-neutral col-span-1">{balance.investedUSDT} USDT</p>
                  <p className="text-neutral-600 col-span-1">{balance.investedTON} TON</p> */}
                </div>              

              </div> 

              <div style={{marginTop:"20px"}}></div>
              <div className="border border-gray-100 rounded-lg p-5" style={{"backgroundColor":"white"}}>

              <ul class="mb-5 text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-gray-200 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
                  <li class="w-full">
                      <a href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                        LP Provide
                      </a>
                  </li>
                  <li class="w-full">
                      <a href="#" class="inline-block w-full p-2 bg-white rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                        Lp Farming
                      </a>
                  </li>
              </ul>

              <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  </div>
                  <input placeholder="USDT" type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                  {/* <button onClick={maxDepositHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button> */}
              </div>
             
              <div className="border border-gray-200 rounded-lg pr-5 pb-5 mt-5 bg-gray-100">
                <div className="grid grid-cols-3 gap-3 text-center text-sm pt-5">
                 <p className="font-semibold col-span-1">After Swap</p>
                  <p className="font-neutral col-span-1">{afterSwap.USDT} USDT</p>
                  <p className="text-neutral-600 col-span-1">{afterSwap.TON.toFixed(2)} TON</p>
                </div>   
              </div>
             
              <div className="pt-1">


          <div style={{marginTop:"20px"}}></div>
            <div style={{textAlign:"right"}}>
              <div style={{marginTop:"30px"}}></div>
                
                {wallet === "" ?
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Connect Wallet
                      </span>
                    </button>
                    :
                    <button class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-500 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    variant="solid"
                    color="slate"
                    onClick={() => setDepositmodal(true)}>
                          Confirm
                  </button>
                  }
              </div>
            </div>
          </div>
          </div>

          <div style={{marginTop:"30px"}}></div>
          <div class="pt-6"></div>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg mx-auto">
            <h2 className="text-xl font-bold text-center mb-4">How Does it Work?</h2>
            <p className="text-base mb-2">
            Deposit into the <span className="font-bold">USDT Lending Earn Strategy</span>, you will be investing your <span className="font-bold">USDT</span> into a <span className="font-bold">EVAA Lending Contract</span>.
            </p>
            <p className="text-base mb-2">
              EVAA pays to deposits in the <span className="font-bold">USDT Supply Rate</span> the shown APY continuously on every block. You can deposit as much as you want and withdraw at any moment. There are no lock-ups and no fees for using.
            </p>
          </div>
            </SubTemplateBlockVertical>
          </OverBox>
        </div>
    
      {depositmodal ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                       Provide Liquidity
                    </h3>
                    <button onClick={() => setDepositmodal(false)}>
                        <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    
                    <div class="p-6">
                    
                    {/* <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Insert Deposit Amount</p> */}
                        <ul class="my-4 space-y-3">
                            <li>
                                <div class="flex items-center p-3 text-base font-medium text-gray-900 rounded-lg bg-gray-50">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                  Swap {afterSwap.USDT} USDT to {afterSwap.TON} TON                                  
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center p-3 text-base font-medium text-gray-900 rounded-lg bg-gray-50">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>

                                  Provide Liquidity                                  
                                </div>
                            </li>
                        </ul>
                    <div class="mt-3"></div>

                        {/* <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">0x123...</label> */}

                        <div class="mt-10"></div>
                        <button onClick={swapTrx} class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-500 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <div style={{textAlign:"center"}}>Execution</div>
                        </button>                    
                        
                    </div>
                    
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}


    </>
  );
}

const DeltaNeutralStrategy = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Delta Neutral Position Strategy</h2>
      <p className="text-base mb-2">
        Taking advantage of funding fee opportunities in <span className="font-bold">TON</span> <br/>
      </p>
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
        <ol className="list-decimal list-inside">
          <li className="mb-2">
            Converting your <span className="font-bold">USDT</span> to <span className="font-bold">TON</span> on <span className="font-bold">Ston.fi DEX.</span> 
            (This means Long Position).
          </li>
          <li className="mb-2">
            Simultaneously, shorting an equivalent amount of <span className="font-bold">TON</span> on <span className="font-bold">Storm Trade PerpDEX</span> using <span className="font-bold">USDT</span>.
          </li>
        </ol>
      </div>
      <p className="text-base mb-2">
        When the funding fee for TON Coin is positive on Storm Trade PerpDEX, this strategy allows you to profit from the funding fees while maintaining a delta-neutral position. 
        You can invest as much as you want and withdraw at any moment. There are no lock-ups and no fees for using this strategy.
      </p>
    </div>
  );
};

const OverBox = styled.div`

  position: relative;
  margin: 0px auto; 
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  overflow: auto;
  padding: 30px;

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
    margin: 0px auto;
    width: 460px;
    /* padding-bottom: 10px; */
    position: relative; 
    /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
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

const Th = styled.th`
  height:25px;
  vertical-align:middle;
  padding-left:5px;
  @media screen and (max-width: 500px){
    max-width: 150px;
  }

`;

const ManageTitle = styled.div`
  width: 460px;
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
  font-size: 25px;
`



export default DetailStaking;

