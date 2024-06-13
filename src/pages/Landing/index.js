import styled, { keyframes } from 'styled-components';
import React, {useRef,useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Buffer} from 'buffer';
import Features from './components/features/index'
import Products from './components/products/index'
import InvestTable from "./components/investTable"

import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { DEX, pTON } from '@ston-fi/sdk';



function Landing() {
  

  const [investList, setInvestList] = useState([{
        "poolName": "TON | USDT LP",
        "apr": 90.5,
        "type": "LP Farming",
        "poolNumber": "0001"
      },
      {
        "poolName": "EVAA",
        "apr": 18.9,
        "type": "Simple Earn",
        "poolNumber": "0002"
      },{
        "poolName": "EVAA + Storm Trade",
        "apr": 31.5,
        "type": "Delta-neutral (future-long)",
        "poolNumber": "0003"
      },{
        "poolName": "ston-fi + Storm Trade",
        "apr": -24,
        "type": "Delta-neutral (future-Short)",
        "poolNumber": "0004"
      }
    ])

  useEffect(() => {

  }, [])


  return (
    <>
      <Heading/>
      <Features />
      <div class="bg-gray-50 py-20 sm:py-20">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-4xl lg:text-center">
            <Products />
            {/* <InvestTable data={investList}/> */}
            <div style={{height:"50px"}} />
          </div>
        </div>
      </div>
    </>
  );
}







function Heading (props) {

  // const dex = new DEX.v1.Router({
  //   tonApiClient: new TonWeb.HttpProvider(),
  // });

  // console.log("props", props.props)
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate("/products")
  };

  const [tonConnectUI, setOptions] = useTonConnectUI();
  const wallet = useTonAddress();

  const transaction = {
    messages: [
        {
            address: "0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F",
            amount: "20000000" 
        }
    ]
  }

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };


  return (

    <div className="px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32 bg-gradient-to-r from-green-100 to-blue-200">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        DeFi {' '}
        <span className="relative whitespace-nowrap text-blue-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
            preserveAspectRatio="none"
          >
          </svg>
          <span className="relative">made simple</span>
        </span>{' '}
        for <br /> Crypto Investors
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
      Maximize profits with our guide
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
      
<a
        className="hover:cursor-pointer group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
        variant="solid"
        color="slate"
        onClick={handleScrollToBottom}
      >
        Find Investment
      </a>

      </div>
      <div className="mt-20 lg:mt-30">
        <p className="font-display text-base text-slate-900">Connected Protocols</p>
        <ul role="list" className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0">
          <li>
            <ul role="list" className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
              <LogoNetwork target="_blank" class="logo-network" href="https://ethereum.org" title="https://ethereum.org" rel="noreferrer">
                <img src={"https://img.cryptorank.io/coins/ston_fi1715854233885.png"} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                  <span class="logo_label font-normal text-gray-500">
                    StonFi
                  </span>
              </LogoNetwork>
            </ul>
          </li>
          <li>
            <ul role="list" className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
              <LogoNetwork target="_blank" class="logo-network" href="https://ethereum.org" title="https://ethereum.org" rel="noreferrer">
                <img src={"https://miro.medium.com/v2/resize:fit:500/0*Ime5HkG-dVSWRvah.png"} alt="-" style={{width:"60px", borderRadius:"50%"}}/>
                  <span class="logo_label font-normal text-gray-500">
                    EEVA
                  </span>
              </LogoNetwork>
            </ul>
          </li>

        </ul>
      </div>
    </div>

  )
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



const LogoNetwork = styled.div`
    display: grid;
    gap: 16px;
    grid-template-rows: 60px 1fr;
    justify-items: center;
    max-width: 135px;
    width: 100%;
    color: inherit;
`

export default Landing;

