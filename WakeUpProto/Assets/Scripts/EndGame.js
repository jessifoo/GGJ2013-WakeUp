#pragma strict

//This is the end of the game

var endAudioClip : AudioClip;
var fadeLength : float = 2;

function Start () {
	if ( endAudioClip != null ) {
		audio.PlayOneShot(endAudioClip, 1);
		fadeLength = endAudioClip.length+2;
	}
	
	var fadeTexture = new Texture2D (1, 1);
	fadeTexture.SetPixel(0, 0, Color.black);
	fadeTexture.Apply();
	
	var fade = new GameObject ("Fade");
	fade.AddComponent(LevelLoadFade);
	fade.AddComponent(GUITexture);
	fade.transform.position = Vector3 (0.5, 0.5, 1000);
	fade.guiTexture.texture = fadeTexture;
	
	// Fade texture out
	var time : float = 0.0;
	while (time < fadeLength)
	{
		time += Time.deltaTime;
		fade.guiTexture.color.a = Mathf.InverseLerp(fadeLength, 0.0, time);
		yield;
	}
	fade.guiTexture.color.a = 0;
	yield;
	
	Application.LoadLevel(0);
}

function Update () {
	
}

