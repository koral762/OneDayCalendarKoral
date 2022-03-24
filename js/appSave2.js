"use strict";

const EVENTS = [
    { id: 1, start: 90, end: 130 }, // an event from 10:30am to 11.40am
    { id: 2, start: 105, end: 135 }, // an event from 10:45am to 11:45am
    { id: 3, start: 120, end: 240 }, // an event from 11:00am to 1:00pm
    { id: 4, start: 180, end: 260 }, // an event from 12:00pm to 1:20pm
    { id: 4, start: 180, end: 260 }, // an event from 12:00pm to 1:20pm
    { id: 5, start: 500, end: 560 },// an event from 5:20pm to 6:20pm
    { id: 5, start: 600, end: 660 },// an event from 5:20pm to 6:20pm
    { id: 5, start: 650, end: 700 },// an event from 5:20pm to 6:20pm
];

const CONTAINERWIDTH = 500;

function creatEvent(arrEvents) {

    arrEvents.sort((a, b) => a.start - b.start);
    // debugger;
    arrEvents.forEach((event, eventIdx) => {

        if (eventIdx === 0) {
            event.left = 0;
            event.width = CONTAINERWIDTH;
        } else {
            let collidesWith = [];

            for (let i = 0; i < eventIdx; i++) {


                if (event.start < arrEvents[i].end && event.start > arrEvents[i].start) {
                    collidesWith.unshift(i);

                } else {
                    if (event.start === arrEvents[i].start) {
                        event.width = arrEvents[i].width = parseInt(arrEvents[i].width / 2);
                        event.left = arrEvents[i].left + arrEvents[i].width;
                        return;
                    }
                    event.left = (event.left) ? event.left : arrEvents[i].left;
                    event.width = (event.width) ? event.width + arrEvents[i].width : arrEvents[i].width;
                }

            }

            if (collidesWith.length !== 0 && collidesWith.length !== 1) {

                let width = parseInt(CONTAINERWIDTH / (collidesWith.length + 1));
                
                for (let x = 0; x <= collidesWith.length; x++) {
                    
                    event.width = width;
                    
                    arrEvents[eventIdx - x].width = width;
                    arrEvents[eventIdx - (collidesWith.length - x)].left = x * width;
                    
                }
            } else if (collidesWith.length === 1) {
                                
                
                arrEvents[collidesWith[0]].width=parseInt(arrEvents[collidesWith[0]].width/2);
                event.width = arrEvents[0].width
                event.left = (arrEvents[collidesWith[0]].left !== 0) ? 0 : arrEvents[collidesWith[0]].width;
                
            } else {
                event.left = 0;
                event.width = CONTAINERWIDTH;
            }

        }

    })
    return arrEvents;

}


var elements = creatEvent(EVENTS);
renderHours();
renderEvents(elements);

function renderEvents(elementsToRender) {

    var strHtml = '';
    elementsToRender.forEach(obj => {
        strHtml += `<div class="event" style="top:${obj.start}px;
        height:${obj.end - obj.start}px;
        width:${obj.width -3}px;
        left:${obj.left }px;
        ">New event<span>Location</span></div>`;
    })

    var elContainer = document.querySelector('.container');
    elContainer.innerHTML = strHtml;

}

function renderHours() {

    var strHtml = '';

    for (let i = 9; i <= 21; i++) {


        strHtml += `<p style="font-size:15px;">${i}:00</p>`;
        if(i === 21) break;
        strHtml += `<p style="font-size:10px">${i}:30</p>`;

    }

    

    var elContainer = document.querySelector('.hours');
    elContainer.innerHTML = strHtml;

}




