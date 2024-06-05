
import React, {useState, useEffect} from "react";
import axios from 'axios';
import icons from "assets/tokenIcons"
import styled from 'styled-components';
import { Provider, useDispatch, useSelector } from 'react-redux';

import {
  kaikasCreateWalletExecutor,
  lendAndBorrowExecutor,
  emergencyRepayExecutor,
  repayExecutor, 
  allowanceChecker,
  approveExecutor,
  checkOusdtBalance
} from '../kaikasExecutor.js';

import {
  metamaskEmergencyRepayExecutor,
  metamaskLendAndBorrowExecutor,
  metamaskApproveExecutor,
  metamaskRepayExecutor,
  metamaskCreateWalletExecutor
} from '../walletConnect/metamask.js'

import { walletConnectModalOpen} from 'redux/reducers/WalletActions'


const AutoWalletManage = (props) => {

  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더

  const [hasActiveWallet, setHasActiveWallet] = useState(false)
  const [lendAndBorrowModal, setLendAndBorrowModal] = useState(false)
  const [emergencyRepayModal, setEmergencyRepayModal] = useState(false)
  const [repayModal, setRepayModal] = useState(false)
  const [approveState, setApproveState] = useState(false)
  const [repayError, setRepayError] = useState(false)

  const [klayBalance, setKlaybalance] = useState()
  
  const [activeWalletAddress, setActiveWalletAddress] = useState("")
  const [depositAmount, setDepositAmount] = useState();
  const [ltv,setLtv]= useState()
  const userAccount = useSelector(state => state.account) // 지갑주소

  const [klaySupply, setKlaySupply] = useState()
  const [ousdtDebt, setOusdtDebt] = useState()
  const [klayReclaimAmount, setKlayReclaimAmount] = useState();
  const [ousdtRepayAmount,setOusdtRepayAmount]= useState()


  const [autowalletPosition, setAutowalletPosition] = useState({
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


  useEffect(() => {

    // 페이지가 로딩되면 지갑이 연결되어 있는지 확인한다.
    if(userAccount === ""){
        // do nothing

    } else { // 지갑이 연결되어 있으면.

        if(props.index === 1){

            updateStatus()
            updateAutoStatus()
        
        }
    }

  
  }, [userAccount, activeWalletAddress, props.index])

  async function updateStatus () {
    // console.log("userAccount",userAccount)

    try {

        const res = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/activeWallet?userAddr=${userAccount}`)

        console.log("res",res)
        
        if(res.data.hasActiveWallet === "yes"){

            setHasActiveWallet(true)
            setActiveWalletAddress(res.data.activeWalletAddress)
            setKlaybalance(res.data.klayBalance)
    
        } else {
    
        }

    } catch (error) {

        setHasActiveWallet(false)
        
    }


  }

  async function updateAutoStatus () {

    if(activeWalletAddress === ""){

      setAutowalletPosition({
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
          "address" : activeWalletAddress,
          "protocolId" : "klay_klaybank"
        })

        if(assetList.data.body===null || assetList.data.body === undefined){

            setAutowalletPosition({
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
            // console.log("assetList.data.body",assetList.data.body)
            setAutowalletPosition(assetList.data.body)
            setKlaySupply(assetList.data.body.detailStats.CollateralList[0].tokenAmount)
            setOusdtDebt(assetList.data.body.detailStats.DebtList[0].tokenAmount)
        }
    }
  }

  async function LendAndBorrowModalOpen() {

    setLendAndBorrowModal(true)
    
  }

  async function EmergencyRepayModalOpen(){

    setEmergencyRepayModal(true)

  }

  async function repayModalOpen(){

    setRepayModal(true)

  }

  

  async function createActiveWallet() {

    if(walletProvider === "kaikas"){

      const trxReturn = await kaikasCreateWalletExecutor(userAccount)
      updateStatus()

    } else if(walletProvider === "metamask"){

      const trxReturn = await metamaskCreateWalletExecutor(userAccount)
      updateStatus()

    }

  }

  function copyAddress () {
    // console.log(activeWalletAddress)
    handleCopyClipBoard(activeWalletAddress)
    // navigator.clipboard.writeText(activeWalletAddress);  
    // alert("Wallet Address Copied")  
  }

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${text} copied`);
    } catch (e) {
      alert('fail');
    }
};

  async function performLendAndBorrow(){

    if(walletProvider === "kaikas"){

      const trxReturn = await lendAndBorrowExecutor(userAccount, activeWalletAddress, depositAmount, ltv)
      setLendAndBorrowModal(false)
      setDepositAmount(0)
      setLtv(0)

    } else if(walletProvider === "metamask"){

      const trxReturn = await metamaskLendAndBorrowExecutor(userAccount, activeWalletAddress, depositAmount, ltv)
      setLendAndBorrowModal(false)
      setDepositAmount(0)
      setLtv(0)

    }

  }

  async function performEmergencyRepay() {

    if(walletProvider === "kaikas"){

      const trxReturn = await emergencyRepayExecutor(userAccount, activeWalletAddress)
      setEmergencyRepayModal(false)
  
    } else if(walletProvider === "metamask"){

      const trxReturn = await metamaskEmergencyRepayExecutor(userAccount, activeWalletAddress)
      setEmergencyRepayModal(false)
  
    }

  }

  async function performRepay(){

    if(ousdtRepayAmount > 0 && klayReclaimAmount > 0){
      
      if(walletProvider === "kaikas"){

        const trxReturn = await repayExecutor(userAccount, activeWalletAddress, ousdtRepayAmount, klayReclaimAmount)
        setRepayModal(false)
        setRepayError(false)      
        setKlayReclaimAmount(0)
        setOusdtRepayAmount(0)
      
      } else if(walletProvider === "metamask"){
  
        const trxReturn = await metamaskRepayExecutor(userAccount, activeWalletAddress, ousdtRepayAmount, klayReclaimAmount)
        setRepayModal(false)
        setRepayError(false)      
        setKlayReclaimAmount(0)
        setOusdtRepayAmount(0)
    
      }
    } else {
      setRepayError(true)      
    }
    // console.log("trxReturn", trxReturn)
  }

  async function performApprove(){

    if(walletProvider === "kaikas"){

      const balance = await checkOusdtBalance(userAccount)
      await approveExecutor(userAccount, activeWalletAddress, balance)
      setRepayModal(false)
    
    } else if(walletProvider === "metamask"){

      const balance = await checkOusdtBalance(userAccount)
      await metamaskApproveExecutor(userAccount, activeWalletAddress, balance)
      setRepayModal(false)
  
    }



    

  }


  function closeModal () {
    setLendAndBorrowModal(false)
    setEmergencyRepayModal(false)
    setRepayModal(false)
    setRepayError(false)      
    setDepositAmount()
    setLtv()
  }

  useEffect(() => {

    checkAllowance()

  }, [repayModal])

  async function checkAllowance () {

    const allowance = await allowanceChecker(userAccount,activeWalletAddress)
    const balance = await checkOusdtBalance(userAccount)

    if(allowance < balance){

      setApproveState(false)

    } else {

      setApproveState(true)

    }
  }

  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(walletConnectModalOpen())
  }


  return (
    <div>  
         <div class="bg-white p-3 border border-gray-100 rounded-lg mb-5" >
        <table class="w-full">
        <thead class="">
            </thead>
                <tbody class="bg-white">
                    <tr>
                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Collateral</div>
                                </p>
                                $ {autowalletPosition.totalStats.totalCollateralUSD.toFixed(2)}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Debt</div>
                                </p>

                                $ {autowalletPosition.totalStats.totalDebtUSD.toFixed(2)}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Health Rate</div>
                                </p>
                                {autowalletPosition.detailStats.healthRate.toFixed(2)}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>net APY</div>
                                </p>
                                {(autowalletPosition.totalStats.netApr.toFixed(2))} %
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
                      <h5 style={{marginLeft:"30px"}} class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-white">Detail</h5>
                        <div class="mt-6 border-t border-gray-100">
                          <dl class="divide-y divide-gray-100 p-3">
                          {autowalletPosition.detailStats.CollateralList.map((res)=>(
                            <>
                            <table class="w-full">
                            <thead class="">
                                </thead>
                                    <tbody class="bg-white">
                                        <tr>
                                        <td className="p-4">
                                            <Th>
                                            <PoolinfoBox>                                    
                                                <Explainbox>
                                                    <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                                    <div>Supply</div>
                                                    </p>
                                                    <img class="w-6 h-6 rounded-full" src={icons["KLAY"]} alt="" style={{margin:"5px auto"}}/>
                                                </Explainbox>
                                            </PoolinfoBox>
                                            </Th>
                                        </td>

                                        <td className="p-4">
                                            <Th>
                                            <PoolinfoBox>                                    
                                                <Explainbox>
                                                    <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                                    <div>Token</div>
                                                    </p>
                                                    {res.tokenAmount.toFixed(2)}                                
                                                </Explainbox>
                                            </PoolinfoBox>
                                            </Th>
                                        </td>

                                        <td className="p-4">
                                            <Th>
                                            <PoolinfoBox>                                    
                                                <Explainbox>
                                                    <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                                    <div>Value</div>
                                                    </p>
                                                    {res.tokenValue.toFixed(2)}                                
                                                </Explainbox>
                                            </PoolinfoBox>
                                            </Th>
                                        </td>

                                        <td className="p-4">
                                            <Th>
                                            <PoolinfoBox>                                    
                                                <Explainbox>
                                                    <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                                    <div>APY</div>
                                                    </p>
                                                    {(autowalletPosition.klaySupplyApr).toFixed(1)} %
                                                </Explainbox>
                                            </PoolinfoBox>
                                            </Th>
                                        </td>

                                        </tr>
                                    </tbody>
                                  
                                </table>
                            </>
                            ))}

                        {autowalletPosition.detailStats.DebtList.map((res)=>(
                            <>
                            <table class="w-full">
                            <thead class="">
                                </thead>
                                    <tbody class="bg-white">
                                        <tr>
                                        <td className="p-4">
                                            <Th>
                                            <PoolinfoBox>                                    
                                                <Explainbox>
                                                    <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                                    <div>Borrow</div>
                                                    </p>
                                                    <img class="w-6 h-6 rounded-full" src={icons["oUSDT"]} alt="" style={{margin:"5px auto"}}/>
                                                </Explainbox>
                                            </PoolinfoBox>
                                            </Th>
                                        </td>

                                        <td className="p-4">
                                            <Th>
                                            <PoolinfoBox>                                    
                                                <Explainbox>
                                                    <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                                    <div>Token</div>
                                                    </p>
                                                    {res.tokenAmount.toFixed(2)}                                
                                                </Explainbox>
                                            </PoolinfoBox>
                                            </Th>
                                        </td>

                                        <td className="p-4">
                                            <Th>
                                            <PoolinfoBox>                                    
                                                <Explainbox>
                                                    <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                                    <div>Value</div>
                                                    </p>
                                                    {res.tokenValue.toFixed(2)}                                
                                                </Explainbox>
                                            </PoolinfoBox>
                                            </Th>
                                        </td>

                                        <td className="p-4">
                                            <Th>
                                            <PoolinfoBox>                                    
                                                <Explainbox>
                                                    <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                                    <div>APY</div>
                                                    </p>
                                                    - {(autowalletPosition.ousdtDebtApr).toFixed(1)} %
                                                </Explainbox>
                                            </PoolinfoBox>
                                            </Th>
                                        </td>

                                        </tr>
                                    </tbody>
                                  
                                </table>
                            </>
                            ))}
                          </dl>
                        </div>
                        </div>

                        <div className="basis-2/5 bg-white border border-gray-100 m-1 p-5 rounded-lg">
                                <div style={{fontSize:"15px", textAlign:"center", marginBottom:"15px", fontWeight:"500"}}>Manage</div>
                                {userAccount === ""?
                                <>
                                <button onClick={openModal} class="inline-block w-full p-3 text-blue-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                                    Connect Wallet
                                </button>
                                </>
                                : !hasActiveWallet ?
                                <>
                                <button onClick={createActiveWallet} class="inline-block w-full p-3 text-blue-600 bg-blue-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                                    Create Active Wallet
                                </button>
                                <button class="text-left inline-block w-full mt-3 p-3 text-gray-600 bg-gray-100 rounded-lg ">
                                    Why Active Wallet ? <br />
                                    <div style={{fontSize:"14px", paddingTop:"10px"}}>
                                    - Auto Repay before Liquidation. <br />
                                    - Close Poistion with one-click. <br />
                                    - (plan) Noti. What you want <br />
                                    <br />
                                    * Caution <br /> - Audit is not performed yet.                                 
                                    </div>
                                </button>
                                </>
                                :
                                <>                                
                                <button onClick={copyAddress} class="inline-block w-full p-3 text-blue-600 border border-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                                    Active Wallet : {activeWalletAddress.slice(0,5)}...{activeWalletAddress.slice(-5, activeWalletAddress.length)} 
                                </button>

                                <button onClick={LendAndBorrowModalOpen} class="hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 mt-5 inline-block w-full p-3 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                                    Lend and Borrow
                                </button>
                                <button onClick={repayModalOpen} class="hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 mt-5 inline-block w-full p-3 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                                    Repay
                                </button>
                                <button onClick={EmergencyRepayModalOpen} class="hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 mt-5 inline-block w-full p-3 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                                    Emergency Repay
                                </button>
                                </>
                                }
                            </div>
              
                </div>     
        {false ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                       Lend and Borrow
                    </h3>
                    <button onClick={() => setLendAndBorrowModal(false)}>
                        <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    
                    <div class="p-6">
                    
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Insert Supply Amount</p>
                        <ul class="my-4 space-y-3">
                            <li>
                                <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                    <svg aria-hidden="true" class="h-4" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z" fill="#E17726"/><path d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z" fill="#E27625"/><path d="M32.1656 27.0093L39.7516 27.1537L37.1004 36.1603L27.8438 33.6116L32.1656 27.0093Z" fill="#E27625"/><path d="M7.83409 27.0093L12.1399 33.6116L2.89876 36.1604L0.263672 27.1537L7.83409 27.0093Z" fill="#E27625"/><path d="M17.5203 10.8677L17.8304 20.8807L8.55371 20.4587L11.1924 16.4778L11.2258 16.4394L17.5203 10.8677Z" fill="#E27625"/><path d="M22.3831 10.7559L28.7737 16.4397L28.8067 16.4778L31.4455 20.4586L22.1709 20.8806L22.3831 10.7559Z" fill="#E27625"/><path d="M12.4115 27.0381L17.4768 30.9848L11.5928 33.8257L12.4115 27.0381Z" fill="#E27625"/><path d="M27.5893 27.0376L28.391 33.8258L22.5234 30.9847L27.5893 27.0376Z" fill="#E27625"/><path d="M22.6523 30.6128L28.6066 33.4959L23.0679 36.1282L23.1255 34.3884L22.6523 30.6128Z" fill="#D5BFB2"/><path d="M17.3458 30.6143L16.8913 34.3601L16.9286 36.1263L11.377 33.4961L17.3458 30.6143Z" fill="#D5BFB2"/><path d="M15.6263 22.1875L17.1822 25.4575L11.8848 23.9057L15.6263 22.1875Z" fill="#233447"/><path d="M24.3739 22.1875L28.133 23.9053L22.8184 25.4567L24.3739 22.1875Z" fill="#233447"/><path d="M12.8169 27.0049L11.9606 34.0423L7.37109 27.1587L12.8169 27.0049Z" fill="#CC6228"/><path d="M27.1836 27.0049L32.6296 27.1587L28.0228 34.0425L27.1836 27.0049Z" fill="#CC6228"/><path d="M31.5799 20.0605L27.6165 24.0998L24.5608 22.7034L23.0978 25.779L22.1387 20.4901L31.5799 20.0605Z" fill="#CC6228"/><path d="M8.41797 20.0605L17.8608 20.4902L16.9017 25.779L15.4384 22.7038L12.3988 24.0999L8.41797 20.0605Z" fill="#CC6228"/><path d="M8.15039 19.2314L12.6345 23.7816L12.7899 28.2736L8.15039 19.2314Z" fill="#E27525"/><path d="M31.8538 19.2236L27.2061 28.2819L27.381 23.7819L31.8538 19.2236Z" fill="#E27525"/><path d="M17.6412 19.5088L17.8217 20.6447L18.2676 23.4745L17.9809 32.166L16.6254 25.1841L16.625 25.1119L17.6412 19.5088Z" fill="#E27525"/><path d="M22.3562 19.4932L23.3751 25.1119L23.3747 25.1841L22.0158 32.1835L21.962 30.4328L21.75 23.4231L22.3562 19.4932Z" fill="#E27525"/><path d="M27.7797 23.6011L27.628 27.5039L22.8977 31.1894L21.9414 30.5138L23.0133 24.9926L27.7797 23.6011Z" fill="#F5841F"/><path d="M12.2373 23.6011L16.9873 24.9926L18.0591 30.5137L17.1029 31.1893L12.3723 27.5035L12.2373 23.6011Z" fill="#F5841F"/><path d="M10.4717 32.6338L16.5236 35.5013L16.4979 34.2768L17.0043 33.8323H22.994L23.5187 34.2753L23.48 35.4989L29.4935 32.641L26.5673 35.0591L23.0289 37.4894H16.9558L13.4197 35.0492L10.4717 32.6338Z" fill="#C0AC9D"/><path d="M22.2191 30.231L23.0748 30.8354L23.5763 34.8361L22.8506 34.2234H17.1513L16.4395 34.8485L16.9244 30.8357L17.7804 30.231H22.2191Z" fill="#161616"/><path d="M37.9395 0.351562L39.9998 6.53242L38.7131 12.7819L39.6293 13.4887L38.3895 14.4346L39.3213 15.1542L38.0875 16.2779L38.8449 16.8264L36.8347 19.1742L28.5894 16.7735L28.5179 16.7352L22.5762 11.723L37.9395 0.351562Z" fill="#763E1A"/><path d="M2.06031 0.351562L17.4237 11.723L11.4819 16.7352L11.4105 16.7735L3.16512 19.1742L1.15488 16.8264L1.91176 16.2783L0.678517 15.1542L1.60852 14.4354L0.350209 13.4868L1.30098 12.7795L0 6.53265L2.06031 0.351562Z" fill="#763E1A"/><path d="M28.1861 16.2485L36.9226 18.7921L39.7609 27.5398L32.2728 27.5398L27.1133 27.6049L30.8655 20.2912L28.1861 16.2485Z" fill="#F5841F"/><path d="M11.8139 16.2485L9.13399 20.2912L12.8867 27.6049L7.72971 27.5398H0.254883L3.07728 18.7922L11.8139 16.2485Z" fill="#F5841F"/><path d="M25.5283 5.17383L23.0847 11.7736L22.5661 20.6894L22.3677 23.4839L22.352 30.6225H17.6471L17.6318 23.4973L17.4327 20.6869L16.9139 11.7736L14.4707 5.17383H25.5283Z" fill="#F5841F"/></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap" onClick={performLendAndBorrow}>MetaMask</span>
                                    {/* <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span> */}
                                </a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <svg width="22" height="20" viewBox="0 0 84 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_18_550)">
                                        <path d="M62.2792 39.2422L57.2156 49.2888C54.6738 54.3322 49.5099 57.517 43.8737 57.517H10.1773C4.57122 57.4969 0 62.0883 0 67.6742C0 73.2601 4.57122 77.8514 10.1773 77.8514H78.9264C82.9953 77.8514 85.4065 73.3003 83.1159 69.9347L62.2892 39.2422H62.2792Z" fill="#99B3FF"/>
                                        <path d="M73.8127 0H15.3513C6.87191 0 0 6.87191 0 15.3513V67.6742C0 62.0883 4.57122 57.497 10.1773 57.497H43.8837C49.5199 57.497 54.6839 54.3122 57.2257 49.2687L78.3337 7.33405C80.0316 3.96843 77.5902 0 73.8127 0Z" fill="#3366FF"/>
                                        <path d="M45.5115 31.6168C48.9273 31.6168 51.7002 29.4567 51.7002 26.7843C51.7002 24.1119 48.9273 21.9519 45.5115 21.9519C42.0956 21.9519 39.3228 24.1119 39.3228 26.7843C39.3228 29.4567 42.0956 31.6168 45.5115 31.6168Z" fill="#DAFF86"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_18_550">
                                        <rect width="84" height="77.8514" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    {/* <span class="flex-1 ml-3 whitespace-nowrap" onClick={performEmergencyRepay}>Kaikas</span> */}
                                </a>
                            </li>
                        </ul>
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">주소 불러오기 (조회만 가능) </p>
                    
                    <div class="mt-3"></div>

                        <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">0x123...</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            {/* <input onChange={(e)=>setTempAccountInfo(e.target.value)} value={depositAmount} type="search" id="search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0x123..." />
                            <button onClick={conAddress} class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">입력</button> */}
                        </div>
                    
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}      

        {lendAndBorrowModal ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                       Lend and Borrow
                    </h3>
                    <button onClick={closeModal}>
                        <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    
                    <div class="p-6">
                    
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Deposit KLAY and Borrow oUSDT with one-click!
                    </p>
                        <ul class="my-4 space-y-3">
                            <li>
                                <div class="flex items-center p-3 text-base font-medium text-gray-900 rounded-lg bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                  Klay Balance : {klayBalance}
                                </div>
                            </li>
                        </ul>
                    <div class="mt-3"></div>

                        {/* <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">set Deposit Amount</label> */}
                        <div class="relative">
                            <input onChange={(e)=>setDepositAmount(e.target.value)} value={depositAmount} type="search" id="search" class="block w-full p-4 text-xm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Inset Deposit Amount" />
                            {/* <button class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button> */}
                        </div>

                        {/* <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">set Deposit Amount</label> */}
                        <div class="relative mt-5">
                            <input onChange={(e)=>setLtv(e.target.value)} value={ltv} type="search" id="search" class="block w-full p-4 text-xm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Set LTV" />
                            {/* <button class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button> */}
                        </div>


                        <div class="mt-10"></div>
                        <button class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-500 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <div style={{textAlign:"center"}} onClick={performLendAndBorrow}>Execution</div>
                        </button>                    
                        
                    </div>
                    
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}

        {emergencyRepayModal ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                       Caution
                    </h3>
                    <button onClick={() => setEmergencyRepayModal(false)}>
                        <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    
                    <div class="p-6">
                    
                    <div class="mt-3"></div>

                        <div class="items-center p-3 text-base text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        "This functionality is for repaying borrowed funds when you do not currently hold them. 
                        <span style={{color:"blue"}}>Please be aware that fees may be incurred as this involves utilizing flash loans. </span>
                        If you do not wish to incur fees, consider using the regular 'repay' function."
                        </div>

                        <div class="mt-10"></div>
                        <button class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-500 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <div style={{textAlign:"center"}} onClick={performEmergencyRepay}>Execution</div>
                        </button>                    
                        
                    </div>
                    
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}

        {repayModal ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                       Lend and Borrow
                    </h3>
                    <button onClick={closeModal}>
                        <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    
                    <div class="p-6">
                    
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Deposit KLAY and Borrow oUSDT with one-click!
                    </p>
                    {repayError === true?
                    <p class="text-sm font-normal text-red-500 dark:text-red-400">
                        Both the values of KLAY and oUSDT should not be zero.
                    </p>
                    :
                    <></>
                    }
                        <ul class="my-4 space-y-3">
                            <li>
                                <div class="flex items-center p-3 text-base font-medium text-gray-900 rounded-lg bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                  Klay Collateral : {klaySupply}
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center p-3 text-base font-medium text-gray-900 rounded-lg bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                  Ousdt Debt : {ousdtDebt}
                                </div>
                            </li>
                        </ul>
                    <div class="mt-3"></div>

                        {/* <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">set Deposit Amount</label> */}
                        <div class="relative">
                        {approveState === false?
                            <input value={depositAmount} type="search" id="search" class="block w-full p-4 text-xm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="-" disabled/>
                            :
                            <input onChange={(e)=>setKlayReclaimAmount(e.target.value)} value={depositAmount} type="search" id="search" class="block w-full p-4 text-xm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Reclaiming Klay amount " />
                        }
                            {/* <button class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button> */}
                        </div>

                        {/* <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">set Deposit Amount</label> */}
                        <div class="relative mt-5">
                        {approveState === false?
                            <input type="search" id="search" class="block w-full p-4 text-xm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ousdt approve first" disabled/>
                            :
                            <input onChange={(e)=>setOusdtRepayAmount(e.target.value)} value={ltv} type="search" id="search" class="block w-full p-4 text-xm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ousdt Repay amount" />
                        }
                        </div>


                        <div class="mt-10"></div>
                        {approveState === false?
                          <button class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-500 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                              <div style={{textAlign:"center"}} onClick={performApprove}>Approve oUSDT</div>
                          </button>                    
                          :
                          <button class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-500 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                              <div style={{textAlign:"center"}} onClick={performRepay}>Execution</div>
                          </button>                    
                        }
                        
                    </div>
                    
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}

        </div>
        
        
  )}


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

