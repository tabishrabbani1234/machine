package com.morphleLabs.machine.controllers;


import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import com.morphleLabs.machine.domain.Machine;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RestController
@RequestMapping("/morphleLabs")
public class MachineController {
    Machine machine;
    public static boolean initialized = false;
    @GetMapping("")
    public ModelAndView machineControllerInitializer() {
        ModelAndView mav=new ModelAndView("machineView");
        return mav;
    }
    @PostMapping(value="")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> machineController(@RequestHeader(value="eventListString") String eventListString,@RequestBody Machine machine ) {
        List<String> eventList = Arrays.asList(eventListString.split(","));
        if(machine.machineState == "Initial"){
            eventList.clear();
        }
        machine.updateEventList(eventList);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("EventListSize", String.valueOf(eventList.size()));
        responseHeaders.set("machineState" , machine.machineState);
        responseHeaders.set("machineTimeStamp" , String.valueOf(machine.machineTimeStamp));
        responseHeaders.set("rowIndex" , String.valueOf(machine.machineRowIndex));
        responseHeaders.set("colIndex" , String.valueOf(machine.machineColIndex));
        responseHeaders.set("eventListStatus" , machine.eventListStatus);
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body("Updated machine state");
    }
}
