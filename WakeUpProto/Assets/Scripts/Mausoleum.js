#pragma strict

var fence : GameObject;
var fenceLight : GameObject;
var mausoleumLight : GameObject;
var innerLight : GameObject;

var maxIntensity = 5;
var minIntensity = 0.5;
var Intensity : float;

var hitMin : boolean;
var hitMax : boolean;
var innerLightAlive : boolean;

function Start () {
	Intensity = innerLight.light.intensity;
	hitMin = true;
	hitMax = false;
	innerLightAlive = true;
}

function Update () {
	if(innerLight != null){
		if ( innerLight.light.intensity == maxIntensity ){
			hitMax = true;
			hitMin = false;
		}else if (innerLight.light.intensity == minIntensity) {
			hitMin = true;
			hitMax = false;
		}
	
		if(innerLight.light.intensity <= maxIntensity && hitMin){
			innerLight.light.intensity += 0.1;
		}else if(innerLight.light.intensity >= minIntensity && hitMax){
			innerLight.light.intensity -= 0.1;
		}
		
		if(innerLight.light.intensity >= maxIntensity){
			innerLight.light.intensity = maxIntensity;
		}
		if(innerLight.light.intensity <= minIntensity){
			innerLight.light.intensity = minIntensity;
		}
	}
}


function OnTriggerEnter(other : Collider) {
	Debug.Log("In Trigger");
	if (other.gameObject.tag == "Player"){
		Debug.Log("Trigger Player");
		if(innerLight){
			innerLightAlive = false;
			fenceLight.light.intensity = 3.41;
			mausoleumLight.light.color = Color.yellow;
			Destroy (fence);
			innerLight.light.intensity = 8;
			yield WaitForSeconds(1);
			Destroy (innerLight);
		}
	}
}