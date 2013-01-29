#pragma strict

function Start () {

}

function Update () {

}

function OnGUI () {
	if (GUI.Button(Rect(((Screen.width/2)-300),Screen.height-40,200,30),"Back")){
    		Application.LoadLevel ("Start");
    }
}