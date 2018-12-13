var game = new Phaser.Game(1200, 560, Phaser.CANVAS, 'game');

//备注：飞板，钻石弹簧都要设置上边界的碰撞检测(已完成)
//关于用代码生成箱子对象，然后设置水和地图与箱子的碰撞检测(已完成)
//加入多线程进行地板的自动升降//更正一下，可以使用Tween来实现（已完成）

//弹簧动画效果（已完成）
//得分（已完成）
//还需完成音乐的加入
//还有游戏时间的计时（已完成）
//人物动画效果(已完成)
//都比较简单

//使用服务器端制作排行榜
//状态2起码生成12个对象，star可以用group+tween+animation去做。

var map;

var name;
var input;
//var layer1
var layer;
var p;
var cursors;

var text;
var scores = 0; //得分

var startTime;
var timerText;
var time = 0;
var result;

var box_cases;
var box2;


var diamonds;
var coins;
var lines;
//var door_top;

var spring; //钻石弹簧
var spring2;
var spring3;

var fly_floor;

var elevator;
var tween_elevator;

var isFly;
var ifDrag;
var red_flag;


//状态2的一系列变量
var map2;
var _layer;

var triangles;  //地图对象组
var stars;   //代码对象组

var door;
var fires;
var translator1;
var translator2;
var translator3;
var translator4;
var block1;
var block2;
var block3;
var wheel1;
var tween_wheel1;
var wheel2;

var ray;

var text2;

var startTime2;
var timerText2;
var time2 = 0;
var result2;

var result_time = 0;

var isFlag;
var isAlong;

game.States = {};


//第一个game状态state，boot
game.States.boot = function() {
  this.preload = function() {
    game.load.image('loading', 'assets/preloader.gif');
  };
  this.create = function() {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    game.state.start('preload');//执行完boot以后执行preload
  };
};
//////////////////////////////////////////
game.States.over = function(){
  this.create = function() {
    // 背景
    var bg = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
    // 版权
    //this.copyright = game.add.image(12, game.height - 16, 'copyright');
    // 我的飞机
    this.myplane = game.add.sprite(455, 180, 'myplane');
    this.myplane.animations.add('fly');
    this.myplane.animations.play('fly', 12, true);
    // 分数

    var text_game = game.add.bitmapText(530, 150, 'carrier_command','Game Over',32);
    var text_over = game.add.bitmapText(555, 200, 'carrier_command','scores:'+scores,24);
    

    
    
    // 重来按钮
    this.replaybutton = game.add.button(0, 0, 'replaybutton', this.onReplayClick, this, 0, 0, 1);
    // 分享按钮
    //this.sharebutton = game.add.button(130, 300, 'sharebutton', this.onShareClick, this, 0, 0, 1);
    // 背景音乐
    //this.normalback = game.add.audio('normalback', 0.2, true);
    //this.normalback.play();
    /////////////* <input  id="msg" name="msg" value="" style="display:inline"/>*/
  
  /*  <input id="kkk" name="msg" value="" style="display:inline"/>*/
  };
  // 重来
  this.onReplayClick = function() {
    //this.normalback.stop();
    //game.state.start('start');
    document.getElementById('yyy').value = name;
    document.getElementById('msg').value = result_time;
    document.getElementById('kkk').value = scores;//时间，秒
    document.getElementById('table').submit();
    
    //得分
  };

  this.update = function(){
    if(time>time2){
        result_time = time;
        var time_over = game.add.bitmapText(555, 245, 'carrier_command','time:'+result,24);
    }
    else if(time <= time2){
        result_time = time2;
        var time_over = game.add.bitmapText(555, 245, 'carrier_command','time:'+result2,24);
    }
  }
};

