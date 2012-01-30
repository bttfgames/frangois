
var PlayerEntity = me.ObjectEntity.extend(
{

	init:function (x, y, settings)
	{
		this.q_spirit = 0;
		this.lastTime = new Date().getTime();
		this.animCorrent = "stand";
		this.spirit = false;
		settings.image = "velho3";
		this.isChanging = false;
		this.timeChange = 0;
		this.startX = x;
		this.startY = y;
		// call the constructor
		this.parent(x, y , settings);
		
		// set the walking & jumping speed
		this.setVelocity(2, 12);
	 
		// adjust the bounding box
		this.updateColRect(8,42, -1, 0);
		
		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.HORIZONTAL);
		
		this.addAnimation("stand", [0]);
		this.addAnimation("walk", [1,2,3,4,5,6,7]);
		this.addAnimation("soul", [8,9,10]);
		this.addAnimation("soulIn", [11,,12,13]);
		this.addAnimation("soulOut", [13,12,11]);
		
	},
	
	doChangeState: function(state){
		this.setCurrentAnimation(state);
		this.animCorrent = state;
		this.isChanging = true;
		this.timeChange = new Date().getTime();
	
	},
	
	
	changeState : function(){
		if(!this.spirit){
			if(this.q_spirit >= 5){
				//vai pro limbo
				me.audio.play("transition",false);
				me.audio.stopTrack();
				me.audio.playTrack("limbo");
				me.game.viewport.fadeIn("#999", 70);
				me.game.currentLevel.getLayerByName("b_f").visible = false;
				me.game.currentLevel.getLayerByName("f_f").visible = false;
				me.game.currentLevel.getLayerByName("b_s").visible = true;
				me.game.currentLevel.getLayerByName("f_s").visible = true;
				
				me.game.collisionMap = me.game.currentLevel.getLayerByName("collision_s");
				this.spirit = true;
				this.setVelocity(4, 17);
				this.q_spirit -= 2;
				me.gamestat.setValue("spirit_value",Math.round(this.q_spirit / 2));
				me.game.HUD.setItemValue("hud_spirit",me.gamestat.getItemValue("spirit_value"));
				//this.setCurrentAnimation("soulIn", "soul");
				this.lastTime = new Date().getTime();
				this.doChangeState("soulIn");
			}
		}else{
			me.audio.play("transition",false);			
			me.audio.stopTrack();
			me.audio.playTrack("physic");
			me.game.viewport.fadeIn("#999", 70);
			me.game.currentLevel.getLayerByName("b_f").visible = true;
			me.game.currentLevel.getLayerByName("f_f").visible = true;
			me.game.currentLevel.getLayerByName("b_s").visible = false;
			me.game.currentLevel.getLayerByName("f_s").visible = false;
			
			me.game.collisionMap = me.game.currentLevel.getLayerByName("collision_f");
			this.spirit = false;
			this.setVelocity(2, 13);
			//this.setCurrentAnimation("soulOut", "stand");
			this.doChangeState("soulOut");
			this.lastTime = new Date().getTime();
		}
		this.collisionMap = me.game.collisionMap;
	},
	

	/* -----

		update the player pos
		
	  ------			*/
	update : function ()
	{
		if(me.game.currentLevel.getLayerByName("b_f").visible)
			this.spirit = false;
		else
			this.spirit = true;
		
		
		
		var now = new Date().getTime();
		var diff = Math.round( (now - this.lastTime)/1000 ) ;
		if(this.spirit){
			if ( diff > 2.0 && this.q_spirit > 0){
				this.q_spirit -= 2;
				this.lastTime = new Date().getTime();
				me.gamestat.setValue("spirit_value",Math.round(this.q_spirit / 2));
				me.game.HUD.setItemValue("hud_spirit",me.gamestat.getItemValue("spirit_value"));
		
			}
		}else{
			if ( diff > 2.0 && this.q_spirit < 16){
				this.q_spirit += 2;
				this.lastTime = new Date().getTime();
				me.gamestat.setValue("spirit_value",Math.round(this.q_spirit / 2));
				me.game.HUD.setItemValue("hud_spirit",me.gamestat.getItemValue("spirit_value"));
			}
		}
		
		

		
		if(this.q_spirit <= 0 && this.spirit){
			this.changeState();
		}
	
		//faz a troca de estado
		if (me.input.isKeyPressed('x') && !this.isChanging)
		{	
			//this.changeState = true;
			//console.log(me.game.collisionMap);
			this.changeState();
			//console.log(me.game.currentLevel.getLayerByName("background").visible);
		}
	
		if (this.isChanging){
			var now = new Date().getTime();
			var diff = Math.round( (now - this.timeChange)/1000 ) ;
			if ( diff > 0.5 ){
				this.isChanging = false;
			}
		}else{
			if (me.input.isKeyPressed('left'))
			{
				this.doWalk(true);
				if (this.spirit)
				{
					this.animCorrent = "soul";
				} else {
					this.animCorrent = "walk";
				}

			}
			else if (me.input.isKeyPressed('right'))
			{
				this.doWalk(false);
				if (this.spirit)
				{
					this.animCorrent = "soul";
				} else {
					this.animCorrent = "walk";
				}
			}
			else if(me.input.isKeyPressed('up'))
			{
				this.doClimb(true);
				if (this.spirit)
				{
					this.animCorrent = "soul";
				} else {
					this.animCorrent = "walk";
				}
				
			}else if(me.input.isKeyPressed('down'))
			{
			
				this.doClimb(false);
				if (this.spirit)
				{
					this.animCorrent = "soul";
				} else {
					this.animCorrent = "walk";
				}
			}
			else
			{
				this.vel.x = 0;
				if (this.spirit)
				{
					this.animCorrent = "soul";
				} else {
					this.animCorrent = "stand";
				}
				
			}
			
			if(me.input.isKeyPressed('k')){
				this.pos.x = 4000;
				this.pos.y = 40;
			}
			
			if (me.input.isKeyPressed('jump')){
				if (this.doJump())
				{
					me.audio.play("jump");
					
				}
				
			}
			
			if(this.jumping || this.falling){
				if (this.spirit)
				{
					this.animCorrent = "soul";
				} else {
					this.animCorrent = "walk";
				}
			}
		}
		
		//atualiza animacao
		this.setCurrentAnimation(this.animCorrent);
		
		//console.log(this.isCurrentAnimation("soulIn"));
		
		// check & update player movement
		this.updateMovement();
	 
		// check for collision
		var res = me.game.collide(this);
		 
		if (res)
		{
			//console.log(res);
			if (res.type == me.game.ENEMY_OBJECT)
			{
			   if ((res.y>0) && !this.jumping)
			   {
				  // bounce
				  me.audio.play("stomp");
				  this.forceJump();
			   }
			   else
			   {
				  // let's flicker in case we touched an enemy
				  this.flicker(45);
				  this.pos.x = this.startX;
				  this.pos.y = this.startY;
			   }
			}
		}

		if (this.pos.y >= 480){		
			//morreu
			me.audio.play("wee");
			me.game.viewport.fadeIn("#000", 500);
			this.pos.x = this.startX;
			this.pos.y = this.startY-32;
		}
		
		this.parent(this);
		return true;
		
	}

});

