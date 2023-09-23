import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import {v4} from 'uuid'



function App() {
  const [userinfo, setUserinfo] = useState([])
  const [searchName, setSearchName] = useState('')
  const LOCAL_STORAGE_KEY="history"
  const [final, setFinal] = useState('')

  const [toggle, setToggle] = useState(false)
  
  const [history,setHistory]=useState(()=>{
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))||[]
  })
  const getdetail = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      const data = response.data
      setUserinfo(data)
    }
    catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    getdetail()
  }, [])
  const show = (e) => {

    e.preventDefault()
    setFinal(searchName)
    if(searchName!=''){
      setHistory([...history,searchName])
      
      
    }
    
  }
  // useEffect(()=>{
  //   if(final!='')
  //   {setHistory([...history,{id:v4(),name:final}])}
  // },[final])
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(history))
    console.log("history")
  },[history])
  const sorting = () => {
    var strascending
    if (toggle) {
      strascending = [...userinfo].sort((a, b) =>
        a.name > b.name ? 1 : -1,);

    }
    else {
      strascending = [...userinfo].sort((a, b) =>
        a.name > b.name ? -1 : 1,);

    }
    setToggle(!toggle)
    setUserinfo(strascending)
  }
  const clear=()=>{
    setHistory([])
  }
  return (
    <>
      <form className='form my-auto mx-auto w-25 mt-5'>
        <div className="input-group   mt-3">
          <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="form-control" placeholder="Name" />
          <div className="input-group-append">
            <button onClick={show} className="btn btn-outline-dark"><ion-icon name="search" ></ion-icon></button>
          </div>
        </div>

        {/* <input type='text' value={searchName} onChange={(e)=>setSearchName(e.target.value)} placeholder='Search'/>
      <button onClick={show} className='btn btn-outline-dark'><ion-icon name="search"></ion-icon></button> */}
      </form>
      <br />
      <div className='container'>
        <button onClick={sorting} className='btn btn-none '>Sort <ion-icon name="chevron-expand-sharp" className='sort'></ion-icon></button>
        <div className='row'>
          <div className='col'>
              {userinfo?.filter((info) => {
                return final.toLocaleLowerCase() === '' ? info : info.name.toLowerCase().includes(final);
              })
              .map((info) => {
                return <div className=" container  my-5 bg-info" key={info.id}>
                    <div className="card ">
                      <div className="card-body ">
                        <div className="card-title big h4  ">{info.name}</div>
                        <div className="card-text ">Username: {info.username}</div>
                        <div className="card-text ">Phone: {info.phone}</div>
                        <div className="card-text ">Email: {info.email}</div>
                      </div>
                    </div>
                  </div>
                })}
            </div>
          <div className='col'>
            <div className="container ">
              <div className="h4 mx-auto text-center">History</div>
              <div className='block'> 
              <div className="chip btn btn-outline-dark block " type="button "onClick={clear}> Clear all</div>
              </div>
              <br/>
              <div>
                
                {history.map((item)=>{
                  return <>
                  <div>
                    {item}
                    </div>
                  
                  </>
                  
                })}
                
              </div>
            </div>
          </div>
          
        </div>
      </div>


      {/* {userinfo.length}
      {userinfo[0].name} */}
    </>
  )
}

export default App
