import React, {useContext} from "react";

function WalletManageBox() {

  return (
    <>
        <div className="md:flex md:justify-between md:items-center bg-white p-3 mb-3">

            <main class="grid place-items-center">
                <div class="grid w-[15rem] grid-cols-2 gap-2 rounded-xl bg-gray-100 p-2">
                    <div>
                        <input type="radio" name="option" id="1" value="1" class="peer hidden" checked />
                        <label for="1" class="block cursor-pointer select-none rounded-md text-center peer-checked:bg-gradient-to-r from-green-100 to-blue-200 peer-checked:font-bold peer-checked:text-black">
                        Connected
                        </label>
                    </div>

                    <div>
                        <input type="radio" name="option" id="2" value="2" class="peer hidden" />
                        <label for="2" class="block cursor-pointer select-none rounded-md text-center peer-checked:bg-gradient-to-r from-green-100 to-blue-200 peer-checked:font-bold peer-checked:text-black">
                        Group
                        </label>
                    </div>
                </div>
            </main>      

        <div class="grid place-items-center">
        
            <button type="button" class="text-gray-900 bg-gray-200 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Manage
            </button>
            
        </div>            
    </div>
  </>
  )
}


export default WalletManageBox;