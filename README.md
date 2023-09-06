# Presidential Campaign Route

## About

This app determines the shortest route between cities in the United States using the [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula) to calculate distance and using dynamic programming approach to solve the [Travelling Salesman Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem) to determine the shortest route (with the beginning and end city being the same). Using a dropdown, you can select cities for the route and when you click calculate, it will rearrange the order of which cities to visit based on shortest distance to get to all cities. The total distance is calculated and shown in the modal.

![mapbox](https://github.com/suoken/presidential-campaign-mapbox/assets/22568107/b84f280b-0702-4cd8-92a2-f58abedc5e8e)

## Usage
```
npm install
npm run dev
```

IN ORDER TO RUN THIS APP, YOU WILL NEED A MAPBOX TOKEN AND PUT IT IN APP.TSX

## The Problem

You are the new logistics manager for a 2020 US Presidential candidate. The 
campaign has identified a list of 256 cities that the candidate needs to visit
on the campaign trail.

Because of your candidate's eagerness to go green, a trait owing to their home
city of San Francisco, your task is to minimize the distance travelled 
by the campaign.

The outgoing logistics manager managed to plot a route that covered 119,950km
and while the candidate appreciates the reward miles, it was felt that a
better job could be done scheduling, and so the campaign now has a new
logistics manager.

The candidate insists that the tour ends in the same city it starts so they
can bookend their trip with a closing rally.

Your job for this task is to see if you can beat the previous logistics
manager's route distance starting and ending in San Francisco.

The output should be a list of all cities, beginning and ending in San
Francisco, as well as the total distance travelled.
