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
    scrollPosition = GUI.BeginScrollView (Rect (10,10,1000,1000),
        scrollPosition, Rect (0, 0, 220, 200));
    
    // Make four buttons - one in each corner. The coordinate system is defined
    // by the last parameter to BeginScrollView.
    GUI.Button (Rect (0,0,100,20), "Top-left");
    GUI.Button (Rect (120,0,100,20), "Top-right");
    GUI.Button (Rect (0,180,100,20), "Bottom-left");
    GUI.Button (Rect (120,180,100,20), "Bottom-right");
    
    // End the scroll view that we began above.
    GUI.EndScrollView ();
}