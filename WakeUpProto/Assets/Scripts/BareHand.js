var range = 2.0;
var fireRate = 0.5;
var force = 10.0;
var damage = 5.0;
private var hitParticles : ParticleEmitter;

private var nextFireTime = 0.0;

function Start () {
	hitParticles = GetComponentInChildren(ParticleEmitter);
	
	// We don't want to emit particles all the time, only when we hit something.
	if (hitParticles)
		hitParticles.emit = false;
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
	
	
	// Did we hit anything?
	if (Physics.Raycast (transform.position, direction, hit, range)) {
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

		// Send a damage message to the hit object			
		hit.collider.SendMessage("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
	}
	

	// Register that we shot this frame,
	// so that the LateUpdate function enabled the muzzleflash renderer for one frame
	m_LastFrameShot = Time.frameCount;
	enabled = true;
	
			
}