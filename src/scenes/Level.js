// You can write more code here
let gameOptions;
/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// gamePlayContainer
		const gamePlayContainer = this.add.container(0, 0);

		// bg
		const bg = this.add.image(540, 960, "bg");
		gamePlayContainer.add(bg);

		// scoreText
		const scoreText = this.add.text(540, 960, "", {});
		scoreText.setOrigin(0.5, 0.5);
		scoreText.alpha = 0.5;
		scoreText.alphaTopLeft = 0.5;
		scoreText.alphaTopRight = 0.5;
		scoreText.alphaBottomLeft = 0.5;
		scoreText.alphaBottomRight = 0.5;
		scoreText.text = "0";
		scoreText.setStyle({ "color": "#ffffffff", "fontFamily": "Baskerville-Bold-02", "fontSize": "700px", "fontStyle": "bold", "stroke": "#191616ff", "strokeThickness":8});

		// gameOverContainer
		const gameOverContainer = this.add.container(0, 0);
		gameOverContainer.visible = false;

		// gameOverBestText
		const gameOverBestText = this.add.text(540, 1260, "", {});
		gameOverBestText.setOrigin(0.5, 0.5);
		gameOverBestText.alpha = 0.5;
		gameOverBestText.alphaTopLeft = 0.5;
		gameOverBestText.alphaTopRight = 0.5;
		gameOverBestText.alphaBottomLeft = 0.5;
		gameOverBestText.alphaBottomRight = 0.5;
		gameOverBestText.text = "BEST: 0";
		gameOverBestText.setStyle({ "color": "#ffffff", "fontFamily": "Baskerville-Bold-02", "fontSize": "100px", "fontStyle": "bold", "stroke": "#191616ff", "strokeThickness":5});
		gameOverContainer.add(gameOverBestText);

		// gameOverScoreText
		const gameOverScoreText = this.add.text(540, 1100, "", {});
		gameOverScoreText.setOrigin(0.5, 0.5);
		gameOverScoreText.alpha = 0.5;
		gameOverScoreText.alphaTopLeft = 0.5;
		gameOverScoreText.alphaTopRight = 0.5;
		gameOverScoreText.alphaBottomLeft = 0.5;
		gameOverScoreText.alphaBottomRight = 0.5;
		gameOverScoreText.text = "SCORE: 0";
		gameOverScoreText.setStyle({ "color": "#ffffff", "fontFamily": "Baskerville-Bold-02", "fontSize": "100px", "fontStyle": "bold", "stroke": "#191616ff", "strokeThickness":5});
		gameOverContainer.add(gameOverScoreText);

		// text_2
		const text_2 = this.add.text(540, 840, "", {});
		text_2.setOrigin(0.5, 0.5);
		text_2.alpha = 0.5;
		text_2.alphaTopLeft = 0.5;
		text_2.alphaTopRight = 0.5;
		text_2.alphaBottomLeft = 0.5;
		text_2.alphaBottomRight = 0.5;
		text_2.text = "GAME OVER";
		text_2.setStyle({ "color": "#ffffff", "fontFamily": "Baskerville-Bold-02", "fontSize": "150px", "fontStyle": "bold", "stroke": "#191616ff", "strokeThickness":5});
		gameOverContainer.add(text_2);

		// bricksContainer
		const bricksContainer = this.add.container(0, 0);

		this.gamePlayContainer = gamePlayContainer;
		this.scoreText = scoreText;
		this.gameOverBestText = gameOverBestText;
		this.gameOverScoreText = gameOverScoreText;
		this.gameOverContainer = gameOverContainer;
		this.bricksContainer = bricksContainer;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	gamePlayContainer;
	/** @type {Phaser.GameObjects.Text} */
	scoreText;
	/** @type {Phaser.GameObjects.Text} */
	gameOverBestText;
	/** @type {Phaser.GameObjects.Text} */
	gameOverScoreText;
	/** @type {Phaser.GameObjects.Container} */
	gameOverContainer;
	/** @type {Phaser.GameObjects.Container} */
	bricksContainer;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		this.score = 0;
		this.bestScore = localStorage.getItem('dashy-panda-bestScore') || 0
		// this.bestText.setText(this.bestScore);
		this.isGameOver = false;

		this.oGameManager = new GameManager(this);
		gameOptions = this.oGameManager.gameOptions;

		this.spikeGroup = this.physics.add.group();
		let spikeX = this.game.config.width / 2;

		for (let i = 0; i < 10; i++) {
			let spike = this.spikeGroup.create(spikeX, this.game.config.height - gameOptions.groundHeight, "spike").setScale(1);
			spike.crossed = false;
			this.gamePlayContainer.add(spike);
			spike.setOrigin(0.5, 0);
			spike.setImmovable(true);
			spike.setSize(12, 210, true);
			this.createTween(spike);
			spikeX += Phaser.Math.Between(gameOptions.spikeGap[0], gameOptions.spikeGap[1]);
		}

		// add the panda to the game
		this.panda = this.physics.add.sprite((gameOptions.pandaMovement[0])+70, (this.game.config.height - gameOptions.groundHeight) + 20, "panda").setScale(1);
		this.panda.setOrigin(0.5, 1);
		// this.panda.setSize(180, 180, true);
		// this.panda.setOffset(15, 0);
		this.panda.setCircle(90);
		this.panda.setOffset(18, 10)
		this.gamePlayContainer.add(this.panda);

		this.panda.canMove = true;
		this.panda.isMoving = false;

		this.greenLight = this.physics.add.sprite(this.panda.x, this.panda.y - 320, "greenLight");
		this.add.tween({
			targets: this.greenLight,
			scaleX: 0.8,
			scaleY: 0.8,
			duration: 100,
			repeat: -1,
		})

		// add the coin to the game
		// this.coin = this.physics.add.sprite(this.game.config.width + Phaser.Math.Between(gameOptions.coinRange[0], gameOptions.coinRange[1]), this.panda.y - this.panda.getBounds().height / 2, "coin");
		// this.coin.setScale(3);
		// this.coin.setCircle(10);
		// this.gamePlayContainer.add(this.coin);

		// this.tweens.add({
		// 	targets: this.coin,
		// 	// y: this.game.config.height / 2,
		// 	y: this.coin.y - 30,
		// 	duration: 500,
		// 	repeat: -1,
		// 	yoyo: true,
		// 	ease: "Cubic.easeOut"
		// });

		// let ground = this.add.sprite(0, (this.game.config.height - gameOptions.groundHeight)-60, "ground").setScale(1);
		let ground = this.add.sprite(0, (this.game.config.height - gameOptions.groundHeight)+18, "ground").setScale(1);
		ground.setOrigin(0, 0);
		this.gamePlayContainer.add(ground);
		this.input.on("pointerdown", this.movePanda, this);
		this.input.on("pointerup", this.stopPanda, this);

		// this.bricks = this.physics.add.sprite(540, 1735, "bricks").setOrigin(0.5, 0).setScale(1.1, 1);
		this.brick1 = this.physics.add.sprite(0, 1735, "brick").setOrigin(0);
		this.brick2 = this.physics.add.sprite(530, 1735, "brick").setOrigin(0);
		this.brick3 = this.physics.add.sprite(1060, 1735, "brick").setOrigin(0);
		// this.brick4 = this.physics.add.sprite(1200, 1735, "brick").setOrigin(0);

		this.bricksContainer.add([this.brick1, this.brick2, this.brick3,]);
	}

	createTween(object) {
		this.tweens.add({
			targets: object,
			y: this.game.config.height - gameOptions.groundHeight - Phaser.Math.Between(gameOptions.spikeHeight[0], gameOptions.spikeHeight[1]),
			duration: Phaser.Math.Between(gameOptions.spikeSpeed[0], gameOptions.spikeSpeed[1]),
			repeat: -1,
			yoyo: true,
			ease: "Quint.easeIn"
		})
	}

	movePanda() {
		if (!this.isGameOver) {
			if (this.panda.canMove) {
				this.panda.body.velocity.x = gameOptions.pandaSpeed;
			}
			else {
				this.spikeGroup.setVelocityX(-gameOptions.pandaSpeed);
				// this.coin.setVelocityX(-gameOptions.pandaSpeed);
				// this.bricks.setVelocityX(-gameOptions.pandaSpeed);
				this.bricksContainer.getAll().forEach((bricks) => {
					bricks.setVelocityX(-gameOptions.pandaSpeed);
				});
			}
			this.panda.isMoving = true;
		}
	}

	stopPanda() {
		this.panda.setVelocityX(0);
		this.spikeGroup.setVelocityX(0);
		// this.coin.setVelocityX(0);
		// this.bricks.setVelocityX(0);
		this.bricksContainer.getAll().forEach((brick) => {
			brick.setVelocityX(0);
		});
		this.panda.isMoving = false;
	}

	getRightmostSpike() {
		let rightmostSpike = 0;
		this.spikeGroup.getChildren().forEach(function (spike) {
			rightmostSpike = Math.max(rightmostSpike, spike.x);
		});
		return rightmostSpike;
	}

	update() {
		this.greenLight.setPosition(this.panda.x, this.panda.y - 320);
		this.bricksContainer.getAll().forEach((brick) => {
			if (brick.x < -530){
				brick.x = 1060;
			}
		});

		if (this.isGameOver) {
			return;
		}

		if (!this.isGameOver) {
			this.spikeGroup.getChildren().forEach(function (spike) {
				if (!this.isGameOver && spike.getBounds().right < this.panda.x && !spike.crossed) {
					this.score++;
					this.scoreText.setText(this.score);
					if (this.score > this.bestScore) {
						this.bestScore = this.score
						localStorage.setItem('dashy-panda-bestScore', this.bestScore);
					}
					spike.crossed = true;
				}
			}, this);

			if (this.panda.canMove && this.panda.x > gameOptions.pandaMovement[1]) {
				this.panda.canMove = false;
				this.panda.body.velocity.x = 0;
				this.movePanda();
			}

			// if (this.coin.getBounds().right < 0) {
			// 	this.coin.x = this.game.config.width + Phaser.Math.Between(gameOptions.coinRange[0], gameOptions.coinRange[1]);
			// }

			this.spikeGroup.getChildren().forEach(function (spike) {
				if (spike.getBounds().right < 0) {
					spike.x = this.getRightmostSpike() + Phaser.Math.Between(gameOptions.spikeGap[0], gameOptions.spikeGap[1]);
					spike.y = this.game.config.height - gameOptions.groundHeight;
					spike.crossed = false;
					this.tweens.killTweensOf(spike);
					this.createTween(spike);


				}
			}, this);

			this.physics.world.collide(this.panda, this.spikeGroup, function () {
				this.greenLight.setTexture("redLight");
				this.isGameOver = true;
				this.spikeGroup.getChildren().forEach(function (spike) {
					spike.crossed = false;
				});
			}, null, this)
		}

		if (this.isGameOver) {
			this.scoreText.setVisible(false);
			this.gameOverScoreText.setText("SCORE: " + this.score);
			this.gameOverBestText.setText("BEST: " + this.bestScore);
			this.cameras.main.shake(500, 0.003);
			// this.gameOverContainer.setDepth(1);
			this.gameOverContainer.setVisible(true);
			// this.gameOverTween();
			setTimeout(() => {
				this.score = 0;
				this.scoreText.setVisible(true);
				this.physics.resume();
				this.tweens.resumeAll();
				this.scene.start("Level");
			}, 2000);

			this.physics.pause();
			this.tweens.pauseAll();
			this.cameras.main.shake(500, 0.03);
		}

		// this.physics.world.overlap(this.panda, this.coin, function () {
		// 	this.coin.x = this.game.config.width + Phaser.Math.Between(gameOptions.coinRange[0], gameOptions.coinRange[1]);
		// }, null, this)
	}

	incrementScore() {
		this.score += 1;
		console.log("Score: ", this.score);
	}

	gameOverTween(){
		this.tweens.add({
            targets: this.gameOverContainer,
            scaleX: 1,
            scaleY: 2,
            duration: 1500,
            ease: 'Linear',
            onComplete: function () {
                console.log('Tween complete!');
            }
        });
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
