#pragma strict

// The position on of the scrolling viewport
var scrollPosition : Vector2 = Vector2.zero;

function Start () {

}

function Update () {

}

function OnGUI () {
    // An absolute-positioned example: We make a scrollview that has a really large client
    // rect and put it in a small rect on the screen.
    scrollPosition = GUI.BeginScrollView (Rect (20,20,(Screen.width-20),(Screen.height-20)),
        scrollPosition, Rect (0, 0, Screen.width-40,Screen.height+100));
    
    // Make four buttons - one in each corner. The coordinate system is defined
    // by the last parameter to BeginScrollView.
    /* 
    GUI.Button (Rect (0,0,100,20), "Top-left");
    GUI.Button (Rect (120,0,100,20), "Top-right");
    GUI.Button (Rect (0,180,100,20), "Bottom-left");
    GUI.Button (Rect (120,180,100,20), "Bottom-right");
    */
   // GUI.TextArea( Rect (0,0,Screen.width-50,Screen.height-50), 
    //"You are in a coma. You live in a world at war with evil forces that want to enslave the minds of all mankind. You must traverse through your subconcious, battleing your worst fears, in an attempt to come back to conciousness");
    GUI.Label( Rect (0,0,Screen.width-50,Screen.height-50), 
    "You are in a coma. You live in a world at war with evil forces that want to enslave the minds of all mankind. You must traverse through your subconcious, battleing your worst fears, in an attempt to come back to conciousness");
    // End the scroll view that we began above.
    GUI.EndScrollView ();
}