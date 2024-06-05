import React, {useContext, useState, useEffect} from "react";
import icons from "assets/tokenIcons"
import poolInfos from "./poolInfos.json"
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import {useNavigate} from 'react-router-dom';

function ProductTable(props) {

    console.log("props", props)

    const navigate = useNavigate();

    // useEffect(() => {    
    //   return () => {
    //     setPooldata()
    // }
    // }, [])
    

    // const pooldata = props.data.klayProtocolCategory

    const [pooldata, setPooldata] = useState([
        {
            "poolName": "hashed-Ozys (Klaystation)",
            "contractAddress": "0xe33337cb6fbb68954fe1c3fde2b21f56586632cd",
            "category": "노드 스테이킹",
            "investedKlay": 10.03,
            "tvlKLAY": 136950507.0273753,
            "tvlKRW": 35182585255.33272,
            "apr": 6.11,
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
            "investedKlay": 0,
            "tvlKLAY": 24611139.655280113,
            "tvlKRW": 6322601777.441461,
            "apr": 5.46,
            "liqToken": "X",
            "unStakingOption": [
                "7일대기"
            ]
        },
        {
            "poolName": "FSN (Klaystation)",
            "contractAddress": "0x962cdb28e662b026df276e5ee7fdf13a06341d68",
            "category": "노드 스테이킹",
            "investedKlay": 0,
            "tvlKLAY": 20184993.2266302,
            "tvlKRW": 5185524759.921298,
            "apr": 5.65,
            "liqToken": "X",
            "unStakingOption": [
                "7일대기"
            ]
        },
        {
            "poolName": "Jump (Klaystation)",
            "contractAddress": "0x0795aea6948fc1d31809383edc4183b220abd71f",
            "category": "노드 스테이킹",
            "investedKlay": 0,
            "tvlKLAY": 17357922.85614072,
            "tvlKRW": 4459250381.742551,
            "apr": 6.23,
            "liqToken": "X",
            "unStakingOption": [
                "7일대기"
            ]
        },
        {
            "poolName": "Stake.ly",
            "contractAddress": "0xf80f2b22932fcec6189b9153aa18662b15cc9c00",
            "category": "노드 스테이킹",
            "investedKlay": 0.0127,
            "tvlKLAY": 88561590,
            "tvlKRW": 22751472470.999996,
            "apr": 5.94,
            "liqToken": "stKLAY",
            "unStakingOption": [
                "7일대기"
            ]
        },
        {
            "poolName": "Kleva",
            "contractAddress": "0xa691c5891d8a98109663d07bcf3ed8d3edef820a",
            "category": "빌려주기",
            "investedKlay": 0,
            "tvlKlay": 13482193.653138217,
            "tvlKRW": 3463575549.4912076,
            "apr": 1.5
        },
        {
            "poolName": "BiFi",
            "contractAddress": "0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13",
            "category": "빌려주기",
            "investedKlay": 0,
            "tvlKlay": 223571.94522558505,
            "tvlKRW": 57435632.728452794,
            "apr": 1.7445387899711675
        },
        {
            "poolName": "Klaymore stakehouse",
            "contractAddress": "0x74ba03198fed2b15a51af242b9c63faf3c8f4d34",
            "category": "노드 스테이킹",
            "investedKlay": 0,
            "tvlKLAY": 20146784.379348762,
            "tvlKRW": 5175708907.054697,
            "apr": 5.532493555770537,
            "liqToken": "AKLAY",
            "unStakingOption": [
                "스왑"
            ]
        },
        {
            "poolName": "Kokoa Finance",
            "contractAddress": "0x7087d5a9e3203d39ec825d02d92f66ed3203b18a",
            "category": "노드 스테이킹",
            "investedKlay": 0.000538028225084099,
            "tvlKlay": 13970819128572604000,
            "tvlKRW": 3.589103434130302e+21,
            "apr": 0.7,
            "liqToken": "KSD 토큰",
            "unStakingOption": [
                "7일대기"
            ]
        },
        {
            "poolName": "Klaybank",
            "contractAddress": "0x6d219198816947d8bb4f88ba502a0518a7c516b1",
            "category": "빌려주기",
            "investedKlay": 0,
            "tvlKlay": 1928798.128,
            "tvlKRW": 495508239.0832,
            "apr": 1.55
        },
        {
            "poolName": "Swapscanner",
            "contractAddress": "0xf50782a24afcb26acb85d086cf892bfffb5731b5",
            "category": "노드 스테이킹",
            "investedKlay": 1998.348405,
            "tvlKLAY": 56878431,
            "tvlKRW": 14612068923.9,
            "apr": 7.52,
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
            "investedKlay": 0.000001968869036602,
            "tvlKlay": 23080068.8485,
            "tvlKRW": 5929269687.179649,
            "apr": 1.87
        }
    ])
    
      const homeJson = {
        "Klayswap" : "https://klayswap.com/exchange/pool",
        "Kokonutswap" : "https://kokonutswap.finance/pools",
        "Klaymore": "https://klaystake.house/",
        "klaystation": "https://klaystation.io/staking",
        "stakely": "https://stake.ly/klay",
        "klexfinance": "https://app.klex.finance/",
        "PangeaSwap": "https://app.pangeaswap.com/pool",
        "hashquark": "https://klayportal.hashquark.io/",
        "Claimswap": "https://app.claimswap.org/",
        "PALA": "https://pala.io/dex"
      }

    

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

    function clickHandler(contAddr,e) {
        e.preventDefault();
        console.log("contAddr",contAddr)
        navigate(`/detail/staking/${contAddr}`);
      }

    return (

    <>
<div class="">
    <div class="p-3 px-0">
  <table class="w-full">

    <thead class="border-y border-gray-200">
      <tr>
        <th class="bg-blue-gray-50/50 pl-4">
          <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Token/Protocol/Chain</p>
        </th>
        <th class="bg-blue-gray-50/50 p-4">
        <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Type</p>
        </th>
        <th class="bg-blue-gray-50/50 p-4">
        <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Net APY</p>
        </th>
        <th class="bg-blue-gray-50/50 p-4">
        <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Liquidity</p>
        </th>
        <th class="bg-blue-gray-50/50 p-4">
        <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">My Balance</p>
        </th>
      </tr>
    </thead>
    
    <tbody class="">

      {pooldata.map((res) => (
      <tr class="cursor-pointer hover:bg-white hover:border border-gray-200" onClick={(e)=>{clickHandler(res.contractAddress, e)}}>
        <td>
          <div className="flex items-center gap-3 pl-4">
          <PoolinfoBox>
                    <Iconbox>
                    <Img src={icons["KLAY"]} alt="logo" fontSize="20px"/>
                    </Iconbox>
                    <Explainbox>
                    <Protocol>
                        {res.poolName}
                    </Protocol>
                    <Token>
                        Klaytn
                    </Token>
                    </Explainbox>
                  </PoolinfoBox>
        </div>
        </td>

        <td className="p-4">
        <Th style={{fontSize:"13px", fontWeight:"normal"}}>
            {res.category}
        </Th>
        </td>
        <td className="p-4">
        <Th style={{fontSize:"13px", fontWeight:"normal"}}>
            {res.apr.toFixed(1)} %
        </Th>
        </td>
        <td className="p-4">
          <div className="w-max">
            <div style={{fontSize:"13px", fontWeight:"normal"}}>
                $ {(res.tvlKLAY/1000000).toFixed(1)} M
            </div>
          </div>
        </td>
        <td className="p-4">
          <div className="w-max">
            <div style={{fontSize:"13px", fontWeight:"normal"}}>
                {res.investedKlay.toFixed(1)}
            </div>
          </div>
        </td>
      </tr>
      ))}
    </tbody>
  </table>
    
</div>

</div>
  </>
  )
}

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
    /* width: 50px; */
    height: 30px;
    /* width: */
    /* /* height:25px;  */
    border:1px solid #eaeaea;
    border-radius:50%;
    background-color: #f5f5f5;
    /* padding: 1px; */
    /* background-color:ㅎㄱ묘; */
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

const Th = styled.th`
  height:25px;
  vertical-align:middle;
  padding-left:5px;
  @media screen and (max-width: 500px){
    max-width: 150px;
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



  


export default ProductTable;