var game = new Phaser.Game(1800, 560, Phaser.CANVAS, 'game');

var map;
//var layer1
var layer;
var p;
var cursors;

//设置一些对象变量
//var flag;
//var objects;
//var oblique_flag2;
//var flag2;
//var oblique_flag;
//var flag;
var diamonds;
var box_cases;
var coins;
var lines;
//var door_top;

game.States = {};

//第一个game状态state，boot
game.States.boot = function() {
  this.preload = function() {
    game.load.image('loading', 'assets/preloader.gif');
  };
  this.create = function() {
    game.state.start('preload');//执行完boot以后执行preload
  };
};
//////////////////////////////////////////

//第二个game状态state，preload
game.States.preload = function() {
  this.preload = function() {
    var preloadSprite = game.add.sprite(10, game.height/2, 'loading');
    game.load.setPreloadSprite(preloadSprite);
    game.load.image('bg', 'assets/bg.png');
    //game.load.image('copyright', 'assets/copyright.png');
    game.load.spritesheet('myplane', 'assets/myplane.png', 40, 40, 4);
    game.load.spritesheet('startbutton', 'assets/startbutton.png', 100, 40, 2);//开始按钮


    //加载游戏地图，在main状态出现
    game.load.tilemap('man', 'assets/latest_map.json', null, Phaser.Tilemap.TILED_JSON);// super_mario.json //mario

    game.load.image('tile0', 'assets/kenney.png');
    game.load.image('background', 'assets/background_1.png');//super_mario.png
    game.load.image('tile2', 'assets/kenny_platformer_64x64.png');

    //game.load.image('flag', 'assets/flag.png');
    //game.load.image('oblique_flag', 'assets/oblique_flag.png');
    game.load.image('case', 'assets/case.png');
    game.load.image('coin', 'assets/coin.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('line', 'assets/deadline.png');
    //game.load.image('door', 'assets/door.png');
    //game.load.spritesheet('spring','assets/spring.png',100,40,2);
    //把图片资源加载进去




    game.load.image('player', 'assets/phaser-dude.png');
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
    var bg = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
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
    game.state.start('start');//执行完main以后执行start，游戏开始
    //this.normalback.stop();
  };
};

/////////////////////////////////////////

game.States.start = function() {
  this.create = function(){
    //var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    //bg.autoScroll(20,0);

    //start状态开启物理引擎
    game.physics.startSystem(Phaser.Physics.ARCADE);
   // game.stage.backgroundColor = '#787878';//如果地图太小，则多余部分设置背景色

    ///////////////////////////
    map = game.add.tilemap('man'); //mario
    // 此处的SuperMarioBros-World1-1与json中tilesets的name对应


    //kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    //var cache = new Phaser.Cache(); //参数是什么？
    //cache.addJson('many', 'many.json');
    //cache.addJson('background', 'background.json');
    ////////////////////////////////////////////////

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
   //map.setCollision();
   //map.setCollision();
   //map.setCollision();
   //map.setCollision();
   //map.setCollision();
   //map.setCollision();
   //map.setCollision();
   //map.setCollision();

    // 此处与json中layer的name对应
    //layer = map.createLayer('World1');
var background = game.add.tileSprite(0, 0, 4200, 560, 'background');
    //var layer1 = map.createLayer('ckck');
    layer = map.createLayer('layer');
    // resizeWorld会根据tilemap重新设置world的大小
    layer.resizeWorld();
	//layer.debugSettings.forceFullRedraw = true;
	var objLayer = map.createLayer('OBJlayer');
    //layer.wrap = false;
    // wrap为true会填充整个区域
    diamonds = game.add.group();
    diamonds.enableBody = true;
    map.createFromObjects('OBJlayer', 229, 'diamond', 0, true, false, diamonds);
    //
    box_cases = game.add.group();
    box_cases.enableBody = true;
    map.createFromObjects('OBJlayer', 168, 'case', 0, true, false, box_cases);
    //
    //
    coins = game.add.group();
    coins.enableBody = true;
    map.createFromObjects('OBJlayer', 228, 'coin', 0, true, false, coins);
    //
    lines = game.add.group();
    lines.enableBody = true;
    map.createFromObjects('OBJlayer', 230, 'line', 0, true, false, lines);
    //oblique_flag2 = game.add.sprite(251,50,'oblique_flag')
    //flag2 = game.add.sprite(1504, 92, 'flag');
    //oblique_flag = game.add.sprite(1600, 130, 'oblique_flag');
    //flag = game.add.sprite(2131, 320, 'flag');
    //diamond = game.add.sprite(2324, 190, 'diamond');
    //box_case = game.add.sprite(2944, 155, 'case');
    //coin = game.add.sprite(3133, 124, 'coin');
    //door_buttom = game.add.sprite(3802, 477, 'door');
    //door_top = game.add.sprite(250, 51, 'oblique_flag');

    //game.physics.enable(oblique_flag2);
    //game.physics.enable(flag2);
    //game.physics.enable(oblique_flag);
    //game.physics.enable(flag);
    ///game.physics.enable(diamond);
    //game.physics.enable(box_case);
    //game.physics.enable(coin);
    //game.physics.enable(door_buttom);
    //coin.body.gravity.y = 0;
    //oblique_flag = game.add.sprite();
    
   
    map.setCollisionBetween(1, 148, true, layer, true);
    map.setCollisionBetween(150, 167, true, layer, true);
    map.setCollisionBetween(169, 227, true, layer, true);
    


    //var objLayer = map.createLayer('OBJlayer');
    //下面这段话有什么用啊？
    ////////////////////////////////////////////////////
    //选择创建对象层对象
    //map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, coins);
    //, Phaser.World, oblique_flag2); //这句话就已经创建了一个oblique_flag对象//错误
    //map.createFromObjects('OBJlayer', 246, 'spring', 0, true, false);
    //map.createFromObjects('OBJlayer', 156, 'flag', 0, true, false, objects);
    //map.createFromObjects('OBJlayer', 164, 'oblique_flag', 0, true, false, objects);
    //map.createFromObjects('OBJlayer', 156, 'flag', 0, true, false, objects);
    //map.createFromObjects('OBJlayer', 168, 'diamond', 0, true, false, objects);
    //map.createFromObjects('OBJlayer', 156, 'player', 0, true, false);
    //map.createFromObjects('OBJlayer', 126, 'case', 0, true, false, objects);
    //map.createFromObjects('OBJlayer', 177, 'coin', 0, true, false, objects);
    //map.createFromObjects('OBJlayer', 35, 'door', 0, true, false, objects);
    /////////////////////////////////////////////////////
    //开启人物的物理引擎


    p = game.add.sprite(132, 132, 'player');
    game.physics.enable(p);
    p.body.gravity.y = 1100;
    p.body.bounce.y = 0;
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;

    // camera
    //镜头随人物移动？
    game.camera.follow(p);
    cursors = game.input.keyboard.createCursorKeys();
  }

  this.update = function(){
    /*if (cursors.left.isDown) {
        game.camera.x -= 8;
    } else if (cursors.right.isDown) {
        game.camera.x += 8;
    }
    if (cursors.up.isDown) {
        game.camera.y -= 8;
    } else if (cursors.down.isDown) {
        game.camera.y += 8;
    }
  */
    game.physics.arcade.collide(p, layer);
    //game.physics.arcade.overlap(p, oblique_flag2, collectObliqueFlag2,null, this); //overlap()函数调用
    //game.physics.arcade.overlap(p, flag2, collectFlag2,null, this);
    //game.physics.arcade.overlap(p, oblique_flag, collectObliqueFlag,null, this);
    //game.physics.arcade.overlap(p, flag, collectFlag,null, this);
    //game.physics.arcade.overlap(p, diamond, collectDiamond,null, this);
    //game.physics.arcade.overlap(p, box_case, collectCase,null, this);
    //game.physics.arcade.overlap(p, coin, collectCoin,null, this);
    //game.physics.arcade.overlap(p, door_buttom, collectDoorButtom,null, this);
    game.physics.arcade.overlap(p, diamonds, collectDiamond,null, this);
    game.physics.arcade.overlap(p, box_cases, collectCase,null, this);
    game.physics.arcade.overlap(p, coins, collectCoin,null, this);
    game.physics.arcade.overlap(p, lines, beKilled,null, this);
    //game.physics.arcade.overlap(p, 181, drown,null, this);
    p.body.velocity.x = 0;
    p.body.velocity.x = 0;
    if (cursors.up.isDown) {
        // onFloor才能往上跳
        if (p.body.onFloor()) {
            p.body.velocity.y = -500;
        }
    }
    if (cursors.left.isDown) {
        p.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        p.body.velocity.x = 150;
    }
  }

  /*
  function collectObliqueFlag2(p, oblique_flag2) {
    oblique_flag2.kill();
  }
  function collectFlag2(p, flag2) {
    flag2.kill();
  }
  function collectObliqueFlag(p, oblique_flag) {
    oblique_flag.kill();
  }
  function collectFlag(p, flag) {
    flag.kill();
  }
  function collectDiamond(p, diamond) {
    diamond.kill();
  }
  function collectCase(p, box_case) {
    box_case.kill();
  }
  function collectCoin(p, coin) {
    coin.kill();
  }
  function collectDoorButtom(p, door_buttom) {
    door_buttom.kill();
  }
  */
  function collectDiamond(p, diamond) {
    diamond.kill();
  }
  function collectCase(p, box_case) {
    box_case.kill();
  }
  function collectCoin(p, coin) {
    coin.kill();
  }
  function beKilled(p, line) {
    p.kill();
  }
 
}

////////////////////////////////////////
game.state.add('boot', game.States.boot);
game.state.add('preload', game.States.preload);
game.state.add('main', game.States.main);
game.state.add('start', game.States.start);
//game.state.add('over', game.States.over);

game.state.start('boot');//游戏从boot状态启航