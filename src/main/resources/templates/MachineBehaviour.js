"use strict";
var eventType;
var machineState;
var eventTimeStamp;
var machineRowIndex = 10;
var machineColIndex = 30;
var machineTimeStamp = 0;
function upArrowClick(){
   eventType = "Move Up";
   removeGridElementStyle();
   addGridElementStyle();
   requestHandlerFunction();
}
function leftArrowClick(){
   eventType = "Move Left";
   removeGridElementStyle();
   addGridElementStyle();
   requestHandlerFunction();
}
function rightArrowClick(){
   eventType = "Move Right";
   removeGridElementStyle();
   addGridElementStyle();
   requestHandlerFunction();
}
function downArrowClick(){
   eventType = "Move Down";
   removeGridElementStyle();
   addGridElementStyle();
   requestHandlerFunction();
}
function getTimeStamp(event) {
  eventTimeStamp = Math.floor(event.timeStamp);
}

function addGridElementStyle() {
    var count = ((machineRowIndex-1) * 60) + machineColIndex ;
    var cell = ("div").concat(count.toString());
    var div = document.getElementById(cell);
    div.focus();
    div.style.background = "green";
    if(machineState == "Focusing"){
       div.style.border-style = "dashed";
    } else if(machineState == "Capturing"){
       div.style.border-style = "solid";
    } else {
       div.style.border-style = "none";
    }
}

function removeGridElementStyle() {
    var count = ((machineRowIndex-1) * 60) + machineColIndex ;
    var cell = ("div").concat(count.toString());
    var div = document.getElementById(cell);
    div.style.background = "white";
    div.style.border-style = "none";
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
     addGridElementStyle();
     requestHandlerFunction();
}

function requestHandlerFunction(){
      const xhr = new XMLHttpRequest();
      var url = ("http://localhost:8080/morphleLabs");
      xhr.setRequestHeader('timeStamp', eventTimeStamp);
      xhr.setRequestHeader('eventType', eventType);
      xhr.open("POST", url, true);
      xhr.send();
      xhr.onload = () => {
        if (xhr.status == 200) {
          const timeStamp = xhr.getResponseHeader("eventTime");
          const state = xhr.getResponseHeader("machineState");
          const x_pos = xhr.getResponseHeader("rowIndex");
          const y_pos = xhr.getResponseHeader("colIndex");
          responseHandlerFunction(timeStamp, state, x_pos, y_pos);
        } else {
          console.log(`Error: ${xhr.status}`);
        }
      };
}
//Response Handler functions
function responseHandlerFunction(var timeStamp, var state, var x_pos, var y_pos){
     if(timeStamp !== machine.timeStamp){
         removeGridElementStyle();
         machineTimeStamp = timeStamp;
         machineRowIndex = x_pos;
         machineColIndex = y_pos;
         addGridElementStyle();
         machineState = state;
         setMachineRequestcall(machine.timeStamp);
     }
}

function setMachineRequestcall(var time){
   var currentTime = new Date();
   var timeInMilliSeconds = time - currentTime.getMilliseconds();
   window.setTimeout(requestHandlerFunction, timeInMilliSeconds);
}