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
}

var linear = function(start, end, t) {
    return (end - start) * t + start;
}


var main = function() {
    $(document).foundation();

    $('a[href^="#"]').click(function(e) { 
        e.preventDefault(); 

        var dest = $(this).attr('href'); 
        console.log(dest); 
        $('html,body').animate({ scrollTop: $(dest).position().top + 1 }, 'slow');
    });


    var bgHeight = $('#bg').height();
    var detailsHeight = $('#details').height();
    var giftsHeight = $('#gifts').height();

    var bgTop = 0
    var detailsTop = bgTop + bgHeight;
    var giftsTop = detailsTop + detailsHeight;
    var rsvpTop = giftsTop + giftsHeight;

    var bgMid = bgTop + bgHeight / 2;
    var detailsMid = detailsTop + detailsHeight / 2;
    var giftsMid = giftsTop + giftsHeight / 2;

    var $sydImage = $('#syd-image');
    var $robImage = $('#rob-image');

    var sydImageWidth = $sydImage.width();
    var robImageWidth = $robImage.width();

    var pageWidth = $(document).outerWidth();

    window.addEventListener("optimizedResize", function() {
        pageWidth = $(document).outerWidth();
    });

    var update = function() {
        var scrollY = window.scrollY || document.body.scrollTop;

        //if (scrollY >= (bgHeight / 2)) {
            var animPct = bound(0, 1, (scrollY - bgMid) / (detailsTop - bgMid));

            var rotationAngle = 30;
            var robMinX = -robImageWidth - robImageWidth * Math.cos(Math.radians(rotationAngle))
            var sydMaxX = pageWidth + (sydImageWidth * Math.cos(Math.radians(rotationAngle)))

            var sydx = linear(sydMaxX, pageWidth - sydImageWidth / 2, animPct);
            var robx = linear(robMinX, -robImageWidth/2, animPct);

            setTransform($sydImage, "translate3d(" + sydx + "px, 100px, 0) rotate3d(0, 0, 1, -"+rotationAngle+"deg)");
            setTransform($robImage, "translate3d(" + robx + "px, 100px, 0) rotate3d(0, 0, 1, "+rotationAngle+"deg)");
        //}

        window.requestAnimationFrame(update)
    };

    window.requestAnimationFrame(update)
}

$(document).ready(main);
    
