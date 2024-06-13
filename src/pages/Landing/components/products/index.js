import 'App.css'; 
import React, {Fragment, useState, useEffect} from "react";
import styled, { keyframes } from 'styled-components';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';


const people = [
  { type: 'Earn',
    token: "USDT"
  }
]

function Products({ select, setSelect }) {

  const [selected, setSelected] = useState(people[0])

  // function selectHandler (e) {
  //   setSelected(e)
  //   setSelect(e)
  // }

  return (
    <>  
      <div class="bg-gray-50">
        <div class="">   
          <OverBox class="bg-gradient-to-r from-green-100 to-blue-500">
            
            <SubTemplateBlockVertical>
            <div className="flex relative inline-block text-center mx-auto">
            <h2 class="mx-auto text-base font-semibold leading-7 text-indigo-800 pb-3">What do you want?</h2>
            </div>
              <div className="flex relative inline-block text-center mx-auto">                
              <div className="mx-auto text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-roboto">
                Earn {' '}
                {' '}{' '} with {' '}{' '} {selected.token}
              </div>
        </div>
        <div className="flex relative inline-block text-center mx-auto">
          <div className="mx-auto text-base font-semibold leading-7 text-indigo-800 pt-10">
            <a href="#" class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center">
              Simple
            </a>
              <a href="#" class="bg-gray-100 hover:bg-gray-200 text-gray-400 text-xm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-400 dark:text-blue-400 border border-gray-300 inline-flex items-center justify-center">
              Pro
            </a>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 bg-white mt-10">
                  <Link to="/detail/0xae78736Cd615f374D3085123A210448E74Fc6393">
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
                          <p className="text-base text-neutral-800">24.35%</p>
                        </div>
                        <div className="flex text-sm mx-4">
                          EEVA
                        </div>
                      </div>  
                    </div>                  
                  </button>
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-white mt-5">
                  <Link to="/detail/0xae78736Cd615f374D3085123A210448E74Fc6393">
                  <button className="flex flex-col">
                    <div className="flex items-center">
                      <div className="flex">
                        <div className="relative">
                          <div className="relative mr-1.5 rounded-full bg-white">
                              <img class="w-10 h-10 rounded-full" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpA7RYVXXbTW7j7MUM4JNPl8MZg9AHPRGO3Q&s"} alt=""/>
                            <div className="absolute -right-2.5 -bottom-px">
                              <div className="w-6 h-6 p-[3px] border rounded-full z-10 bg-white" style={{ borderColor: 'rgb(221, 221, 221)' }}>
                              <img class="w-6 h-4 rounded-full" src={"https://static-00.iconduck.com/assets.00/tether-cryptocurrency-icon-2048x2048-dp13oydi.png"} alt=""/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <p className="mx-4 text-base font-bold text-neutral-800">Deposit USDT</p>
                          <p className="text-base text-neutral-800">24.35%</p>
                        </div>
                        <div className="flex text-sm mx-4">
                          Storm Trade
                        </div>
                      </div>  
                    </div>                  
                  </button>
                  </Link>
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
    max-width: 800px;
    /* padding-bottom: 10px; */
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    /* display:flex; */
    /* flex-direction:column; */

    /* padding: 20px 25px !important;
    background: #fff; */

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    /* background-color: rgb(255, 255, 255);
    background-clip: border-box; */
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






export default Products;

