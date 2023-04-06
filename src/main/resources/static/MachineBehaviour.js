var eventType;
var machineState = "Initial";
var eventTimeStamp = 0;
var machineRowIndex = 10;
var machineColIndex = 30;
var machineTimeStamp = 0;
var eventType = "Initial";
var eventList = [];
var onLoadTime = 0;
const date = new Date()
function upArrowClick(){
   eventType = "Move Up";
   eventList.push(eventType);
   removeGridElementStyle();
   addGridElementStyle();
   requestHandlerFunction();
}
function leftArrowClick(){
   eventType = "Move Left";
   eventList.push(eventType);
   removeGridElementStyle();
   addGridElementStyle();
   requestHandlerFunction();
}
function rightArrowClick(){
   eventType = "Move Right";
   eventList.push(eventType);
   removeGridElementStyle();
   addGridElementStyle();
   requestHandlerFunction();
}
function downArrowClick(){
   eventType = "Move Down";
   eventList.push(eventType);
   removeGridElementStyle();
   addGridElementStyle();
   requestHandlerFunction();
}
function getTimeStamp(event) {
  eventTimeStamp = Math.floor(Date.now()) - onLoadTime;
}

function addGridElementStyle() {
    var count = ((parseInt(machineRowIndex)-1) * 60) + parseInt(machineColIndex) ;
    var cell = ("div").concat(count.toString());
    var div = document.getElementById(cell);
    div.style.background = "green";
    if(machineState == "Focusing"){
       div.style.border = "thin dotted #000000";
    } else if(machineState == "Capturing"){
       div.style.border = "thick solid #000000";
    } else {
       div.style.border = "none";
    }
}

function removeGridElementStyle() {
    var count = ((parseInt(machineRowIndex)-1) * 60) + parseInt(machineColIndex) ;
    var cell = ("div").concat(count.toString());
    var div = document.getElementById(cell);
    div.style.background = "white";
    div.style.border = "none"
}

function createGrid(){
   for(var i = 0; i < 20; i++) {
      var row = document.createElement("div");
       for(var j = 0; j< 60; j++) {
           count = i*60 + j + 1;
           var cell = ("div").concat(count.toString());
           var div = document.createElement("div");
           div.setAttribute("id", cell);
           div.style.width = "15px";
           div.style.height = "25px";
           div.style.background = "white";
           div.style.display = "inline-block";
           row.appendChild(div);
       }
       document.getElementById("container").appendChild(row);
     }
     var elem = document.getElementById('button');
     elem.parentNode.removeChild(elem);
     elem = document.getElementById('Machine Header');
     elem.parentNode.removeChild(elem);
     machineTimeStamp = eventTimeStamp;
     onLoadTime = Date.now();
     addGridElementStyle();
     requestHandlerFunction();
}

function requestHandlerFunction(){
      eventTimeStamp -= (eventTimeStamp%100);
      const xhr = new XMLHttpRequest();
      var jsonArray = eventList.toString();
      var url = ("http://localhost:8080/morphleLabs");
      xhr.open("POST", url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.setRequestHeader("eventListString", jsonArray);
      const machineDetails = {
          "eventTimeStamp": eventTimeStamp,
          "machineState": machineState,
          "machineRowIndex": machineRowIndex,
          "machineColIndex": machineColIndex,
          "machineTimeStamp":machineTimeStamp,
          "machineState": machineState
          };
          console.log(machineDetails);
      var data = JSON.stringify(machineDetails);
      xhr.send(data);
      xhr.onload = () => {
        if (xhr.status == 200) {
          const timeStamp = xhr.getResponseHeader("machineTimeStamp");
          const state = xhr.getResponseHeader("machineState");
          const x_pos = xhr.getResponseHeader("rowIndex");
          const y_pos = xhr.getResponseHeader("colIndex");
          const eventListStatus = xhr.getResponseHeader("eventListStatus");
          responseHandlerFunction(timeStamp, state, x_pos, y_pos, eventListStatus);
        } else {
          console.log(`Error: ${xhr.status}`);
        }
      };
}
//Response Handler functions
function responseHandlerFunction(timeStamp, state, x_pos, y_pos, eventListStatus){
     if(parseInt(timeStamp) != machineTimeStamp){
         removeGridElementStyle();
         machineTimeStamp = parseInt(timeStamp);
         machineRowIndex = parseInt(x_pos);
         machineColIndex = parseInt(y_pos);
         machineState = state;
         addGridElementStyle();
         if(eventListStatus == "clear")
            eventList.length = 0;
         setMachineRequestcall(machineTimeStamp);
     } else {
        if(state = "Idle"){
            machineState = state;
            addGridElementStyle();
        }
     }
}

function updateEventTimeStamp(){
     eventTimeStamp = machineTimeStamp;
     requestHandlerFunction();
}

function setMachineRequestcall(time){
   var currentTime = Date.now() - onLoadTime;
   var timeInMilliSeconds = time - currentTime;
   //console.log(currentTime, " ", time);
   window.setTimeout(updateEventTimeStamp, timeInMilliSeconds);
}