import 'App.css'; 
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";

import { 
  walletConnectModalOpen} from 'redux/reducers/WalletActions'

import {kaikasKlayDepositExecutor} from "./kaikasExecutor"
import {metamaskDepositExecutor} from './metamaskExecutor.js';

import WalletManageBox from "./components/WalletManageBox"

import poolInfos from "./poolInfos.json"


function DetailStaking() {

  const { id } = useParams();
  const dispatch = useDispatch();

  const [depositmodal, setDepositmodal]= useState(false)
  const [amount, setAmount]= useState()
  const [maxAmount, setMaxAmount]= useState(0)

  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false)
  const [detailData, setDetailData] = useState({
    "poolName": "Swapscanner",
    "category": "노드 스테이킹",
    "contractAddress": "0xf50782a24afcb26acb85d086cf892bfffb5731b5",
    "investedToken": 0,
    "investedUSD": 0,
    "availableToken": 0,
    "tvlToken": 0,
    "tvlUSD": 0,
    "tvlKRW": 0,
    "apr": 0
})


// 월렛연결 모달 열기
const openModal = () => {
    dispatch(walletConnectModalOpen())
}

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더
  const walletConnectModal = useSelector(state => state.walletConnect) // 지갑 연결 모달 상태
  
  useEffect(() => {

    updateAsset()


  }, [userAccount])

  useEffect(() => {

    updateAsset()


  }, [])

  async function updateAsset () {


    if(userAccount === ""){

      const assetList = await axios.get(`https://nyzomcdsf8.execute-api.ap-northeast-2.amazonaws.com/production/linkryptopoolinfos`)
      console.log("assetList",assetList.data.body.klayStakingPool)

      setDetailData({
        "poolName": poolInfos[id].poolName,
        "category": poolInfos[id].poolType,
        "investedToken": 0,
        "investedUSD":0,
        "availableToken": 0,
        "tvlToken": assetList.data.body.klayStakingPool[poolInfos[id].poolName].klayAmount,
        "tvlUSD": assetList.data.body.klayStakingPool[poolInfos[id].poolName].klayTVL,
        "tvlKRW": 0,
        "apr": 0
    })

    } else {

      const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/managePool?userAddr=${userAccount}&contractAddress=${id}`)
      console.log("assetList",assetList.data)
      setDetailData(assetList.data)
      setMaxAmount(assetList.data.availableToken)

    }


  }

  async function depositExecute() {

    if(walletProvider==="kaikas"){
      await kaikasKlayDepositExecutor(userAccount,id,amount)
    } else {
      await metamaskDepositExecutor(userAccount,id,amount)
    }

    // console.log("trxReturn", trxReturn)
    const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/managePool?userAddr=${userAccount}&contractAddress=${id}`)
    console.log("assetList",assetList.data)
    setDetailData(assetList.data)
    setMaxAmount(assetList.data.availableToken)
    setDepositmodal(false)

    
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
      돌아가기
      </button>
    )
  }

  function formatNumber(number) {

    const formattedNumber = Number(number).toFixed(2);
    const numberWithCommas = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return numberWithCommas;

  }
  

  return (
    <>
      <div class="bg-gray-50 h-screen">
        <div class="p-4">
          <OverBox>
              <SubTemplateBlockVertical>
              <WalletManageBox title={poolInfos[id].poolName}/>
              <div>
              <div class="bg-white p-3 border border-gray-100 rounded-lg mb-5">

              <table class="w-full">
            <thead class="">
            </thead>
                <tbody class="bg-white">
                    <tr>
                    <td className="pl-5">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Staking Amount</div>
                                </p>
                                {formatNumber(detailData.investedToken)}
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
                                $ {formatNumber(detailData.investedUSD)}
                                {/* $ {positionData.totalStats.totalDebtUSD.toFixed(2)} */}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>
                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>APR</div>
                                </p>
                                {formatNumber(detailData.apr)} %
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    </tr>
                </tbody>
               
            </table>
            </div>


            <div class="flex flex-row">

            <div class="basis-3/5 border border-gray-100 m-1 pt-5 pb-5 bg-white block rounded-lg dark:hover:bg-gray-700 mr-5">

            <h5 style={{marginLeft:"30px"}} class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-white">Overview</h5>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">Name</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {poolInfos[id].poolName}
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">Type</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {poolInfos[id].poolType}
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">Total</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$ {formatNumber(detailData.tvlUSD/1000000)} M</dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {formatNumber(detailData.tvlToken)} KLAY</dd>
                </div>
                <div class="pt-5 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">Infos</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Company : {poolInfos[id].info.operation}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Started : {poolInfos[id].info.startDate}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Accident : {poolInfos[id].info.hackingHistory}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Audit : {poolInfos[id].info.auditPerformed}
                  </dd>
                </div>
              </dl>
            </div>
            </div>


            <div className="basis-2/5 bg-white border border-gray-100 m-1 p-5 rounded-lg" style={{height:"280px"}}>
              Manage
              {userAccount === "" ?
              <>
                <button onClick={openModal} class="mt-5 inline-block w-full p-3 text-blue-600 bg-blue-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Connect Wallet
                </button> 
              </>
              :
              poolInfos[id].manage.connected ? 
              <>
              <button onClick={()=>setDepositmodal(true)} class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                Deposit
              </button>
              <button onClick={goProtocol} class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                Withdrawal
              </button>
              <button onClick={goProtocol} class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Go to protocol
                </button>    
              {/* <button class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                Swap
              </button> */}
              </>
              :
              <>
                <button onClick={goProtocol} class="mt-5 inline-block w-full p-3 text-blue-600 bg-blue-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Go to protocol
                </button>    
              </>
              }
              

                  {/* <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-blue-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
                  <li class="w-full">
                      <a href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                        예치
                      </a>
                  </li>
                  <li class="w-full">
                      <a href="#" class="inline-block w-full p-2 bg-white rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                        인출
                      </a>
                  </li>
                  
              </ul> */}


                
                  {/* <h5 class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-white"></h5>
                  <div style={{marginTop:"30px"}}></div>
          <div class="items-center">   
              <label for="voice-search" class="sr-only">Search</label>
              <div class="relative w-full">
                  <input type="text" id="voice-search" class="bg-white border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="예치가능 : 20.00 KLAY" required 
                  />
              </div>              
          </div>

          <div style={{marginTop:"30px"}}></div>

          <div style={{textAlign:"right"}}>
            <button onClick={requestDeposit} style={{width:"100%"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <span style={{width:"30px"}}>예치하기</span>
            </button>
          </div> */}
                        </div>
              

              </div>



              


          
          </div>
          {/* <div style={{marginTop:"30px"}}></div> */}
            </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>
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
                                  Klay Balance : 
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
                        <button class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-500 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <div style={{textAlign:"center"}} onClick={depositExecute}>Execution</div>
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


export default DetailStaking;

