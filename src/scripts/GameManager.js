class GameManager {
    constructor(oScene) {
        this.oScene = oScene;

    }
    gameOptions = {

        // ground height, in pixels
        groundHeight: 180,

        // panda movement range, in pixels
        pandaMovement: [40, 160],

        // panda speed, in pixels per second
        // pandaSpeed: 200,
        pandaSpeed: 380,

        // pixels distance range between spikes
        // spikeGap: [50, 140],
        spikeGap: [260, 340],

        // spike speed, in milliseconds to complete the tween
        // spikeSpeed: [350, 700],
        spikeSpeed: [400, 1000],

        // spike loop delay, in milliseconds
        spikeDelay: [300, 700],

        // height of the spike, in pixels
        // spikeHeight: [20, 55],
        spikeHeight: [200, 280],

        // distance range from the right edge of the game and the coin, in pixels
        coinRange: [50, 150]
    }
}