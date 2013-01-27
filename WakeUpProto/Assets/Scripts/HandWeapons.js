var punchRange = 4.0;
var punchForce = 10.0;
var punchDamage = 10.0;

var shootingRange = 20.0;
var shootingForce = 5.0;
var shootingDamage = 5.0;

var fireRate = 0.5;
private var range : float;
private var force : float;
private var damage : float;
var running : boolean;
private var hitParticles : ParticleEmitter;

private var nextFireTime = 0.0;
private var attacking : boolean;

var animator : Animator;

function Start () {
	animator = GetComponent("Animator");
	hitParticles = GetComponentInChildren(ParticleEmitter);
	// We don't want to emit particles all the time, only when we hit something.
	if (hitParticles)
		hitParticles.emit = false;
		
	SelectPunching();
}

function Update() {
	if (Input.GetKeyDown("1")) {
		SelectPunching();
	}	
	else if (Input.GetKeyDown("2")) {
		SelectShooting();
	}

	if (Input.GetButton ("Fire1")) {
		animator.SetBool("bLeftRightToggle", true);
		attacking = true;
		Fire();
	} else if (Input.GetButton ("Fire2")) {
		animator.SetBool("bLeftRightToggle", false);
		attacking = true;
	} else {
		attacking = false;
	}
	
	animator.SetBool("bAttack", attacking);
}


function Fire () {
	// If there is more than one bullet between the last and this frame
	// Reset the nextFireTime
	
	if (Time.time - fireRate > nextFireTime)
		nextFireTime = Time.time - Time.deltaTime;
	
	// Keep firing until we used up the fire time
	while( nextFireTime < Time.time) {
		FireOneShot();
		nextFireTime += fireRate;
	} 
	FireOneShot();
}

function FireOneShot () {
	
	
	var direction = transform.TransformDirection(Vector3.forward);
	var hit : RaycastHit;
	
	//Debug.Log("FireOneSHot");
	// Did we hit anything?
	if (Physics.Raycast (transform.position, direction, hit, range)) {
	//if (Physics.SphereCast (transform.position, 0.1, direction, hit, range)) {
	//if (Physics.Linecast(transform.position, transform.position + direction * range, hit)) {
		Debug.Log("hit");
		// Apply a force to the rigidbody we hit
		if (hit.rigidbody) {
			hit.rigidbody.AddForceAtPosition(force * direction, hit.point);
			Debug.Log("adding force to rigidbody");
		}
		
		// Place the particle system for spawing out of place where we hit the surface!
		// And spawn a couple of particles
		if (hitParticles) {
			Debug.Log("particles: "+hit.point);
			hitParticles.transform.position = hit.point;
			hitParticles.transform.rotation = Quaternion.FromToRotation(Vector3.up, hit.normal);
			hitParticles.Emit();
		}
		Debug.Log(hit.collider.gameObject.name);
		// Send a damage message to the hit object			
		hit.collider.SendMessage("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
	}
	

	// Register that we shot this frame,
	// so that the LateUpdate function enabled the muzzleflash renderer for one frame
	m_LastFrameShot = Time.frameCount;
	enabled = true;
	
}

function PerformDamage(gObj : GameObject) {
	gObj.BroadcastMessage("ApplyDamage", damage);
}

function SelectPunching() {
	animator.SetBool("bRun", false);
	animator.SetBool("bGuns", false);
	animator.SetBool("bPunch", true);
	range = punchRange;
	damage = punchDamage;
	force = punchForce;
}

function SelectShooting() {
	animator.SetBool("bRun", false);
	animator.SetBool("bPunch", false);
	animator.SetBool("bGuns", true);
	range = shootingRange;
	damage = shootingDamage;
	force = shootingForce;
}

function SetRunning(running : boolean) {
	animator.SetBool("bRun", running);
}