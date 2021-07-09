// time spent on page 

window.onload = function(){

    var time_spent = 0;
    push_to_binom(time_spent);
       
    var time_start = new Date();

        $(window).on('beforeunload', function(e) {

        var time_end = new Date();

        var time_spent = Math.round((time_end - time_start) / 1000);
        push_to_binom(time_spent);         
        window.localStorage.setItem('time_spent', time_spent);          


     });

        function push_to_binom(time_spent) {    

        var pushURL = 'https://medical-room.site/click.php?add_event9='+time_spent;
        var img = document.createElement('img');
        img.src=pushURL;
        img.style.display='none';
        document.body.appendChild(img);
        window.localStorage.setItem('result time_spent', 'was sended'); 

    }


     function push_to_binom_first(time_spent) {    

        var pushURL = 'https://medical-room.site/click.php?event9='+time_spent;
        var img = document.createElement('img');
        img.src=pushURL;
        img.style.display='none';
        document.body.appendChild(img);
        window.localStorage.setItem('result time_spent', 'was sended'); 

    }

    

//detect fail session(<15sec)


    function pushToTrackerViaImage(){
        
        var pushURL = 'https://medical-room.site/click.php?event10=1';
        var img = document.createElement('img');
        img.src=pushURL;
        img.style.display='none';
        document.body.appendChild( img );
        window.localStorage.setItem('result fail session', 'was sended'); 

        var pushURL2 = 'https://medical-room.site/click.php?event9=15';
        var img = document.createElement('img');
        img.src=pushURL2;
        img.style.display='none';
        document.body.appendChild( img );
        window.localStorage.setItem('result fail session', 'was sended'); 


        
        
    }

    function pushAfterTimeout(timeout){
        setTimeout(pushToTrackerViaImage, timeout*1000);
       
    }

    var TIMEOUT_IN_SECONDS = 15;
    pushAfterTimeout(TIMEOUT_IN_SECONDS);


}