require("styles/include.scss");

require("script-loader!js/vendor/jquery.js");
require("script-loader!js/vendor/what-input.js");
require("script-loader!js/vendor/foundation.js");

require ('index.html');


$(document).ready(function() {
    $(document).foundation();

    $('a[href^="#"]').click(function(e) { 
        e.preventDefault(); 

        var dest = $(this).attr('href'); 
        console.log(dest); 
        $('html,body').animate({ scrollTop: $(dest).position().top + 1 }, 'slow');
    });
});
    
