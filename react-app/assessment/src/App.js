import './App.css';
import txt_data from './LHR_CDG_ADT1_TYPE_1.txt'
import {useState} from 'react'
function App() {
  const [data,setData] = useState({'flightOffer':[],'message':''});
  const [from,setFrom] = useState("LHR");
  const [to,setTo] = useState("CDG");
  const [date,setDate] = useState(new Date());
  const [dayPlus,setDayPlus] = useState(0);
  const [dayMinus,setDayMinus] = useState(0);
  const [time,setTime] = useState("Anytime")

  
  function handleSubmit(e){
    e.preventDefault();
    console.log(from,to,date,dayPlus,dayMinus,time)
    fetch(txt_data)
    .then(f => f.text())
    .then(txt => JSON.parse(txt))
    .then(json => setData(json))
  }
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="FROM" value={from} onChange={e => {setFrom(e.target.value.toUpperCase())}} />
        <input type="text" placeholder="TO" value={to} onChange={e => {setTo(e.target.value.toUpperCase())}} />
        <input type="date" value={date} onChange={e=>{setDate(e.target.value)}}/>
        <select value={dayPlus} onChange={e => {setDayPlus(e.target.value)}}>
          <option value={0}>Date+</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <select value={dayMinus} onChange={e => {setDayMinus(e.target.value)}}>
          <option value={0}>Date-</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <select value={time} onChange={e => {setTime(e.target.value)}}>
            <option value="Anytime">Anytime</option>
            <option value="00:00">00:00</option>
            <option value="01:00">01:00</option>
            <option value="02:00">02:00</option>
            <option value="03:00">03:00</option>
            <option value="04:00">04:00</option>
            <option value="05:00">05:00</option>
            <option value="06:00">06:00</option>
            <option value="07:00">07:00</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            
          </select>
        <input type="submit" value="Submit" className="submit"/>
      </form>
      <h3>{data['message']}</h3>
      <table cellSpacing="0">
        <tr className="headers">
          <th style = {{"width":"10%"}}>FLIGHT</th>
          <th style = {{"width":"10%"}}>AIRCRAFT</th>
          <th style = {{"width":"5%"}}>CLASS</th>
          <th style = {{"width":"10%"}}>FARE</th>
          <th style = {{"width":"15%"}}>ROUTE</th>
          <th style = {{"width":"15%"}}>DEPARTURE</th>
          <th style = {{"width":"15%"}}>ARRIVAL</th>
          <th>-</th>
          <th style = {{"width":"9%"}}>DURATION</th>
          <th style = {{"width":"10%"}}>PRICE</th>
        </tr>
        {data['flightOffer'].map((item1,i)=>{
          let fareBasis = item1['fareBasis'][0]
          let classes = item1['class'][0]
          let seats = item1['seat']
          let price = item1['price']
          let duration = item1['itineraries'][0]['duration']
          let rowClass = 'even'
          if(i%2==1){
            rowClass = 'odd'
          }
          return <tr className={rowClass}><td colspan = "10"><table className = "innerTable">
          {item1['itineraries'][0]['segments'].map((item2,j)=>{
            return <tr>
              <td style = {{"width":"10%"}}>{`${item2['carrierCode']} ${item2['aircraft']}`}</td>
              <td style = {{"width":"10%"}}>{`${item2['flightNumber']}`}</td>
              <td style = {{"width":"5%"}}>{`${classes[j]}`}</td>
              <td style = {{"width":"10%"}}>{`${fareBasis[j]}`}</td>
              <td style = {{"width":"15%"}}>{`${item2['departure']['iataCode']} - ${item2['arrival']['iataCode']}`}</td>
              <td style = {{"width":"15%"}}>{`${item2['departure']['at']}`}</td>
              <td style = {{"width":"15%"}}>{`${item2['departure']['at']}`}</td>
              <td>-</td>
              {j==0?<td style = {{"width":"9%"}}>{duration}</td>:<td style = {{"width":"9%"}}></td>}
              {j==0?<td style = {{"width":"10%"}}>{price}</td>:j==1?<td style = {{"width":"10%"}}><button className='select'>Select</button></td>:<td></td>}
            </tr>
          })}
          </table></td></tr>
        })}
      </table>
    </div>
  );
}

export default App;
