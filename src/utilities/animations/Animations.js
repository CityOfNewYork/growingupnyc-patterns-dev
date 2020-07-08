'use strict';

import $ from 'jquery';
import forEach from 'lodash/forEach';



// https://codepen.io/motion333/pen/EBBGVM
var quotes = $(".rotating-text__entry");
var quoteIndex = -1;

export default function showNextQoute() {
    ++quoteIndex;
      quotes.eq(quoteIndex % quotes.length)
        .fadeIn(2000)
        .delay(2000)
        .fadeOut(2000, showNextQoute);
}







