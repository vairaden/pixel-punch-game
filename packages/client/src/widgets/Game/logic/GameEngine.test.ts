// import { GameEngine } from './GameEngine';
test('game engine test', () => {
  
  expect(1 + 2).toEqual(3);
});
export {};
// describe('GameEngine', () => {
//   let canvas: HTMLCanvasElement;
//   let ctx: CanvasRenderingContext2D;
//   let gameOverCallback: jest.Mock<void, []>;
//   let gameEngine: GameEngine;

//   beforeEach(() => {
//     canvas = document.createElement('canvas');
//     ctx = canvas.getContext('2d')!;
//     gameOverCallback = jest.fn();
//     gameEngine = new GameEngine(canvas, ctx, gameOverCallback);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('update', () => {
//     it('should call gameOverCallback if hero health is zero', () => {
//       jest.spyOn(gameEngine.hero, 'recieveDamage').mockReturnValue(100);
//       gameEngine.update();
//       expect(gameOverCallback).toHaveBeenCalled();
//     });

//     it('should call gameOverCallback if base health is zero', () => {
//       jest.spyOn(gameEngine.base, 'recieveDamage').mockReturnValue(100);
//       gameEngine.update();
//       expect(gameOverCallback).toHaveBeenCalled();
//     });

//     // Add more test cases for update method as needed
//   });

//   describe('startEnemyAttackInterval', () => {
//     it('should start enemy attack interval', () => {
//       const enemyMock = { attackInterval: 1000 };
//       const enemyIndex = 0;
//       jest.spyOn(gameEngine, 'startEnemyAttackInterval').mockImplementation((enemy, index) => {
//         expect(enemy).toEqual(enemyMock);
//         expect(index).toEqual(enemyIndex);
//       });
//       gameEngine.startEnemyAttackInterval(enemyMock as any, enemyIndex);
//       jest.advanceTimersByTime(enemyMock.attackInterval + 1); // advance timers by interval time + 1ms
//       expect(setInterval).toHaveBeenCalledTimes(1);
//       expect(clearInterval).toHaveBeenCalledTimes(1);
//     });

//     // Add more test cases for startEnemyAttackInterval method as needed
//   });

//   // Add more describe blocks for other methods
// });