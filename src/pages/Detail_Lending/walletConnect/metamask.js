import Web3 from 'web3';
import Swal from 'sweetalert2'

// set Toast
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

// 기능 추가하는 법
// 1) export 로 processor 를 만들고,
// 2) transaction 을 만든다.

// processors 

// 1) emergency Repay
export const metamaskEmergencyRepayExecutor = async (address, activeWalletAddress) => {
    const transactionInfo = await createEmergencyRepayTransaction(address, activeWalletAddress)
    await metamaskExecutor(transactionInfo, "emergency Repay")
}

// 2) LendAndBorrowExecutor
export const metamaskLendAndBorrowExecutor = async (userAccount, activeWalletAddress, depositAmount, ltv) => {
    const transactionInfo = await createLendandBorrowTransaction(userAccount, activeWalletAddress,depositAmount, ltv)
    await metamaskExecutor(transactionInfo, "Lend and borrow")
}

// 3) repay Executor
export const metamaskRepayExecutor = async (address, activeWalletAddress, repayAmount, reclaimAmount) => {
    const transactionInfo = await createRepayTransaction(address, activeWalletAddress, repayAmount, reclaimAmount)
    await metamaskExecutor(transactionInfo, "repay")
}

// 4) approve Executor
export const metamaskApproveExecutor = async (address, activeWalletAddress, amount) => {
    const transactionInfo = await createApproveTransaction(address, activeWalletAddress, amount)
    await metamaskExecutor(transactionInfo, "approve")
}

// 5) create vault
export const metamaskCreateWalletExecutor = async (accountAddress) => {
    const transactionInfo = await createActiveWalletTransaction(accountAddress)
    await metamaskExecutor(transactionInfo, "Create Wallet")
}


// transactions
// 1) emergency repay transaction

async function createEmergencyRepayTransaction (addr,activeAddr) {

    const web3 = new Web3(window.ethereum);

    const abi ={
        "inputs": [
          {
            "internalType": "address[]",
            "name": "lendAssets",
            "type": "address[]"
          },
          {
            "internalType": "address[]",
            "name": "borrowAssets",
            "type": "address[]"
          }
        ],
        "name": "emergencyRepay",
        "outputs": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "uint256[]",
            "name": "receiveAmounts",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }

    const inputArray = [["0x0000000000000000000000000000000000000000"], 
    ["0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167"]]

    const data = await web3.eth.abi.encodeFunctionCall(abi,inputArray)

      return {
        from: addr,
        to: activeAddr,
        data,
        gas: 10000000
    }

}

// 2) lend and borrow transaction

const createLendandBorrowTransaction = async (userAccount, activeWalletAddress, depositAmount, ltv) => {

    const abi ={
        "inputs": [
          {
            "internalType": "address",
            "name": "lendToken",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "borrowToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "ltv",
            "type": "uint256"
          }
        ],
        "name": "lendAndBorrow",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "borrowAmount",
            "type": "uint256"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      }

    const inputArray = ["0x0000000000000000000000000000000000000000", 
    "0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167", 
    depositAmount, 
    ltv]

    
    const web3 = new Web3(window.ethereum);

    const data = await web3.eth.abi.encodeFunctionCall(abi,inputArray)

    return {
        from: userAccount,
        to: activeWalletAddress,
        data,
        value: window.caver.utils.toPeb(depositAmount.toString(), 'KLAY'),
        gas: 10000000
    }

}

// 3) repay transaction

const createRepayTransaction = async (address, activeWalletAddress, repayAmount, reclaimAmount) => {

    const abi ={
        "inputs": [
          {
            "internalType": "address",
            "name": "borrowToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "repayAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "lendToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "lendTokenAmount",
            "type": "uint256"
          }
        ],
        "name": "repay",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      }

      
      const web3 = new Web3(window.ethereum);

    const amountBN = web3.utils.toWei(reclaimAmount.toString(), 'ether'); // 
    const repayTrans = repayAmount * (10 ** 6) ;
    const inputArray = ["0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167",repayTrans, "0x0000000000000000000000000000000000000000",amountBN]

    const data = await web3.eth.abi.encodeFunctionCall(abi,inputArray)

    return {
        from: address,
        to: activeWalletAddress,
        data,
        gas: 10000000
    }

}

// 4) approve transaction

const createApproveTransaction = (address, activeWalletAddress, amount) =>{

    const approveAbi = 
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }


const inputArray = [activeWalletAddress, amount]

const data = window.caver.klay.abi.encodeFunctionCall(approveAbi, inputArray)      

const tokenContractAddress = "0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167"

const transactionInfo = {
    from: address,
    to: tokenContractAddress,
    data,
    gas: 5000000
  }

  return transactionInfo

}

// 5) 

async function createActiveWalletTransaction (addr) {

    const web3 = new Web3(window.ethereum);
    const vaultFactory = "0xAc37926f0df5c114E044c1CFF0B21a72F8118E10";
    const abi = {name: 'createVault',type: 'function', inputs: [{"name": "address","type": "address"}]}
    const inputArray = [addr]

    const data = await web3.eth.abi.encodeFunctionCall(abi,inputArray)

    return {
        from: addr,
        to: vaultFactory,
        data,
        gas: 5000000
    }

}




// 공통모듈

const metamaskExecutor = async (transactionInfo,message) => {
    if (typeof window.ethereum !== 'undefined') {
        // Metamask가 설치되어 있을 때
        const provider = window.ethereum;
      
        const desiredChain = {
            chainId: '0x2019',
          };
                
        provider
          .request({ method: 'eth_chainId' })
          .then((chainId) => {
            console.log('현재 연결된 체인 ID:', chainId);      
            if (chainId !== desiredChain.chainId) {
              // 연결된 체인이 원하는 체인과 다르면 체인 변경을 시도
              return provider.request({
                method: 'wallet_switchEthereumChain',
                params: [desiredChain],
              });
            }
          })
          .then(() => {
            executeMetamask(transactionInfo,message)
            // console.log('체인 변경 성공');
          })
          .catch((error) => {
            console.error('오류 발생:', error);
          });
      } else {
        console.error('Metamask가 설치되어 있지 않습니다.');
      }
}

async function executeMetamask (transactionInfo,message) {

    const web3 = new Web3(window.ethereum);

    const web3Return = await web3.eth
    .sendTransaction(transactionInfo)
    .once('transactionHash', (transactionHash) => {
    //   console.log('txHash', transactionHash);
        Toast.fire({
            icon: 'success',
            title: 'Transaction success',
            html: `<a href=https://scope.klaytn.com/tx/${transactionHash} target="_blank">detail</a>`
        })
    })
    .once('receipt', (receipt) => {
        // console.log('receipt', receipt);
        Toast.fire({
            icon: 'success',
            title: `${message} Success`,
            html: `<a href=https://scope.klaytn.com/tx/${receipt.transactionHash} target="_blank">detail</a>`
          })
    })
    .once('error', (error) => {
        // console.log('error', error);
        // alert("지불에 실패하셨습니다.");
        Toast.fire({
            icon: 'fail',
            title: error.message
        })
    }).then((txHash) => {return txHash})
    .catch((error) => console.error(error));

    return web3Return
}