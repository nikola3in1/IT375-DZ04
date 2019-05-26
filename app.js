let state = {
    motors: {
        "motor1": null,
        "motor2": null,
        "motor3": null,
        "motor4": null,
        "motor5": null,
        "motor6": null
    },
    speed: 0
};
let client = new WebClient();

function activateMotor(event) {
    let motorId = getMotor(event);
    let value = state.motors[motorId];
    if (value != null) {
        //Deactivate motor
        state.motors[motorId] = null;
    } else {
        //Activate motor
        state.motors[motorId] = 0;
    }
}

function increment(event) {
    let motor = getMotor(event);
    let currVal = state.motors[motor];
    if (currVal == null) {
        showMessage("Motor: " + motor + " is not activated.")
        return;
    }
    if (validate(currVal, motor)) {
        state.motors[motor]++;
    } 
    console.log(state.motors)
}

function decrement(event) {
    let motor = getMotor(event);
    let currVal = state.motors[motor];
    if (currVal == null) {
        showMessage("Motor: " + motor + " is not activated.")
        return;
    }
    if (validate(--currVal, motor)) {
        state.motors[motor]--;
    } 
    console.log(state.motors)
}

function update() {
    updateSlider();
    client.sendData(state);
}
function updateSlider() {
    let sliderVal = $('#slider')[0].value;
    sliderVal /= 11;
    sliderVal = parseInt(sliderVal) + 1;
    state.speed = sliderVal;
}

function validate(value, motor) {
    //Min value for motor position
    let minMotorValue = 0;
    //Max value for motor position
    let maxMotorValue = 180;

    //Check if motor is activated, check the value range
    if (value >= minMotorValue && value < maxMotorValue) {
        console.log("OKEJ")
        return true;
    }else{
        showMessage("Motor: " + motor + " value must be >= to" + minMotorValue + " and less than " + maxMotorValue);
        return false;
    }
}

function getMotor(event) {
    //Returns motor name from event object
    //NOTE: Motor class must be first in the html class tag
    return event.srcElement.classList[0];
}

function showMessage(message) {
    //TODO: add message to dom
    console.log(message);
}