require("styles/include.scss");

require("script-loader!js/vendor/jquery.js");
require("script-loader!js/vendor/what-input.js");
require("script-loader!js/vendor/foundation.js");

require ('index.html');


// var updateCurrentScrollPos = function() {

// };

'use strict';

(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

var setTransform = function($elem, transform) {
    $elem.css({
        "webkitTransform": transform,
        "MozTransform": transform,
        "msTransform": transform,
        "OTransform": transform,
        "transform": transform
    })
};

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

var bound = function(min, max, val) {
    return Math.max(min, Math.min(max, val));
};

var linear = function(start, end, t) {
    return (end - start) * t + start;
};

var easeOutExpo = function (start, end, t) {
    return (t>=1) ? end : (end - start) * (-Math.pow(2, -10 * t) + 1) + start;
};


var sydImageWidth = 10000; // default settings to prevent pop-in
var robImageWidth = 10000;
var blowerImageWidth = 10000; // default settings to prevent pop-in


window.addEventListener("load", function(event) {
    var $sydImage = $('#syd-image');
    var $robImage = $('#rob-image');
    var $robBlower = $('#rob-blower');

    sydImageWidth = $sydImage.width();
    robImageWidth = $robImage.width();
    blowerImageWidth = $robBlower.width();
});

var main = function() {
    $(document).foundation();

    $('a[href^="#"]').click(function(e) { 
        e.preventDefault(); 

        var dest = $(this).attr('href'); 
        console.log(dest); 
        $('html,body').animate({ scrollTop: $(dest).position().top + 1 }, 'slow');
    });


    var bgHeight, detailsHeight, giftsHeight, bgTop, detailsTop, giftsTop, rsvpTop, bgMid, detailsMid, giftsMid;

    var reloadHeights = function() {
        bgHeight = $('#bg').height();
        detailsHeight = $('#details').height();
        giftsHeight = $('#gifts').height();

        bgTop = 0
        detailsTop = bgTop + bgHeight;
        giftsTop = detailsTop + detailsHeight;
        rsvpTop = giftsTop + giftsHeight;

        bgMid = bgTop + bgHeight / 2;
        detailsMid = detailsTop + detailsHeight / 2;
        giftsMid = giftsTop + giftsHeight / 2;
    }

    reloadHeights();

    var $sydImage = $('#syd-image');
    var $robImage = $('#rob-image');
    var $robBlower = $('#rob-blower');
    var $sydBlower = $('#syd-blower');
    var $robBlowerConfetti = $('#rob-blower-confetti');
    var $sydBlowerConfetti = $('#syd-blower-confetti');

    var pageWidth = $(window).innerWidth();

    window.addEventListener("optimizedResize", function() {
        pageWidth = $(window).innerWidth();
        reloadHeights();
    });

    var update = function() {
        var scrollY = window.scrollY || document.body.scrollTop;

        var animPct = bound(0, 1, (scrollY - bgMid) / (detailsTop - bgMid));

        var rotationAngle = 25;
        var robMinX = -robImageWidth - robImageWidth * Math.cos(Math.radians(rotationAngle))
        var sydMaxX = pageWidth + (sydImageWidth * Math.cos(Math.radians(rotationAngle)))

        var sydx = linear(sydMaxX, pageWidth - sydImageWidth / 2, animPct);
        var sydy = 100;
        var robx = linear(robMinX, -robImageWidth/2, animPct);
        var roby = 100;

        setTransform($sydImage, "translate3d(" + sydx + "px, "+sydy+"px, 0) rotate3d(0, 0, 1, "+-rotationAngle+"deg)");
        setTransform($robImage, "translate3d(" + robx + "px, "+roby+"px, 0) rotate3d(0, 0, 1, "+rotationAngle+"deg)");
        
        var blowerAnimPct = bound(0, 1, (scrollY - detailsMid) / (giftsTop - detailsMid));

        var robBlowerAngle = 30;
        var robBlowerMinX = -blowerImageWidth * Math.cos(Math.radians(robBlowerAngle));
        var robBlowerx = easeOutExpo(robBlowerMinX, robx + 240, blowerAnimPct);
        var robBlowery = roby + 40;

        var sydBlowerAngle = -165;
        var sydBlowerMaxX = pageWidth + blowerImageWidth * Math.cos(Math.radians(robBlowerAngle));
        var sydBlowerx = easeOutExpo(sydBlowerMaxX, sydx - 100, blowerAnimPct);
        var sydBlowery = sydy + 90;

        var robBlowerTransformStr = "translate3d(" + robBlowerx + "px, "+robBlowery+"px, 0) rotate3d(0, 0, 1, "+robBlowerAngle+"deg)";
        var sydBlowerTransformStr = "translate3d(" + sydBlowerx + "px, "+sydBlowery+"px, 0) rotate3d(0, 0, 1, "+sydBlowerAngle+"deg)"

        setTransform($robBlower, robBlowerTransformStr);
        setTransform($sydBlower, sydBlowerTransformStr);

        if (scrollY >= (rsvpTop)) {
            setTransform($robBlowerConfetti, robBlowerTransformStr);
            setTransform($sydBlowerConfetti, sydBlowerTransformStr);
        } else {
            setTransform($robBlowerConfetti, "translate3d(" + 10000 + "px, "+0+"px, 0)");
            setTransform($sydBlowerConfetti, "translate3d(" + 10000 + "px, "+0+"px, 0)");
        }

        window.requestAnimationFrame(update)
    };

    update();
}

$(document).ready(main);
    
