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

## Story
College students take reference from professor rating website before they select the courses. The rating can certainly influences some of the students' choice when there are multiple professors teaching the same course. Although universitues usually have their own evaluation systems, and students leave anomynous comments to their professors, they are usually private for departments and professors, yet can not pass the information along to the coming students. 

<br>
From www.ratemyprofessor.com, we can lookup information not only for universities but also rating of 1 million professors. Since the rating has only one resource, which is the personal opinions from students, it is subjective. So we will see from the angle of students, answer three questions:
<br>
 1. When will the professors get good rating?
<br>
 2. What is the most important factor of highly rated university?
<br>
 3. Does the rating of professor matter to the universities?
<br>

## Goal
Using information scraped from the web, build linear regression models between rating of the universities and other features (including facilities, locations, food, etc.), plus rating of professors and difficulty of the courses.

## Data
Using web scraping tools, selenium and BeautifulSoup, collect information and save to flat files. 
- The web source is https://www.ratemyprofessors.com
- Data: 
    - 562 universities in NJ & NY
    - 1501 professors in NJ

- Cleaned data(drop duplications and Nans):
	- 279 universities
    - 219 professors

The process of scraping was not so smooth, the information is buried in Javascript so that to find element by Xpath usually grabs nothing. The information did exist but it can only be accessed in resource. After getting the format of links, I catched id and university names, created new links to directly get information.

## Answer 1： When the lecture is easy, you can gain high rating.

Certainly. When students feels the lecture is easy to understand, and course is easy to get A, they tend to give high ratings. 
Is it true that the rating will be low when the course is hard? From the correlation between rating and difficulty of the course, we will say it various. Difficulty is personal, but if professor can explain a difficult lecture clear, students appreciate that so the rating can be high.

<br>
Figure 1. The correlation between rating and difficulty
<br>
![rating vs difficulty]({{ site.url }}/images/rating-difficultylevel.png){: .center-image}{:height="40%" width="40%"}
<br>
Let's look into this set of data. The model is simple, created as Rating vs. difficulty and number of rating. But the number of rating is negatively skewed, so firstly any rating with less than 2 ratings were dropped, then squareroot was applied also with log. This transform raises R-squared 0.001.

<br>
Figure 2. The transform of number of rating
<br>
![transform rating numbers]({{site.url}}/images/transform.png)
<br>

<br>
Figure 3. Fitting the model of rating and difficulty
<br>
![rating difficulty]({{site.url}}/images/rating-difficulty.png){:height="600px" width="450px"}
<br>


## Answer 2： Reputation is the most important factor when students rate their university.

And following is facilities, reputation, ..., last one is safety.

At first, I built a model with overall rating with all other 10 features, and it was perfect, but we should not use it, because everything just too linearly correlated. 

<br>
Figure 4. The features to the overall quality rating
<br>
![campus rating]({{site.url}}/images/sch-rating_feature.png){:height="300px" width="300px"}
<br>

So I changed to another model,
<br>
 *happiness ~ opportunity + facilities + reputation + social + clubs + food + location + internet + safety*	
<br>
I tried removing any feature from this model, it will not as good as with all feature together, as a result, this model is the final model to predict the happiness. R-squared is 0.791, and train score is 0.830, while test score is 0.749. After plooting mean squared error, degree is better to stay at 1 and Ridge cross validation score is 0.828.

<br>
Figure 5. New model: the features to Happiness
<br>
![new model campus rating]({{site.url}}/images/new sch-rating_featrue.png){:height="300px" width="300px"}
<br>

## Answer 3： Teaching quality will not influence the rating of universities.

To my surprise, the rating of professor will not correlated to the rating of universities. After thinking about it, the expaination is that adjunct professors usually take most of the teaching, who is less bonded to the universities or the students, also, the rating of professor ususally focused on one course, students will not take consider when they rate the university.

<br>
Figure 6. Correlation with happiness and averaged professor rating
<br>
![happiness teacher rating]({{site.url}}/images/happiness-t_rating.png)
<br>
<br>
Table. Correlation and evaluation in two models
<br>

| with professor rating | overall rating | happiness |
|-------|--------|---------|
| correlation | -0.113 | -0.104 |
| R-squared | 0.113 | 0.011 |
| P-value | 0.277 | 0.317 |


## Future work, how to improve
Data is limited
- Analysis tags for professors
- Expand the data range to the country
<br>
University Data is linearly correlated. Involve other source
- US news ranking 
- Median of annual earning after 10-year enrollment

### PostScript
The motivation of this story was very personal. My adviser who is a distinguished professor in Physics, teaches strictly and the lectures are high quality. He likes the students who fully dedicate to the course. But many students choose physics course only for science credits, they want easy lecture easy finals no quizs and no gain in physics. That's why my professor got lower and lower rating when he maintains his teaching quality.

#### Reference
How to resize figure: https://github.com/hakimel/reveal.js/issues/1349