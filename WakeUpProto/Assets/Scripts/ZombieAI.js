var hitPoints = 100.0;
var attackDamage : float;
var attackRate = 0.5;
var walkSpeed = 0.1;
var followSpeed = 0.4;
var chaseSpeed = 0.8;
var rotationSpeed = 5.0;
var chaseRange = 10.0;
var followRange = 18.0;
var dontComeCloserRange = 2.0;
var pickNextWaypointDistance = 2.0;
var timeout = 3.0;
var deathSounds : AudioClip[];
var shootAngle = 4.0;
var attack0Sound : AudioClip;

private var dead = false;
private var curSpeed = walkSpeed;
private var target : Transform;
private var player : GameObject;
private var playerScript : Component;
private var playerHeartRate : float;
private var nextFireTime = 0.0;

private var animator : Animator;

function Start () {
	animator = GetComponent("Animator");
	animator.SetInteger("attackIndex", 0);

	// Auto setup player as target through tags
	if (target == null && GameObject.FindWithTag("Player")) {
		player = GameObject.FindWithTag("Player");
		playerScript = player.GetComponent(Player);
		target = player.transform;
	}
	Patrol(); 
}

function FixedUpdate() {
	playerHeartRate = playerScript.heartRate;
	// TODO : update zombie attributes based on current heart rate
	var heartRateMultiplier = (2 * playerHeartRate / playerScript.MAX_HEARTBEATS) + 0.1;	//goes between 0.1 and 2.1
	curSpeed = Mathf.Clamp01(curSpeed * heartRateMultiplier);	// do heart rate speed adjust here and make sure its between 0 and 1
	animator.SetFloat("moveSpeed", curSpeed);
	
	//chaseRange *= heartRateMultiplier;	// zombie seems to act weird changing theses
	//followRange *= heartRateMultiplier;	// feel free to try adjusting
	if (dead) {
		var cc : CharacterController = GetComponent("CharacterController") as CharacterController;
		cc.enabled = false;
	}
}


function Patrol () {
	var curWayPoint = AutoWayPoint.FindClosest(transform.position);
	while (!dead) {
		var waypointPosition = curWayPoint.transform.position;
		// Are we close to a waypoint? -> pick the next one!
		if (Vector3.Distance(waypointPosition, transform.position) < pickNextWaypointDistance)
			curWayPoint = PickNextWaypoint (curWayPoint);

		// Attack the player and wait until
		// - player is killed
		// - player is out of sight	
		if (CanSeeTarget ())
			yield StartCoroutine("FollowPlayer");
		
		// Move towards our target
		MoveTowards(waypointPosition);
		
		yield;
	}
}

function Attack() {
	animator.SetBool("bAttack", true);
	AttackOnce();
	/*
	if (Time.time - attackRate > nextFireTime)
		nextFireTime = Time.time - Time.deltaTime;
	
	// Keep firing until we used up the fire time
	while( nextFireTime < Time.time) {
		AttackOnce();
		nextFireTime += attackRate;
	} */
}

function AttackOnce() {
	player.SendMessage("ApplyDamage", attackDamage);
}

function ApplyDamage (damage : float) {
	// We already have less than 0 hitpoints, maybe we got killed already?
	if (hitPoints <= 0.0)
		return;

	hitPoints -= damage;
	Debug.Log("Zombie was hit: " + hitPoints);
	if (hitPoints <= 0.0) {
		Die();
	}
}

function Die() {
	animator.SetBool("bDeath", true);
	dead = true;
	PlayDeathSound();
	//var cc = GetComponent("CharacterController");
	
}

function PlayDeathSound() {
	var index : int = Random.Range(0, deathSounds.length-1);
	var clip : AudioClip = deathSounds[index];
	audio.PlayOneShot(clip, 0.75);
}

function CanSeeTarget () : boolean {
	if (Vector3.Distance(transform.position, target.position) > followRange)
		return false;
		
	var hit : RaycastHit;
	if (Physics.Linecast (transform.position, target.position, hit))
		return hit.transform == target;

	return false;
}

function FollowPlayer () {
	var lastVisiblePlayerPosition = target.position;
	curSpeed = followSpeed;
	while (!dead) {
		if (CanSeeTarget ()) {
			// Target is dead - stop hunting
			if (target == null)
				return;

			// Target is too far away - give up	
			var distance = Vector3.Distance(transform.position, target.position);
			if (distance > chaseRange * 3)
				return;
			
			lastVisiblePlayerPosition = target.position;
			if (distance > dontComeCloserRange) {
				animator.SetBool("bAttack", false);
				MoveTowards (lastVisiblePlayerPosition);
			} else {
				RotateTowards(lastVisiblePlayerPosition);
				Attack();
			}

			var forward = transform.TransformDirection(Vector3.forward);
			var targetDirection = lastVisiblePlayerPosition - transform.position;
			targetDirection.y = 0;

			var angle = Vector3.Angle(targetDirection, forward);

			// Start running if close and player is in sight
			if (distance < chaseRange && angle < shootAngle)
				curSpeed = chaseSpeed;
			else
				curSpeed = followSpeed;
				
		} else {
			yield StartCoroutine("SearchPlayer", lastVisiblePlayerPosition);
			// Player not visible anymore - stop attacking
			if (!CanSeeTarget ())
				return;
		}

		yield;
	}
}

function SearchPlayer (position : Vector3) {
	// Run towards the player but after 3 seconds timeout and go back to Patroling
	
	curSpeed = followSpeed;
	while (timeout > 0.0) {
		MoveTowards(position);

		// We found the player
		if (CanSeeTarget ())
			return;

		timeout -= Time.deltaTime;
		yield;
	}
}

function RotateTowards (position : Vector3) {
	//SendMessage("SetSpeed", 0.0);
	
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.1)
		return;
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);
}

function MoveTowards (position : Vector3) {
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.5) {
		animator.SetFloat("moveSpeed", 0.0);
		return;
	}
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);

	// Modify speed so we slow down when we are not facing the target
	var forward = transform.TransformDirection(Vector3.forward);
	var speedModifier = Vector3.Dot(forward, direction.normalized);
	speedModifier = Mathf.Clamp01(speedModifier);
	
	// Move the character
	direction = forward * curSpeed * speedModifier;
	GetComponent (CharacterController).SimpleMove(direction);
}

function PickNextWaypoint (currentWaypoint : AutoWayPoint) {
	// We want to find the waypoint where the character has to turn the least

	// The direction in which we are walking
	var forward = transform.TransformDirection(Vector3.forward);

	// The closer two vectors, the larger the dot product will be.
	var best = currentWaypoint;
	var bestDot = -10.0;
	for (var cur : AutoWayPoint in currentWaypoint.connected) {
		var direction = Vector3.Normalize(cur.transform.position - transform.position);
		var dot = Vector3.Dot(direction, forward);
		if (dot > bestDot && cur != currentWaypoint) {
			bestDot = dot;
			best = cur;
		}
	}
	
	return best;
}
