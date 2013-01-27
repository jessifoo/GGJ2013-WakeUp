using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class AnyRandomAudio : MonoBehaviour {

	public List<AudioClip> audioClips;
	public bool bPlay;
	public bool bTimed = true;
	public float playSpeed = 1.0f;
	
	private float lastPlayTime = 0.0f;
	private AudioSource audioSource;
	
	void Awake(){
		audioSource = gameObject.AddComponent<AudioSource>();
		audioSource.playOnAwake = false;
	}
	
	void Update(){
		
		if ( !bPlay )
			return;
		
		if ( bTimed ){
			if ( lastPlayTime < Time.time - playSpeed ){
				audioSource.clip = audioClips[Random.Range (0,(int)audioClips.Count-1)];
				audioSource.Play ();
				lastPlayTime = Time.time;
			}
		} else {
			if ( !audioSource.isPlaying ){
				audioSource.clip = audioClips[Random.Range (0,(int)audioClips.Count-1)];
				audioSource.Play ();
			}
		}
		
	}
	
	void OnTriggerEnter(Collider other) {
		bPlay = true;
    }
}
