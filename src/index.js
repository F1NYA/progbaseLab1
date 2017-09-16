//import stylesheets
import './index.sass';
//import jquery
import 'jquery';

$(document).ready(function(){
	$("p").click(function(){
        $(this).hide();
    });
});