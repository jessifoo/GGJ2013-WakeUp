#pragma strict


var endGameLight : GameObject;
function Start () {
	endGameLight.active = false;
}

function Update () {

}

var rotationGameObject : GameObject;

function OnTriggerEnter(other:Collider) {
	if ( other.gameObject.tag == "Player" ) {
		rotationGameObject.BroadcastMessage("Begin");
		endGameLight.active = true;
		Destroy(gameObject);
	}
}

function OnDrawGizmos () {
	Gizmos.color = Color.green;
	Gizmos.color.a = 0.5;
	Gizmos.DrawCube(transform.position, transform.localScale );
}