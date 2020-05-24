(function($) {
	$(document).ready(function() {
		var myFullpage = new fullpage('#fullpage', {
	        anchors: ['firstPage', 'secondPage', '3rdPage'],
	        sectionsColor: ['#4A6FB1', '#939FAA', '#323539'],
	        scrollOverflow: true
	    });
	});
}(jQuery));