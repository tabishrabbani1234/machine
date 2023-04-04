package com.morphleLabs.machine.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.morphleLabs.machine.domain.Machine;

@Component
@RestController
@RequestMapping("/morphleLabs")
public class MachineController {
    Machine machine;
    public static boolean initialized = false;
    @GetMapping(value="/morphleLabs")
    @ResponseStatus(HttpStatus.OK)
    public String machineControllerInitializer() {
        return "Hello Boy";
    }
    @PostMapping(value="/morphleLabs")
    @ResponseStatus(HttpStatus.OK)
    public String machineController(ModelMap model, @RequestHeader(value="timeStamp") long timeStamp, @RequestHeader(value="eventType") String eventType) {
        if(!initialized){
            machine = new Machine();
            initialized = true;
        }
        machine.updateEventList(eventType, timeStamp);
        model.put("machineState" , Machine.state);
        model.put("eventTime" , Machine.eventTime);
        model.put("rowIndex" , machine.row_pos);
        model.put("colIndex" , machine.col_pos);
        return "Updated Machine State";
    }
}
