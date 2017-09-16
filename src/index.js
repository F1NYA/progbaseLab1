//import stylesheets
import './index.sass';
//import jquery
import 'jquery';
//pages
import './pages/list.pug';

$(document).ready(function(){
	$("p").click(function(){
        $(this).hide();
    });
});