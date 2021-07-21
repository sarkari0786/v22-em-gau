(function($) {
	'use strict';

	jQuery(document).ready(function($) {

		/* -------------------------
        show "scroll to top" button on window scroll
        ------------------------- */
		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				$('#scrollTop').fadeIn();
			} else {
				$('#scrollTop').fadeOut();
			}
		});
		// scroll up function
		$('#scrollTop').click(function () {
			$('html, body').animate({ scrollTop: 0 }, 500);
		});

		/* -------------------------
		 * Sidebars and Ovelay BG toggle
		------------------------- */
		var overlayBG = $('#overlay_bg');
		var leftSidebar = $('#left_sidebar');
		var rightSidebar = $('#right_sidebar');
		var leftSidebarToggler = $('#main_menu_toggler');
		var rightSidebarToggler = $('#user_login_toggler');

		leftSidebarToggler.on('click', function() {
			$(overlayBG).toggleClass('active');
			$(leftSidebar).toggleClass('active');
			$('body').toggleClass('locked');
		});

		rightSidebarToggler.on('click', function() {
			$(overlayBG).toggleClass('active');
			$(rightSidebar).toggleClass('active');
			$('body').toggleClass('locked');
		});

		$('.login-buttons .btn-login').on('click', function(e) {
			e.preventDefault();
			
			$(overlayBG).toggleClass('active');
			$(rightSidebar).toggleClass('active');
			$('body').toggleClass('locked');
		});

		overlayBG.on('click', function() {
			$(this).toggleClass('active');
			if($(leftSidebar).hasClass('active')) {
				$(leftSidebar).removeClass('active');
			}
			if($(rightSidebar).hasClass('active')) {
				$(rightSidebar).removeClass('active');
			}
			if($('body').hasClass('locked')) {
				$('body').removeClass('locked');
			}
		});

		/* -------------------------
        Hero banner slider (owl carousel)
        ------------------------- */
		if($('.banner-slider').length) {
			$('.banner-slider').owlCarousel({
				items: 1,
				loop: true,
				smartSpeed: 700,
				autoplay: true,
				autoplayTimeout: 4000,
				autoplayHoverPause: false,
				dots: true,
				nav: false,
				margin: 0,
				animateOut: 'fadeOut',
			});
		}

		/* -------------------------
		 * Marquee/scrolling text
		------------------------- */
		if($('.marquee-text').length) {
			$('.marquee-text').marquee({
				duration: 9000,
				gap: 10,
			});
		}

		/* -------------------------
		 * Booster countdown timer
		------------------------- */
		// Set the date we're counting down to [date format: 'MMM DD YYYY ' => 'Jan 15, 2021']
		var boostStartDate = 'Mar 15, 2021';
		var boostEndDate = 'Mar 25, 2021';
		var boostEndTime = '11:46:49';

		// Covert to locale date format
		function convertDateFormat(dateString) {
			var convertedDate = new Date(dateString).toLocaleDateString('en-US', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			});
			return convertedDate;
		}
		boostStartDate = convertDateFormat(boostStartDate);
		boostEndDate = convertDateFormat(boostEndDate);

		// Set the Start and End date in HTML
		document.querySelector('.boost-date .start-date').innerHTML = boostStartDate;
		document.querySelector('.boost-date .end-date').innerHTML = boostEndDate;

		// Combine the End date and time
		var boostEndDateTime = new Date(boostEndDate + ' ' + boostEndTime).getTime();

		// Update the count down every 1 second
		var boostInterval = setInterval(function () {
			// Get today's date and time
			var nowDateTime = new Date().getTime();

			// Find the distance between now and the count down date
			var boostLength = boostEndDateTime - nowDateTime;

			// Time calculations for days, hours, minutes and seconds
			var boostRemainingDays = Math.floor(boostLength / (1000 * 60 * 60 * 24));
			var boostRemainingHours = Math.floor((boostLength % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var boostRemainingMinutes = Math.floor((boostLength % (1000 * 60 * 60)) / (1000 * 60));
			var boostRemainingSeconds = Math.floor((boostLength % (1000 * 60)) / 1000);

			// Add a leading '0' to times if less than 10
			function boostCheckValue(value) {
				if (value < 10) {
					return '0' + value;
				} else {
					return value;
				}
			}
			boostRemainingHours = boostCheckValue(boostRemainingHours);
			boostRemainingMinutes = boostCheckValue(boostRemainingMinutes);
			boostRemainingSeconds = boostCheckValue(boostRemainingSeconds);

			// Don't show the date if less the 1d
			if (boostRemainingDays < 1) {
				boostRemainingDays = '';
			} else {
				boostRemainingDays = boostRemainingDays + 'd ';
			}

			// Output the result
			document.querySelector('.boost-countdown').innerHTML =
				boostRemainingDays + boostRemainingHours + ':' + boostRemainingMinutes + ':' + boostRemainingSeconds;

			// If the count down is over, then-
			if (boostLength < 0) {
				clearInterval(boostInterval);
				document.querySelector('.booster-section').style.display = 'none';
				document.querySelector('.booster-nav-wrapper').classList.remove('gradient-bg');
			}
		}, 1000);

		/* -------------------------
        Promotions widget slider (owl carousel)
        ------------------------- */
		if($('.widget-promotions .owl-carousel').length) {
			$('.widget-promotions .owl-carousel').owlCarousel({
				items: 1,
				loop: false,
				smartSpeed: 500,
				autoplay: false,
				dots: false,
				nav: true,
				margin: 20,
				autoHeight: true,
				navText: [
					'<i class="lni lni-chevron-left"></i>',
					'<i class="lni lni-chevron-right"></i>',
				],
				responsive: {
					// breakpoint from 0 up
					0: {
						items: 1,
					},
					// breakpoint from 576 up
					576: {
						items: 2,
					},
					// breakpoint from 992 up
					992: {
						items: 3,
					},
					// breakpoint from 1200 up
					1200: {
						items: 4,
					},
				},
				callbacks: true,
				onInitialized: promoMoveNav,
			});
			function promoMoveNav() {
				$('.widget-promotions .owl-nav').appendTo(
					'.widget-promotions .section-header'
				);
			}
		}

		/* -------------------------
		 * Latest Wins random items
		------------------------- */
		function lwRandomNumber(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		}

		console.log(latestWins);

		var lwNewArr = latestWins.map(person => {
			const random = lwRandomNumber(4,7);
			console.log(random);
			return { ...person, Winning: person["winning %"], Username: person.Username + Array(random + 1).join("*") }
		});
		/* var lwChangeDetails = {
			'username': 'david',
			'Deposite': 800,
			'Winning': 260,
			'Withdrawal': 2740
		};
		var lwChangeDetails1 = {
			'username': 'young',
			'Deposite': 400,
			'Winning': 45,
			'Withdrawal': 2540
		};
		var lwChangeDetails2 = {
			'username': 'amanda',
			'Deposite': 500,
			'Winning': 240,
			'Withdrawal': 4521
		};
		var lwChangeDetails3 = {
			'username': 'kevin',
			'Deposite': 82,
			'Winning': 650,
			'Withdrawal': 5564
		};
		var lwChangeDetails4 = {
			'username': 'john',
			'Deposite': 90,
			'Winning': 250,
			'Withdrawal': 2245
		};
		var lwChangeDetails5 = {
			'username': 'luice',
			'Deposite': 50,
			'Winning': 653,
			'Withdrawal': 6542
		};
		var lwChangeDetails6 = {
			'username': 'fenda',
			'Deposite': 53,
			'Winning': 500,
			'Withdrawal': 5000
		};
		var lwChangeDetails7 = {
			'username': 'ryazi',
			'Deposite': 10,
			'Winning': 450,
			'Withdrawal': 2176
		};

		lwNewArr.push(lwChangeDetails);
		lwNewArr.push(lwChangeDetails1);
		lwNewArr.push(lwChangeDetails2);
		lwNewArr.push(lwChangeDetails3);
		lwNewArr.push(lwChangeDetails4);
		lwNewArr.push(lwChangeDetails5);
		lwNewArr.push(lwChangeDetails6);
		lwNewArr.push(lwChangeDetails7); */

		setInterval(function() {
			var mycusl = lwRandomNumber(1, lwNewArr.length - 1);
			var myculs = lwNewArr[mycusl];
			var str = myculs['Username'];
			var res = str.charAt(0);
			$("#em_lw_1").html('<div class="inner d-flex flex-nowrap align-items-center justify-content-between fadein"><div class="letter">' + res + '</div><div class="details"><h4 class="name"><span class="user">' + myculs['Username'] + '</span> Withdrawal</h4><h3 class="reward">RM ' + myculs['withdrawal'] + '</h3><p class="recent">Recent Deposit <span>RM 1000</span></p></div><div class="percent">' + myculs['Winning'] + '&#37;</div></div>');
		}, 15000);

		setInterval(function() {
			var mycusl = lwRandomNumber(1, lwNewArr.length - 1);
			var myculs = lwNewArr[mycusl];
			var str = myculs['Username'];
			var res = str.charAt(0);
			$("#em_lw_2").html('<div class="inner d-flex flex-nowrap align-items-center justify-content-between fadein"><div class="letter">' + res + '</div><div class="details"><h4 class="name"><span class="user">' + myculs['Username'] + '</span> Withdrawal</h4><h3 class="reward">RM ' + myculs['withdrawal'] + '</h3><p class="recent">Recent Deposit <span>RM 1000</span></p></div><div class="percent">' + myculs['Winning'] + '&#37;</div></div>');
		}, 24000);

		setInterval(function() {
			var mycusl = lwRandomNumber(1, lwNewArr.length - 1);
			var myculs = lwNewArr[mycusl];
			var str = myculs['Username'];
			var res = str.charAt(0);
			$("#em_lw_3").html('<div class="inner d-flex flex-nowrap align-items-center justify-content-between fadein"><div class="letter">' + res + '</div><div class="details"><h4 class="name"><span class="user">' + myculs['Username'] + '</span> Withdrawal</h4><h3 class="reward">RM ' + myculs['withdrawal'] + '</h3><p class="recent">Recent Deposit <span>RM 1000</span></p></div><div class="percent">' + myculs['Winning'] + '&#37;</div></div>');
		}, 38000);

		setInterval(function() {
			var mycusl = lwRandomNumber(1, lwNewArr.length - 1);
			var myculs = lwNewArr[mycusl];
			var str = myculs['Username'];
			var res = str.charAt(0);
			$("#em_lw_4").html('<div class="inner d-flex flex-nowrap align-items-center justify-content-between fadein"><div class="letter">' + res + '</div><div class="details"><h4 class="name"><span class="user">' + myculs['Username'] + '</span> Withdrawal</h4><h3 class="reward">RM ' + myculs['withdrawal'] + '</h3><p class="recent">Recent Deposit <span>RM 1000</span></p></div><div class="percent">' + myculs['Winning'] + '&#37;</div></div>');
		}, 33000);
		
		// Replace username letters with '*'
		var lwUsers = $('.widget-latestwins .details .name .user');
		console.log(lwUsers);
		lwUsers.each(function() {
			var userName = $(this).text().toString();
			var chars = userName.split('').slice(2);
			var replaced = Array(chars.length + 1).join('*');
			var firstTwoChar = userName.substr(0, 2);

			$(this).text(firstTwoChar + replaced);
		});

		/* -------------------------
		 * Lucky Chest random reward
		------------------------- */
		function setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		}

		function getCookie(cname) {
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}

		var chestRandomRewards = ["USD 10", "USD 7", "USD 5", "USD 12", "USD 15", "USD 10", "USD 8"];

		$("#em_chest_opener").click(function() {
			var chestRandomReward = chestRandomRewards[Math.floor(Math.random() * chestRandomRewards.length)];
			var chest_open = getCookie('chest_open');
			var chestDateTime = new Date().toLocaleString();

			if (chest_open == '') {
				setCookie('chest_open', 'true', 1);
				setTimeout(function() {
					$(".em-pop-loader").css('display', 'none');
					$("#em_chest_reward").html("<h3>Congratulations!!</h3><h4>You won <span class='em-reward-txt'>" + chestRandomReward + "!!</span></h4><p class='money-icon mb-0'><img src='./images/money-bag.png' alt='money bag'></p><button type='button' class='btn btn-success btn-lg em-claim-btn'>Claim Now!</button><p class='date-time'>" + chestDateTime + "</p><p class='note'>Please screenshot to keep proof!</p>");
				}, 2000);
			} else {
				$(".em-pop-loader").css('display', 'none');
				$("#em_chest_reward").html("<h3>You can open once a day, pls come back tomorrow</h3>");
			}
		});

		/* -------------------------
         * Lucky Number Randomize
        ------------------------- */
		if($('#lucky_number_popper').length) {
			$('#lucky_number_popper').click(function(){
				var randomNumber = Math.floor(1000 + Math.random() * 9000);
				var number_generated = getCookie('number_generated');

				if (number_generated == '') {

					setCookie('number_generated', 'true', 1);

					setTimeout(function() {
						$(".oc_price_loader").css('display', 'none');
						$("#generated_lucky_number").html('<h3>Here is your lucky number</h3><img src="./images/genie-1.png" alt="Lucky number image"><p class="number">'+ randomNumber +'</p>');
					}, 3000);

				} else {

					$(".oc_price_loader").css('display', 'none');
					$("#generated_lucky_number").html("<h3>You can open once a day, pls come back tomorrow</h3>");

				}
			});
		}

		/* -------------------------
		 * Slot quick link widget collapse
		------------------------- */
		var slotQLContainer = $('.widget-slots-ql #collapsing-container');
		var slotQLToggler = $('.widget-slots-ql .collapse-toggler');

		if(slotQLContainer.length) {
			slotQLToggler.on('click', function() {
				slotQLContainer.toggleClass('collapsed');
				$('.collapse-toggler span').toggleClass('collapsed');
			})
		}

		/* -------------------------
		 * Initialize ScrollOut JS
		------------------------- */
		if($('.single-widget').length) {
			ScrollOut({
				targets: '.single-widget',
				once: true,
			});
		}

		/* -------------------------
		 * Initialize Splitting JS
		------------------------- */
		if($('.single-widget .section-title').length) {
			Splitting({
				target: ".single-widget .section-title",
			});
		}

		/* -------------------------
		 * Initialize dateTimePicker plugin
		------------------------- */
		if($('#dateSelect').length) {
			$('#dateSelect').datetimepicker({
				format: 'Y-m-d',
				inline: true,
				altField: '#date',
				timepicker: false,
			});
		}

		/* -------------------------
		 * Download Items Cube Portfolio 
		 * - Single Page Popup
		------------------------- */
		var dloadSinglePage = $('#dload_js_singlePage_container').children('div');
		$('#dloads_list_items').cubeportfolio({
			// singlePage popup
			singlePageDelegate: '.cbp-singlePage',
			singlePageDeeplinking: true,
			singlePageStickyNavigation: true,
			singlePageCounter: '',
			singlePageCallback: function(url, element) {
				// to update singlePage content use the following method: this.updateSinglePage(yourContent)
				var indexElement = $(element).parents('.cbp-item').index(),
					item = dloadSinglePage.eq(indexElement);

				item.find('img').each(function(index, el) {
					var attr = el.getAttribute('data-cbp-src');

					if (attr) {
						el.setAttribute('src', attr);
						el.removeAttribute('data-cbp-src');
					}
				});

				this.updateSinglePage(item.html());
			},
		});
		

		/* -------------------------
		 * Promotion Items Cube Portfolio 
		 * - Filter
		 * - Single Page Popup
		------------------------- */
		var promoSinglePage = $('#promo_js_singlePage_container').children('div');
		$('#promotion_items').cubeportfolio({
			filters: '#promotion_filters',
			layoutMode: 'mosaic',
			defaultFilter: '*',
			animationType: 'quicksand',
			gapHorizontal: 30,
			gapVertical: 20,
			gridAdjustment: 'responsive',
			mediaQueries: [{
				width: 1500,
				cols: 5,
			}, {
				width: 1100,
				cols: 4,
			}, {
				width: 800,
				cols: 3,
			}, {
				width: 480,
				cols: 2,
			}],
			caption: 'zoom',
			displayType: 'sequentially',
			displayTypeSpeed: 60,

			// singlePage popup
			singlePageDelegate: '.cbp-singlePage',
			singlePageDeeplinking: true,
			singlePageStickyNavigation: true,
			singlePageCounter: '',
			singlePageCallback: function(url, element) {
				// to update singlePage content use the following method: this.updateSinglePage(yourContent)
				var indexElement = $(element).parents('.cbp-item').index(),
					item = promoSinglePage.eq(indexElement);

				item.find('img').each(function(index, el) {
					var attr = el.getAttribute('data-cbp-src');

					if (attr) {
						el.setAttribute('src', attr);
						el.removeAttribute('data-cbp-src');
					}
				});

				this.updateSinglePage(item.html());
			},
		});
	});

})(jQuery);

/* -------------------------
pre loader
------------------------- */
window.addEventListener('load', function () {
	const loader = document.querySelector('#preloader-container');
	loader.className += ' hidden';
});