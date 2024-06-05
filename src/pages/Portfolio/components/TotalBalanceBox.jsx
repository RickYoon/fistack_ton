import React, {useContext} from "react";

function TotalBalanceBox(props) {

    const totalBalance = props.data;
    console.log("totalBalance", totalBalance)

  return (
    <>
        <div className="">
          <div className="pb-5">
          <div className="md:flex md:justify-between md:items-center bg-white p-5">
            <div className="flex items-center mb-3 md:mb-3">
              <div className="mr-4">
              </div>
              <div>
                <div className="mt-5">
                  Total Value
                </div>
                <div className="text-3xl font-bold text-black">${totalBalance}</div>
              </div>
            
            </div>
            <ul className="shrink-0 flex flex-wrap justify-end md:justify-start -space-x-3 -ml-px">
              <li>
                <a className="block" href="#0">
                </a>
              </li>
              <li>
                <a className="block" href="#0">
                </a>
              </li>
              <li>
                <a className="block" href="#0">
                </a>
              </li>
              <li>
                <a className="block" href="#0">
                </a>
              </li>
              <li>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </>
  )
}


export default TotalBalanceBox;