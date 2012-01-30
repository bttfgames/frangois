/*
*
*  Frangoi's Journey
*  This code is under the MIT License
*  Copyright (C) 2012 Fuschia Team
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in
* the Software without restriction, including without limitation the rights to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
* of the Software, and to permit persons to whom the Software is furnished to do
* so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
**/


//Game resources
var g_ressources = [
	{name: "font",				type: "image",src: "images/font.png"},
	{name: "levelcomplete",		type: "image",src: "images/levelcomplete.png"},
	{name: "levelcompletebg",	type: "image",src: "images/levelcompletebg.png"},
	{name: "creditos",			type: "image",src: "images/creditos.png"},
	{name: "menu",				type: "image",src: "images/menu.png"},
    {name: "titlescreen",		type: "image",src: "images/titlescreen.png"},
	{name: "menu_arrow",		type: "image",src: "images/bolinha_menu.png"},
	//Parallel BGs
	{name: "pl01",				type: "image",src: "images/background/frente.png"},
	{name: "pl02",				type: "image",src: "images/background/chao.png"},
	{name: "pl03",				type: "image",src: "images/background/torre.png"},
	{name: "pl04",				type: "image",src: "images/background/montanha.png"},
	{name: "pl05",     			type: "image",src: "images/background/ceu.png"},
	{name: "spinning_coin_gold",type: "image",src: "images/coin.png"},

	// our level tileset
    {name: "tileset-platformer",type:"image",src: "images/tileset-platformer.png"},
	//foreground
	{name: "frente",  			type:"image",src: "images/background/frente.png"},
    // our levels
    {name: "fase1",             type: "tmx",src: "maps/fase1.tmx"},
	//chars
	{name: "velho3",     		type: "image",  src: "images/velho3.png"},
	{name: "monstro1",			type: "image",  src: "images/monstro2.png"},

	//sounds
	{name: "limbo",     type: "audio",  src: "sounds/", channel:1},
	{name: "physic",    type: "audio",  src: "sounds/", channel:1},
	{name: "transition",type: "audio",  src: "sounds/", channel:1},
	{name: "wee",     	type: "audio",  src: "sounds/", channel:2},
	{name: "cling",     type: "audio",  src: "sounds/", channel:2},
	{name: "stomp",     type: "audio",  src: "sounds/", channel:2},
	{name: "jump",     	type: "audio",  src: "sounds/", channel:2},

	//hud
	{name: "barra",  	 type: "image",   src: "images/barra.png"},
	{name: "barra-a-0",  type: "image",   src: "images/barra-a-0.png"},
	{name: "barra-a-1",  type: "image",   src: "images/barra-a-1.png"},
	{name: "barra-a-2",  type: "image",   src: "images/barra-a-2.png"},
	{name: "barra-a-3",  type: "image",   src: "images/barra-a-3.png"},
	{name: "barra-a-4",  type: "image",   src: "images/barra-a-4.png"},
	{name: "barra-a-5",  type: "image",   src: "images/barra-a-5.png"},
	{name: "barra-a-6",  type: "image",   src: "images/barra-a-6.png"},
	{name: "barra-a-7",  type: "image",   src: "images/barra-a-7.png"},
	{name: "barra-a-8",  type: "image",   src: "images/barra-a-8.png"},
	{name: "barra-b-0",  type: "image",   src: "images/barra-b-0.png"},
	{name: "barra-b-1",  type: "image",   src: "images/barra-b-1.png"},
	{name: "barra-b-2",  type: "image",   src: "images/barra-b-2.png"},
	{name: "barra-b-3",  type: "image",   src: "images/barra-b-3.png"},
	{name: "barra-b-4",  type: "image",   src: "images/barra-b-4.png"},
	{name: "barra-b-5",  type: "image",   src: "images/barra-b-5.png"},
	{name: "barra-b-6",  type: "image",   src: "images/barra-b-6.png"},
	{name: "barra-b-7",  type: "image",   src: "images/barra-b-7.png"},
	{name: "barra-b-8",  type: "image",   src: "images/barra-b-8.png"},

];


