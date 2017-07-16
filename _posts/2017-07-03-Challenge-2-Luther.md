---
layout: post
title: "Challenge 2 Luther Project"
description: "Linear regression analyse data on the websites."
categories: [project]
tags: [selenium, pandas, linear regression, jekyll]
redirect_from:
  - /2017/07/15/
---

# Project 2 Luther 

## Story:
College students take reference from professor rating website before they select the courses. The rating can certainly effect the students' choice when there are multiple professors teaching the same course. Although universitues usually have their own evaluation systems, and students leave anomynous comments to their professors, they are usually private for departments and professors, yet can not pass the information along to the coming students. 
<br>
From www.ratemyprofessor.com, we can lookup information not only for universities but also rating of 1 million professors. Since the rating has only one resource, which is the personal opinions from students, it is subjective. So we will see from the angle of students, answer three questions:
<br>
*1. When will the professors get good rating?
<br>
*2. What is the most important factor of highly rated university?
<br>
*3. Does the rating of professor matter to the universities?
<br>

## Goal: 
Using information scraped from the web, build linear regression models between rating of the universities and other features (including facilities, locations, food, etc.), plus rating of professors and difficulty of the courses.

## Data:
Using web scraping tools, selenium and BeautifulSoup, collect information and save to flat files. 
- The web source is https://www.ratemyprofessors.com
- Data: 
    -- 562 universities in NJ & NY
    -- 1501 professors in NJ

- Cleaned data(drop duplications and Nans):
	-- 279 universities
    -- 219 professors

The process of scraping was not so smooth, the information is buried in Javascript so that to find element by Xpath usually grabs nothing. The information did exist but it can only be accessed in resource. After getting the format of links, I catched id and university names, created new links to directly get information.

## Question 1: when the lecture is easy, you can gain high rating.

But is it true that when the course is hard so the rating will be low? And what is the relationship between professors in di
and will the professors get high rating because they are in the high rating universities?




![Monday Schedule]({{ site.url }}/images/monday_schedule.png)


## Question 2. Reputation is the most important factor when students rate their university.


## Question 3.


## Future work, how to improve
Data is limited
- Analysis tags for professors
- Expand the data range to the country
University Data is linearly correlated. Involve other source
- US news ranking 
- Median of annual earning after 10-year enrollment

### in the back
The motivation of this story was very personal. My adviser who is a distinguished professor in Physics, teaches strictly and the lectures are high quality. He likes the students who fully dedicate to the course. But many students choose physics course only for science credits, they want easy lecture easy finals no quizs and no gain in physics. That's why my professor got lower and lower rating when he maintains his teaching quality.