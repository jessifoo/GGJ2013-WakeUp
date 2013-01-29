private var running : boolean;
private var attacking : boolean;
private var animator : Animator;

function Start () {
	animator = GetComponent("Animator");
	SelectPunching();
}

function Update() {
	if (Input.GetKeyDown("1")) {
		SelectPunching();
	}	
	else if (Input.GetKeyDown("2")) {
		SelectShooting();
	}

	if (Input.GetButton ("Fire1")) {
		animator.SetBool("bLeftRightToggle", true);
		attacking = true;
	} else if (Input.GetButton ("Fire2")) {
		animator.SetBool("bLeftRightToggle", false);
		attacking = true;
	} else {
		attacking = false;
	}
	
	animator.SetBool("bAttack", attacking);
}

function SelectPunching() {
	animator.SetBool("bRun", false);
	animator.SetBool("bGuns", false);
	animator.SetBool("bPunch", true);
}

function SelectShooting() {
	animator.SetBool("bRun", false);
	animator.SetBool("bPunch", false);
	animator.SetBool("bGuns", true);
}

function SetRunning(running : boolean) {
	animator.SetBool("bRun", running);
}