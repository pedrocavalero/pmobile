// JavaScript Document

// jQUERY MOBILE CONFIGURATIONS
// http://jquerymobile.com/test/docs/api/globalconfig.html
// ---------------------------------------------------------------------------------
//$(document).bind("mobileinit", function(){
$(document).ready(function () {
	MBP.startupImage(); // Show startup image. If you want to disable delete this line
});


// SLIDE OPEN MENU PLUGIN
// https://github.com/aldomatic/FB-Style-Page-Slide-Menu
// ---------------------------------------------------------------------------------
	$(function(){
		var menuStatus;
		
		
		 //Show menu
		$("a.showMenu").click(function(){
			if(menuStatus != true){				
			$(".ui-page-active").animate({
				marginLeft: "165px",
			  }, 0, function(){menuStatus = true});
			  return false;
			  } else {
				$(".ui-page-active").animate({
				marginLeft: "0px",
			  }, 0, function(){menuStatus = false});
				return false;
			  }
		});
		
		
		// Delete Code below for stop swipe left & right function.
		
			// Swipe left function for menu. If you want you can disable swipe left funtion delete code below.
			$('#menu, .pages').live("swipeleft", function(){
				if (menuStatus){	
				$(".ui-page-active").animate({
					marginLeft: "0px",
				  }, 0, function(){menuStatus = false});
				  }
			});
			// Swipe left end
			
			
			// Swipe right function for menu. If you want you can disable swipe right funtion delete code below.
			$('.pages').live("swiperight", function(){
				if (!menuStatus){	
				$(".ui-page-active").animate({
					marginLeft: "165px",
				  }, 0, function(){menuStatus = true});
				  }
			});
			// Swipe right end
			
		//End Delete Code
		
		
		$('div[data-role="page"]').live('pagebeforeshow',function(event, ui){
			menuStatus = false;
			$(".pages").css("margin-left","0");
		});
		
		// Menu behaviour
		$("#menu li a").click(function(){
			var p = $(this).parent();
			if($(p).hasClass('active')){
				$("#menu li").removeClass('active');
			} else {
				$("#menu li").removeClass('active');
				$(p).addClass('active');
			}
		});

});	


// Jquery Twitter by http://www.queness.com/post/8567/create-a-dead-simple-twitter-feed-with-jquery

JQTWEET = {
	
	// Set twitter username, number of tweets & id/class to append tweets
	user: 'pizzup', // Your Twitter Username
	numTweets: 10, // Number of tweets
	appendTo: '#pizzup',

	// core function of jqtweet
	loadTweets: function() {
		$.ajax({
			url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				screen_name: JQTWEET.user,
				include_rts: true,
				count: JQTWEET.numTweets,
				include_entities: true
			},
			success: function(data, textStatus, xhr) {

			 var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';

				 // append tweets into page
				 for (var i = 0; i < data.length; i++) {
					$(JQTWEET.appendTo).append(
						html.replace('TWEET_TEXT', JQTWEET.ify.clean(data[i].text))
							.replace(/USER/g, data[i].user.screen_name)
							.replace('AGO', JQTWEET.timeAgo(data[i].created_at))
							.replace(/ID/g, data[i].id_str)
					);

				 }					
			}	

		});
		
	}, 
	
		
	/**
      * relative time calculator FROM TWITTER
      * @param {string} twitter date string returned from Twitter API
      * @return {string} relative time like "2 minutes ago"
      */
    timeAgo: function(dateString) {
		var rightNow = new Date();
		var then = new Date(dateString);
		
		if ($.browser.msie) {
			// IE can't parse these crazy Ruby dates
			then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
		}

		var diff = rightNow - then;

		var second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24,
		week = day * 7;

		if (isNaN(diff) || diff < 0) {
			return ""; // return blank string if unknown
		}

		if (diff < second * 2) {
			// within 2 seconds
			return "right now";
		}

		if (diff < minute) {
			return Math.floor(diff / second) + " seconds ago";
		}

		if (diff < minute * 2) {
			return "about 1 minute ago";
		}

		if (diff < hour) {
			return Math.floor(diff / minute) + " minutes ago";
		}

		if (diff < hour * 2) {
			return "about 1 hour ago";
		}

		if (diff < day) {
			return  Math.floor(diff / hour) + " hours ago";
		}

		if (diff > day && diff < day * 2) {
			return "yesterday";
		}

		if (diff < day * 365) {
			return Math.floor(diff / day) + " days ago";
		}

		else {
			return "over a year ago";
		}
	}, // timeAgo()
    
	
    /**
      * The Twitalinkahashifyer!
      * http://www.dustindiaz.com/basement/ify.html
      * Eg:
      * ify.clean('your tweet text');
      */
    ify:  {
      link: function(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="twtr-hyperlink" target="_blank" href="../../js/' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
      },

      at: function(tweet) {
        return tweet.replace(/\B[@@]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
      },

      list: function(tweet) {
        return tweet.replace(/\B[@@]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
      },

      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
      },

      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    } // ify

	
};



$(document).ready(function () {
	// start jqtweet!
	JQTWEET.loadTweets();
});