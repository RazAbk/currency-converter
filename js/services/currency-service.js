'use strict';

const gCurrenciesCache = loadFromStorage('currenciesDB') || {};



function getRate(onSuccess, fromCurr, toCurr, amount){
    // Render from cache (local storage)
    
    if(gCurrenciesCache && gCurrenciesCache[`${fromCurr}_${toCurr}`]){
        var passedTime = new Date() - Date.parse(gCurrenciesCache[`${fromCurr}_${toCurr}`].timeStamp);
    }

    // Time stamp check is 5 minutes
    if(gCurrenciesCache && gCurrenciesCache[`${fromCurr}_${toCurr}`] && (passedTime && passedTime < (5*60*1000))){
            console.log('load from cache')
            const rate = gCurrenciesCache[`${fromCurr}_${toCurr}`].rate;
            onSuccess(rate*amount);
            return;
    } else{   
        console.log('load from api')
        axios.get(`https://free.currconv.com/api/v7/convert?q=${fromCurr}_${toCurr}&compact=y&apiKey=bfe964fcd3b43ab4dfb4`)
            .then(res=>{
                const rate = res.data[Object.keys(res.data)[0]]['val'];
            
                // Save to cache (local storage)
                gCurrenciesCache[`${fromCurr}_${toCurr}`] = {rate, timeStamp: new Date()};
                saveToStorage('currenciesDB', gCurrenciesCache);
            
                onSuccess(rate*amount);
            })
            .catch(err=>{
                console.log('Cannot reach server: ' + err);
            });
    }
}


function getCurrencies(onSuccess){
    axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=bfe964fcd3b43ab4dfb4`)
        .then(res=>{
            onSuccess(res.data.results);
        })
        .catch(err=>{
            console.log('Cannot reach server: ' + err);
        });
}


