import MainScene from "../scenes/mainScene";
import data from '../data'

//import nearestSolver from "../solvers/nearestSolver";
export default class Cat extends Phaser.GameObjects.Sprite {
 protected main: MainScene;

    constructor(scene: MainScene) {
        super(scene, 570/2, 500/2, "L01");
    
        // this.on("animationrepeat", () => {
        //     this.moveForward();
        // });
         this.main = scene;
        // this.solver = nearestSolver;
        // this.direction = data.catDefaultDirection;
        //this.reset();
        this.scene.add.existing(this);
        
    }
}