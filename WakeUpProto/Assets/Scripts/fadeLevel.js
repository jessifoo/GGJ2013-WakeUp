#pragma strict

private var currentLevel;
private var nextLevel;

function Start () {
	currentLevel = Application.loadedLevel;
}

function Update () {

}

function OnTriggerEnter(other : Collider) {
	if(currentLevel == 1){
		nextLevel = 2;
	}else if(currentLevel == 2){
		nextLevel = 3;
	}else if(currentLevel == 3){
		nextLevel = 4;
	}else if(currentLevel == 4){
		nextLevel = 5;
	}else if(currentLevel == 5){
		nextLevel = 6;
	}

	if(other.gameObject.tag == "Player"){
		LevelLoadFade.FadeAndLoadLevel(nextLevel, Color.white, 2.0);
	}
}