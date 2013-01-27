var maximumHitPoints = 100.0;
var hitPoints = 100.0;

var heartRate : float = 100.0;
var MAX_HEARTBEATS : float = 100.0;
var MIN_HEARTBEATS : float = 0.0;
var deathOn : boolean;

var DELAYED_START : float = 2.0;

private var deltaHeartRate : float;

// Player attributes
private var player : GameObject;
private var playerMovement : CharacterMotorMovement;
private var playerSpeed : float;
private var maxSpeed : float;
private var currentLevel : int;

// Visual Effect
private var vignette : Vignetting;

// private vars for the different weapons
private var bareHand : BareHand;

function Awake () {
	// Weapons
	bareHand = GetComponentInChildren(BareHand);
	
	// Player values
	player = GameObject.FindGameObjectWithTag("Player");
	playerMovement = player.GetComponentInChildren(CharacterMotor).movement;
	maxSpeed = player.GetComponent(CharacterMotor).movement.maxForwardSpeed;
	
	vignette = player.GetComponentInChildren(Vignetting);
	vignette.blurSpread = 10;
	
	currentLevel = Application.loadedLevel;
	
	playerMaxSpeedWalking = playerMovement.maxForwardSpeed;
}

// For Heart Rate
private var playerMaxSpeedWalking : float;
var playerMaxSpeedRunning : float;
function FixedUpdate () { 
	//Controls added on:
	if ( Input.GetKey(KeyCode.LeftShift) ) {
		playerMovement.maxForwardSpeed   = playerMaxSpeedRunning;
		playerMovement.maxBackwardsSpeed = playerMaxSpeedRunning;
		playerMovement.maxSidewaysSpeed  = playerMaxSpeedRunning;
		maxSpeed = playerMaxSpeedRunning;
	} else {
		playerMovement.maxForwardSpeed  = playerMaxSpeedWalking;
		playerMovement.maxBackwardsSpeed = playerMaxSpeedWalking;
		playerMovement.maxSidewaysSpeed  = playerMaxSpeedWalking;
		maxSpeed = playerMaxSpeedWalking;
	}
	
	
	//Speed info:
	playerSpeed = playerMovement.velocity.magnitude;
	
	// Hacky, ccould be improved.
	deltaHeartRate = Mathf.Tan((playerSpeed / (maxSpeed/2)) - 1) * Time.fixedDeltaTime * 10;
	if (heartRate <= 10) {
		deltaHeartRate /= 10;
	}
	if (DELAYED_START > 0) {
		DELAYED_START -= Time.fixedDeltaTime;
	} else {
		heartRate += deltaHeartRate;
	}
	
	if ( heartRate <= MIN_HEARTBEATS ) {
		heartRate = MIN_HEARTBEATS;
		Die();
	}	
	if ( heartRate >= MAX_HEARTBEATS )
		heartRate = MAX_HEARTBEATS;
	
	vignette.intensity = (100 - heartRate) / 5;
}

function ApplyDamage (damage : float) {
	if (hitPoints < 0.0)
		return;

	// Apply damage
	hitPoints -= damage;
	//vignette.

	// Play pain sound when getting hit - but don't play so often
	/*
	if (Time.time > gotHitTimer && painBig && painLittle) {
		// Play a big pain sound
		if (hitPoints < maximumHitPoints * 0.2 || damage > 20) {
			audio.PlayOneShot(painBig, 1.0 / audio.volume);
			gotHitTimer = Time.time + Random.Range(painBig.length * 2, painBig.length * 3);
		} else {
			// Play a small pain sound
			audio.PlayOneShot(painLittle, 1.0 / audio.volume);
			gotHitTimer = Time.time + Random.Range(painLittle.length * 2, painLittle.length * 3);
		}
	} */

	// Are we dead?
	if (hitPoints < 0.0 && deathOn)
		Die();
}

function Die () {
	/*
	if (die)
		AudioSource.PlayClipAtPoint(die, transform.position);
	*/
	// Disable all script behaviours (Essentially deactivating player control)
	var coms : Component[] = GetComponentsInChildren(MonoBehaviour);
	for (var b in coms) {
		var p : MonoBehaviour = b as MonoBehaviour;
		if (p)
			p.enabled = false;
	}
	
	LevelLoadFade.FadeAndLoadLevel(Application.loadedLevel, Color.white, 2.0);
}

//Debug - draw the heartbeat on the gui
function OnGUI () {
	GUI.TextArea(new Rect(10, 10, 30, 20), "" + heartRate);
	GUI.TextArea(new Rect(40, 10, 80, 20), "" + playerSpeed);
	GUI.TextArea(new Rect(120, 10, 80, 20), "" + deltaHeartRate);
}


