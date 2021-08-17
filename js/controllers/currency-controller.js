'use strict';

let gElAmount = document.querySelector('.amount');
let gElFromCurr = document.querySelector('.from-curr');
let gElToCurr = document.querySelector('.to-curr');

let gElResult = document.querySelector('.result');

function init(){
    getCurrencies(renderCurrencies)
}

function onConvert(){
    if(!gElAmount.value) return;
    getRate(renderResult, gElFromCurr.value, gElToCurr.value, gElAmount.value); 
}

function renderResult(result){
    gElResult.innerText = result + gElToCurr.value;
}

function renderCurrencies(currencies){
    let currencySelectStr = '';
    for(const currency in currencies){
        const curCurrency = currencies[currency]
        currencySelectStr += `
        <option value="${curCurrency.id}">${curCurrency.currencyName} ${curCurrency.currencySymbol}
        </option>
        `;
    }

    gElFromCurr.innerHTML = currencySelectStr;
    gElToCurr.innerHTML = currencySelectStr;
}