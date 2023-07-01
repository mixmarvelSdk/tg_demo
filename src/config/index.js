/*
 * @Author: mouse
 * @Date: 2023-06-15 13:46:58
 * @LastEditTime: 2023-07-01 11:38:48
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /telegram_demo/src/config/index.js
 * @project: 
 */
import usdcimage from "@/assets/USDC.png"
import t88image from "@/assets/T88.png"
import rpgimage from "@/assets/RPG.png"
export const CHAIN_CONFIG = {
    9527:{
        displayName:"Rangers",
        tickerName: "robin",
        chainId: 9527,
        rpcTarget: "https://robin.rangersprotocol.com/api/jsonrpc",
        decimal: 18,
        rpcUrl: "https://robin.rangersprotocol.com/api/jsonrpc",
        explorer: "https://robin-rangersscan.rangersprotocol.com/",
      }
  };

  export const tokenAddress = {
    local:{
        USDC:"0x85253215512F7eBE28A483699A1320f21a282c63",
        T88:"0xd3A7c2c8EE2Fb075C9630e3e93A273C7D27382D0"
    },
    dev:{
        USDC:"0x85253215512F7eBE28A483699A1320f21a282c63",
        T88:"0xd3A7c2c8EE2Fb075C9630e3e93A273C7D27382D0"
    }
  }


  export const tokenList = (env) => {
    const addressList = tokenAddress[env];
    return [

        {
            address: addressList.USDC,
            symbol: "USDC",
            decimals: 18,
            image: usdcimage,
        },
        {
            address: addressList.T88,
            symbol: "T88",
            decimals: 18,
            image: t88image,
        },
    ]
}

export const offRampCryptoList = [
    {
        name:"RPG",
        image:rpgimage
    }
]
