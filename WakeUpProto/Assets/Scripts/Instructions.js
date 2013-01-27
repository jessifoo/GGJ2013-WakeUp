#pragma strict

// The position on of the scrolling viewport
var scrollPosition : Vector2 = Vector2.zero;
var instructions : GUIText;
var instructions1 : GUIText;
var instructions2 : GUIText;
var instructions3 : GUIText;
var instructions4 : GUIText;
var instructions5 : GUIText;
var instructions6 : GUIText;
var instructions7: GUIText;
var instructions8: GUIText;
var instructions9: GUIText;
var instructions10: GUIText;

function Start () {

}

function Update () {

}

function OnGUI () {
	if (GUI.Button(Rect(((Screen.width/2)-300),Screen.height-40,200,30),"Back")){
    		Application.LoadLevel ("Start");
    	}
    	
    if (GUI.Button(Rect((Screen.width/2)+100,Screen.height-40,200,30),"Start")){
    		Application.LoadLevel ("Graveyard");
    	} 
    	
}