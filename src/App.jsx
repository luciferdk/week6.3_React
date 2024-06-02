// * useState, recondition
/*
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      
    </>
  )
}

export default App
*/

//! ===============================================

//* useEffect
//? when you calculate bankData and exchangeData without use effect you might see many rerendering happens doesn't even need
//todo to check it comment the useEffect code and uncomment the both bankData and exchangeData timeout code and run do you see on something in console OR react developer tool then uncomment useEffect code and comment timeout code and see the difference how rerender unnecessary happens!
/*
import { useEffect, useState } from 'react'

function App() {
  const [exchangeData, setExchangeData] = useState({});
  const [bankData, setBankData] = useState({});


console.log("hi");

useEffect(() => {
  setTimeout(() => {
    setBankData({ income: 100 });
  }, 3000);


  setTimeout(() => {
    setExchangeData({
      returns: 100
    });
  }, 1000);
}, [])

  // setTimeout(() => {
  //   setBankData({ income: 100 });
  // }, 3000);

  // console.log("hu");

  // setTimeout(() => {
  //   setExchangeData({
  //     returns: 100
  //   });
  // }, 1000);




  // fetch("https://google.com", async (res) => {
  //   const json = await res.json();
  //  setBankData(json);
  //   // Assume it is { income: 100 }
  // });




  const incomeTax = (bankData.income + exchangeData.returns) * 0.3;
// console.log("hi");
  return (
    <div>
      hi there, your income tax returns are {incomeTax}
    </div>
  )
}

export default App
*/

//! ============================================
//* useMemo

/* import { useEffect, useMemo, useState } from 'react'

function App() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    // Some operation to get the data
    setExchange1Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setExchange2Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setTimeout(() => {
      setBankData({
        income: 100
      });
    }, 5000)
  }, [])

  // const cryptoReturns = exchange1Data.returns + exchange2Data.returns; //there is bug this code line twice first itself but then is run's because bank data purt after some time so we need to memorize the data on this to avoid expensive calculation again happend
    const cryptoReturns = useMemo(() => {
      return exchange1Data.returns + exchange2Data.returns;
    }, [exchange1Data, exchange2Data]);
  
  const incomeTax = (cryptoReturns + bankData.income) * 0.3

  return (
    <div>
        hi there, your income tax returns are {incomeTax}
    </div>
  )
}

export default App */

//! ====================================================================
//* useCallback

/* import { useEffect, useMemo, useState } from 'react'

function App() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    // Some operation to get the data
    setExchange1Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setExchange2Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setTimeout(() => {
      setBankData({
        income: 100
      });
    }, 5000)
  }, [])

  //? useCallback is not about minimizing the amount of code that is run
  //? useCallback is about not rendering a child,  if the function hasn't/doesn't need to change across renders
  const calculateCryptoReturns = function () {
    return exchange1Data.returns + exchange2Data.returns;
  }



  return (
    <div>
      <CrptoGainCalcuator calculateCryptoReturns  = {calculateCryptoReturns} />
    </div>
  )
}

function CrptoGainCalcuator ({calculateCryptoReturns}) {
  return <div>
    your crypto return are {calculateCryptoReturns()}
  </div>
}

export default App */

//! =================================================================
//* memo
//? when you use memo you also need useCallbacks to use. 
/* import { useEffect, useMemo, useState, memo, useCallback} from 'react'

function App() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    // Some operation to get the data
    setExchange1Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setExchange2Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setTimeout(() => {
      setBankData({
        income: 100
      });
    }, 5000)
  }, [])

  // const calculateCryptoReturns = function () {
  //   return exchange1Data.returns + exchange2Data.returns;
  // }

  const calculateCryptoReturns = useCallback( function () {
    return exchange1Data.returns + exchange2Data.returns;
  },[exchange1Data, exchange2Data])

  return (
    <div>
      <CryptoGainCalculator calculateCryptoReturns={calculateCryptoReturns} />
    </div>
  )
}

const CryptoGainCalculator = memo(function ({ calculateCryptoReturns }) {
  console.log("hi child re-render");
  return <div>
    your crypto return are {calculateCryptoReturns()}
  </div>
})

export default App */

//! =================================================================

//useRef
//? To override the function to use useRef
import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const divRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      divRef.current.innerHTML = "10"
    }, 5000);
  }, [])

  const incomeTax = 20000;

  return (
    <div>
        hi there, your income tax returns are <div ref={divRef}>{incomeTax}</div>
    </div>
  )
}

export default App