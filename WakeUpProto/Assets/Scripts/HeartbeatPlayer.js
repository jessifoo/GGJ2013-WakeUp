#pragma strict

@script RequireComponent(AudioSource)

function Start () {

}


var heartbeat_part1 : AudioClip;
var heartbeat_part2 : AudioClip;

private var hb1_last_played : boolean = false;
private var timeHB1_lastPlayed : float;
private var timeHB2_lastPlayed : float;
private var hb1_delay : float = 1.0;
private var hb2_delay : float = 0.4;
private var hb1_MAX_DELAY : float = 2.0;
private var hb2_MAX_DELAY : float = 1.0;
private var hb1_MIN_DELAY : float = 0.6;
private var hb2_MIN_DELAY : float = 0.3;

function Update () {
	ComputeDelays();
	if ( hb1_last_played ) { //Play hb2
		if ( Time.time >= timeHB1_lastPlayed + hb2_delay ) {
			PlayClip(heartbeat_part2);
			timeHB2_lastPlayed = Time.time;
			hb1_last_played = false;
		}
	} else { //Play hb1
		if ( Time.time >= timeHB2_lastPlayed + hb1_delay ) {
			PlayClip(heartbeat_part1);
			timeHB1_lastPlayed = Time.time;
			hb1_last_played = true;
		}
	}
}
//Compute delays based on Player script
private var _player : Player = null; //Cached ref to player
function ComputeDelays() : void {
	if ( _player == null ) {
		_player = gameObject.GetComponent("Player");
	}
	//var proportion : float = _player.hitPoints / _player.maximumHitPoints;
	var proportion : float = _player.heartRate / _player.MAX_HEARTBEATS + 0.1;
	hb1_delay = (hb1_MIN_DELAY / hb1_MAX_DELAY) / proportion;
	hb2_delay = (hb2_MIN_DELAY / hb2_MAX_DELAY) / proportion;
}
//Play a clip
function PlayClip ( clip : AudioClip ) : void {
	//AudioSource.PlayClipAtPoint(clip, transform.position);
	audio.PlayOneShot(clip, 1);
}