package com.morphleLabs.machine.controllers;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.morphleLabs.machine.domain.Machine;

@Component
@Controller
public class MachineController {
    Machine machine;
    public static boolean initialized = false;
    @RequestMapping(value="/", method = RequestMethod.POST)
    public String machineController(ModelMap model, @RequestParam long timeStamp, @RequestParam String eventType) {
        machine.updateEventList(eventType, timeStamp);
        model.put("machineState" , Machine.state);
        model.put("eventTime" , Machine.eventTime);
        model.put("rowIndex" , machine.row_pos);
        model.put("colIndex" , machine.col_pos);
        return "Updated Machine State";
    }
    @RequestMapping("/")
    @GetMapping(value="")
    public String machineControllerInitializer() {
        if(!initialized){
            machine = new Machine();
            initialized = true;
        }
        return "Initialized the machine";
    }
}
