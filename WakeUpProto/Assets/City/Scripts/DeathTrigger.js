#pragma strict

function Start () {

}

function Update () {
	
}

function OnTriggerEnter(other:Collider) {
	if ( other.gameObject.tag == "Player" ) {
		other.gameObject.BroadcastMessage("Die");
	} else {
		Destroy(other.gameObject);
	}
}

function OnDrawGizmos () {
	Gizmos.color = Color.red;
	Gizmos.color.a = 0.5;
	Gizmos.DrawCube(transform.position, transform.localScale );
}
