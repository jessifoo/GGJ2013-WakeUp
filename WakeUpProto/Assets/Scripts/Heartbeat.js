#pragma strict


var heartbeat : float = 50.0;
var MAX_HEARTBEAT : float = 100.0;
var MIN_HEARTBEAT : float = 0.0;
@System.NonSerialized
var hb_stepSize : float = 0.1;
var HB_STEP_SIZE_ACCEL : float = 1.5;
var HEARTBEAT_START_STEP_SIZE : float = 0.1;

var SPEED_THRESHOLD_DECREASE : float = 1.0;
var SPEED_THRESHOLD_INCREASE : float = 4.0;

var HEARTBEAT_TIME_UNTIL_DECREASE : float = 1.0; //Seconds until the players heartbeat will decrease
var heartbeat_decrease_countdown : float;





function FixedUpdate () {
	var player : GameObject = GameObject.FindGameObjectsWithTag("Player")[0];
	var playerMovement = player.GetComponentInChildren(CharacterMotor).movement;
	
	//Heartbeat is decreasing:
	if ( playerMovement.velocity.magnitude < SPEED_THRESHOLD_DECREASE ) {
		heartbeat_decrease_countdown -= Time.fixedDeltaTime;
		if ( heartbeat_decrease_countdown <= 0 ){
			//Decrease the heartbeat!
			heartbeat -= 1;
		}
	} else {
		heartbeat_decrease_countdown = HEARTBEAT_TIME_UNTIL_DECREASE;
	}
	//Heartbeat is increasing:
	if ( playerMovement.velocity.magnitude > SPEED_THRESHOLD_INCREASE ) {
		heartbeat += hb_stepSize;
		hb_stepSize *= HB_STEP_SIZE_ACCEL;
	} else {
		hb_stepSize = 0.1;
	}
	
	if ( heartbeat <= MIN_HEARTBEAT ) {
		heartbeat = MIN_HEARTBEAT;
	}
	if ( heartbeat >= MAX_HEARTBEAT ) {
		heartbeat = MAX_HEARTBEAT;
	}
	
	var vign : Vignetting = player.GetComponentInChildren(Vignetting);
	vign.blurSpread = 10;
	vign.intensity = (100 - heartbeat) / 5;
	//Intensity at hb 0 = 50
	//Intensity at hb 100 = 5
	//*/
	
}

//Debug - draw the heartbeat on the gui
function OnGUI () {
	GUI.TextArea(new Rect(10, 10, 20, 20), "" + heartbeat);
}

