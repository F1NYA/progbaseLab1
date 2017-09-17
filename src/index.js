//import all pages
var req = require.context("./pages", true, /^(.*\.(pug$))[^.]*$/igm);
req.keys().forEach(function(key){req(key);});
//import stylesheets
import './index.sass';
//import jquery
import 'jquery';


$(document).ready(function(){
	$("p").click(function(){
        $(this).hide();
    });
});