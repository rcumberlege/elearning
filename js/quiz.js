$(function() {
    var newwidth = $('body').width();
    var newheight = $('.screen.quiz').height();
    var quizwidth = $('.boxed').width() - 40;
    var quizheight = $('.boxed').height() - 40;
    var inaction = false;
    var numQuestions = 50;

    //$('.restart').click();
    
    // $('form#frm_survey').submit(function(event){
    //     event.preventDefault();
    //     console.log( $('input[name=q1]:checked').val() ); 
    // });

    $("form #mysubmitbtn").click(function(event) {
        event.preventDefault();
        var is_error = !initValidation();

        if (!is_error) {
            //SEND TO CLANG...
            $('form').submit();
        }

    }); // end form.submit


    // form validation function
    function initValidation() {
        var errorClass = 'error';
        var errorFormClass = 'error-form';
        var successClass = 'success';
        var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var regPhone = /^[0-9]+$/;
        var myresult = true;

        $('form.validate-form').each(function() {
            var form = $(this);
            var successFlag = true;
            var inputs = form.find('input:text, textarea, select');

            // form validation function
            function validateForm() {
                successFlag = true;
                form.removeClass(errorFormClass);

                inputs.each(checkField);

                if (!successFlag) {
                    form.addClass(errorFormClass);
                    return false;
                }
                return true;
            }

            // check field
            function checkField(i, obj) {
                var currentObject = $(obj);
                var currentParent = currentObject.parents('div.row');

                // not empty fields
                if (currentObject.hasClass('required')) {
                    setState(currentParent, currentObject, !currentObject.val().length || currentObject.val() === currentObject.prop('defaultValue'));
                }
                // correct email fields
                if (currentObject.hasClass('required-email')) {
                    var mail_reg = new RegExp(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
                    setState(currentParent, currentObject, !mail_reg.test(currentObject.val()));
                }
                // something selected
                if (currentObject.hasClass('required-select')) {
                    setState(currentParent, currentObject, currentObject.get(0).selectedIndex === 0);
                }
            }

            // set state
            function setState(hold, field, error) {
                hold.removeClass(errorClass).removeClass(successClass);
                if (error) {
                    hold.addClass(errorClass);
                    successFlag = false;
                } else {
                    hold.addClass(successClass);
                }
            }

            myresult = validateForm();
            // form event handlers
            //form.submit(validateForm);
        });
        return myresult;
    }


    $('.holder').find('input:checkbox').on('click', function(event) {
        //ADD class to label
        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');
        } else {
            $(this).addClass('checked');
        }
    });

    $('.choicelist li').find('input').on('click', function(event) {
        event.preventDefault();
        
        //REMOVE class from other labels in same radio group
        var listItems = $(this).parents('ul').find('li');
        listItems.each(function(idx, li) {
            if ($(li).find('input:radio').hasClass('checked')) {
                $(li).find('input:radio').removeClass('checked');
               
            }
        })
        console.log($(this));
        $(this).addClass('checked');

         // if (currentID == numQuestions){
             //     activateSubmit();
             // }
    })    




    // $('.choices li').find('input').on('click', function(event) {
    //     //event.preventDefault();
        
    //     //Question one - deactive vorige button
    //     var QuestionID = $(this).attr('name');
    //     var currentID = QuestionID.substring(1);

    //     //REMOVE class from other labels in same radio group
    //     var listItems = $(this).parents('ul').find('li');
    //     listItems.each(function(idx, li) {
    //         if ($(li).find('input:radio').hasClass('checked')) {
    //             $(li).find('input:radio').removeClass('checked');
               
    //         }
         
            
    //     });
    //     //ADD class to NEW selected item
    //     if($(this).hasClass('checked')){

    //     	$(this).removeClass('checked');

    //     } else {
    //     	$(this).addClass('checked');
    //     }
        
    //     //ONLY CHECK QUESTION 5
    //     var tempstr = QuestionID.substring(0, QuestionID.indexOf( '_' ));
    //     if (tempstr == 'q5'){
    //         var aCurrentNames = [];
    //         var iCount = 0;
            
    //         //SAVE GROUPNAME TO ARRAY
    //         $('#q5 :radio').each(function(index){
    //             if ($.inArray($(this).attr('name'), aCurrentNames) == -1) {
    //                 aCurrentNames.push($(this).attr('name'));
    //             }
    //         });
            
    //         //COUNT IF RADIO GROUP IS CHECKED 
    //         $.each(aCurrentNames, function(index, listname){
    //             if ($(':radio[name='+listname+']').hasClass('checked')){
    //                  iCount++;
    //             }

    //         });

    //         //ARE ALL ANSWERS CHECKED?
    //         if (iCount == aCurrentNames.length) {
    //             activateNextButton();
    //         }
    //     } else {
            
    //         activateNextButton();
            
    //         // if (currentID == numQuestions){
    //         //     activateSubmit();
    //         // }

    //     }

    //     if (currentID <= 1){
    //     	if (!$('a#btn_previous').hasClass('inactive')) {
    //     	 	$('a#btn_previous').addClass('inactive');
    //     	}
    //     }        

    // });


    $('a#btn_next').on('click', function(event){
    	event.preventDefault();
    	
    	if ($(this).hasClass('inactive')){
    		return false;
    	} else {
	    	
            //q2 = remove insuline block & add previous button
            if ($('.moveable.active').attr('id') == 'q1'){
                $('.insuline_tekst').fadeOut();
                $('#btn_previous').fadeIn('slow');
            }
            
            
            //q3 = remove man
            if ($('.moveable.active').attr('id') == 'q2')
                $('.man').fadeOut();

            
            nextQuestion($('.moveable.active').attr('id'));
    	}

    });
	
	$('a#btn_previous').on('click', function(event){
    	event.preventDefault();
    	
    	//q2 = remove insuline block & add previous button
        if ($('.moveable.active').attr('id') == 'q2')
            $('.insuline_tekst').fadeIn();
        
        if ($('.moveable.active').attr('id') == 'q3')
            $('.man').fadeIn();

        if ($(this).hasClass('inactive')){
    		return false;
    	} else {
    	   	previousQuestion($('.moveable.active').attr('id'));
    	}

    });

	function activateNextButton(){
		//ACTIVATE NEXT BUTTON
		if ($('a#btn_next').hasClass('inactive')) {
    	 	$('a#btn_next').removeClass('inactive');
    	}
	}
	function deactivateNextButton(){
    	//DEACTIVATE NEXT BUTTON
    	if (!$('a#btn_next').hasClass('inactive')) {
    	 	$('a#btn_next').addClass('inactive');
    	}
	}
	function activatePreviousButton(){
		//ACTIVATE NEXT BUTTON
		if ($('a#btn_previous').hasClass('inactive')) {
    	 	$('a#btn_previous').removeClass('inactive');
    	}
	}
	function deactivatePreviousButton(){
		//DEACTIVATE NEXT BUTTON
    	if (!$('a#btn_previous').hasClass('inactive')) {
    	 	$('a#btn_previous').addClass('inactive');
    	}
	}
    // function showSubmit(){
    //     $('#btn_next').hide();
    //     $('#btn_submit').show();
    // }
    // function hideSubmit(){
    //     $('#btn_next').show();
    //     $('#btn_submit').hide();
    // }
    function activateSubmit(){
        if ($('#btn_submit').hasClass('inactive')) {
            $('#btn_submit').removeClass('inactive')
        }
    }
    function deactivateSubmit(){
        if (!$('#bnt_submit').hasClass('inactive')) {
            $('#btn_submit').addClass('inactive')
        }

    }
	/*
	 * GO TO NEXT QUESTION
	 * Requires next questionID 
	 */
	function nextQuestion(QuestionID){

		if (!inaction) {
            var currentID = QuestionID.substring(1);
            var nextID = currentID;
            nextID++;
            
            //Check if next question is answered
        	// if ($('#q' + nextID).find('input').hasClass('checked')) {
        	// 	activateNextButton();
        	// }else {
        	// 	deactivateNextButton();
        	// }

        	activatePreviousButton();
            
            //Show submit on specific page numbers
            // if (nextID == numQuestions){
            //     showSubmit();
            // } else {
            //     hideSubmit();
            // }  
            
            //if (nextID > numQuestions) {

                // deactivateSubmit();
                // //deactivateNextButton();
                
                
                // $('.content .inner-cont').animate({
                //     height: $('.screen.result').height() + 20
                // }, 500, function() {
                //     slideFeature('.quiz', '.result', 0);
                //     $('.progress').removeClass('active').animate({
                //         left: -newwidth
                //     }, 1000, "easeOutQuint", function() {
                //         $('.choicelist li.choice input:radio').attr('disabled', false);
                //         $(this).hide();
                //     });
                // });

            //} else {
      
                //setTimeout(function() {
                    slideFeature('#' + QuestionID, '#q' + nextID);
               // }, 500);
                // var progresstimer = setTimeout(function() {
                    
                // }, 700);

            //}
        }
	}

	/*
	 * GO TO PREVIOUS QUESTION
	 * Requires previous question id
	 */
	function previousQuestion(QuestionID){

		if (!inaction) {
            var currentID = QuestionID.substring(1);
            var nextID = currentID--;
            nextID--;

             //Check if next question is answered
             // if ($('#q' + currentID).find('input').hasClass('checked')) {
             //    activateNextButton();
             // }else {
             //    deactivateNextButton();
             // }
             
             //Show/HIDE submit button
             // if (nextID == numQuestions) {
             //    showSubmit();
             // } else {
             //    hideSubmit();
             // }

            if (nextID <= 1) {
            	deactivatePreviousButton();
            }             
           
            //var temptime = setTimeout(function() {
                slideFeature('#' + QuestionID, '#q' + nextID);
                //clearTimeout(temptime);
            //}, 500);
            //var progresstimer = setTimeout(function() {
                

            //}, 700);

           
        }

	}

    // $('.progress .questions li').on('click', function(event) {
    //     event.preventDefault();
    //     if (!inaction) {
    //         var QuestionID = $(this).attr('rel');
    //         if ($(this).hasClass('active') || $(this).hasClass('current')) {
    //             sliderSwitch($(this).hasClass('current'));
    //         }
           
    //         //Show/HIDE submit button
    //         // if (QuestionID.substring(1) == numQuestions) {
    //         //    showSubmit();
    //         // } else {
    //         //    hideSubmit();
    //         // }
            
    //     }

    //     function sliderSwitch(currentitem) {
    //         var $slide = $('.screen.quiz.active .screencontent');
    //         if ($slide.hasClass('active')) {
    //             //reset items to right
                
    //             if (!currentitem) {
    //                 if ($('#' + QuestionID).find('input').hasClass('checked')) {
    //                 	activateNextButton();
    //                 } else {
    //                 	deactivateNextButton();
    //                 }
    //                 //IF first answer
    //                 if (QuestionID == 'q1'){
    //                 	deactivatePreviousButton();
    //                 } else {
    //                 	activatePreviousButton();
    //                 }

    //                 slideFeature('.screencontent.active', '#' + QuestionID, 500);
    //             }
    //         }

    //     }

    // });

    
    

    // $('.result a.button.green').on('click', function(event) {
    //     if (!inaction) {
    //         $('.content .inner-cont').animate({
    //             height: $('.screen.contact').height() + 20
    //         }, 500, function() {
    //             slideFeature('.result', '.contact', 500);
    //         });
    //     }
    // });

    //RESTART TEST
    // $('.restart').on('click', function(event) {
    //     slideFeature('.result', '.quiz', 500);

    // });


    function slideFeature(slideOutTab, slideInTab, delaytimer) {
        delaytimer = (delaytimer == null || delaytimer == 0) ? 0 : delaytimer;
        var slideTimerOut = 1000;
        var slideTimerIn = 1000;
        $("html, body").animate({ scrollTop: "0px" });
        setTimeout(function() {
            if (!inaction) {
                inaction = true;
               //$('.choicelist li.choice input:radio').attr('disabled', true);


                if ($(slideOutTab).length > 0) {
                    $(slideOutTab).animate({
                            left: -newwidth
                        }, slideTimerOut, "easeOutQuint", function() {
                            $(this).removeClass('active');
                            //inaction = false;
                    });
                }
                
                if ($(slideInTab).length > 0) {

                    $(slideInTab).addClass('active').css('left', newwidth);
                    $(slideInTab).animate({
                            left: 0
                        }, slideTimerIn, "easeOutQuint", function() {

                            inaction = false;
                            //enable radio check boxes
                           // $('.choicelist li.choice input:radio').attr('disabled', false);
                    });
                        
                  
                    
                }
            }
        }, delaytimer);

    }


    //function initQuiz() {

        // $('.screen.result').removeClass('active');
        // $('.screen.quiz').addClass('active');

        // $('input:checkbox').removeAttr('checked');
        // $('input:checkbox').removeClass('checked');
        // $('input:radio').removeAttr('checked');
        // $('input:radio').removeClass('checked');


        // $('.progress .questions li').removeClass('active');
        // $('.progress .questions li').removeClass('current');
        // $('.progress .questions li.q1').addClass('current');

        // $('.resultA').removeClass('active');
        // $('.resultB').removeClass('active');
        // $('.resultC').removeClass('active');
        // $('.resultD').removeClass('active');

        // $('.screencontent').removeClass('active');
        // $('#q1.screencontent').addClass('active').css({
        //     left: 0
        // });

        // $('.screencontainer').css({
        //     left: 0,
        //     height: newheight
        // });

        // var totalheight = $('.screen.quiz').height();

        // $('.content .inner-cont').animate({
        //     height: totalheight
        // }, 1000, function() {});

        // setTimeout(function() {
        //     $('.progress').addClass('active').show().css('left', newwidth).animate({
        //         left: 0
        //     }, 1000, "easeOutQuint", function() {
        //         $('.choicelist li.choice input:radio').attr('disabled', false);
        //     });
        // }, 500);
   // }

    $('form#frm_choices .greybox').click(function(event){
        event.preventDefault();
        
        //Return found article / button
        var that = $(this); 
        
        var currentText = that.find('div.option-txt').text();
        var currentIcon = that.find('div.option-icon div')[0].className;  //Get first div
        var editID = 0;
        var aInputs = $('.quarter input');

        if (that.hasClass('deactive')){
            //Activate object and re-order list
            that.removeClass('deactive');

            //Find the item that needs replacing
            for (var i = 0; i < aInputs.length; i++) {
                if (aInputs[i].value == currentText){
                    editID = i;
                }
            }

            //Remove icon image and value
            aInputs[editID].value = '';
            $(aInputs[editID]).parent('.mini-icon').removeClass(currentIcon);

            //Shuffle other items to the left
            console.log(editID);
            for (var i = editID; i < aInputs.length -1; i++) {
                //aInputs[i];
                console.log(i);
                console.log(aInputs[i].value);
                console.log(aInputs[i+1].value);
                //currentIcon = $(aInputs[i]).parent('.mini-icon').className;;
                //console.log(currentIcon);
                aInputs[i].value = aInputs[i+1].value;
                // aInputs[i].value = '';
                // var tempiconName = $(aInputs[i]).parent('.mini-icon').className;// = 'mini-icon ';// + currentIcon;    
                // console.log(tempiconName);
            }
        } else {

            that.addClass('deactive');
            
            //Check what block is not filled in            
            for (var i = aInputs.length - 1; i >= 0; i--) {
                if (aInputs[i].value == ''){
                    editID = i;
                }
            }
            
            //Add block to options
            aInputs[editID].value = currentText;
            $(aInputs[editID]).parent('.mini-icon').addClass(currentIcon);

        }
    })

    beginIntro();

    $(window).resize(function(){
        quizwidth = $('.boxed').width() - 40;
        quizheight = $('.boxed').height() - 40;
        $('.moveable').css({width: quizwidth, height: quizheight});
    })

    function beginIntro(){
        //BEX TODO: fix height per question
        //BEX TODO: fix responsive / mobile presentation of questions
        //BEX TODO: fix circle in mobile

        $('.moveable').css({width: quizwidth, height: quizheight});
        $('#btn_previous').fadeOut();
        $('.man').fadeOut();
        $('.insuline_tekst').fadeOut();

        var totalheading = $('.intro-header').height() +  $('.intro2').height() + $('.intro-footer').height();
        var ORIGINAL_IMG_WIDTH = 827;
        var largeimgpercent = $('.baseicon img').width() / ORIGINAL_IMG_WIDTH ;
        
        // setTimeout(function(){
        //     // if ($('.intro-body').height() < $('.intro2').height() ){
        //     //     $('.intro-body').css({ height: $('.intro2').height()  }, 1000);
        //     //     $('.introcontainer').css({ height: totalheading  },1000);
        //     // }
        //     slideFeature('.intro', '.intro2', 1000);
        // }, 1000);

        
        // setTimeout(function(){
        //     $('.icon1 img').width( largeimgpercent * $('.icon1 img').width() );
        //     $('.icon1').fadeIn();
        // }, 2500);

        // setTimeout(function(){
        //     $('.icon2 img').width( largeimgpercent * $('.icon2 img').width() );
        //     $('.icon2').fadeIn();
        // }, 2800);

        // setTimeout(function(){
        //     $('.icon3 img').width( largeimgpercent * $('.icon3 img').width() );
        //     $('.icon3').fadeIn();
        // }, 3100);
        
        // setTimeout(function(){
        //     $('.icon4 img').width( largeimgpercent * $('.icon4 img').width() );
        //     $('.icon4').fadeIn();            
        // }, 3400);
        
        // setTimeout(function(){
        //     $('.icon5 img').width( largeimgpercent * $('.icon5 img').width() );
        //     $('.icon5').fadeIn();
        // }, 3700);
        
        // setTimeout(function(){
        //     $('.icon6 img').width( largeimgpercent * $('.icon6 img').width() );
        //     $('.icon6').fadeIn();
        // }, 4000);

        setTimeout(function(){
           //$('.man').fadeIn();
           //$('.insuline_tekst').fadeIn();
           slideFeature('.introcontainer', '.questioncontainer', 1000);
        }, 600);
        
        setTimeout(function(){
            $('.container').css({ background: "#aa1025", width: "100%" });
            setTimeout(function(){
                $('body').css({ background: "#aa1025" });
                $('.container').css({width: "96%" });
            }, 900);
        }, 620);

        


        setTimeout(function(){
            $('.delay1').fadeIn();
            $('.delay2').fadeIn();
            //$('.container').css({ background: "#aa1025", width: "100%" });
            // $('.introcontainer').css('position', 'absolute');
            //$('.questioncontainer').css({'position': 'relative', 'margin' : 0, 'top' : 0});
        }, 2000);
    }
});