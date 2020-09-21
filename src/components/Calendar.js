import React, { Fragment,useState } from 'react';
import {Modal,Button} from 'react-bootstrap'
import useCalendar from '../hooks/useCalendar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Calendar=()=>{

  const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();

  


  const [modalhandle, setmodalhandle] = useState(false)
  const [Data,setData]=useState([])
  
  

  const Eventmodel=()=>
  {
       
    return(
      <Modal show={modalhandle} backdrop={false} onHide={()=>setmodalhandle(!modalhandle)}>
        <Modal.Header closeButton>
          <Modal.Title>Event Schedual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: "black",fontWeight:"bold",textDecoration:"underline"}}> Exam</p>
            {       
                 Array.isArray(Data[0]) && Data[0].length?Data[0].filter((data)=>data.title=='Exam').length!=0?
                 Data[0].filter((data)=>data.title=='Exam').map((data)=> 
                  <>
                    <b>Name:-</b><label>{data.name}</label><br/>
                    <b>Date:-</b><label>{data.date}  ||  time:-  {data.time} || duration:-{data.duration}</label><br/>
                    <label>{Data.discription}</label>
                    <hr
                      style={{
                          padding:0,
                          margin:0,
                          color: "black",
                          backgroundColor: "black",
                          height: 2
                        }}
                    />
                  </>
                 )
                 :<b>No Exam</b>
                 :<b>No Exam</b>
            }

            <br/><br/>
            <p style={{color: "black",fontWeight:"bold",textDecoration:"underline"}}>Lecture</p>
            {       
                 Array.isArray(Data[0]) && Data[0].length?Data[0].filter((data)=>data.title=='Lecture').length!=0?
                 Data[0].filter((data)=>data.title=='Lecture').map((data)=> 
                  <>
                    <b>Name:-</b><label>{data.name}</label><br/>
                    <b>Date:-</b><label>{data.date}  ||  time:-  {data.time} || duration:-{data.duration}</label><br/>
                    <label>{Data.discription}</label>
                    <hr
                      style={{
                          padding:0,
                          margin:0,
                          color: "black",
                          backgroundColor: "black",
                          height: 2
                        }}
                    />
                  </>
                 )
                 :<b>No Exam</b>
                 :<b>No Exam</b>
            }


        </Modal.Body>
          <Button variant="secondary" onClick={()=>setmodalhandle(!modalhandle)}>
            Close
          </Button>
      </Modal>
    )
  }


  const dateClickHandler = Data => {
    setData(Data)
    setmodalhandle(!modalhandle)

  }


  return(
    <div>   
       <Eventmodel/>
      <table className="event">
        <tbody>
          <tr>
            <td>
                Exam:-
            </td>
            <td>
              <label className="Exam"></label>
            </td>
            <td>
                Lecture
            </td>
            <td>
              <label className="Lecture"></label>
            </td>
          </tr>
        
        </tbody>
      </table>
             

      <p>Selected Month: {`${monthNames[selectedDate.getMonth()]} - ${selectedDate.getFullYear()}`}</p>
      <table className="table">
        <thead>
          <tr>
            {daysShort.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            Object.values(calendarRows).map(cols => {
           
              return <tr key={cols[0].date}>
                {
                  cols.map(col => (
                  col.date === todayFormatted
                    ? <td key={col.date} className={`${col.classes} today`} onClick={() =>dateClickHandler(col.event)}>
                      {col.value}<br/>
                      {
                        Array.isArray(col.event) && col.event.length ?col.event[0].map((eventdata)=>{
                          return (
                                    <label className={`${eventdata.title}`} key={`${eventdata.id}`}></label>
                                  )}):""
                        }
                      </td>
                    : <td key={col.date} className={col.classes} onClick={() =>dateClickHandler(col.event)}>
                        {col.value}<br/>
                        {
                        Array.isArray(col.event) && col.event.length ?col.event[0].map((eventdata)=>{
                          return (
                                    <label className={`${eventdata.title}`} key={`${eventdata.id}`}></label>
                                  )}):""
                        }
                      </td>
                ))}
              </tr>
            })
          }
        </tbody>
      </table>
      
      <button className="button" onClick={getPrevMonth}>Prev</button>
      <button className="button" onClick={getNextMonth}>Next</button>
    </div>
  );
}

export default Calendar;