/****************************/
/*                         */
/*		a Coin entity	   */
/*						   */
/***************************/
var CoinEntity = me.CollectableEntity.extend(
{	

	init: function (x, y, settings)
	{
	
		settings.spritewidth = 64;
		// call the parent constructor
		this.parent(x, y , settings);
	},		
		
	onDestroyEvent : function ()
	{
		// do something when collide
		me.audio.play("cling");
		// give some score
		me.totalcoins--;
		console.log("TOTAL DE MOEDAS - " + me.totalcoins);
		console.log("total moedas lista " + me.game.getEntityByName("coinEntity").length);
		var value = me.gamestat.getItemValue("spirit_value");
		if((value + 2) >= 16){
			me.gamestat.setValue("spirit_value", 16);
			me.game.HUD.setItemValue("hud_spirit",8);
		}else{
			me.gamestat.updateValue("spirit_value", 2);
			me.game.HUD.updateItemValue("hud_spirit",1);
		}
	}
	
});

/****************************/
/*                         */
/*		a Coin entity	   */
/*						   */
/***************************/
var ForegroundEntity = me.ObjectEntity.extend(
{	

	init: function (x, y, settings)
	{
		// call the parent constructor
		this.parent(x, y , settings);
	},		
		
	
});

/************************************************************************************/
/*																					*/
/*		an enemy Entity																*/
/*																					*/
/************************************************************************************/
var EnemyEntity = me.ObjectEntity.extend(
{	
	init: function (x, y, settings)
	{
		// define this here instead of tiled
		settings.image = "monstro1";
		settings.spritewidth = 128;
		
		// call the parent constructor
		this.parent(x, y , settings);
		
		this.startX = x;
		this.endX   = x+settings.width - settings.spritewidth; // size of sprite
		
		
		// make him start from the right
		//this.pos.x = x + settings.width - settings.spritewidth;
		this.doWalk(true);

		// walking & jumping speed
		this.setVelocity(1, 6);
		
		// make it collidable
		this.collidable = true;
		this.type = me.game.ENEMY_OBJECT;
		
		// bounding box
		this.updateColRect(10,100,45,83	);
		
	},
	
		
	onCollision : function (res, obj)
	{
			
		// res.y >0 means touched by something on the bottom
		// which mean at top position for this one
		if (this.alive && (res.y > 0) && obj.falling)
		{
			// make it flicker
			this.flicker(20, function(){
				this.alive = false;
				me.game.remove(this);
			});
			
		}
	},

	
	// manage the enemy movement
	update : function ()
	{
		// do nothing if not visible
		if (!this.visible)
			return false;
			
		if (!this.alive){
			this.vel.x = 0;
			
		}
		
		// check & update movement
		this.updateMovement();
		
		//update animation if necessary
		
			// update the object animation
			this.parent();
			return true;
		
	}
});
