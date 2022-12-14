import MainScene from "../scenes/mainScene";

export default class TipText extends Phaser.GameObjects.Text {
    constructor(scene: MainScene) {
        super(scene, 0, 0, "", {});
        this.setColor("#000000");
        let r = scene.r;
        this.setFontSize(r);
        this.setX(scene.game.canvas.width / 2);
        this.setOrigin(0.5, 0);
        
        this.setPadding(r, r, r, r);
        this.scene.add.existing(this);
    }
}



