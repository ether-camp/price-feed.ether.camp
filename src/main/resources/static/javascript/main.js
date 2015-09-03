$(function() {
	$('td .description').click(function() {
		$(this).toggleClass('expanded');
	});
	
	headerTransit();
	$(window).scroll(function() {
		headerTransit();	
	});
	
	$( 'a[href="#!"]' ).click( function(e) {
      e.preventDefault();
	});
	
});	

function headerTransit() {
	if($(window).scrollTop()>50) {
		$('#header').addClass('minimal');
	}
	else {
		$('#header').removeClass('minimal');
	}
}