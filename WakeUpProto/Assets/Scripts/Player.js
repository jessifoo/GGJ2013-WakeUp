var maximumHitPoints = 100.0;
var hitPoints = 100.0;

// private vars for the different weapons
private var bareHand : BareHand;

function Awake () {
	bareHand = GetComponentInChildren(BareHand);
	
}

function ApplyDamage (damage : float) {
	if (hitPoints < 0.0)
		return;

	// Apply damage
	hitPoints -= damage;

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
	if (hitPoints < 0.0)
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