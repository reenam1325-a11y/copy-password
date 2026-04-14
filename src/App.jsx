import { useCallback, useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
const [numberAllowed , setNumberAllowed] = useState(false);
const [character , setCharater] = useState(false);
const [password, setPassword] = useState('');
const passwordInputRef = useRef(null);
const generatePassword = useCallback(() => {  
   let pass = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
 if(numberAllowed) str += '0123456789'
 if(character) str += "!@#$%^&*()_+~'`|}{[]:;?><,./-="
 for (let i = 1; i <= length; i++) {
 let char = Math.floor(Math.random() * str.length);
 pass += str.charAt(char);
}
 setPassword(pass);
}, [length, numberAllowed, character, setPassword]);

const copyPassword = useCallback(async () => {
  if (passwordInputRef.current) {
    passwordInputRef.current.select();
  }

  try {
    await navigator.clipboard.writeText(password);
  } catch (error) {
    console.error('Clipboard write failed', error);
  }
}, [password])
useEffect(() => {
  generatePassword();
}, [length, numberAllowed, character, generatePassword])

  return (
    <>
          <div className='w-full mx-5 my-5 bg-black text-orange max-w-md mx-auto text-center px-4 py-5'>

      <div className='w-full mx-5 my-5 bg-black text-orange max-w-md mx-auto text-center px-4 py-5'>
      <h1 className='text-center mx-5 my-5 text-4xl text-white font-bold' >Password Generator</h1>
      <input
        ref={passwordInputRef}
        type="text"
        value={password}
        readOnly
        onFocus={(e) => e.target.select()}
        className='bg-white text-black placeholder:text-black placeholder:opacity-75 border border-orange focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2'
        placeholder='Generated Password'
      />
      <button
        type="button"
        onClick={copyPassword}
        className='bg-orange text-black hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2 mt-4'>
        Copy
      </button>
      </div>
      <div className='flex text-sm gap-x-2 '>
      <div className='flex text-sm gap-x-2 text-white'>
        <input type="range" min="1" max="20" value={length} className='cursor-pointer' onChange={(e) => setLength(Number(e.target.value))}  />
<label>Length: {length}</label>

</div>
   <div className='flex text-sm gap-x-2 text-white'>
        <input type="checkbox" checked={numberAllowed} className='cursor-pointer' id="numInput" onChange={() => setNumberAllowed(prev => !prev)} />
<label htmlFor='numInput'> Numbers</label>

</div>
   <div className='flex text-sm gap-x-2 text-white'>
        <input type="checkbox" checked={character} className='cursor-pointer' id="charInput" onChange={() => setCharacter(prev => !prev)} />
<label htmlFor='charInput'> Characters</label>

</div>
      </div>
       </div>
    </>
  )
}
export default App
