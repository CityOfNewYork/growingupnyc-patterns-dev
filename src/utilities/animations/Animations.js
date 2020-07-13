'use strict';

import $ from 'jquery';
import forEach from 'lodash/forEach';



// https://codepen.io/motion333/pen/EBBGVM
// var quotes = $(".rotating-text__entry");
// var quoteIndex = -1;

export default function() {
  var terms = [];

  $('.rotating-text__entry').each(function (i, e) {
    if ($(e).text().trim() !== '') {
      terms.push($(e).text());
    }
  });

  function rotateTerm() {
    var ct = $("#rotate").data("term") || 0;
    $("#rotate").data("term", ct === terms.length -1 ? 0 : ct + 1).text(terms[ct]).fadeIn().delay(2000).fadeOut(200, rotateTerm);
  }
  $(rotateTerm);
}

