/*!
=====================================
OpenFooter jQuery by SONHLAB.com - version 1.0 - Free
website: http://sonhlab.com
Documentation: http://docs.sonhlab.com/openfooter-jquery-responsive-full-screen-footer/

Build - 0028
=====================================
*/
(function($){

	var OpenFooterObj = function(e, options){
	
		//Default settings
		var settings = $.extend({}, $.fn.openfooter.defaults, options);
		
		var $viewHeight = $(window).height();
		var $viewWidth = $(window).width();
		
		
		var $contentHeight;
		var $contentbodyHeight;
		
		var $activeItem;
		var $pause=false;
		var $expand = false;
		
		var $ofid;
		
		
		
		$(e).css({'display':'block'});
		
		
		// Style For OpenFooter Bar
		$(e).find('.of-bar').css({'width':'100%'});
		$(e).find('.of-bar').addClass(settings.barBg);
		
		
		// Height of OpenFooter Bar
		var $openbarHeight = $(e).find('.of-bar').height();
		
		
		var $n = $(e).find('.of-bar').find('.of-button').length;
		
		var $buttonLength=20;
		for ( var $i=0; $i < $n; $i++ ) {
			$buttonLength = $buttonLength + $(e).find('.of-bar').find('.of-barcontainer').find('.of-button').eq($i).outerWidth();
		}
		
		
		// Set total width for Bar Container
		$(e).find('.of-bar').find('.of-barcontainer').css({'width':$buttonLength+'px'});
		

		// Scroll the OpenFooter Bar
		$(e).find('.of-bar').mousewheel(function(event, delta) {
			event.preventDefault();
			this.scrollLeft -= (delta * 30);
		});
		
		
		// Scroll the OpenFooter Content
		$(e).find('.of-contentstation').mousewheel(function(event, delta) {
			event.preventDefault();
			this.scrollTop -= (delta * 30);
		});
		


		// Check active bar
		if ( ! $(e).find('.of-activebar').length ) {
			$(e).prepend("<div class='of-activebar "+settings.barBg+"'><div class='of-returnbt of-closebt'><img src='https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Back-2-128.png' alt='return' /></div><div class='of-button of-closebt'></div><div class='of-zoombt'><img src='https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Back-2-128.png' alt='zoom-in' class='of-in' /><img src='images/icons/down.png' alt='zoom-out' class='of-out' /></div><div class='clearspace'></div></div>");
		}
		
		
		// Expand OpenFooter Content
		$(e).find('.of-activebar').find('.of-zoombt').find('.of-in').on('click',
		function(){
			
			// Hide zoom-in button
			$(this).css({'display':'none'});
			
			// Show zoom-out button
			$(e).find('.of-activebar').find('.of-zoombt').find('.of-out').css({'display':'block'});
			
			$expand = true;
			
			// Set Content Station Height
			$contentHeight = $viewHeight - $openbarHeight;
			$(e).find('.of-contentstation').css({'height':$contentHeight+'px'});
			
			// Set Content Body Height
			if ( $contentHeight > $contentbodyHeight ) {
				$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':$contentHeight+'px'});
			}
			
			// Expand OpenFooter to Full Screen
			$(e).animate({'height':$viewHeight+'px'}, 200,
			function(){
				// Some action
			});
		
		});
		
		
		// Colapse OpenFooter Content
		$(e).find('.of-activebar').find('.of-zoombt').find('.of-out').on('click',
		function(){
			
			// Hide zoom-in button
			$(this).css({'display':'none'});
			// Show zoom-out button
			$(e).find('.of-activebar').find('.of-zoombt').find('.of-in').css({'display':'block'});
			
			$expand = false;
			
			// Expand OpenFooter to Full Screen
			$(e).animate({'height':$viewHeight/2+'px'}, 200,
			function(){
			
				// Set Content Station Height
				$contentHeight = $viewHeight/2 - $openbarHeight;
				$(e).find('.of-contentstation').css({'height':$contentHeight+'px'});
				
				// Set Content Body Height
				if ( $contentHeight > $contentbodyHeight ) {
					$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':$contentHeight+'px'});
				}
				else if ( $contentHeight < $contentbodyHeight ) {
					$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':$contentbodyHeight+'px'});
				}
				
			});
		
		});
		

		
		// Hide OpenFooter Content
		$(e).find('.of-activebar').find('.of-closebt').on('click',
		function(){
		
			if ( $pause == true ) {
			
				$pause = false;
				$expand = false;
				
				// Reset Content Body Height
				$contentHeight = $viewHeight/2 - $openbarHeight;
				if ( $contentHeight > $contentbodyHeight ) {
					$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':$contentHeight+'px'});
				}
				else if ( $contentHeight < $contentbodyHeight ) {
					$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':$contentbodyHeight+'px'});
				}
				
				$(e).animate({'height':$openbarHeight+'px'}, 200,
				function(){
					
					// Hide Active Bar
					$(e).find('.of-activebar').css({'display':'none'});
					
					// Hide Content Block
					$(e).find('.of-contentstation').find('.of-content').css({'display':'none'});
					
					// Reset Zoom Button
					$(e).find('.of-activebar').find('.of-zoombt').find('.of-in').css({'display':'block'});
					$(e).find('.of-activebar').find('.of-zoombt').find('.of-out').css({'display':'none'});
					
					// Display Bar Container
					$(e).find('.of-bar').css({'display':'block'});
					
					// Remove Active Bar Item
					$(e).find('.of-activebar').find('.of-button').empty();
					
				});
			
			} // $pause
			
		});
		
		
		
		
		// Start to Click on Main Buttons
		$(e).find('.of-bar').find('.of-button').on('click',
		function(){

			if ( $pause == false ) {
				
				// Get OpenFooter Content ID
				$ofid = $(this).attr('data-ofid');
				
				if ( !$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').length ) { // Content not found
					
					alert('Error: Content not exist! Please check content ID.');
					
				}
				else { // Content exist
					// Show Footer
					ShowFooter();
				}
				
			} // $pause
		
		});
		// End to Click on Main Buttons
		
		
		
		function ShowFooter() {
		
			$pause = true;
			
			// Hide OpenFooter Main Bar
			$(e).find('.of-bar').css({'display':'none'});
				
			// Show OpenFooter Active Bar
			$(e).find('.of-activebar').css({'display':'block'});
			
			// Get Item Title
			$activeItem = $(e).find('.of-bar').find('.of-barcontainer').find('.of-button[data-ofid="'+$ofid+'"]').contents().clone();
			$(e).find('.of-activebar').find('.of-button').append($activeItem);
				
			// Display Content Block
			$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'display':'block'});
			
			// Set Content Station Height
			$contentHeight = $viewHeight/2 - $openbarHeight;
			$(e).find('.of-contentstation').css({'height':$contentHeight+'px'});
				
			// Set Content Body Height
			$contentbodyHeight = $(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').outerHeight();
			if ( $contentHeight > $contentbodyHeight ) {
				$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':$contentHeight+'px'});
			}
			
		
			// Display OpenFooter Content
			$(e).animate({'height':$viewHeight/2+'px'}, 200,
			function(){			
				// Some actions
			});
		}
		// End ShowFooter func
		

		
		// Start Resize
		function debouncer(func, timeout) {
		   var timeoutID, timeout = timeout || 200;
		   return function() {
			  var scope = this , args = arguments;
			  clearTimeout( timeoutID );
			  timeoutID = setTimeout( function() {
				  func.apply( scope , Array.prototype.slice.call(args));
			  }, timeout);
		   }
		}
		$(window).resize( debouncer( function () {
			$viewHeight = $(window).height();
			$viewWidth = $(window).width();
			
			
			
			$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':'auto'});
			$contentbodyHeight = $(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').outerHeight();
			
			if ( $pause == true ) {
			
				if ( $expand == false ) {
				
					$(e).css({'height':$viewHeight/2+'px'});
					
					// Set Content Station Height
					$contentHeight = $viewHeight/2 - $openbarHeight;
					$(e).find('.of-contentstation').css({'height':$contentHeight+'px'});
					
					// Set Content Body Height
					if ( $contentHeight > $contentbodyHeight ) {
						$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':$contentHeight+'px'});
					}
					else if ( $contentHeight < $contentbodyHeight ) {
						$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':$contentbodyHeight+'px'});
					}
					
				}
				else {
					$(e).css({'height':$viewHeight+'px'});
					
					// Set Content Station Height
					$contentHeight = $viewHeight - $openbarHeight;
					$(e).find('.of-contentstation').css({'height':$contentHeight+'px'});
					

					// Set Content Body Height
					if ( $contentHeight > $contentbodyHeight ) {
						$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':$contentHeight+'px'});
					}
					else {
						$(e).find('.of-contentstation').find('.of-content[data-ofid="'+$ofid+'"]').css({'height':$contentbodyHeight+'px'});
					}
				
				}
			}
		
		}));
		// End Resize
		

	};
	
	
	
	$.fn.openfooter = function(options) {
	
		return this.each(function(key, value){
					
			// Return early if this element already has a plugin instance
            if ($(this).data('openfooter')) return $(this).data('openfooter');
			
			// Pass options to plugin constructor
			var openfooter = new OpenFooterObj(this, options);
			
			// Store plugin object in this element's data
            $(this).data('openfooter', openfooter);
		
		});

	};
	
	
	
	//Default settings
	$.fn.openfooter.defaults = {
		barBg: 'solid-black'
	};	
	
})(jQuery);