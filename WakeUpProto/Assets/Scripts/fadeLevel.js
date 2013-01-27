#pragma strict

private var currentLevel;
private var nextLevel;

function Start () {
	currentLevel = Application.loadedLevel;
}

function Update () {

}

function OnTriggerEnter(other : Collider) {
	if(currentLevel == 0){
		nextLevel = 1;
	}else if(currentLevel == 1){
		nextLevel = 2;
	}else if(currentLevel == 2){
		nextLevel = 3;
	}
	
	/*else if(currentLevel == 3){
		nextLevel = 4;
	}
	//else if(currentLevel == 4){
		//nextLevel = 5;
	//}
*/
	if(other.gameObject.tag == "Player"){
		LevelLoadFade.FadeAndLoadLevel(nextLevel, Color.white, 2.0);
	}
}