var jsApp	=
{
	onload: function()
	{

		//DEBUG mode
		//me.debug.renderHitBox = true;

		// init the video
		if (!me.video.init('jsapp', 640, 480, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
			return;
		}

		// initialize the "audio"
		me.audio.init("mp3,ogg");

		// set all ressources to be loaded
		me.loader.onload = this.loaded.bind(this);

		// set all ressources to be loaded
		me.loader.preload(g_ressources);

		// load everything & display a loading screen
		//me.state.set(me.state.LOADING, new LoadingScreen());
		me.state.change(me.state.LOADING);
	},

	//Callback when its loaded
	loaded: function ()
	{
		//SCREENS
		me.state.set(me.state.MENU, new TitleScreen());
		me.state.set(me.state.CREDITS, new CreditsScreen());
		me.state.set(me.state.PLAY, new PlayScreen());
		me.state.set(me.state.READY, new LevelCompleteScreen());

		me.entityPool.add("mainPlayer", PlayerEntity);
		me.entityPool.add("coinEntity", CoinEntity);
		me.entityPool.add("foregroundEntity", ForegroundEntity);
		me.entityPool.add("enemyEntity", EnemyEntity);
		me.entityPool.add("tmxlevelcomplete", TMXLevelEntity);

		me.state.transition("fade", "#FFFFFF", 15);

		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,"left");
        me.input.bindKey(me.input.KEY.RIGHT,"right");
        me.input.bindKey(me.input.KEY.UP,"up",true);
        me.input.bindKey(me.input.KEY.DOWN,"down",true);
        me.input.bindKey(me.input.KEY.ENTER,"enter", true);
        me.input.bindKey(me.input.KEY.X,"x", true);
		me.input.bindKey(me.input.KEY.C,"jump", true);

		//DEBUG key
		me.input.bindKey(me.input.KEY.K,"k", true);

		//Pause screen
		me.state.onPause = function () {
            context = me.video.getScreenFrameBuffer();
            context.fillStyle = "rgba(0, 0, 0, 0.8)";
            context.fillRect(0, (me.video.getHeight() / 2) - 30, me.video.getWidth(), 60);
            font = new me.BitmapFont("font", 32);
            font.set("left");
            measure = font.measureText("P A U S E");
            font.draw(context, "P A U S E", (me.video.getWidth() / 2) - (measure.width / 2), (me.video.getHeight() / 2) - (measure.height / 2))
        };

		//Global Game Vars
		me.gamestat.add("spirit_value",0);
		me.gamestat.add("total_coins",0);
		me.totalcoins = 10;

		// start the game
		me.state.change(me.state.MENU);
	}

};

/*
*
* Game Screens
*
*/

//LOADING

var LoadingScreen = me.ScreenObject.extend({
   // constructor
   init: function(){
      this.parent(true);
      this.font = new me.BitmapFont("font", 32);
      this.logo = new me.Font('font', 32);
      this.invalidate = false;
      this.loadPercent = 0;
      me.loader.onProgress = this.onProgressUpdate.bind(this);

   },

   // will be fired by the loader each time a resource is loaded
   onProgressUpdate: function(progress) {
      this.loadPercent = progress;
      this.invalidate = true;
   },

   // make sure the screen is only refreshed on load progress
   update: function() {
      if (this.invalidate===true) {
         this.invalidate = false;
         return true;
      }
      return false;
   },

   onDestroyEvent : function () {
      // "nullify" all fonts
      this.logo = null;
   },

   draw : function(context) {
      me.video.clearSurface(context, "back");
      this.font.draw(context, "LOADING..", 320,240);
      var width = Math.floor(this.loadPercent * context.canvas.width);
      context.strokeStyle = "silver";
      context.strokeRect(0, (context.canvas.height / 2) + 40, context.canvas.width, 6);
      context.fillStyle = "#89b002";
      context.fillRect(2, (context.canvas.height / 2) + 42, width-4, 2);
   },
});



//MENU
var TitleScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
        this.title = null;
        this.font = null;
		this.arrow = null;
        this.menuItems = [];
        this.selectedItem = 0;
		this.tween = null;
    },

    onResetEvent: function() {
        if (this.title == null){
            this.title = me.loader.getImage("menu");
            this.font = new me.BitmapFont("font", 32);
            this.font.set("left");
			this.arrow = new me.SpriteObject(80, 80, me.loader.getImage("menu_arrow"));
            this.menuItems[0] = new me.Vector2d(200, 350);
            this.menuItems[1] = new me.Vector2d(200, 415);
        }

		this.tween = new me.Tween(this.arrow.pos).to({
			x: 200
		},400).onComplete(this.tweenbw.bind(this)).start();


        this.arrow.pos.y = this.menuItems[this.selectedItem].y;
		pb = new me.ParallaxBackgroundEntity(1);
        pb.addLayer("menu", 1, 1);
        me.game.add(pb);

        me.game.add(this.arrow, 100);
	},

	tweenbw: function(){
		this.tween.to({
			x:190
		},400).onComplete(this.tweenff.bind(this)).start();
	},

	tweenff: function(){
		this.tween.to({
			x:200
		},400).onComplete(this.tweenbw.bind(this)).start();
	},


    update: function() {
		if (me.input.isKeyPressed("up")) {
            if (this.selectedItem > 0) {
                this.selectedItem--;
            }
            this.arrow.pos.y = this.menuItems[this.selectedItem].y;
            me.audio.play("cling", false);
            return true;
        }
        if (me.input.isKeyPressed("down")) {
            if (this.selectedItem < this.menuItems.length - 1) {
                this.selectedItem++;
            }
            this.arrow.pos.y = this.menuItems[this.selectedItem].y;
            me.audio.play("cling", false);
            return true;
        }
        if (me.input.isKeyPressed("enter")) {
            if (this.selectedItem == 0) {
                me.state.change(me.state.PLAY)
            }
			if (this.selectedItem == 1) {
                me.state.change(me.state.CREDITS)
            }
            return true;
        }

        return true;
    },

    draw: function(context) {
        this.font.draw(context, " ", 270, 350);
        this.font.draw(context, " ", 245, 415);
    },

});

