/*
 * @Author: mouse
 * @Date: 2023-06-15 14:44:59
 * @LastEditTime: 2023-07-01 15:15:45
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /telegram_demo/src/utils/service.js
 * @project: 
 */
import {tokenList} from "@/config";
import {ethers, Contract} from 'ethers';
import QRCode from 'qrcode'
import {formatBalance} from "./utils";
import tokenAbi from "@/config/abi/token";
import {Mmtg} from "@mixmarvel/mmsdk_tg";
export default class service{
    constructor(){
       this.mmtg = new Mmtg(
        {
            env:0,
            appId:"wa49527qfb892z94",
            mockData:{
               id:"11223342",
               username:"test001"
            }
        }
       );
    }

    static getInstance() {
        if (!service.instance) {
            const ins = new service();
            service.instance = ins;
        }
        return service.instance;
    }

    async init(){
        await this.mmtg.init();
    }

    async login(){
     await this.mmtg.createDid();
    }

    async isUnlock(){
        return await this.mmtg.isDidCreated();
    }

    async initSmartAccount(){
        await this.mmtg.initSmartAccount();
    }

     getQrcode(){
        return  QRCode.toDataURL(this.user.address)
    }

    getTokenList(){
        let tokens = tokenList(import.meta.env.VITE_APP_ENV);
        tokens.forEach(item => {
            item.balance = 0;
        });
        return tokens;
    }

    async getUserInfo(){
        let info = await this.mmtg.getDidInfo();
        //TODO server验证sdk中的信息，并返回自己的信息
        this.user = info;
        console.log(info);
    }

    async loadMultiBalance(tokens){
        let decimals = [];
        let promises = [];
        for(let i in tokens){
            decimals.push(tokens[i].decimals);
            promises.push(this.getbalance(tokens[i].address));
        }
        let balances = await Promise.all(promises);
        for(let i in tokens){
            tokens[i].balance = formatBalance(ethers.utils.formatUnits(balances[i], decimals[i]));
        }
        return tokens;
    }

    async getbalance(address){
        const erc20Interface = [
            "function balanceOf(address _owner) public view returns (uint256 balance)",
          ];
          const erc20Contract = new Contract(
            address,
            new ethers.utils.Interface(erc20Interface),
            this.mmtg.smartAccount.getProvider()
          );
        return await erc20Contract.balanceOf(this.user.address);
    }

    async transferToken(token, to, num, decimals){
        const tokenInterface = new ethers.utils.Interface(tokenAbi)
        let amount = ethers.utils.parseUnits(num, decimals)
        const data = tokenInterface.encodeFunctionData('transfer', [to, amount.toString()])
        let tx = {
            to:token,
            data,
            value: ethers.utils.parseEther("0").toHexString(),
        };
        await this.estimateFee(tx);

        
        const response = await this.mmtg.smartAccount.sendTransaction(tx); // Send Transaction
        const receipt = await response.wait(); // Got Transaction Receipt
    }


    async estimateFee(tx){
        const {
        isFeeRequired, // whether required fee for the transaction
        feeOptions, // the fee options
        } = await this.mmtg.smartAccount.simulateTransaction(tx);
        //TODO
        if(isFeeRequired){

        }
    }
}
