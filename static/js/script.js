// JavaScript Document

	$(function() {
	/*When clicking on Full hide fail/success boxes */
	$('#name').focus(function() {
		$('#success').html('');
	});



	$(document).ready(function(){

		if($(window).width() < 1024){
			$("div").removeClass('animate');
		}
		if( $('#slides, #image_slides, #text_slides').width() ){

			var $slides = $('#slides, #image_slides, #text_slides' );
			Hammer($slides[0]).on("swipeleft", function(e) {
				$slides.data('superslides').animate('next');
			});
			Hammer($slides[0]).on("swiperight", function(e) {
				$slides.data('superslides').animate('prev');
			});

			$('#text_slides').superslides({
				animation: 'slide',
				pagination:false,
				play: 7000
			});

			$('#slides, #image_slides').superslides({
				animation: 'fade',
				pagination:false,
				play: 6000
			});
		}

		$("#filters a").click(function(e){
			e.preventDefault();
			$(this).addClass('active');
			$(this).parent().siblings().find('a').removeClass('active');
		});

		var $portfolio_container = $('.portfolio-page');
		$('.filter a').click(function(){
			var selector = $(this).attr('data-filter');
			$portfolio_container.isotope({
				itemSelector: 'div.portfolio-thumbnail',
				filter: selector,
			});
			return false;
		});

		$("a[data-rel^='prettyPhoto']").prettyPhoto();
		$('.portfolio-page-single').on('click','.portfolio-read-more',function(event){
			event.preventDefault();

			var link = $(this).data('single_url');
			var full_url = '#portfolio-single-wrap',
				parts = full_url.split("#"),
				trgt = parts[1],
				target_top = $("#"+trgt).offset().top -80;

			$('html, body').animate({scrollTop:target_top}, 1200);
			$('#portfolio-single').slideUp(1000, function(){
				$(this).load(link,function(){
					$(this).slideDown(1000);
				});
			});
		});

		// Close Portfolio Single View

		$('#portfolio-single-wrap').on('click','.close-portfolio-item',function(){
			var full_url = '#works',
				parts = full_url.split("#"),
				trgt = parts[1],
				target_offset = $("#"+trgt).offset(),
				target_top = target_offset.top -80;

			$('html, body').animate({scrollTop:target_top}, 1400);

			$("#portfolio-single").slideUp(1000);
		});



		// carousel clients

		var owl = $("#carousel-clients");
		owl.owlCarousel({
			autoPlay : 4000,
			items : 6, //10 items above 1000px browser width

		});
		$("#carousel-testimonials").owlCarousel({
			autoPlay : 6000,
			slideSpeed : 700,
			paginationSpeed : 400,
			singleItem:true,
		});

		$('.post-content-container').hover(
			function(){
				$(this).siblings('.post-thumbnail').children('.post-thumbnail-overlay').css({'background-color':'rgba(46,61,80,1)'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').css({'background-color':'#1bbc9b'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').children('a').css({'color':'#2e3d50'});
			},
			function(){
				$(this).siblings('.post-thumbnail').children('.post-thumbnail-overlay').css({'background-color':'rgba(46,61,80,0)'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').css({'background-color':'#2e3d50'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').children('a').css({'color':'#1bbc9b'});
			}
		)
		$('.animate').each(function () {
			$(this).one('inview', function (e) {
				$(this).addClass('animated').css('visibility', 'visible');
			});
		});

		// Contact form

		$("body").on("input propertychange", ".floating-label-form-group", function(e) {
			$(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
		}).on("focus", ".floating-label-form-group", function() {
			$(this).addClass("floating-label-form-group-with-focus");
		}).on("blur", ".floating-label-form-group", function() {
			$(this).removeClass("floating-label-form-group-with-focus");
		});

		if( $('#map_canvas').width() ){

			// google map

			var get_lat = '10.010509';
			var get_lng = '77.487774';
			var get_add1 ='AgniDesigns';
			var get_add2 ='Envato, Level 13, 2 Elizabeth St, Melbourne,';
			var get_add3 ='Victoria 3000, Australia.';

			var lat=get_lat;   // Latitude of location
			var lang=get_lng;  // Longitude  of location
			var desc='<div>'+
						  '<h6>'+get_add1+'</h6>'+
						  '<p>'+get_add2+'</p>'+
						  '<p>'+get_add3+'</p>'+
					 '</div>';
			var showImage='img/marker.png';
			var imageTitle=get_add1;
			var divId='map_canvas';
			initializeMap(lat,lang,desc,showImage,imageTitle,divId);

		}

	});


});


$(document).ready(function($){
	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch #cd-vertical-nav').toggleClass('open');

    });
    $('.touch #cd-vertical-nav a').on('click', function(){
    	$('.touch #cd-vertical-nav').removeClass('open');
    });

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}
});
