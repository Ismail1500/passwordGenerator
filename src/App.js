import {useState, useCallback, useRef, useEffect} from 'react';
import './App.css';


function App() {



  const [length, setlength] = useState(6)
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(symbol) str += "!@#$%^&*()_+{}[]";

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char); 

    }

    setPassword(pass)

  }, [length, numberAllowed, symbol, setPassword])

  const copypass = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, symbol,passwordGenerator])

  return (
    <>



      <div className='flex justify-center items-center h-lvh bg-slate-700'>
        <div className='bg-black p-5  '>
          <div>
          <input 
          type="text" 
          value={password}
          placeholder="Password" 
          className=' p-3 rounded-lg px-16 '
          >
          </input>

          <button 
          className=' mx-3 p-3 rounded-lg bg-orange-300 '
          onClick={copypass}>Copy</button>
          </div>
          <div>
            <input 
            type="range" 
            min={6} max={20} 
            value={length} 
            className="mt-5 cursor-pointer" 
            onChange={(e) => {setlength(e.target.value)}}
            ></input>
            <label className="text-white ml-2">Length {length}</label>

            <input type="checkbox"
              className="p-2 ml-3"
              defaultChecked = {numberAllowed}
              id = "numberInput"
              onChange = {() => {
                setnumberAllowed((prev) => !prev);
              }}>

            </input>
            <label className="text-white ml-2 ">Numbers</label>

            <input type="checkbox" 
              className="p-2 ml-3" 
              defaultChecked = {symbol} 
              id = "symbolInput" 
              onChange={() => {
                  setSymbol((prev) => !prev);
                }}>
              
            </input>

            <label className="text-white ml-2 ">Symbols</label>
          </div>
        </div>


      </div>

    </>
  );
}

export default App;
