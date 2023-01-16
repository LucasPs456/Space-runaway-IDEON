import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = [];
    timeTillNextBulletAllowed = 0;
    
    constructor(canvas, maxBulletAtATime, bulletColor, soundEnabled){
        this.canvas = canvas;
        this.maxBulletAtATime = maxBulletAtATime;
        this.bulletCollor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("sounds/sounds_shoot.wav");
        this.shootSound.volume = 0.2 ;
    }

    draw(ctx){
        this.bullets = this.bullets.filter(
            (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
        );
        
        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if(this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }

    collideWith(sprite){
        const bulletThatHitSpiteIndex = this.bullets.findIndex((bullet) =>
        bullet.collideWith(sprite));

        if(bulletThatHitSpiteIndex >= 0){
            this.bullets.splice(bulletThatHitSpiteIndex, 1);
            return true;
        }

        return false;
    }

    shoot(x,y, velocity, timeTillNextBulletAllowed = 0) {
        if(this.timeTillNextBulletAllowed <= 0 && 
            this.bullets.length < this.maxBulletAtATime){
            const bullet = new Bullet(this.canvas,x,y,velocity,this.bulletCollor);
            this.bullets.push(bullet);
            if(this.soundEnabled){
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;   
        }
    }
}