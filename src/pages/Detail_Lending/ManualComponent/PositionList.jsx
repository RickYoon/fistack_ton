import React from "react";
import icons from "assets/tokenIcons"
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { walletConnectModalOpen} from 'redux/reducers/WalletActions'
import { useDispatch , useSelector } from 'react-redux';


const PositionList = (props) => {

  const dispatch = useDispatch();
  const userAccount = useSelector(state => state.account) // 지갑주소


  const openModal = () => {
    dispatch(walletConnectModalOpen())
  }



const navigate = useNavigate();

  const positionData = props.data

  console.log("positionData",positionData)


  const goProtocol = () => {

    const stakingUrl = "https://klaybank.org/";
    window.open(stakingUrl, '_blank');

  }

  

  return (
    <div>  
         <div class="bg-white p-3 border border-gray-100 rounded-lg mb-5">
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
                                $ {positionData.totalStats.totalCollateralUSD.toFixed(2)}
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

                                $ {positionData.totalStats.totalDebtUSD.toFixed(2)}
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

                                {positionData.detailStats.healthRate.toFixed(2)}
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
                                {(positionData.totalStats.netApr.toFixed(2))} %
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
                          {positionData.detailStats.CollateralList.map((res)=>(
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
                                                    {(positionData.klaySupplyApr).toFixed(1)} %
                                                </Explainbox>
                                            </PoolinfoBox>
                                            </Th>
                                        </td>

                                        </tr>
                                    </tbody>
                                  
                                </table>
                            </>
                            ))}
                            {positionData.detailStats.DebtList.map((res)=>(
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
                                                    - {(positionData.ousdtDebtApr).toFixed(1)} %
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
                        {/* <button class="inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                          Add Supply
                        </button>
                        <button class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                          Add Borrow
                        </button>
                        <button class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                          Repay
                        </button> */}
                        {userAccount === ""?
                                <>
                                <button onClick={openModal} class="inline-block w-full p-3 text-blue-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                                    Connect Wallet
                                </button>
                                </>
                                : 
                                <button onClick={goProtocol} class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                                Go to protocol
                              </button>  
                          }
          

                    </div>
                
                </div>
            
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






export default PositionList;