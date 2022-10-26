
import ResetButton from '../sprites/resetButton';
import Block from '../sprites/block';
import TipText from '../sprites/tipText';
import Cat from '../sprites/cat';
//设置坐标
declare type NeighbourData = {
    i?: number,
    j?: number,
    x?: number,
    y?: number,
}
    enum GameState{
        PLAYING="playing",
        WIN="win",
        LOSE="lose"
    };
export default class MainScene extends Phaser.Scene {
    //设置只读状态的坐标
    public readonly w: number;
    public readonly h: number;
    public readonly r: number;
    public readonly dx: number;
    public readonly dy: number;
    //public game: CatchTheCatGame;
    //对特定场景进行设置
    constructor(w: number, h: number, r: number) {
        super({
            key: "MainScene",
           
        });
        this.w = w;//宽
        this.h = h;//高
        this.r = r;
        this.dx = this.r * 2;
        this.dy = this.r * Math.sqrt(3);
    }
    static getNeightbours(i:number,j:number):NeighbourData[]{
        let left = {i: i - 1, j: j};//定义左边
        let right = {i: i + 1, j: j};//定义右边
        let top_left;//定义左上方
        let top_right;//定义右上方
        let bottom_left;//定义左下方
        let bottom_right;//定义右下方
        if ((j & 1) === 0) {
            top_left = {i: i - 1, j: j - 1};
            top_right = {i: i, j: j - 1};
            bottom_left = {i: i - 1, j: j + 1};
            bottom_right = {i: i, j: j + 1};
        } else {
            top_left = {i: i, j: j - 1};
            top_right = {i: i + 1, j: j - 1};
            bottom_left = {i: i, j: j + 1};
            bottom_right = {i: i + 1, j: j + 1};
        }
        let neighbours: NeighbourData[] = [];
        neighbours[0] = left;
        neighbours[1] = top_left;
        neighbours[2] = top_right;
        neighbours[3] = right;
        neighbours[4] = bottom_right;
        neighbours[5] = bottom_left;
        return neighbours;
    }
  
    //获取空格
    get blocks(): Block[][] {
        return this.data.get("blocks");
    }
    //设置空格
    set blocks(value: Block[][]) {
        this.data.set("blocks", value);
    }
    //获取游戏中空格的数目
    get blocksData(): boolean[][] {
        let result: boolean[][] = [];
        this.blocks.forEach((column, i) => {
            result[i] = [];
            column.forEach((block, j) => {
                result[i][j] = block.isWall;
            });
        });
        return result;
    }
    //加载资源、图像
    preload(): void {
        this.load.setPath('assets');
        // this.load.pack('pack1', './assets/pack.json', 'cat');
        this.load.pack('pack1', './assets/pack.json', 'cat');
      }
    //初始化
    init(): void {
        console.log('init');
        //  
      }
    create():void{
        this.createBlocks();//创建网格
        this.randomWall();//创建随机墙
        this.createCat();//创建小猫
        let resetButton = new ResetButton(this);//对重置按钮的调用
        this.TipText = new TipText(this);//对提示文本的调用
        //let cat=new Cat(this);
        resetButton.on("pointerup", () => {
            this.reset();
          });
          this.setStatusText("点击小圆点，围住小猫");
      
    }
      
    //提示文字
   private setStatusText(message:string){
        this.TipText.setText(message);
    }
    //重置
    reset(){

        this.resetBlocks();
    }
    //获取地理位置
      getPosition(i: number, j: number): NeighbourData {
        return {
          x: this.r * 3 + ((j & 1) === 0 ? this.r : this.dx) + i * this.dx,
          y: this.r * 3 + this.r + j * this.dy,
        };
      }
      getBlock(i:number,j:number):Block | null {
        if(!(i >= 0 && i < this.w && j >= 0 && j < this.h)){
            return null;
        }
        return this.blocks[i][j];
      }
      //设置游戏点击事件
      playerClick(i: number, j: number): boolean {
        let block=this.getBlock(i,j);
        block.isWall=true;
        return false;
    }
    //获取小猫
    get cat():Cat{
        return this.data.get("cat");
    }
    //设置小猫
    set cat(value:Cat){
        this.data.set("cat",value);
    }
      //获取文字
      get TipText(): Phaser.GameObjects.Text {
        return this.data.get("status_bar");
      }
    //设置文字
      set TipText(value: Phaser.GameObjects.Text) {
        this.data.set("status_bar", value);
      }
      //在重置墙中先调用createBlocks()函数来创建圆点
      //再通过randomWall()函数来随机生成墙来阻挡小猫
      private resetBlocks(){
       
        this.createBlocks();
        this.randomWall();
    }

      private randomWall() {
        for (let k = 0; k < 8; k++) {
          let i = Math.floor(this.w * Math.random());
          let j = Math.floor(this.h * Math.random());
          let block = new Block(this,i,j,this.r * 0.9);
          block.fillColor=0x003366;
          console.log(i);
        //   if (i !== this.cat.i || j !== this.cat.j) {
        //     let b = this.getBlock(i, j)
        //     if (b) b.isWall = true;
        //   }
        }
      }
    
    // private resetBlocks() {
    //     this.blocks.forEach(cols => {
    //       cols.forEach(block => {
    //         block.isWall = false;
    //       });
    //     });
    //     this.randomWall();
    //   }
    
 
    //创建小猫
    private createCat():void{
        let cat = new Cat(this);
        cat.anims.remove("LO1");
        // cat.on("escaped", () => {
        //     this.state = GameState.LOSE;
        //   });
        //   cat.on("win", () => {
        //     this.state = GameState.WIN;
        //   });
        //   //   cat.solver = nearestSolver;
        //   this.cat = cat;
          
    }
    //创建圆点函数
      private createBlocks():void{
        //设置圆点数组
        let blocks: Block[][] = [];
        for(let i=0;i<this.w;i++){
           blocks[i]=[];
            for(let j=0;j<this.h;j++){
                let block=new Block(this,i,j,this.r*0.9);
                blocks[i][j]=block;
               // this.add.existing(block);
                block.on("playerClick",this.playerClick.bind(this));
                
            }
        }
        this.blocks=blocks;
      }
      
}

