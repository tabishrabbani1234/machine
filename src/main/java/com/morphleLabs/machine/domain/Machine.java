package com.morphleLabs.machine.domain;

import java.util.List;
public class Machine {
    public long eventTimeStamp;
    public String machineState;
    public int machineRowIndex;
    public int machineColIndex;
    public long  machineTimeStamp;
    public String eventListStatus;

    public final void updateEventList(List<String> eventList){
        if(this.eventTimeStamp < this.machineTimeStamp){
            this.eventListStatus = MachineConstants.wait;
        } else{
            this.updateMachineState(eventList);
            this.updateMachinePosition(eventList);
            this.updateTimeStamp();
            this.eventListStatus = MachineConstants.clear;
        }
    }
    public final void updateMachinePosition(List<String> eventList){
        for(int i=0;i<(eventList.size());i++){
            if(eventList.get(i).equals(MachineConstants.leftArrow)){
                this.machineColIndex -= 1;
            } else if(eventList.get(i).equals(MachineConstants.rightArrow)){
                this.machineColIndex += 1;
            } else if(eventList.get(i).equals(MachineConstants.upArrow)){
                this.machineRowIndex -= 1;
            } else if(eventList.get(i).equals(MachineConstants.downArrow)){
                this.machineRowIndex += 1;
            }
        }
    }
    public final void updateTimeStamp(){
        if(this.machineState.equals(MachineConstants.focus)){
            this.machineTimeStamp = this.eventTimeStamp + 3000;
        } else if(this.machineState.equals(MachineConstants.capture)){
            this.machineTimeStamp = this.eventTimeStamp + 2000;
        }
    }
    public final void updateMachineState(List<String> eventList){
        if(eventList.size() == 1){
            if(this.machineTimeStamp == this.eventTimeStamp && this.machineState.equals(MachineConstants.focus)){
                this.machineState = MachineConstants.capture;
            } else if(this.machineTimeStamp == this.eventTimeStamp && this.machineState.equals(MachineConstants.capture)){
                this.machineState = MachineConstants.idle;
            } else {
                this.machineState = MachineConstants.focus;
            }
        } else {
            this.machineState = MachineConstants.focus;
        }
    }
}