const Img = styled.img`
    height: 30px;
    border:1px solid #eaeaea;
    border-radius: 100%;
    background-color: #f5f5f5;
  `

const Th = styled.th`
  height:25px;
  vertical-align:middle;
  padding-left:5px;
  @media screen and (max-width: 500px){
    max-width: 150px;
  }

`;


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

const Span = styled.span`
cursor: pointer;
/* color: gray;
float: right; */

/* &:hover {
  color: blue;
  text-decoration: underline;
}; */
`


const Protocol = styled.div`
padding-left: 15px;
/* text-decoration: underline; */
font-size: 12px;

`

const Token = styled.div`
padding-left: 15px;
  color: #657795;
  font-size: 11px;
  text-align: left;
`

const Imgs = styled.img`
width: 20px;
height: 20px;
border: 0.5px solid #eaeaea;
border-radius:50%;
`

const Iconwrapper = styled.div`
  /* width: 30px;
  height: 20px; */
  /* overflow: hidden; */
`

const Iconbox = styled.div`
display: flex;
flex-direction: row;
`


const TodoTemplateBlock = styled.div`
/* width: 100%; */
width:1024px;
/* max-height: 1024px; */

position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
background: white;
border-radius: 16px;
box-shadow: 1px 1px 1px gray;

margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

/* margin-top: 16px; */
margin-bottom: 16px;
padding-left:18px;
padding-right:20px;
padding-top: 10px;
padding-bottom: 10px;
display: flex;
flex-direction: column;

color: rgba(0, 0, 0, 0.87);
transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
min-width: 0px;
overflow-wrap: break-word;
background-color: rgb(255, 255, 255);
background-clip: border-box;
border: 0px solid rgba(0, 0, 0, 0.125);
border-radius: 0.75rem;
box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
overflow: visible;

.loader {
  margin-left:200px;
}

@media screen and (max-width: 950px){
  width: 90%;
  padding-left:20px;
  padding-right:20px;
  border-radius: 8px;
  box-shadow: 1px 1px 1px gray;

  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-width: 0px;
  overflow-wrap: break-word;
  background-color: rgb(255, 255, 255);
  background-clip: border-box;
  border: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  overflow: visible;

  .loader {
    margin-left:135px;
  }
  .mobtrans{
    display:none;
  }
  .tablecss{
    font-size:13px;
    
  }
  /* .head{
  }
  .headcol:before {
    content: 'Row ';
  }
.content {
  background: #8cdba3;
} */
}
`;


const Tdc = styled.td`
@media screen and (max-width: 500px){
  display:none;
}
height:25px;
vertical-align:middle;
`;


const Td = styled.td`
height:25px;
vertical-align:middle;
`

const Tr = styled.tr`
&:hover {
  background-color: #E8E8E8;
}
`






export default AutoWalletManage;