//LEVEL CheckPoint
var TMXLevelEntity = me.LevelEntity.extend({
    init: function (a, c, b) {
        this.parent(a, c, b);
        this.updateColRect(20, 24, 24, 40)
    },
    onCollision: function () {
        this.collidable = false;
		//if (me.totalcoins == 0)
			me.state.change(me.state.READY);

    }
});

//LEVEL COMPLETE
LevelCompleteScreen = me.ScreenObject.extend({
    init: function () {
        this.parent(true);
        this.title = null;
        this.font = null;
        this.postitle = 0;
        this.tween = null;
        this.background = null;
    },

    onResetEvent: function (a) {
        if (this.font == null) {
            this.title = me.loader.getImage("levelcomplete");
            this.font = new me.BitmapFont("font", 32)
        }
        this.tweenfinished = false;
        this.postitle = 0 - this.title.height;
        this.tween = new me.Tween(this).to({
            postitle: 150
        }, 750).onComplete(this.tweencb.bind(this));
        this.tween.easing(me.Tween.Easing.Bounce.EaseOut);
        this.tween.start();
        me.input.bindKey(me.input.KEY.ENTER, "enter");
        me.input.bindKey(me.input.KEY.ESC, "enter");

		me.game.disableHUD();
        pb.addLayer("levelcompletebg", 1, 1);
		me.game.add(pb);
    },

    tweencb: function () {
        this.tweenfinished = true
    },

    update: function () {
        if (me.input.isKeyPressed("enter")) {
            me.state.change(me.state.PLAY);
        }
        return true
    },

    draw: function (a) {
        a.drawImage(this.title, (a.canvas.width - this.title.width) / 2, this.postitle);
        this.font.set("left");
    },

    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.ESC);
        this.tween.stop();
    }
});


//CREDITS
CreditsScreen = me.ScreenObject.extend({
    init: function () {
        this.parent(true);
        this.title = null;
        this.font = null
    },
    onResetEvent: function () {
        if (this.title == null) {
            this.title = me.loader.getImage("creditos");
            this.font = new me.BitmapFont("font", 32);
            this.font.set("center");
        }
        me.input.bindKey(me.input.KEY.ESC, "enter", true);
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

		pb = new me.ParallaxBackgroundEntity(1);
        pb.addLayer("creditos", 1, 1);
        me.game.add(pb);
    },
    update: function () {
        if (me.input.isKeyPressed("enter")) {
            me.state.change(me.state.MENU);
        }
        return true
    },

	onDestroyEvent: function () {
		me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.ESC);
    }

});

//PLAY SCREEN
var PlayScreen = me.ScreenObject.extend({

	onResetEvent: function(){
		me.levelDirector.loadLevel("fase1");
        me.game.addHUD(0, 0, 640, 480);
		me.game.HUD.addItem("hud_spirit",new HUDSpiritObject(288,18));
		me.game.currentLevel.getLayerByName("b_s").visible = false;
		me.game.currentLevel.getLayerByName("f_s").visible = false;
		me.audio.playTrack("physic");
		me.gamestat.setValue('total_coins',me.game.getEntityByName("coinEntity").length);

	},

	onDestroyEvent: function(){
		me.audio.stopTrack();
    }

});



//HUD entity
var HUDSpiritObject = me.HUD_Item.extend({
    init: function (a, b) {
        this.parent(a, b, me.gamestat.getItemValue("spirit_value"));
        this.spiritIcon = me.loader.getImage("barra-a-"+me.gamestat.getItemValue("spirit_value"));
    },

    draw: function (c, b, d) {
        var a = this.pos.x;
		if (this.value >=8) this.value = 8;
		this.spiritIcon = me.loader.getImage("barra-a-"+this.value);
        c.drawImage(this.spiritIcon, a, this.pos.y);
    }
});


window.onReady(function()
{
	jsApp.onload();
});
