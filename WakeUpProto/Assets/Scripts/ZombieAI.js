var hitPoints = 100.0;
var walkSpeed = 0.2;
var followSpeed = 0.4;
var chaseSpeed = 1.0;
var rotationSpeed = 5.0;
var chaseRange = 15.0;
var followRange = 30.0;
var shootAngle = 4.0;
var dontComeCloserRange = 5.0;
var pickNextWaypointDistance = 2.0;
var dieSound : AudioClip;

private var curSpeed = walkSpeed;
private var target : Transform;

var animator : Animator;

function Start () {
	animator = GetComponent("Animator");
	animator.SetInteger("attackIndex", 0);

	// Auto setup player as target through tags
	if (target == null && GameObject.FindWithTag("Player"))
		target = GameObject.FindWithTag("Player").transform;

	Patrol(); 
}


function Patrol () {
	var curWayPoint = AutoWayPoint.FindClosest(transform.position);
	while (true) {
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

function ApplyDamage (damage : float) {
	// We already have less than 0 hitpoints, maybe we got killed already?
	if (hitPoints <= 0.0)
		return;

	hitPoints -= damage;
	Debug.Log("I (enemy) was hit: " + hitPoints);
	if (hitPoints <= 0.0) {
		animator.SetBool("bDeath", true);
	}
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
	while (true) {
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
				animator.SetBool("bAttack", true);
			}

			var forward = transform.TransformDirection(Vector3.forward);
			var targetDirection = lastVisiblePlayerPosition - transform.position;
			targetDirection.y = 0;

			var angle = Vector3.Angle(targetDirection, forward);

			// Start running if close and player is in sight
			if (distance < chaseRange && angle < shootAngle)
				curSpeed = chaseSpeed;
				//yield StartCoroutine("Chase");	// Maybe run faster instead
				
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
	var timeout = 3.0;
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
		//SendMessage("SetSpeed", 0.0);
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
	
	//SendMessage("SetSpeed", speed * speedModifier, SendMessageOptions.DontRequireReceiver);
	animator.SetFloat("moveSpeed", curSpeed);
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
