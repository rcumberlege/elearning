$(function() {
    var newwidth = $('.in-wrap').width();
    var newheight = $('.screen.quiz').height();
    var inaction = false;
    var numQuestions = 12;

    //$('.restart').click();

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





    $('.choices li').find('input').on('click', function(event) {
        event.preventDefault();


        //REMOVE class from other labels in same radio group
        var listItems = $(this).parents('ul').find('li');
        listItems.each(function(idx, li) {
            if ($(li).find('input:radio').hasClass('checked')) {
                $(li).find('input:radio').removeClass('checked');
               
            }
         
            
        });
        //ADD class to NEW selected item
        if($(this).hasClass('checked')){
        	$(this).removeClass('checked');

        } else {
        	$(this).addClass('checked');
        }
 
        
		//ACTIVATE NEXT BUTTON
		if ($('a#btn_next').hasClass('inactive')) {
			$('a#btn_next').removeClass('inactive');
        }
        //Question one - deactive vorige button
        var QuestionID = $(this).attr('name');
        var currentID = QuestionID.substring(1);
        //console.log("CURRENT ID: "+currentID);
        if (currentID <= 1){
        	if (!$('a#btn_previous').hasClass('inactive')) {
        	 	$('a#btn_previous').addClass('inactive');
        	}
        }

    });


    $('a#btn_next').on('click', function(event){
    	event.preventDefault();
    	
    	if ($(this).hasClass('inactive')){
    		return false;
    	} else {
	    	nextQuestion($('.screencontent.active').attr('id'));
    	}

    });
	
	$('a#btn_previous').on('click', function(event){
    	event.preventDefault();
    	
    	if ($(this).hasClass('inactive')){
    		return false;
    	} else {
    	   	previousQuestion($('.screencontent.active').attr('id'));
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
        	if ($('#q' + nextID).find('input:radio').hasClass('checked')) {
        		activateNextButton();
        	}else {
        		deactivateNextButton();
        	}

        	activatePreviousButton();

            if ((nextID > numQuestions) || (currentID == 11 && $('#q11_5').hasClass('checked'))) {
            	
            	deactivateNextButton();

                var resultcontainer = createResults();

                $(resultcontainer).addClass('active');

                $('.content .inner-cont').animate({
                    height: $('.screen.result').height() + 20
                }, 500, function() {
                    slideFeature('.quiz', '.result', 0);
                    $('.progress').removeClass('active').animate({
                        left: -newwidth
                    }, 1000, "easeOutQuint", function() {
                        $('.choicelist li.choice input:radio').attr('disabled', false);
                        $(this).hide();
                    });
                });

            } else {
                var temptime = setTimeout(function() {
                    slideFeature('#' + QuestionID, '#q' + nextID);
                    clearTimeout(temptime);
                }, 500);
                var progresstimer = setTimeout(function() {
                    updateProgressBar(QuestionID, nextID);
                }, 700);

            }
        }
	}

	/*
	 * GO TO PREVIOUS QUESTION
	 * Requires previous question id
	 */
	function previousQuestion(QuestionID){
		if (!inaction) {
            var currentID = QuestionID.substring(1);
            var nextID = currentID;
            nextID--;

             //Check if next question is answered
        	if ($('#q' + nextID).find('input:radio').hasClass('checked')) {
        		activateNextButton();
        	}else {
        		deactivateNextButton();
        	}

            if (nextID <= 1) {
            	deactivatePreviousButton();
            }             
           
            var temptime = setTimeout(function() {
                slideFeature('#' + QuestionID, '#q' + nextID);
                clearTimeout(temptime);
            }, 500);
            var progresstimer = setTimeout(function() {
                updateProgressBar(QuestionID, nextID);
            }, 700);

           
        }

	}

    $('.progress .questions li').on('click', function(event) {
        event.preventDefault();
        if (!inaction) {
            var QuestionID = $(this).attr('rel');
            if ($(this).hasClass('active') || $(this).hasClass('current')) {
                sliderSwitch($(this).hasClass('current'));
            }
        }

        function sliderSwitch(currentitem) {
            var $slide = $('.screen.quiz.active .screencontent');
            if ($slide.hasClass('active')) {
                //reset items to right
                updateProgressBar(null, QuestionID.substring(1));
                if (!currentitem) {
                    if ($('#' + QuestionID).find('input:radio').hasClass('checked')) {
                    	activateNextButton();
                    } else {
                    	deactivateNextButton();
                    }
                    //IF first answer
                    if (QuestionID == 'q1'){
                    	deactivatePreviousButton();
                    } else {
                    	activatePreviousButton();
                    }

                    slideFeature('.screencontent.active', '#' + QuestionID, 500);
                }
            }

        }

    });

    $('.intro.active a.button').on('click', function(event) {
        event.preventDefault();
        if (!inaction) {
            init();
            slideFeature('.intro', '.quiz', 1000);
        }
    });

    $('.result a.button.green').on('click', function(event) {
        if (!inaction) {
            $('.content .inner-cont').animate({
                height: $('.screen.contact').height() + 20
            }, 500, function() {
                slideFeature('.result', '.contact', 500);
            });
        }
    });

    //RESTART TEST
    $('.restart').on('click', function(event) {
        initQuiz();
        slideFeature('.result', '.quiz', 500);

    });

    function createResults() {
        var total = 0;

        // for (var i = 1; i <= numQuestions; i++) {
        //     var pep = $('input[name=q' + (i) + '].checked').val();
        //     pep = pep || 0;
        //     total = total + parseInt(pep);
        // };

        // if (total == 0) {
        //     return ".resultA";
        // } else if (total > 0 && total <= 7) {
        //     return ".resultB";
        // } else if (total > 7 && total <= 19) {
        //     return ".resultC";
        // } else {
        //     return ".resultD";
        // }

        return ".mainresult";

    }

    function slideFeature(slideOutTab, slideInTab, delaytimer) {
        delaytimer = (delaytimer == null || delaytimer == 0) ? 0 : delaytimer;
        var slideTimerOut = 1000;
        var slideTimerIn = 1000;

        setTimeout(function() {
            if (!inaction) {
                inaction = true;
                $('.choicelist li.choice input:radio').attr('disabled', true);


                if (slideOutTab.length > 0) {
                    $(slideOutTab).animate({
                        left: -newwidth
                    }, slideTimerOut, "easeOutQuint", function() {
                        $(this).removeClass('active');
                        //inaction = false;
                    });
                }

                if (slideInTab.length > 0) {


                    $(slideInTab).addClass('active').css('left', newwidth);

                    //Adjust height of question panel
                    if (!$('.screen.result').hasClass('active')) {
                        $('.content .screencontainer').animate({
                            height: $(slideInTab).height()
                        }, 200, function() {
                            $('.content .inner-cont').animate({
                                height: $('.screen.quiz').height() + 20
                            }, 500, function() {});
                        });
                    }


                    $(slideInTab).animate({
                        left: 0
                    }, slideTimerIn, "easeOutQuint", function() {


                        inaction = false;
                        //enable radio check boxes
                        $('.choicelist li.choice input:radio').attr('disabled', false);
                    });
                }
            }
        }, delaytimer);
    }


    function updateProgressBar(QuestionID, nextID) {
        if (QuestionID == null) {
            $('.current').each(function() {
                $(this).removeClass('current');
                $(this).addClass('active');
            });
        } else {
            $('.progress .questions li.' + QuestionID).removeClass('current');
            $('.progress .questions li.' + QuestionID).addClass('active');
        }
        $('.progress .questions li.q' + nextID).removeClass('active');
        $('.progress .questions li.q' + nextID).addClass('current');
    }


    function initQuiz() {

        $('.screen.result').removeClass('active');
        $('.screen.quiz').addClass('active');

        $('input:checkbox').removeAttr('checked');
        $('input:checkbox').removeClass('checked');
        $('input:radio').removeAttr('checked');
        $('input:radio').removeClass('checked');


        $('.progress .questions li').removeClass('active');
        $('.progress .questions li').removeClass('current');
        $('.progress .questions li.q1').addClass('current');

        $('.resultA').removeClass('active');
        $('.resultB').removeClass('active');
        $('.resultC').removeClass('active');
        $('.resultD').removeClass('active');

        $('.screencontent').removeClass('active');
        $('#q1.screencontent').addClass('active').css({
            left: 0
        });

        $('.screencontainer').css({
            left: 0,
            height: newheight
        });

        var totalheight = $('.screen.quiz').height();

        $('.content .inner-cont').animate({
            height: totalheight
        }, 1000, function() {});

        setTimeout(function() {
            $('.progress').addClass('active').show().css('left', newwidth).animate({
                left: 0
            }, 1000, "easeOutQuint", function() {
                $('.choicelist li.choice input:radio').attr('disabled', false);
            });
        }, 500);
    }

    function init() {
        var myheight = $('.screen.quiz').height() - $('.quiz .title').height() - 30;
        $('.screencontainer').css({
            left: 0,
            height: myheight
        });

        var totalheight = $('.screen.quiz').height();

        $('.content .inner-cont').animate({
            height: totalheight
        }, 1000, function() {});


        $('.progress .questions li.q1').addClass('current');

        setTimeout(function() {
            $('.progress').addClass('active').show().css('left', newwidth).animate({
                left: 0
            }, 1000, "easeOutQuint", function() {
                $('.choicelist li.choice input:radio').attr('disabled', false);
            });
            $('.bg-fill').removeClass('bg-fill');
        }, 1000);
    }


});