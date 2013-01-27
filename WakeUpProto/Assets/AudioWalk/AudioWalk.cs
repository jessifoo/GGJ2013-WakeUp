using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class AudioWalk : MonoBehaviour {
	
	public bool bMoving = false;
	public bool bRun = false;
	
	float lastPlayTime = 0.0f;
	
	private AudioSource audioSource;
	
	public List<AudioClip> walkDirt;
	private float walkDirtCount;
	
	public List<AudioClip> walkMarble;
	private float walkMarbleCount;
	
	public List<AudioClip> walkEnergy;
	private float walkEnergyCount;
	
	public enum WalkType{
		Dirt, Marble, Energy
	}
	public WalkType walkType;
	
	
	void Awake(){
		
		audioSource = gameObject.AddComponent<AudioSource>();
		audioSource.playOnAwake = false;
		
		walkDirtCount = walkDirt.Count;
		walkMarbleCount = walkMarble.Count;
		walkEnergyCount = walkEnergy.Count;
		
		walkType = WalkType.Dirt;
	}
	
	void Update(){
		
		if ( !bMoving )
			return;
		
		switch( walkType ){
		case WalkType.Dirt:
			PlayDirt ();
			break;
			
		case WalkType.Marble:
			PlayMarble();
			break;
		
		case WalkType.Energy:
			PlayEnergy();
			break;
		}
		
	}
	
	void PlayDirt(){
		
		float speed = 0.5f;
		
		if ( bRun )
			speed = 0.25f;
		
		if ( lastPlayTime < Time.time - speed ){
			audioSource.clip = walkDirt[Random.Range(0, (int)walkDirtCount-1)];
			audioSource.Play ();
			lastPlayTime = Time.time;
		}
			
	}
	
	void PlayMarble(){
		
		float speed = 0.5f;
		
		if ( bRun )
			speed = 0.25f;
		
		if ( lastPlayTime < Time.time - speed ){
			audioSource.clip = walkMarble[Random.Range(0, (int)walkMarbleCount-1)];
			audioSource.Play ();
			lastPlayTime = Time.time;
		}
		
	}
	
	void PlayEnergy(){
		
		float speed = 0.5f;
		
		if ( bRun )
			speed = 0.25f;
		
		if ( lastPlayTime < Time.time - speed ){
			audioSource.clip = walkEnergy[Random.Range(0, (int)walkEnergyCount-1)];
			audioSource.Play ();
			lastPlayTime = Time.time;
		}
		
	}
	
}
