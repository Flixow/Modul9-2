"use strict";

$(function(){

	var carouselList = $("#carousel ul");
	var currentIndex = 0;
	var previousIndex = -1;

	$('ul li img').each(function(index) {
		var bullet = `<span class="bullet" id="${index}"></span>`;
		$('.bullets').append(bullet);
	})

	applyClass();

	function changeSlide(direction = 'right', speed = 500){
		var marginLeft = direction === 'right' ? '-100vw' : '+100vw';

		window.clearInterval(interval);
		interval = setInterval(changeSlide, 3000);

		carouselList.animate({marginLeft}, speed, moveFirstSlide);
		previousIndex = currentIndex;
		direction === 'right' ? currentIndex++ : currentIndex--;
		if (currentIndex > $(".bullet").length-1) currentIndex = 0;
		if (currentIndex < 0) currentIndex = 3;
		applyClass();
	}
	var interval = setInterval(changeSlide, 3000);

	function moveFirstSlide() {

		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");

		lastItem.after(firstItem)
		carouselList.css({marginLeft:0});

	}

	function applyClass() {
		document.getElementById(currentIndex).style.backgroundColor = '#000';
		(previousIndex > -1) ? document.getElementById(previousIndex).style.backgroundColor = '#fff' : null;
	}

	$(".control").click(function(el){
		var direction = el.target.id;



		changeSlide(direction);
	});

	$(".bullet").click(function (el) {
		var id = el.target.id;
		var times = id - currentIndex;
		var direction = times < 0 ? 'left' : 'right';

		for (var i = 0; i < Math.abs(times); i++) {
			changeSlide(direction, 100);
		}

	})

});