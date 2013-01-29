
function Start () {
	// Select the first weapon
	SelectWeapon(0);

}

function Update () {
	// Did the user press fire?
	if (Input.GetButton ("Fire1") || Input.GetButton("Fire2")) {
		BroadcastMessage("Fire");
	}
	
	if (Input.GetKeyDown("1")) {
		SelectWeapon(0);
	}	
	else if (Input.GetKeyDown("2")) {
		SelectWeapon(1);
	}	
}

function SelectWeapon (index : int) {
	for (var i=0;i<transform.childCount;i++)	{
		// Activate the selected weapon
		if (i == index)
			//transform.GetChild(i).gameObject.SetActiveRecursively(true);
			transform.GetChild(i).gameObject.SetActive(true);
		// Deactivate all other weapons
		else
			transform.GetChild(i).gameObject.SetActive(false);//Recursively(false); 
	}
} 