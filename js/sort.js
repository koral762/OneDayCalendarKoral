"use strict";


const EVENTS = [
    { id: 1, start: 90, end: 130 }, // an event from 10:30am to 11.40am
    { id: 2, start: 105, end: 135 }, // an event from 10:45am to 11:45am
    { id: 3, start: 120, end: 240 }, // an event from 11:00am to 1:00pm
    { id: 4, start: 180, end: 260 }, // an event from 12:00pm to 1:20pm
    { id: 5, start: 500, end: 560 },// an event from 5:20pm to 6:20pm
 
];

const CONTAINERWIDTH = 500;

EVENTS.sort((a, b) => a.start - b.start);


EVENTS.forEach(event => {

    event.coll = getNumberOfcollisions(event, EVENTS);

})

console.log(EVENTS);

function getNumberOfcollisions(event, arrEvents) {
    let collisions = [];
    arrEvents.forEach((iterEvent) => {
        // be aware that Id is identical!!
        if (event.id == iterEvent.id) {
            return;
        }
        if (event.start < iterEvent.end && event.start >= iterEvent.start) {
            collisions.push(iterEvent.id);
        }
    });
    return collisions;
}


