export default class Anim {
	inactive: any;
	active: any;

	constructor(i: any = {}, a: any = {}) {
		this.inactive = i;
		this.active = a;
		this.active["transition"] = {};
	}

	spring(stiffness: number, delay: number = 0, damping: number = 10, mass: number = 1) {
		this.active["transition"]["stiffness"] = stiffness;
		this.active["transition"]["type"] = "spring";
		this.active["transition"]["damping"] = damping;
		this.active["transition"]["mass"] = mass;
		this.active["transition"]["delay"] = delay;
		return this;
	}

	spring_child(stiffness: number, damping: number = 10, mass: number = 1) {
		this.active["transition"]["stiffness"] = stiffness;
		this.active["transition"]["type"] = "spring";
		this.active["transition"]["damping"] = damping;
		this.active["transition"]["mass"] = mass;
		return this;
	}

	// delay children
	delay_children(dur: number = 0.5) {
		this.active["transition"]["delayChildren"] = dur;
		return this;
	}

	// stagger children
	stagger(amt = 0.05, reverse = false) {
		this.active["transition"]["staggerChildren"] = amt;
		this.active["transition"]["staggerDirection"] = reverse ? -1 : 1;
		return this;
	}

	stagger_mirror(amt = 0.05, reverse = false) {
		this.active["transition"]["staggerChildren"] = amt;
		this.active["transition"]["staggerDirection"] = reverse ? -1 : 1;
		this.inactive["transition"] = {};
		this.inactive["transition"]["staggerChildren"] = amt;
		this.inactive["transition"]["staggerDirection"] = reverse ? 1 : -1;
		return this;
	}

	when(afterInstead = false) {
		if (!afterInstead) this.active["transition"]["when"] = "beforeChildren";
		else this.active["transition"]["when"] = "afterChildren";
		return this;
	}
	loop(type: "loop" | "reverse" | "mirror" = "mirror", times: number | "Infinity" = "Infinity", delay: number = 0) {
		this.active["transition"]["repeatType"] = type;
		this.active["transition"]["repeat"] = times;
		this.active["transition"]["repeatDelay"] = delay;
		return this;
	}

	add(prop: string, inactive: string, active: string) {
		this.inactive[prop] = inactive;
		this.active[prop] = active;
		return this;
	}

	default() {
		this.spring(100);
		this.delay_children();
		return this;
	}

	// clear transitions if child in staggered animation
	// transition inherited from parent
	build(transitions = true) {
		if (transitions) this.inactive["transition"] = this.active["transition"];
		else {
			delete this.inactive["transition"];
			delete this.active["transition"];
		}

		return {
			inactive: this.inactive,
			active: this.active,
		};
	}

	// gives the current thingy without anything too special
	as() {
		return {
			inactive: this.inactive,
			active: this.active,
		};
	}

	static opacity(duration: number): Anim {
		return new Anim(
			{
				opacity: 0,
			},
			{
				opacity: 1,
			}
		);
	}

	static point(coords: [number, number]) {
		return new Anim(
			{
				x: coords[0] + "px",
				y: coords[1] + "px",
				opacity: 0,
			},
			{
				x: 0,
				y: 0,
				opacity: 1,
			}
		);
	}

	static flipX() {
		return new Anim(
			{
				transform: "rotateX(180deg)",
			},
			{
				transform: "rotateX(0deg)",
			}
		);
	}

	static flipY() {
		return new Anim(
			{
				transform: "rotateY(180deg)",
			},
			{
				transform: "rotateY(0deg)",
			}
		);
	}

	static bounceY(y: number) {
		return new Anim(
			{
				y: y + "px",
				opacity: 0,
			},
			{
				y: "0px",
				opacity: 1,
			}
		);
	}

	static bounceX(x: number) {
		return new Anim(
			{
				x: x + "px",
				opacity: 0,
			},
			{
				x: "0px",
				opacity: 1,
			}
		);
	}

	static scale(x: [number, number] = [0, 1], y: [number, number] = [0, 1]) {
		return new Anim(
			{
				transform: `scale(${x[0]}, ${y[0]})`,
				opacity: 0,
			},
			{
				transform: `scale(${x[1]}, ${y[1]})`,
				opacity: 1,
			}
		);
	}
}
