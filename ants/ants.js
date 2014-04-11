jQuery(function() {
    var ants = [];

    var boomSound = jQuery('<audio/>').attr('src', 'https://s3.amazonaws.com/prank/Boom.mp3').attr('autostart', 'false').appendTo(document.body);
    var width;
    var height;
    
    function jqUpdateSize(){
        // Get the dimensions of the viewport
        width = $(window).width();
        height = $(window).height();

        console.log(Math.random % width);      // Display the width
        console.log(height);    // Display the height
    };
    $(document).ready(jqUpdateSize);    // When the page first loads
    $(window).resize(jqUpdateSize);     // When the browser changes size
    
    function createAnt() {
        var ant = {
            x : Math.random() % width,
            y : 740,
            speed: Math.random() * 5,
            direction: Math.random() * 2 * Math.PI,
            img : jQuery('<img/>').attr('src', 'https://s3.amazonaws.com/prank/Ant.png').css('position', 'absolute').appendTo(document.body),

            update: function() {
                console.log(this.x);
                this.img.css('left', this.x + 'px');
                this.img.css('top', this.y + 'px');
                this.img.css('transform', 'rotate(' + (this.direction * (180 / Math.PI) + 90) + 'deg)');

                this.x = this.x + this.speed * Math.cos(this.direction);
                this.y = this.y + this.speed * Math.sin(this.direction);
                this.speed = Math.min(this.speed + Math.random() * 1, 5);
                this.direction = (this.direction + (Math.random() - 0.5) * 0.5) % (2 * Math.PI);
            },

            dead: function() {
                if (this.x < -100 || this.y < -100 || this.x > jQuery(document).width() || this.y > jQuery(document).height()) {
                    jQuery(this.img).detach();
                    return true;
                } else {
                    return false;
                }
            },

            burn: function() {
                var distance = Math.sqrt(Math.pow(this.x - lastX, 2) + Math.pow(this.y - lastY, 2));
                if (distance < 30) {
                    this.boom();
                    jQuery(this.img).detach();
                    return true;
                } else {
                    return false;
                }
            },

            boom: function() {
                var size = 5;
                var boom = jQuery('<img/>').attr('src', 'https://s3.amazonaws.com/prank/Boom.png').css('position', 'absolute').appendTo(document.body);
                var that = this;

                var sound = jQuery('<audio/>').attr('src', 'https://s3.amazonaws.com/prank/Boom.mp3').attr('autostart', 'true').appendTo(document.body);
                sound.get(0).play();

                function tick() {
                    boom.css('left', (that.x - size / 2) + 'px');
                    boom.css('top', (that.y - size / 2) + 'px');
                    boom.css('width', size + 'px');
                    boom.css('height', size + 'px');
                    boom.css('opacity', (1 - size / 500));

                    size += 30;

                    if (size < 500) {
                        setTimeout(tick, 10);
                    } else {
                        boom.detach();
                    }
                }

                tick();
            }

        };

        ant.update();

        return ant;
    }

    function fillUp() {
        if (ants.length < 25) {
            ants.push(createAnt());
        }
    }

    setInterval(function() {
        var alive = [];

        for (var i = 0; i < ants.length; ++i) {
            var ant = ants[i];
            ant.update();

            if (!ant.dead() && !ant.burn(lastX, lastY)) {
                alive.push(ant);
            }
        }

        ants = alive;
        fillUp();
    }, 30);

    var magnifier = jQuery('<img/>').attr('src', 'https://s3.amazonaws.com/prank/Magnifier.png').css('position', 'absolute').css('z-index', 999).appendTo(document.body);
    var lastX, lastY;

    jQuery(document.body).mousemove(function(e) {
        lastX = e.pageX;
        lastY = e.pageY - 80;
        magnifier.css('left', (e.pageX - 128) + 'px');
        magnifier.css('top', (e.pageY - 128) + 'px');
    }); 
}); // Main function end