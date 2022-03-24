"use strict";

const EVENTS = [
    { id: 1, start: 90, end: 130 }, // an event from 10:30am to 11.40am
    { id: 2, start: 105, end: 135 }, // an event from 10:45am to 11:45am
    { id: 3, start: 120, end: 240 }, // an event from 11:00am to 1:00pm
    { id: 4, start: 150, end: 200 }, // an event from 12:00pm to 1:20pm
    { id: 4, start: 150, end: 270 }, // an event from 12:00pm to 1:20pm
    // { id: 5, start: 500, end: 560 },// an event from 5:20pm to 6:20pm
];

const CONTAINERWIDTH = 500;

function creatEvent(arrEvents) {

    arrEvents.sort((a, b) => a.start - b.start);
    arrEvents[0].left = 0;
    arrEvents[0].width = CONTAINERWIDTH;

    let collidesWith = [];

    for (var i = 1; i < arrEvents.length; i++) {

        for (var j = 0; j < i; j++) {

            if (arrEvents[i].start < arrEvents[j].end && arrEvents[i].start >= arrEvents[j].start) {

                collidesWith.push(j);

            }
            
            if (collidesWith.length !== 0 && collidesWith.length !== 1) {
                var width = parseInt(CONTAINERWIDTH / (collidesWith.length + 1));
                console.log('width', width);

                for (var x = 0; x <= collidesWith.length; x++) {

                    arrEvents[i - x].width = width;
                    if(x!==0){

                        arrEvents[i - (collidesWith.length - x)].left = x * width;
                    }
                }

            } else if (collidesWith.length === 1 && j === i - 1) {
                arrEvents[i].left = (arrEvents[collidesWith[0]].left !== 0) ? 0 : arrEvents[collidesWith[0]].width;
                arrEvents[i].width = (CONTAINERWIDTH - arrEvents[j].width);
            } else if (collidesWith.length === 0) {
                arrEvents[i].left = 0;
                arrEvents[i].width = CONTAINERWIDTH;

            }
        }
        console.log('collidesWith', collidesWith);
        collidesWith = [];

        console.log(`arrEvents:`, arrEvents);
    }


    return arrEvents;

}

var elements = creatEvent(EVENTS);
renderEvents(elements);



/////////////////////////////////////////////////////////
function renderEvents(elementsToRender) {

    var strHtml = '';
    elementsToRender.forEach(obj => {
        strHtml += `<div class="event" style="top:${obj.start}px;
        height:${obj.end - obj.start}px;
        width:${obj.width - 10}px;
        left:${obj.left + 10}px;
        "></div>`;
    })

    var elContainer = document.querySelector('.container');
    elContainer.innerHTML = strHtml;

}

//////////////////////////////////////////////////////////