import 'App.css'; 
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";

import WalletManageBox from "./components/WalletManageBox"

import poolInfos from "./poolInfos.json"
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import TonWeb from "tonweb";
import { DEX, pTON } from "@ston-fi/sdk";

function DetailStaking() {

  const { id } = useParams();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const wallet = useTonAddress();

  const [depositmodal, setDepositmodal]= useState(false)
  const [amount, setAmount]= useState()
  const [maxAmount, setMaxAmount]= useState(0)
  const [selection, setSelection] = useState("deposit")
  const [depositAmount, setDepositAmount] = useState(NaN)
  const [withdrawalAmount, setWithdrawalAmount] = useState(NaN)


  const [deltaAmount, setDeltaAmount] = useState(0);
  const [longAmount, setLongAmount] = useState(0);
  const [shortAmount, setShortAmount] = useState(0);

  useEffect(() => {

    setLongAmount(deltaAmount/7.2*(2/3))
    setShortAmount(shortAmount/3/7)

  }, [deltaAmount])

  

  const [detailAsset, setDetailAsset] = useState({
    "poolName": "",
    "category": "",
    "contractAddress": "",
    // "TokenName": 0,
    "investedToken": 0,
    "availableToken": 0,
    "tvlToken": 0,
    "tvlKRW": 0,
    "apr": 0
  })

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

  // const [tonConnectUI, setOptions] = useTonConnectUI();
  // const wallet = useTonAddress();
  // const dex = new DEX.v1.Router({
  //   tonApiClient: new TonWeb.HttpProvider(),
  // });

  // const transaction = {
  //   messages: [
  //       {
  //           address: "UQAKq9dHl32kk_fkErFTdsaHzkuJxXRkMVViP5BRmvgib3Cj",
  //           amount: "20000000" 
  //       }
  //   ]
  // }


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

  async function swapTrx(){

    const dex = new DEX.v1.Router({
      tonApiClient: new TonWeb.HttpProvider(),
    });
    
    const swapTxParams = await dex.buildSwapTonToJettonTxParams({
      offerAmount: TonWeb.utils.toNano('1'), // swap 1 TON
      askJettonAddress: 'EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO', // for a STON
      minAskAmount: TonWeb.utils.toNano('0.1'), // but not less than 0.1 STON
      proxyTonAddress: pTON.v1.address.toString(),
      userWalletAddress: wallet,
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

  

  return (
    <>
    {id === "0xae78736Cd615f374D3085123A210448E74Fc6393" ?
        <div class="bg-gray-50 h-screen">
        <div class="p-4">
        <div>
        <div class="p-4">
          <OverBox>
          <SubTemplateBlockVertical>
          <ManageTitle>
            <Title> Earn
              <h3 class="text-base font-semibold leading-7 text-gray-900"></h3>
            </Title>
            <Backbutton class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
          </ManageTitle> 
                
            <div>
            <div style={{marginTop:"20px"}}></div>
              <div class="sm:px-0">        
              <div className="border border-gray-100 rounded-lg p-6 bg-white">
                <button className="flex flex-col">
                  <button className="flex flex-col">
                    <div className="flex items-center">
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
                          <p className="text-base text-neutral-800">22.61%</p>
                        </div>
                        <div className="flex text-sm mx-4">
                          EEVA
                        </div>
                      </div>  
                    </div>                  
                  </button>

            <div className="mt-2">
            <div className="flex flex-col gap-2 w-full pt-3">
              <div className="grid grid-cols-[1fr_3fr] gap-3">
                <p className="font-semibold">Balance</p>
                <p className="text-neutral-600 text-left">98.1 USDT</p>
              </div>              
              <div className="grid grid-cols-[1fr_3fr] gap-3">
                <p className="font-semibold">Invested</p>
                <p className="text-neutral-600 text-left">0 USDT</p>
              </div>              
            </div>
            </div>

          </button>
        </div>      
              <div style={{marginTop:"20px"}}></div>
              <div className="border border-gray-100 rounded-lg p-5" style={{"backgroundColor":"white"}}>
              <div style={{marginTop:"10px"}}></div>

              {true ? 

              <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-gray-200 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
                  <li class="w-full">
                      <a href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                        deposit
                      </a>
                  </li>
                  <li class="w-full">
                      <a href="#" class="inline-block w-full p-2 bg-white rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                        withdrawal
                      </a>
                  </li>
              </ul>
              :
              <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-gray-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
              <li class="w-full">
                  <a  href="#" class="inline-block w-full p-2 text-gray bg-white rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                   deposit
                  </a>
              </li>
              <li class="w-full">
                  <a href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                  withdrawal
                  </a>
              </li>
              </ul>
              }

          <div style={{marginTop:"20px"}}></div>
              <div className="pt-1">
              <div style={{marginTop:"10px"}}></div>
              <div class="items-center">   
                                
                  <div class="relative w-full">
                      {selection === "deposit" ? 
                      <>
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            </div>
                            <input type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${detailAsset.availableToken}`} required  />
                            <button onClick={maxDepositHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
                        </div>
                      </>
                      :
                      <>
                        <div class="relative">
                          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          </div>
                          <input type="number" value={withdrawalAmount} onChange={e => setWithdrawalAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${detailAsset.investedToken}`} required />
                            <button onClick={maxWithdrawerHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
                          </div>
                      </>
                    }
                  </div>              
              </div>

          <div style={{marginTop:"20px"}}></div>
            <div style={{textAlign:"right"}}>
              <div style={{marginTop:"30px"}}></div>
                
                {true === "" ?
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Connect Wallet
                      </span>
                    </button>
                    :
                    true ?
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Submit
                      </span>
                    </button>
                    :
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Submit
                      </span>
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
      </div>
          
        </div>
      </div>
      :
      <div class="bg-gray-50 h-screen">
        <div class="p-4">
        <div>
        <div class="p-4">
          <OverBox>
          <SubTemplateBlockVertical>
          <ManageTitle>
            <Title> Earn
              <h3 class="text-base font-semibold leading-7 text-gray-900"></h3>
            </Title>
            <Backbutton class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
          </ManageTitle> 
                
            <div>
            <div style={{marginTop:"20px"}}></div>
              <div class="sm:px-0">        
              <div className="border border-gray-100 rounded-lg p-4 bg-white">
                <button className="flex flex-col">
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

                    <div className="mt-2">
                      <div className="flex flex-col gap-2 w-full pt-3">
                        <div className="grid grid-cols-[1fr_3fr] gap-3">
                          <p className="font-semibold text-center">Balance</p>
                          <p className="text-neutral-600 text-left">98.1 USDT</p>
                        </div>
                      </div>
                    </div>

                  </button>
                </div>   

                <div className="border border-gray-100 rounded-lg p-4 bg-white mt-5">

              
              <div class="items-center">   
                                
                  <div class="relative w-full">
                  <div class="pb-5">Investment Amount</div>              
                      
                      {selection === "deposit" ? 
                      <>
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            </div>
                            <input type="number" value={deltaAmount} onChange={e => setDeltaAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${detailAsset.availableToken}`} required  />
                            <button onClick={maxDepositHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
                        </div>
                      </>
                      :
                      <>
                        <div class="relative">
                          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          </div>
                          <input type="number" value={withdrawalAmount} onChange={e => setWithdrawalAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${detailAsset.investedToken}`} required />
                            <button onClick={maxWithdrawerHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
                          </div>
                      </>
                    }
                  </div>              
              </div>

            </div>
                
                   
              <div style={{marginTop:"20px"}}></div>
              <div className="border border-gray-100 rounded-lg p-5" style={{"backgroundColor":"white"}}>
              <div style={{marginTop:"10px"}}></div>

              <div>Long Position (Staking APR : 3%) </div>              

          <div style={{marginTop:"20px"}}></div>
              <div className="pt-1">
              <div style={{marginTop:"10px"}}></div>
              <div class="items-center">   
                                
                  <div class="relative w-full">
                      {selection === "deposit" ? 
                      <>
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            </div>
                            Swap {deltaAmount*(2/3)} USDT to {longAmount.toFixed(2)} TON
                        </div>
                      </>
                      :
                      <>
                        <div class="relative">
                          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          </div>
                          <input type="number" value={withdrawalAmount} onChange={e => setWithdrawalAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${detailAsset.investedToken}`} required />
                            {/* <button onClick={maxWithdrawerHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button> */}
                          </div>
                      </>
                    }
                  </div>              
              </div>

          <div style={{marginTop:"20px"}}></div>
            <div style={{textAlign:"right"}}>
              <div style={{marginTop:"30px"}}></div>
                
                {true === "" ?
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Connect Wallet
                      </span>
                    </button>
                    :
                    true ?
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Confirm
                      </span>
                    </button>
                    :
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Submit
                      </span>
                    </button>
                  }
              </div>
            </div>
          </div>

          <div className="border border-gray-100 rounded-lg p-5 mt-3" style={{"backgroundColor":"white"}}>
              <div style={{marginTop:"10px"}}></div>

              <div>2x Short Position (Funding Apr : 38%)</div>              

          <div style={{marginTop:"20px"}}></div>
              <div className="pt-1">
              <div style={{marginTop:"10px"}}></div>
              <div class="items-center">   
                                
                  <div class="relative w-full">
                      {selection === "deposit" ? 
                      <>
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            </div>  
                            Short {longAmount.toFixed(2)} Ton with {deltaAmount*(1/3)} USDT
                        </div>
                      </>
                      :
                      <>
                        <div class="relative">
                          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          </div>
                          <input type="number" value={withdrawalAmount} onChange={e => setWithdrawalAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${detailAsset.investedToken}`} required />
                            {/* <button onClick={maxWithdrawerHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button> */}
                          </div>
                      </>
                    }
                  </div>              
              </div>

          <div style={{marginTop:"20px"}}></div>
            <div style={{textAlign:"right"}}>
              <div style={{marginTop:"30px"}}></div>
                
                {true === "" ?
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Connect Wallet
                      </span>
                    </button>
                    :
                    true ?
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                      Confirm
                      </span>
                    </button>
                    :
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Submit
                      </span>
                    </button>
                  }
              </div>
            </div>
          </div>
          </div>

          <div style={{marginTop:"30px"}}></div>
          <div class="pt-6"></div>
          </div>
          <DeltaNeutralStrategy />
            </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>
          
        </div>
      </div>
      }


      {depositmodal ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                       Deposit
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
                                <a href="#" class="flex items-center p-3 text-base font-medium text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                  USDT Balance : 
                                  <span class="flex-1 ml-3 whitespace-nowrap" >{maxAmount}</span>
                                </a>
                            </li>
                        </ul>
                    <div class="mt-3"></div>

                        {/* <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">0x123...</label> */}
                        <div class="relative">
                            {/* <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div> */}
                            <input onChange={(e)=>setAmount(e.target.value)} value={amount} type="search" id="search" class="block w-full p-4 text-xm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Insert Deposit Number" />
                            <button onClick={()=>setAmount(maxAmount)} class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
                        </div>

                        <div class="mt-10"></div>
                        <button onClick={swapTrx} class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-500 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <div style={{textAlign:"center"}}>Execution</div>
                        </button>                    
                        {/* <button class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-500 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                          variant="solid"
                          color="slate"
                          onClick={() => tonConnectUI.sendTransaction(transaction)}>
                                Send transaction
                        </button>                         */}
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

