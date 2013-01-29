#pragma strict

var clip : AudioClip;

function OnTriggerEnter(other : Collider) {
	PlayClip(clip);
}

var loop : boolean = false;
private var played : boolean = false;

//Play a clip
function PlayClip ( clip : AudioClip ) : void {
if ( !played ) {
	var player : GameObject = GameObject.FindGameObjectsWithTag("Player")[0];
	//AudioSource.PlayClipAtPoint(clip, transform.position);
	if ( !loop ) {
		player.audio.PlayOneShot(clip, 1);
	}
	else {
		player.audio.clip = clip;
		player.audio.Play();
	}
	played = true;
	}
}


function OnDrawGizmos () {
	Gizmos.color = Color.green;
	Gizmos.color.a = 0.5;
	Gizmos.DrawCube(transform.position, transform.localScale );
}
