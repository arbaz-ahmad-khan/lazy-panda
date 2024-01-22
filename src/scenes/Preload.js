
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// preloadBg
		this.add.image(540, 960, "preloadBg");

		// playBtn
		const playBtn = this.add.image(540, 1700, "playBtn");
		playBtn.visible = false;

		// lazyText
		const lazyText = this.add.image(-126, 350, "LazyText");
		lazyText.visible = false;

		// rocket
		const rocket = this.add.image(1200, 1529, "rocket");
		rocket.visible = false;

		// pandaText
		const pandaText = this.add.image(1290, 576, "pandaText");
		pandaText.visible = false;

		// progress
		const progress = this.add.text(540, 1700, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.alpha = 0.5;
		progress.alphaTopLeft = 0.5;
		progress.alphaTopRight = 0.5;
		progress.alphaBottomLeft = 0.5;
		progress.alphaBottomRight = 0.5;
		progress.text = "0";
		progress.setStyle({ "fontFamily": "Baskerville-Bold-02", "fontSize": "100px" });

		this.playBtn = playBtn;
		this.lazyText = lazyText;
		this.rocket = rocket;
		this.pandaText = pandaText;
		this.progress = progress;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	playBtn;
	/** @type {Phaser.GameObjects.Image} */
	lazyText;
	/** @type {Phaser.GameObjects.Image} */
	rocket;
	/** @type {Phaser.GameObjects.Image} */
	pandaText;
	/** @type {Phaser.GameObjects.Text} */
	progress;

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		this.playBtn.setInteractive().on("pointerdown", () => {
			this.tweens.add({
				targets: this.playBtn,
				scaleX: 0.9,
				scaleY: 0.9,
				duration: 80,
				yoyo: true,
				onComplete: () => {
					this.scene.start("Level");
				},
			});
		});
		this.isGameLoaded1 = false;
		this.isGameLoaded2 = false;
		this.load.on(Phaser.Loader.Events.COMPLETE, (p) => {
			this.isGameLoaded1 = true;
		});
		const loadingDuration = 3000;
		const intervalDuration = 30;
		const numIntervals = loadingDuration / intervalDuration;
		let currentInterval = 0;
		const progressIncrement = 1 / numIntervals;

		const updateProgressBar = () => {
			const currentProgress = currentInterval * progressIncrement;
			this.progress.setText((currentProgress * 100).toFixed(0) + "%");
			currentInterval++;
			if (currentProgress >= 1) {
				clearInterval(progressInterval);
				this.isGameLoaded2 = true;
			}
		};

		const progressInterval = setInterval(updateProgressBar, intervalDuration);
	}

	update() {
		if (this.isGameLoaded1 && this.isGameLoaded2) {
			this.progress.setVisible(false);
			this.pandaText.setVisible(true);
			this.lazyText.setVisible(true);
			this.rocket.setVisible(true);
			this.playBtn.setVisible(true);
			this.pointerOverAndOut();
			this.playTween1();
			this.playTween2();
		}
	}

	loadingBar() {
		this.outerBar = this.add.sprite(540, 1600, "outer-bar");
		this.outerBar.setOrigin(0.5);

		this.innerBar = this.add.sprite(
			this.outerBar.x - this.outerBar.displayWidth / 2 + 5,
			this.outerBar.y,
			"inner-bar"
		);
		this.innerBar.setOrigin(0, 0.5);
		this.innerBar.setVisible(false);

		this.innerBarWidth = this.innerBar.displayWidth;

		this.maskGraphics = this.make.graphics();
		this.maskGraphics.fillStyle(0xffffff);
		this.maskGraphics.fillRect(
			this.innerBar.x,
			this.innerBar.y - this.innerBar.displayHeight / 2,
			this.innerBar.displayWidth,
			this.innerBar.displayHeight
		);

		this.innerBar.setMask(this.maskGraphics.createGeometryMask());

		const loadingDuration = 3000;
		const intervalDuration = 30;
		const numIntervals = loadingDuration / intervalDuration;
		let currentInterval = 0;
		const progressIncrement = 1 / numIntervals;

		const updateProgressBar = () => {
			this.innerBar.setVisible(true);
			const currentProgress = currentInterval * progressIncrement;
			this.maskGraphics.clear();
			this.maskGraphics.fillStyle(0xffffff);
			this.maskGraphics.fillRect(
				this.innerBar.x,
				this.innerBar.y - this.innerBar.displayHeight / 2,
				this.innerBarWidth * currentProgress,
				this.innerBar.displayHeight
			);

			currentInterval++;

			if (currentProgress >= 1) {
				clearInterval(progressInterval);
				this.innerBar.setVisible(false);
				this.outerBar.setVisible(false);
				this.playTween1();
				setTimeout(() => {
					this.playBtn.setVisible(true);
				}, 100);
			}
		};

		const progressInterval = setInterval(updateProgressBar, intervalDuration);
	}

	pointerOverAndOut() {
		this.pointerOver = (aBtn, scale) => {
			this.input.setDefaultCursor("pointer");
			this.tweens.add({
				targets: aBtn,
				scaleX: scale + 0.05,
				scaleY: scale + 0.05,
				duration: 50,
			});
		};
		this.pointerOut = (aBtn, scale) => {
			this.input.setDefaultCursor("default");
			this.tweens.add({
				targets: aBtn,
				scaleX: scale,
				scaleY: scale,
				duration: 50,
				onComplete: () => {
					aBtn.forEach((btn) => {
						btn.setScale(scale);
					});
				},
			});
		};
		this.playBtn.on("pointerover", () => this.pointerOver([this.playBtn], 1));
		this.playBtn.on("pointerout", () => this.pointerOut([this.playBtn], 1));
	}

	playTween1() {
		this.tween1 = this.tweens.add({
			targets: this.lazyText,
			x: 540,
			duration: 2000,
			ease: "Linear",
			onComplete: () => { },
		});
	}

	playTween2() {
		this.tween2 = this.tweens.add({
			targets: this.pandaText,
			x: 540,
			// y: 190,
			duration: 1500,
			ease: "Linear",
			onComplete: () => {
				this.playTween3();
			},
		});
	}

	playTween3() {
		this.tween3 = this.tweens.add({
			targets: this.rocket,
			x: 900,
			y: 500,
			duration: 800,
			ease: "Linear",
			onComplete: () => { },
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
