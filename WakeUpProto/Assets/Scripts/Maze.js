#pragma strict

var player : GameObject;
var bool : boolean = false;
 

function Start () {
	player = GameObject.FindGameObjectsWithTag("Player")[0];
	
}

function OnGUI() {
   if( bool == false){
     	if (GUI.Button(Rect(Screen.width-220,Screen.height-40,200,30),"Enough with the Maze, Move on")){
    		GameObject.FindWithTag("Player").transform.position = new Vector3(65,130,80);
    		bool = true;
    	}    
    }     
}