
import { GameScene } from './scenes/mainScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'catch-the-cat',
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [GameScene],
  input: {
    keyboard: true
  },
  parent: "game",
  backgroundColor: '#3A99D9',
  render: { pixelArt: false, antialias: true }

};
export const AppConfig:CatchTheCatGameConfig={
    w: 11,
    h: 11,
    r: 20,
    backgroundColor: 0x6C6C6C,
    parent: 'game',
    statusBarAlign: 'center',
   // credit: 'github.com/lshengjian'
  };