//第二个game状态state，preload
game.States.preload = function() {
  this.preload = function() {
    var preloadSprite = game.add.sprite(10, game.height/2, 'loading');
    game.load.setPreloadSprite(preloadSprite);
    game.load.image('bg', 'assets/bg.png'); //  main状态的背景
    
    //game.load.image('copyright', 'assets/copyright.png');
    game.load.spritesheet('myplane', 'assets/myplane.png', 40, 40, 4);
    game.load.spritesheet('startbutton', 'assets/startbutton.png', 100, 40, 2);//开始按钮
    game.load.spritesheet('replaybutton', 'assets/replaybutton.png', 80, 30, 2);
    //game.load.image('gameover', 'assets/gameover.png');


    //加载游戏地图，在main状态出现
    game.load.tilemap('man', 'assets/latest_map.json', null, Phaser.Tilemap.TILED_JSON);// super_mario.json //mario
    game.load.tilemap('man2', 'assets/cave.json', null, Phaser.Tilemap.TILED_JSON); //加载状态2的地图信息

    //加载状态1和状态2地图文件中的图片
    game.load.image('tile0', 'assets/kenney.png');
    game.load.image('background', 'assets/background_1.png');//super_mario.png//状态1的背景
    game.load.image('background2', 'assets/bg2.png'); //状态2的背景
    game.load.image('tile2', 'assets/kenny_platformer_64x64.png');
    game.load.image('Tile0', 'assets/blocks.png');  //  状态2都是用一张砖块图搭建起来的


    //加载状态1和状态2地图文件中对象图片
    //game.load.image('flag', 'assets/flag.png');
    //game.load.image('oblique_flag', 'assets/oblique_flag.png');
    game.load.image('triangle', 'assets/triangle.png');//状态2的对象
    game.load.image('case', 'assets/case.png');
    game.load.image('coin', 'assets/coin.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('line', 'assets/deadline.png');

    //game.load.image('door', 'assets/door.png');
    //game.load.spritesheet('spring','assets/spring.png',100,40,2);
    //把图片资源加载进去
    game.load.bitmapFont('carrier_command', 'assets/carrier_command.png', 'assets/carrier_command.xml');


    game.load.spritesheet('star', 'assets/starts.png', 71, 67, 10);
    game.load.spritesheet('dot_button', 'assets/dot_button.png', 81, 20, 2);
    game.load.spritesheet('fire', 'assets/firesheet.png', 76, 103, 6);
    game.load.spritesheet('ray_long', 'assets/ray_long.png', 52, 365, 4);
    game.load.spritesheet('ray_short', 'assets/ray_short.png', 52, 240, 4);
    game.load.image('translator_right', 'assets/translator_right.png');
    game.load.image('translator_left', 'assets/translator_left.png');
    game.load.image('block', 'assets/block.png');
    game.load.image('wheel', 'assets/wheel.png');
    game.load.image('door', 'assets/door.png');

    game.load.image('player', 'assets/phaser-dude.png');
    game.load.image('fly_floor', 'assets/move_land.png');
    game.load.spritesheet('spring', 'assets/bounce.png', 35, 26, 2);//弹簧按钮
    game.load.spritesheet('hero', 'assets/character3.png', 28, 35, 16, 0, 2);
    //game.load.spritesheet('replaybutton', 'assets/replaybutton.png', 80, 30, 2);
    //game.load.spritesheet('sharebutton', 'assets/sharebutton.png', 80, 30, 2);
    /*game.load.image('mybullet', 'assets/mybullet.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('enemy1', 'assets/enemy1.png');
    game.load.image('enemy2', 'assets/enemy2.png');
    game.load.image('enemy3', 'assets/enemy3.png');
    game.load.spritesheet('explode1', 'assets/explode1.png', 20, 20, 3);
    game.load.spritesheet('explode2', 'assets/explode2.png', 30, 30, 3);
    game.load.spritesheet('explode3', 'assets/explode3.png', 50, 50, 3);
    game.load.spritesheet('myexplode', 'assets/myexplode.png', 40, 40, 3);
    game.load.image('award', 'assets/award.png');
    game.load.audio('normalback', 'assets/normalback.mp3');
    game.load.audio('playback', 'assets/playback.mp3');
    game.load.audio('fashe', 'assets/fashe.mp3');
    game.load.audio('crash1', 'assets/crash1.mp3');
    game.load.audio('crash2', 'assets/crash2.mp3');
    game.load.audio('crash3', 'assets/crash3.mp3');
    game.load.audio('ao', 'assets/ao.mp3');
    game.load.audio('pi', 'assets/pi.mp3');
    game.load.audio('deng', 'assets/deng.mp3');
    */
  };
  this.create = function() {
    game.state.start('main');//执行完preload以后，执行main
  };
};

///////////////////////////////////////////

//第三个game状态state，main
game.States.main = function() {
  this.create = function() {
    // 背景

    game.add.plugin(PhaserInput.Plugin);
    var bg = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
    input = game.add.inputField(200, 90);
    input.setText("input your name: ");

    // 版权
    //this.copyright = game.add.image(12, game.height - 16, 'copyright');
    // 我的飞机
    this.myplane = game.add.sprite(100, 100, 'myplane');

    //帧动画，spritesheet的动态显示
    this.myplane.animations.add('fly');
    this.myplane.animations.play('fly', 12, true);
    // 开始按钮
    this.startbutton = game.add.button(0, 0, 'startbutton', this.onStartClick, this, 1, 1, 0);
    // 背景音乐
    //this.normalback = game.add.audio('normalback', 0.2, true);
    //this.normalback.play();
  };
  this.onStartClick = function() {
    name = input.value;
    //console.log(name);
    game.state.start('start');//执行完main以后执行start，游戏开始
    //this.normalback.stop();
  };
};
////////////////////////////////////////////////////

game.States.start2 = function() {
  this.create = function(){

    var background = game.add.tileSprite(0, 0, 4200, 560, 'background2');


    text2 = game.add.bitmapText(1000, 12, 'carrier_command','Scores: '+scores,16);
    text2.fixedToCamera = true;
   
    startTime2 = game.time.totalElapsedSeconds();
    time2 = Math.floor(game.time.totalElapsedSeconds() - startTime2)+time;
    timerText2 = game.add.bitmapText(12, 12, 'carrier_command','TIME:' +time2, 16);
    timerText2.fixedToCamera = true;
    //start状态开启物理引擎
    game.physics.startSystem(Phaser.Physics.ARCADE);
   

    ///////////////////////////
    map2 = game.add.tilemap('man2'); //mario
    // 此处的SuperMarioBros-World1-1与json中tilesets的name对应


    map2.addTilesetImage('blocks', 'Tile0');
    map2.addTilesetImage('triangle', 'triangle');
   
    
    _layer = map2.createLayer('_layer');
    // resizeWorld会根据tilemap重新设置world的大小
    _layer.resizeWorld();
    //layer.debugSettings.forceFullRedraw = true;
    var _objLayer = map2.createLayer('_OBJlayer');
  
    
    map2.setCollisionBetween(1, 18, true, _layer, true);

    triangles = game.add.group();
    triangles.enableBody = true;
    map2.createFromObjects('_OBJlayer', 19, 'triangle', 0, true, false, triangles);

    ////////////////////////////////////////////////////////////////////////////////////////
    //加入组与对象
    //加入火动画
    fires = game.add.group();
    var fire1 = fires.create(724, 115, 'fire');
    fire1.animations.add('booom', [0, 1, 2, 3, 4, 5], 12, true);
    fire1.animations.play('booom');

    var fire2 = fires.create(1535, 115, 'fire');
    fire2.animations.add('booom', [0, 1, 2, 3, 4, 5], 12, true);
    fire2.animations.play('booom');

    var fire3 = fires.create(2491, 115, 'fire');
    fire3.animations.add('booom', [0, 1, 2, 3, 4, 5], 12, true);
    fire3.animations.play('booom');

    var fire4 = fires.create(3315, 115, 'fire');
    fire4.animations.add('booom', [0, 1, 2, 3, 4, 5], 12, true);
    fire4.animations.play('booom');



    door = game.add.sprite(2890, 433, 'door');
    game.physics.enable(door);
    //加入3块砖
    block1 = game.add.sprite(630, 420, 'block');
    game.physics.enable(block1);
    block1.body.collideWorldBounds = true;
    block1.body.gravity.y = 1100;
    

    block2 = game.add.sprite(2030, 490, 'block');
    game.physics.enable(block2);
    block2.body.collideWorldBounds = true;
    block2.body.gravity.y = 1100;
   

    block3 = game.add.sprite(3220, 105, 'block');
    game.physics.enable(block3);
    block3.body.collideWorldBounds = true;
    block3.body.gravity.y = 1100;

    wheel1 = game.add.sprite(815, 491, 'wheel');
    game.physics.enable(wheel1, Phaser.Physics.ARCADE);
    wheel1.body.immovable = true;
    tween_wheel1 = game.add.tween(wheel1).to({ x: 1290 }, 8000, Phaser.Easing.Linear.None, true, 0, -1, true);

    wheel2 = game.add.sprite(4045, 500, 'wheel');
    game.physics.enable(wheel2, Phaser.Physics.ARCADE);
    wheel2.body.collideWorldBounds = true;
    //wheel2.body.setSize(140, 10, 0, 0);

    translator1 = game.add.sprite(1825, 415, 'translator_left');
    game.physics.enable(translator1, Phaser.Physics.ARCADE);
    translator1.body.immovable = true;

    translator2 = game.add.sprite(1959, 35, 'translator_right');
    translator3 = game.add.sprite(3080, 63, 'translator_right');

    translator4 = game.add.sprite(3676, 375, 'translator_left');
    game.physics.enable(translator4, Phaser.Physics.ARCADE);
    translator4.body.setSize(75, 40, 0, 0);
    translator4.body.immovable = true;
    translator4.anchor.setTo(0.5, 0.5);
    translator4.angle = 270;

    stars = game.add.group();
    stars.enableBody = true;

    var star1 = stars.create(150, 200, 'star');
    var tween_star1 = game.add.tween(star1).to({ x: 270 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
    star1.animations.add('turn', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    star1.animations.play('turn');

    var star2 = stars.create(1028, 282, 'star');
    var tween_star2 = game.add.tween(star2).to({ x: 1148 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
    star2.animations.add('turn', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    star2.animations.play('turn');

    var star3 = stars.create(2040, 70, 'star');
    var tween_star3 = game.add.tween(star3).to({ x: 2160 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
    star3.animations.add('turn', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    star3.animations.play('turn');

    var star4 = stars.create(2685, 105, 'star');
    var tween_star4 = game.add.tween(star4).to({ x: 2805 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
    star4.animations.add('turn', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    star4.animations.play('turn');

    var star5 = stars.create(2905, 0, 'star');
    var tween_star5 = game.add.tween(star5).to({ x: 3025 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
    star5.animations.add('turn', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    star5.animations.play('turn');

    ray = game.add.sprite(2625, 210, 'ray_long');
    var tween_ray = game.add.tween(ray).to({ x: 3250 }, 6000, Phaser.Easing.Linear.None, true, 0, -1, true);
    game.physics.enable(ray);
    ray.body.setSize(10, 300, 22, 65);
    ray.animations.add('go', [0, 1, 2, 3], 20, true);
    ray.animations.play('go');
  
    
    ////////////////////////////////////////////////////////////////////////////////////////
    p = game.add.sprite(132, 132, 'hero');
    game.physics.enable(p);
    p.body.gravity.y = 1100;
    p.body.bounce.y = 0;
    p.body.linearDamping = 1.2;
    p.body.collideWorldBounds = true;
    p.animations.add('right', [0, 1, 2, 3, 4, 5], 12, false);
    p.animations.add('left', [11, 10, 9, 8, 7, 6], 12, false);
    // camera
    //镜头随人物移动？
    game.camera.follow(p);
    cursors = game.input.keyboard.createCursorKeys();
  }
 


  this.update = function(){


    
    updateTimerText2();

    if(wheel2.y<150){
      wheel2.body.velocity.y = 0;
      wheel2.body.immovable = true;

    }

    game.physics.arcade.collide(p, _layer, nothing, null, this);
    game.physics.arcade.collide(p, triangles, collectTriangle, null, this);

    game.physics.arcade.collide(p, wheel1, collectWheel1,null, this);
    

    game.physics.arcade.collide(wheel1, block1, WB, null, this);

  


    game.physics.arcade.collide(p, wheel2, getWheel2,null, this);

    game.physics.arcade.collide(p, translator1, getTranslator1,null, this);
    game.physics.arcade.collide(p, translator4, getTranslator4,null, this);


    game.physics.arcade.overlap(p, stars, collectStar,null, this);

    game.physics.arcade.overlap(p, ray, beKilled,null, this);
    


    isFlag =  game.physics.arcade.collide(door, ray);
    if(isFlag==true){
      ray.body.setSize(10, 170, 22, 65);
    }
    if(isFlag==false){
      ray.body.setSize(10, 300, 22, 65);
    }
    


    isDrag =  game.physics.arcade.collide(p, block1, collectBlock,null, this);
    if(isDrag==true){
      block1.body.drag.setTo(5000);
    }
    if(isDrag==false){
      block1.body.drag.setTo(0);
    }
    game.physics.arcade.collide(_layer, block1);


    isDrag =  game.physics.arcade.collide(p, block2, collectBlock,null, this);
    if(isDrag==true){
      block2.body.drag.setTo(5000);
    }
    if(isDrag==false){
      block2.body.drag.setTo(0);
    }
    game.physics.arcade.collide(_layer, block2);


    isDrag =  game.physics.arcade.collide(p, block3, collectBlock,null, this);
    if(isDrag==true){
      block3.body.drag.setTo(5000);
    }
    if(isDrag==false){
      block3.body.drag.setTo(0);
    }
    game.physics.arcade.collide(_layer, block3);


    p.body.velocity.x = 0;
    if (cursors.up.isDown) {
        // onFloor才能往上跳
        if (p.body.onFloor()) {
            p.body.velocity.y = -500;
        }
    }
    if (cursors.left.isDown) {
        p.animations.play('left');
        p.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        p.animations.play('right');
        p.body.velocity.x = 150;
    }


  }

  this.render = function() {

    //game.debug.bodyInfo(box1);
    //game.debug.bodyInfo(wheel1);
    //game.debug.body(translator4);
   

}

  function collectTriangle(p, triangle) {
    scores = scores + 15;
    updateText();
    triangle.kill();
  }
  function nothing(p, _layer) {
    if (cursors.up.isDown) {
    p.body.velocity.y = -500;        
    }
  }       
   
  function collectBlock(p, block) {
    if (cursors.up.isDown) {
    p.body.velocity.y = -500;        
    }
  }

  function collectWheel1(p, wheel1) {
    if (cursors.up.isDown) {
    p.body.velocity.y = -500;        
    }
    
  }

  function WB(wheel1, block1){
    moveTo(block1, 1300, 530, 40);
  }

  function getWheel2(p, wheel2){
    if(p.body.y<505){
       wheel2.body.velocity.y = -100;
    }
    if (cursors.up.isDown) {
    p.body.velocity.y = -500;        
    }
    if(wheel2.y<150){
      wheel2.body.velocity.y = 0;
      wheel2.body.immovable = true;

    }
  }

  function getTranslator1(p, translator1){
    p.body.x = 1995;
    p.body.y = 35;
  }

  function getTranslator4(p, translator4){
    p.body.x = 3110;
    p.body.y = 70;
  }

  function collectStar(p, star) {
    scores = scores + 10;
    updateText();
    star.kill();
  }

  function updateText() {
    text2.setText("Scores: " + scores);
  }

  function  updateTimerText2() {
    time2 = Math.floor(game.time.totalElapsedSeconds() - startTime)+time;
    //Convert seconds into minutes and seconds
    var minutes = Math.floor(time2 / 60);
    var seconds = Math.floor(time2) - (60 * minutes);
 
    //Display minutes, add a 0 to the start if less than 10
    result2 = (minutes < 10) ? "0" + minutes : minutes;
 
    //Display seconds, add a 0 to the start if less than 10
    result2 += (seconds < 10) ? ":0" + seconds : ":" + seconds;
 
    timerText2.text = 'time:' + result2;
 }

  function beKilled(p, ray) {
    p.kill();
    game.state.start('over'); //进入游戏结束状态
  }

};





/////////////////////////////////////////

game.States.start = function() {
  this.create = function(){
   

    /////////////////////////////////////////////////////////
    //加入时间
   

    var background = game.add.tileSprite(0, 0, 4200, 560, 'background');
    
    startTime = game.time.totalElapsedSeconds();
    time = Math.floor(game.time.totalElapsedSeconds() - startTime);
    timerText = game.add.bitmapText(12, 12, 'carrier_command', '00：00' + time, 16);
    timerText.fixedToCamera = true;
 

    text = game.add.bitmapText(1000, 12, 'carrier_command','Scores: 0',16);
    //text.font = '#1E90FF';
    text.fixedToCamera = true;

    //var text_time = game.add.bitmapText(0, 0, 'Elapsed seconds: ' + game.time.totalElapsedSeconds().toFixed(3), 32);
    
    ///////////////////////////////////////////////////////


    //start状态开启物理引擎
    game.physics.startSystem(Phaser.Physics.ARCADE);
    scores = 0;
   // game.stage.backgroundColor = '#787878';//如果地图太小，则多余部分设置背景色

    ///////////////////////////
    map = game.add.tilemap('man'); //mario
    // 此处的SuperMarioBros-World1-1与json中tilesets的name对应


   
    //map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    map.addTilesetImage('kenney', 'tile0');
    map.addTilesetImage('wall', 'background');
    map.addTilesetImage('kenny_platformer_64x64', 'tile2');
    map.addTilesetImage('coinxd', 'coin');
    map.addTilesetImage('diamondxd', 'diamond');
    map.addTilesetImage('linexd', 'line');
    
    
    //设置13~17号物品的碰撞检测
    
    //map.setCollisionBetween(27, 29);
   // map.setCollision(40);
   //查阅json的data数组
   //我需要知道需设置碰撞检测的物品的id号
   
    // 此处与json中layer的name对应
    //layer = map.createLayer('World1');

    //var layer1 = map.createLayer('ckck');
    layer = map.createLayer('layer');
    // resizeWorld会根据tilemap重新设置world的大小
    layer.resizeWorld();
	//layer.debugSettings.forceFullRedraw = true;
	  var objLayer = map.createLayer('OBJlayer');
  

    diamonds = game.add.group();
    diamonds.enableBody = true;
    map.createFromObjects('OBJlayer', 229, 'diamond', 0, true, false, diamonds);
    //
    //可以移动的箱子类
    box_cases = game.add.group();
    box_cases.enableBody = true;

    box2 = game.add.sprite(3173, 153, 'case');
    game.physics.enable(box2);
    //box2.body.mass = 1;
    //box2.body.drag.setTo(10000);
    box2.body.gravity.y = 1100;
    //map.createFromObjects('OBJlayer', 168, 'case', 0, true, false, box_cases);
    //
    //
    coins = game.add.group();
    coins.enableBody = true;
    map.createFromObjects('OBJlayer', 228, 'coin', 0, true, false, coins);
    //
    lines = game.add.sprite(0, 555, 'line');
    game.physics.enable(lines);
    lines.body.immovable = true;
    
   
    map.setCollisionBetween(1, 148, true, layer, true);
    map.setCollisionBetween(150, 167, true, layer, true);
    map.setCollisionBetween(169, 227, true, layer, true);
    


    spring = game.add.sprite(200, 500, 'spring');
    game.physics.enable(spring, Phaser.Physics.ARCADE);
    spring.body.immovable = true;
    spring.body.setSize(15, 5, 10, 0);

    spring2 = game.add.sprite(1350, 500, 'spring');
    game.physics.enable(spring2, Phaser.Physics.ARCADE);
    spring2.body.immovable = true;
    spring2.body.setSize(15, 5, 10, 0);

    spring3 = game.add.sprite(3000, 500, 'spring');
    game.physics.enable(spring3, Phaser.Physics.ARCADE);
    spring3.body.immovable = true;
    spring3.body.setSize(15, 5, 10, 0);
    //spring.body.bounce.setTo(1, 1);

    fly_floor = game.add.sprite(800, 400, 'fly_floor');
    game.physics.enable(fly_floor, Phaser.Physics.ARCADE);
    fly_floor.body.setSize(140, 10, 0, 0);

    elevator = game.add.sprite(1000, 300, 'fly_floor');
    game.physics.enable(elevator, Phaser.Physics.ARCADE);
    elevator.body.immovable = true;
    elevator.body.setSize(140, 10, 0, 0);
    tween_elevator = game.add.tween(elevator).to({ y: 100 }, 4000, Phaser.Easing.Linear.None, true, 0, -1, true);

    red_flag = game.add.sprite(4160, 400, 'diamond');
    game.physics.enable(red_flag);

    p = game.add.sprite(132, 132, 'hero');
    game.physics.enable(p);
    p.body.gravity.y = 1100;
    p.body.bounce.y = 0;
    p.body.linearDamping = 1.2;
    p.body.collideWorldBounds = true;
    p.animations.add('right', [0, 1, 2, 3, 4, 5], 12, false);
    p.animations.add('left', [11, 10, 9, 8, 7, 6], 12, false);
    p.animations.add('jump_right', [12, 13], 8, false);
    p.animations.add('jump_left', [15, 14], 8, false);

    // camera
    //镜头随人物移动？
    game.camera.follow(p);
    cursors = game.input.keyboard.createCursorKeys();
  }
 


  this.update = function(){
  
    //////////////////////////////////////////////////
    updateTimerText();


    ////////////////////////////////////////////////
    if(fly_floor.y<100){
      fly_floor.body.velocity.y = 0;
      fly_floor.body.immovable = true;

    }
    //木板的顶点

    game.physics.arcade.collide(p, layer, disBounce, null, this);
    game.physics.arcade.collide(p, elevator, nonGravity, null, this);


    game.physics.arcade.collide(p, spring, springTo, null, this);
    game.physics.arcade.collide(p, spring2, spring_To, null, this);
    game.physics.arcade.collide(p, spring3, spring_To_To, null, this);


    isDrag =  game.physics.arcade.collide(p, box2, collectCase,null, this);
    if(isDrag==true){
      box2.body.drag.setTo(5000);
    }
    if(isDrag==false){
      box2.body.drag.setTo(0);
    }

    game.physics.arcade.collide(layer, box2);
    game.physics.arcade.collide(lines, box2, killBox, null, this);


    game.physics.arcade.collide(p, fly_floor, getFloor,null, this);


    game.physics.arcade.overlap(p, diamonds, collectDiamond,null, this);
    game.physics.arcade.overlap(p, coins, collectCoin,null, this);
    game.physics.arcade.overlap(p, lines, beKilled,null, this);
    game.physics.arcade.overlap(p, red_flag, victory,null, this);
    //game.physics.arcade.overlap(p, 181, drown,null, this);
    p.body.velocity.x = 0;
    if (cursors.up.isDown) {
        // onFloor才能往上跳
        if (p.body.onFloor()&&p.body.velocity.x==0) {
            p.body.velocity.y = -500;
        }
        if (p.body.onFloor()&&p.body.velocity.x>0) {
            p.animations.play('jump_right');
            p.body.velocity.y = -500;
        }
        if (p.body.onFloor()&&p.body.velocity.x<0) {
            p.animations.play('jump_left');
            p.body.velocity.y = -500;
        }
    }
    if (cursors.left.isDown) {
        //p.animations.add('left', [15,14,13,12,11,10], 60, false);
        //p.animations.play('left');
        p.animations.play('left');
        p.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        p.animations.play('right');
        p.body.velocity.x = 150;
    }
  }

  this.render = function() {

    //game.debug.bodyInfo(box1);
    //game.debug.body(fly_floor);
    
    //game.debug.bodyInfo(elevator);

}
     
  function  updateTimerText() {
    time = Math.floor(game.time.totalElapsedSeconds() - startTime);
    //Convert seconds into minutes and seconds
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time) - (60 * minutes);
 
    //Display minutes, add a 0 to the start if less than 10
    result = (minutes < 10) ? "0" + minutes : minutes;
 
    //Display seconds, add a 0 to the start if less than 10
    result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
 
    timerText.text = 'time:' + result;
 }

  function updateText() {
    text.setText("Scores: " + scores);
  }

  /////////////////////////////////////////////////////////////////////////////

  function nonGravity(p, elevator){
    //p.body.velocity.y = elevator.body.velocity.y;
  }


  function getFloor(p, fly_floor){
    fly_floor.body.velocity.y = -100;

    if (cursors.up.isDown) {
    p.body.velocity.y = -500;        
    }
    if(fly_floor.y<100){
      fly_floor.body.velocity.y = 0;
      fly_floor.body.immovable = true;

    }
  }


  function springTo(p, spring){

    spring.animations.add('booo',[0, 1, 0], 25);
    spring.animations.play('booo');
    //if (cursors.up.isDown) {
    p.body.velocity.y = -1000;
    game.state.start('start2');
            
    
  }
  function spring_To(p, spring){
    spring.animations.add('booo_1',[0, 1, 0], 25);
    spring.animations.play('booo_1');
    p.body.velocity.y = -900;
             
  }

  function spring_To_To(p, spring){
    spring.animations.add('booo_2',[0, 1, 0], 25);
    spring.animations.play('booo_2');
    p.body.velocity.y = -900;
  }

  function disBounce(p, layer){
    p.body.bounce.y = 0;
  }
  function collectDiamond(p, diamond) {
    diamond.kill();
    scores = scores + 15;
    updateText();
  }

  function collectCase(p, box_case) {
    //box_case.kill();
    if (cursors.up.isDown) {
    p.body.velocity.y = -500;        
    }
  }
  function collectCoin(p, coin) {
    coin.kill();
    scores = scores + 10;
    updateText();
  }
  function beKilled(p, line) {
    p.kill();
    game.state.start('over'); //进入游戏结束状态
  }
  function victory(p, red_flag){
    game.state.start('start2');
  }

  function killBox(line, box){
    box.kill();
  }

 
};

////////////////////////////////////////
game.state.add('boot', game.States.boot);
game.state.add('preload', game.States.preload);
game.state.add('main', game.States.main);
game.state.add('start', game.States.start);
game.state.add('start2', game.States.start2);
game.state.add('over', game.States.over);

game.state.start('boot');//游戏从boot状态启航