#pragma strict




var rotating : boolean = false;
var physObjects : GameObject;
private var rotationDelay : float = 1;

function Start() {
	var rigidbodys : Array = physObjects.GetComponentsInChildren(Rigidbody);
	//Debug.Log("Disabling "+rigidbodys.length);
	var rb : Rigidbody;;
	for ( var i : int = 0; i < rigidbodys.length; i++) {
		rb = rigidbodys[i];
		rb.useGravity = false;
	}
}

var audioSource : AudioSource;
function Begin() {
	WaitForSeconds(rotationDelay);
	rotating = true;
	audioSource.Play();
}

private var enableRigidBodies : boolean = true;
function Update() {
	
	if ( rotating ) {
		//Debug.Log(transform.rotation.z);
		if ( transform.rotation.z > -0.485 ) {
			transform.Rotate(new Vector3( 0,0,1 ) * Time.deltaTime * -3);
		} else {
			rotating = false;
			audioSource.loop = false;
		}
		//Re-enable stuff:
		if ( enableRigidBodies ) {
			var rigidbodys : Array = physObjects.GetComponentsInChildren(Rigidbody);
			//Debug.Log("Enabling "+rigidbodys.length);
			var rb : Rigidbody;
			for ( var i : int = 0; i < rigidbodys.length; i++) {
				rb = rigidbodys[i];
				rb.useGravity = true;
			}
			enableRigidBodies = false;
		}
	}
	
}
