//import all pages
var req = require.context("./pages", true, /^(.*\.(pug$))[^.]*$/igm);
req.keys().forEach(function(key){req(key);});
//import stylesheets
import './index.sass';

$(document).ready(function(){
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    $('.parallax').parallax();
 });