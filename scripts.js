/*! Tapronto */
var slides = $(".slider").hide();
var mini = $(".minislider");

function init(){
	posX = 0;
	ww = window.innerWidth;
	timelineW = $("#timeline ul").outerWidth();
	timelinemin =  (timelineW - ww > 0) ? -timelineW+ww : 0;

	if(timelineW - ww > 0){
		$("#timeline ul").css("cursor","move");
	}else{
		$("#timeline ul").css("cursor","default");
	}

	slides.find("li").height( (ww > 768) ? window.innerHeight * 0.8 : 350 );
	$(".modal .content").css("max-height", window.innerHeight - 90);

	$("iframe:not(#extranet), .frame, .zoom, .parceiro").each(function(){
		var t = $(this);
		t.height( t.width() / 1.78 );
	});
}

$(document).ready(function(){

	slides.owlCarousel({
		items:1,
		autoplay:true,
		nav: true,
		loop: true,
		navText: ["<svg width='37' height='130' viewBox='0 0 37 130'><polyline points='37,0 0,65 37,130' fill='none' stroke='#fff' /></svg>","<svg width='37' height='130' viewBox='0 0 37 130'><polyline points='0,0 37,65 0,130' fill='none' stroke='#fff' /></svg>"],
		dots: true
	});
	slides.show();

	mini.owlCarousel({
		nav: true,
		dots: false,
		navText: ["<svg width='25' height='76' viewBox='0 0 25 76'><polyline points='25,0 0,38 25,76' fill='none' stroke='#1c313a' /></svg>","<svg width='25' height='76' viewBox='0 0 25 76'><polyline points='0,0 25,38 0,76' fill='none' stroke='#1c313a' /></svg>"],
		margin: 25,
		responsive:{
	        0:{
	            items:3,
	            nav:true
	        },
	        600:{
	            items:3,
	            nav:false
	        },
	        1000:{
	            items:5,
	            nav:true,
	            loop:false
	        }
	    }
	});

	$(".tabs > ul > li").click(function(){
		var t = $(this);
		var tl = t.attr("data-tab");
		var p = t.parent().parent();
		p.find("> .tab.active, > ul > li.active").removeClass("active");
		t.addClass("active");
		$(tl).addClass("active");
	});

	$(".tabselect > ul > li").click(function(){
		var t = $(this);
		var ul = t.parent();
		if(ul.hasClass("aberto")){
			var tl = t.attr("data-tab");
			var p = t.parent().parent();
			t.parent().removeClass("aberto");
			p.find("> .tab.active, > ul > li.active").removeClass("active");
			t.addClass("active");
			$(tl).addClass("active");
			ul.removeClass("aberto");
		}else{
			ul.addClass("aberto");
		}
	});

	$(".modal").click(function(e){
		var cm = $(this).closest(".modal");
    	if($(e.target).hasClass("close") == true){
			cm.addClass("fechando");
			setTimeout(function(){ cm.removeClass("aberto fechando") } ,800)
    	}
	});

	$(".modal span.close").click(function(e){
		var cm = $(this).closest(".modal");
		cm.addClass("fechando");
		setTimeout(function(){ cm.removeClass("aberto fechando") } ,800)
	});

	$(".abremodal").click(function(e){
		e.preventDefault();
		var id = $(this).attr("modal");
		$(".modal#mod-"+id).addClass("aberto");
	});

	$("#timeline").on("mouseenter touchstart tap", ".acontecimento p", function(){
		$("#timeline .ativo").removeClass("ativo");
		$(this).addClass("ativo");
		if($("#timeline .texto").html() != $(this).html()){
			$("#timeline .texto").stop(0,0).css({opacity: 0}).html($(this).html()).toggleClass("colorido").animate({opacity: 1},300);
		}
	});

	$("#timeline ul").swipe( { swipeStatus:function(event, phase, direction, distance){
		if(phase == "start"){
			posX = $(this).css("margin-left");
		}else if(phase == "move"){
			var newposX = Math.max( Math.min( 0, parseInt(posX) + (distance * ((direction == "left") ? -1 : 1 ) ) ), timelinemin );

			$(this).css("margin-left", newposX );
		}
	}, allowPageScroll:"horizontal" } );

    if($(window.location.hash).length != 0) {
         $('body').animate({scrollTop: $(window.location.hash).position().top }, 800);
    }
    $("a.anchor").click(function(e){
    	var url = $(this).attr("href");
    	var hash = url.substring(url.indexOf('#'));
    	if($(hash).length != 0) {
    		e.preventDefault();
    	     $('body').animate({scrollTop: $(hash).position().top }, 800);
    	}
    });

    $("#galeriacurso").on('click','.zoom',function(){
    	var z = $(this).attr("data-zoom");
    	$("#zoom").css("background-image","url("+z+")");
    });

    $('#checkbox').after('<span></span>');
    $('#checkbox_qc').after('<span class="checkado"></span>');

    $(".trocagaleria").click(function(e){
    	e.preventDefault();
    	var url = $(this).attr("href");
    	$.get( url, { ajax: 1}  , function( data ) {
    	  	$( "#galeriacurso" ).html( data );
    	  	$('.minislider').owlCarousel({
    	  		nav: true,
    	  		dots: false,
    	  		navText: ["<svg width='25' height='76' viewBox='0 0 25 76'><polyline points='25,0 0,38 25,76' fill='none' stroke='#1c313a' /></svg>","<svg width='25' height='76' viewBox='0 0 25 76'><polyline points='0,0 25,38 0,76' fill='none' stroke='#1c313a' /></svg>"],
    	  		margin: 25,
    	  		responsive:{
    	  	        0:{
    	  	            items:3,
    	  	            nav:true
    	  	        },
    	  	        600:{
    	  	            items:3,
    	  	            nav:false
    	  	        },
    	  	        1000:{
    	  	            items:5,
    	  	            nav:true,
    	  	            loop:false
    	  	        }
    	  	    }
    	  	});
			init();
    	});
    });

    $("#header a").click(function(){
    	$('#header').toggleClass('aberto');
    });

    $(".fancyboxopen").click(function(e){
    	e.preventDefault();
    	var href = $(this).attr("href");
    	$("body").append('<div class="fancybox aberto"> <div> <span class="close">Fechar <svg width="20" height="20" viewBox="0 0 40 40" xml:space="preserve"><line x1="0" y1="0" x2="40" y2="40" stroke="#000" stroke-width="3"></line><line x1="40" y1="0" x2="0" y2="40" stroke="#000" stroke-width="3"></line></svg></span> <div> <img src="'+href+'"> </div> </div> </div>');
    });

    $("body").on("click",".fancybox", function(e){
		var cm = $(this).closest(".fancybox");
		cm.addClass("fechando");
		setTimeout(function(){ cm.removeClass("aberto fechando").remove(); } ,800);
    });

	init();
});

$(window).resize(function(){
	timeResize = setTimeout(function(){
		init();
	}, 100);
});

$(document).ready(function(){
	$('.pergunta').click(function(){
		$(this).toggleClass('ativo');
	});
});

$(window).scroll(function(){
	if($(document).scrollTop() >= 108){
		$("body").addClass("menureduzido");
	}else{
		$("body").removeClass("menureduzido");
	}
});
