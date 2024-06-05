import 'App.css'; 
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"

import { TonConnectButton } from '@tonconnect/ui-react';

function Topnav () {

    return (
        <div class="bg-gradient-to-r from-green-100 to-blue-200">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
                
            <div class="flex items-center">
              <Link to="/">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  FiStack
                </span>
              </Link>
            </div>
        
            <div class="flex md:order-2">   
                <div className="relative inline-block text-left">
                     <TonConnectButton />
                  </div>       
            </div>
        </div>
    </div>
  );
}

export default Topnav;

