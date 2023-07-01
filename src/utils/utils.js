/*
 * @Author: mouse
 * @Date: 2023-06-16 13:06:18
 * @LastEditTime: 2023-06-16 13:06:40
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /telegram_demo/src/utils/utils.js
 * @project: 
 */
export const  formatBalance = (str, bit = 5)=> {
    let strIndex = str.indexOf('.');
    if (strIndex === -1) return str;
    str = str.substring(0, strIndex + bit + 1);
    return parseFloat(str);
  }