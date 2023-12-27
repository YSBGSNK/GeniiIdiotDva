import logo from './logo.svg';
import { useEffect, useState, useRef } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import styled from 'styled-components'

const diagnoses = ["idiot", "durak", "kretin", "norm", "talant", "genii"]
const types = ["yes", "no"];
var questions = []
const Button = styled.button`
  position: relative;
  min-height: 40px;
  min-width: 80px;
  width: 40%;
  height: 30px;
  border-radius: 10px;
  font-size: 20px;
  align-items: stretch;`;

function App() {
let b = 6
if (b == 6){
  var kek = NavigationDiv()
}

else var kek = <p>lol</p>
  return (
    <div className='App'>
      <h1>Genii Idiot</h1>
      <header className="App-header">
        <AdminPanel />
        <TryWordButton />
        {kek}
      </header>

    </div>
  );
}

function NavigationDiv() {
  const nav_quest_array = ["Do you want to add questions?", "Write Your Question", "Do you want to remove questions?", "Select a question to remove"]  
  const [answerstate, setAnswerState] = useState(0)
  const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [password, setPassword] = useState('')
  const [passaut, setPassAuth] = useState('')
  const [message, setMessage] = useState('')

  /*function handleClick(event){
    if (answerstate == 0){
      if (event.target.id != "no_button"){ 
        setAnswerState(1)
        document.getElementById("navLabel").innerText = (nav_quest_array[answerstate])
        document.getElementById("loginWrapper").style.display = "block"
      }
      else{ 
        setAnswerState(2)
        document.getElementById("navLabel").innerText = (nav_quest_array[answerstate])
      }
    }
    if (answerstate == 2){
      if (event.target.id != "no_button"){
        setAnswerState(3)
        document.getElementById("navLabel").innerText = (nav_quest_array[answerstate])
        document.getElementById("loginWrapper").style.display = "block";}
      else {
        document.getElementById("navHandler").style.display = "none"
        document.getElementById("bottomDiv").style.visibility = "visible"
      }
    }
  }*/
  const handleSubmit = async (event) =>{
    event.preventDefault()
    console.log(message)
    setPassword(message)
    //axios.get('http://95.163.228.77/api/password').then(response => { return response.data}).then(data => {setPassAuth(data)})
    try {
      const response = await fetch('http://95.163.228.77/api/password', {
        method: 'GET',
        headers: {
          Accept: 'text/html',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.text();

      console.log(result);
      setPassAuth(result);
      document.getElementById("cringe").innerText = result
    }
    finally{
      console.log('working')
    }
    let userData = { password:message, realpassword:document.getElementById("cringe").innerText}
    console.log(userData.password, userData.realpassword)
    if (userData.password == userData.realpassword){
      document.getElementById("admin_panel").style.visibility = "hidden"
      document.getElementById("AdminPanel").style.display = "block"
    }
    setPassword('')
  } 

  const handleClick = async () => {
    document.getElementById("admin_panel").style.visibility = "hidden"
    document.getElementById("bottomDiv").style.visibility = "visible"
    try {
      const response = await fetch('http://95.163.228.77/api/storage/questions', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      let a = ''
      let i = 1
      result.forEach(element => {
        a += i.toString() + '. ' + element + '\n'
        i++
      });
      document.getElementById("AdminList").innerText = a
    } finally {
      console.log('its fine');
    };

    try {
      const kal = await fetch('http://95.163.228.77/api/storage/answers', {
        method: 'GET',
        headers: {
          Accept: 'text/html',
        },
      });

      if (!kal.ok) {
        throw new Error(`Error! status: ${kal.status}`);
      }

      const troll = await kal.text();

      console.log(troll);
      document.getElementById("AdminList2").innerHTML = troll
    } finally {
      console.log('its fine 2')
    }
  };

  return (
    <div id="admin_panel">
      <p>Do you have admin access? Skip if no.</p>
      <Form onSubmit={handleSubmit}><input type="password" onChange={e=> setMessage(e.target.value)}></input></Form>
      <Button onClick={handleClick}>Skip</Button>
      <p id="cringe" style={{display:"none"}}></p>
    </div>
  );
  
}

function TryWordButton() {
  const [questnum, setQuestNum] = useState(0)
    
  const [message, setMessage] = useState('')
  const [lemmecheck, setLemmecheck] = useState(0)

  const handleChange = event => {
    setMessage(event.target.value);
  };

  async function SubmitHandler(e) {
    
    e.preventDefault();
    var questnumb = parseInt(document.getElementById("pozor").innerText)
    var starting_array = document.getElementById("AdminList").innerText.split('\n')
    var better_array = []
    starting_array.forEach((element)=> {
    better_array.push(element.slice(element.indexOf('.')+2))})
    var answers = document.getElementById("AdminList2").innerText.split(';')
    var questions = better_array
    console.log(answers, questions)
    if (message.toUpperCase() == "ДА" && questnumb == 0){
      document.getElementById("label").innerText = questions[questnumb];
      e.target.value = ''
      setMessage('')
    }
    else if (document.getElementById('label').innerText != "Начать?")
    {
      console.log(message, answers[questnumb])
      if (message == answers[questnumb]){setLemmecheck(lemmecheck+1)}
      if (questnumb == (answers.length - 1))
      {
        document.getElementById("questOp").style.visibility="hidden"
        document.getElementById("resDiv").style.display="block"
        document.getElementById("leaderboard").style.display="block"
        
      }
      else
      {
        questnumb += 1
        document.getElementById("pozor").innerText = questnumb
        document.getElementById("label").innerText = questions[questnumb];
        e.target.value = ''
        setMessage('')
      }
    }
  }
  const [tablename, setTableName] = useState('')
  const handleResults = async (event) => {
    var answers = document.getElementById("AdminList2").innerText.split(';')
    var score = Math.round(lemmecheck / answers.length * 5) + '/' + answers.length
    var diagnosis = diagnoses[Math.round(lemmecheck / answers.length * 5)]
    document.getElementById("itogi").innerText = "Диагноз: " + diagnoses[Math.round(lemmecheck / answers.length * 5)] + ', ' + score
    var jsonData = {"name":tablename, "score":score, "diagnosis":diagnosis}
    console.log(jsonData)
    event.preventDefault()
    //otpravlyatm datu
    fetch('http://95.163.228.77/api/leaderboard', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(jsonData)
    }).then(response => {return response.data})
    try {
      const response = await fetch('http://95.163.228.77/api/leaderboard', {
        method: 'GET',
        headers: {
          Accept: 'text/html',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.text();

      console.log(result);
      var leaderboard = ''
      var nametext = ''
      var scoretext = ''
      var diagtext = ''
      var wraptheresult = result.split('\n')
      wraptheresult.forEach((element) => {
        var step = element.split(',')
        if (step == ""){return}
        console.log(step)
        nametext = nametext + step[0] + '\n'
        scoretext = scoretext + step[1] + '\n'
        diagtext = diagtext + step[2] + '\n'
      })
      document.getElementById('namediv').innerText = nametext
      document.getElementById('scorediv').innerText = scoretext
      document.getElementById('diagdiv').innerText = diagtext
    }
    finally{
      console.log('working')
    }
    document.getElementById('leaderlabel').style.display = "none"
    document.getElementById('leaderform').style.display = "none"

  }
  return (
  <div id="bottomDiv" style={{visibility:"hidden", width:700+'px'}}>
    <div id="resDiv" style={{display:"none"}}>
      <p id="itogi" style={{position:"absolute",left: 45+'%', top:25+'%'}}></p>
    </div>
    <div id="questOp">
    <h1 id="label" style={{marginBlockStart:0.1 + "em", marginBlockEnd:0.1 + "em"}}>Начать?</h1>
    <p id="lemmecheck" style={{marginBlockStart:0.1 + "em", marginBlockEnd:0.1 + "em"}}>{lemmecheck}</p>
    <p id="pozor" style={{display:"none"}}>0</p>
    <form onChange={handleChange} onSubmit={SubmitHandler}><input value={message} id="input" type="text" name="input" /></form>
    </div>
    <div id="leaderboard" style={{display:"none"}}>
      <p id="leaderlabel" >Enter your Name</p>
      <div id="boarditself">
        <p style={{position:"absolute", width:200+'px', top:35+'%', left:30+'%'}} id="namediv"></p>
        <p style={{position:"absolute", width:200+'px', top:35+'%', left:45+'%'}}id="scorediv"></p>
        <p style={{position:"absolute", width:200+'px', top:35+'%', left:60+'%'}}id="diagdiv"></p>
      </div>
      <form id="leaderform" onSubmit={handleResults}><input type="text"  onChange={e => setTableName(e.target.value)}></input></form>
    </div>
  </div>
  );
}
function AdminPanel(){
  const [message, setMessage] = useState('')
  const [question, setQuestion] = useState('')
  const [answerstate, setAnswerState] = useState(0)
  const [datakal, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  var questions = {0:"Do you want to add Questions?", 1:"Enter your question", 2:"Enter the answer", 3:"Do you want to remove question?", 4:"Choose a question to remove:"}
  // handle submit formi admina
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (answerstate == 1){
      setQuestion(message)
      setMessage('')
      setAnswerState(2)
      return
    }
    if (answerstate == 2){ 
      // Otpravka voprosa i otveta na server
      var jsonData = {"questions":question,"answers":message}
      console.log(jsonData)
      fetch("http://95.163.228.77/api/storage", {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonData)
      }).then(response => {return response.data}).then(data => {console.log(data)})
      console.log(jsonData)
      setMessage('')
      setAnswerState(3)
      document.getElementById("knopki").style.visibility = "visible"
      document.getElementById("AdminForm").style.visibility = "hidden"

      return
    }
    else{
      //Udalenie voprosa posle vvoda ego nomera
      let remover_index = parseInt(message)
      var starting_array = document.getElementById("AdminList").innerText.split('\n')
      var answers_array = document.getElementById("AdminList2").innerText.split(';')
      console.log(starting_array)
      console.log(answers_array)
      var better_array = []
      var respectable_array = []
      starting_array.forEach((element)=> {
        if (element != starting_array[remover_index-1]){
        better_array.push(element.slice(element.indexOf('.')+2))}})
      answers_array.forEach((element)=> {
        if (element != answers_array[remover_index-1]){
          respectable_array.push(element)
        }
      })
      let r = ''
      let i = 1
      better_array.forEach(element => {
        r += i.toString() + '. ' + element + '\n'
        i++
      });
      document.getElementById("AdminList").innerText = r
      document.getElementById("AdminList2").innerText = respectable_array.join(';')
      var jsonData = {"questions":better_array, "answers": respectable_array }

      console.log(jsonData)
      fetch("http://95.163.228.77/api/storage/rewrite", {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonData)
      }).then(response => {return response.data}).then(data => {console.log(data)})
      setMessage('')
      document.getElementById("AdminForm").style.display = "none"
      document.getElementById("AdminPanel").style.display = "none"
      document.getElementById("bottomDiv").style.visibility = "visible"
    }
  }
  //Kliki po knopkam admina
  const handleClick = async (event) => {
    if (answerstate == 0)
    {
      if (event.currentTarget.id == "AdminYes"){
        document.getElementById("AdminForm").style.visibility = "visible"
        document.getElementById("knopki").style.visibility = "hidden"
        document.getElementById("AdminLabel").innerText = questions[1]
        setAnswerState(1)
      }
      else {
        setAnswerState(3)
      }
    }
    else if (answerstate == 3){
      if (event.currentTarget.id == "AdminYes"){
        setAnswerState(4)
        document.getElementById("knopki").style.visibility = "hidden"
        document.getElementById("AdminForm").style.visibility = "visible"

        // Podgruzka voprosov i otvetov
        try {
          const response = await fetch('http://95.163.228.77/api/storage/questions', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });
          
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
    
          const result = await response.json();
          let a = ''
          let i = 1
          result.forEach(element => {
            a += i.toString() + '. ' + element + '\n'
            i++
          });
          document.getElementById("AdminList").innerText = a
        } catch (err) {
          setErr(err.message);
        } finally {
          setIsLoading(false);
        };

        try {
          const kal = await fetch('http://95.163.228.77/api/storage/answers', {
            method: 'GET',
            headers: {
              Accept: 'text/html',
            },
          });
    
          if (!kal.ok) {
            throw new Error(`Error! status: ${kal.status}`);
          }
    
          const troll = await kal.text();
    
          console.log(troll);
          let d = ''
          let b = troll.split(';')
          console.log(d)
          document.getElementById("AdminList2").innerHTML = troll
          console.log(troll)
          setData(troll);
          console.log(datakal)
        } catch (err) {
          setErr(err.message);
        } finally {
        }
      }
      else{
        document.getElementById("AdminForm").style.display = "none"
        document.getElementById("AdminPanel").style.visibility = "hidden"
        document.getElementById("bottomDiv").style.visibility = "visible"
      }
    }

  }
  return (
    <div id="AdminPanel" style={{visibility:"visible", display:"none"}}>
      <p id="hiddenContainerQ" style={{visibility:"visible", display:"none"}}></p>
      <p id="AdminList2" style={{visibility:"visible", display:"none"}}></p>
      <p id="AdminLabel">{questions[answerstate]}</p>
      <p id="AdminList"></p>
      <div id="knopki">
        <Button id="AdminYes" onClick={handleClick}>Yes</Button>
        <Button id="AdminNo" onClick={handleClick}>No</Button>
      </div>
      
      <Form id="AdminForm" style={{visibility:"hidden"}} onSubmit={handleSubmit}><input type="input" value={message} onChange={e=>setMessage(e.target.value)}></input></Form>
    </div>
  )
}
export default App;
/*
import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from 'react';
import styled from 'styled-components'



function App() {
  return (
    <div className="App">
     
    </div>
  );
}



export default App;*/
