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
	if (GUI.Button(Rect(((Screen.width/2)-(Screen.width/2.5)),Screen.height-40,200,30),"Back")){
    		Application.LoadLevel ("Start");
    	}
    	
    if (GUI.Button(Rect((Screen.width/2),Screen.height-40,200,30),"Start")){
    		Application.LoadLevel ("Graveyard");
    	} 
    	
    // An absolute-positioned example: We make a scrollview that has a really large client
    // rect and put it in a small rect on the screen.
    //scrollPosition = GUI.BeginScrollView (Rect (20,20,(Screen.width-20),(Screen.height-20)),
    //    scrollPosition, Rect (0, 0, Screen.width-40,Screen.height+100));
    
    // Make four buttons - one in each corner. The coordinate system is defined
    // by the last parameter to BeginScrollView.
    /* 
    GUI.Button (Rect (0,0,100,20), "Top-left");
    GUI.Button (Rect (120,0,100,20), "Top-right");
    GUI.Button (Rect (0,180,100,20), "Bottom-left");
    GUI.Button (Rect (120,180,100,20), "Bottom-right");
    */
     // End the scroll view that we began above.
    //GUI.EndScrollView ();
}