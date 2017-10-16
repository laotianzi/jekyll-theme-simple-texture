---
layout: post
title: "Challenge 1 Benson Project"
description: "The first test post for Simple Texture theme."
categories: [project]
tags: [pandas, jekyll]
redirect_from:
  - /2017/07/03/
---

# Challenge 1 Benson Project

## What is the challenge?

WomenTechWomenYes (WTWY) needs help driving attendance at their annual gala. They plan on strategically placing their street team around New York City subway stations to collect email addresses from interested strangers and attract potential contributor. They've charged us with optimizing the placement of their team.

Assume: -WTWY Gala occurs at the beginning of the summer
        -Targeting people passionate about women in tech, like people who work in technology companies and college students
        -Street team conssits of three mobile groups, working thtoughout the day

## What was our approach?

Firstly, to get a whole picture of the subway station entries population, we worked on the data from Feburary to end of April in 2017, get the top 100 stations in Spring season in the city.

![top 100]({{ site.url }}/images/spring top 100 stations.png)
<br>
If we take a peek at the first ten stations, the graph below shows the station name and accumulated entries.
<br>
![top 10]({{ site.url }}/images/spring top 10 stations.png)

Secondly, based on technology companies distribution and demographic data, we identifid zip codes densely populated with target people, finding subwaystations in these interested zips, and we strategized times of day to reach them, and picked them from the top 100 stations from first step.

Technology companies locations
<br>
![tech companies locations]({{ site.url }}/images/tech_companies_locations.png)

<br>
Selected zip codes and stations
<br>
![choose data]({{ site.url }}/images/choose data.png)

## What did we find?
Among the selected subway stations, we ranked entrance traffic for our time period of interest. The top three ranked stations will be demonstrated on the work schedule. 

This figure shows the entries among top 100 stations during a week. 
<br>
![weekly]({{ site.url }}/images/spring over weeks.png)
  
The recommended stations among selected stations are as follows. We took median daily entries during spring weeks, in this way, the abnormal points are excluded. Three time ranges are masked to data, including: 
<br>

women on the way to work, 7AM-12PM
<br>
![before work]({{ site.url }}/images/before.png)
<br>
women during work (for outside meetings), 12PM-5PM
<br>
![during work]({{ site.url }}/images/during.png)
<br>
women after work, 5PM-9PM. 
<br>
![after work]({{ site.url }}/images/after.png)

From three above figures, it is clear that weekdays have more entries than weekends. After listing all the top stations during a week, we came up with schedules just for the street team. Below is a typical Monday schedule based on our selected stations. 

![Monday Schedule]({{ site.url }}/images/monday_schedule.png)


## Presentation Slides for the Project  

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTtDDztRmHWLn_UoKim8FirVvPV_bL45PTxBr3mhfOCAl0S6VEcRZ6MAdL_xfsuh4WMawBttIM3oAhm/embed?start=false&loop=true&delayms=5000" frameborder="0"  width="700" height="422" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>


## Future Directions

*The selected stations*
<br>
Appearently we missed few popular stations, like Grand Central-42 ST etc. 
<br>
*Best time period during a week*
<br>
Maybe it is hard to draw someone's attention when they are in a hurry to work, or when they are exhausted after work. So weekends might be a good choice but the entries are way less than weekdays. 
<br>
*Targeting rich people*
<br>
It is true that people will not contribute with low income but it is not certain that rich people are willing to donate. 

## You can see my technical implementations [here](https://github.com/laotianzi/mta_w1)






