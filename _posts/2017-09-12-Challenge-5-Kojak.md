---
layout: post
title: "Challenge 5 Kojak Project"
description: "Computer Vision: detection and tracking system."
categories: [project]
tags: [OpenCV, TensorFlow, Computer Vision, jekyll]
redirect_from:
  - /2017/09/06/
---

# Project 5 Kojak Project 

## Person of Interest

### --- A detection and tracking system for public cameras

## Story
There are more than 17,000 public camers in New York City. Imagine how exhausting it is to stare at dozens of videos and search for suspicious situtions. 

Why not let the computer work, to save human's vision and time, alert us of interesting moments. This project took one of the public cameras at Time Square for example. Normally, in front of this camers, people come, sit and go. There are interesting moments, like people running across at higher speed, or street performance brings higher count of people. We can ignore the normal situation, only take a glance when computer alerts us of higher speed or big counts. 

On demand, for public security purposes, a system that can count pedestrians and report the speed is built, so it can alert people when there is too many pedestrians gathering or somebody is running at possible emergency situation. 

## Achievement
In this project, the system focuses on two metrics, speed and count. 

OpenCV trakcer APIs can track targets and gives speed, but it needs initial positions for targets, and in the camera, people will enter or exit every second. 

TensorFlow object detection can recognize people in the frame and give counts, but it can not identify people, which means it can not follow the target to give speed because every frame it work from scratch with no connection. 

Therefore, the system combines these two tools, let object detection find people and give counts, meanwhile pass the positions to the tracker, and tracker calculates speed for each target for the next 10 images, then detect again, forming a loop, so we can have real-time count and speed. 

<br>
Gif 1. Flask Demo
<br>
![p5_flask_demo]({{site.url}}/images/p5_flask_demo.gif)

## Approach

## 1.Tracker

There are lots of tracker algorithms in OpenCV, I have tried Dense Optical flow and Lucas-Kanade Optical flow methods, but the background of Time Square is too complicated with lights and pedestrians are much, those two methods did not work well with this camera. 

<br>
Gif 2. Lucas-Kanade Optical flow
<br>
![p5_optical_flow]({{site.url}}/images/p5_optical_flow.gif){:height="600px" width="450px"}

And compared with different methods of trakcer APIs in Gif 3, among boosting(blue), KCF(red), TLD(black) and MedianFlow(gray), MIL(green) followed the target for the longest time and least drifting. It is outstanding for this camera because instead of guessing only once for the position in the next frames, it creates a bag of multiple guesses, delivering more accurate result. 

<br>
Gif 3. OpenCV tracker APIs comparison
<br>
![p5_trackers]({{site.url}}/images/p5_trackers.gif){:height="600px" width="450px"}

 
## 2.Object Detection

Following a <a href="http://www.youtube.com/watch?v=K_mFnvzyLvc">tutorial</a>created by Harrison Kinsley (sentdex), I have tried two TensorFlow pre-trained models, SSD_MobileNet and Faster_RCNN_ResNet. Both of them are based on Deep Neural Network. I further trained them with the sample videos, over 1,000 people, cars and umberllas, that made the models performe better to the certain camera. 

Faster_RCNN_ResNet gives more accurate result but the trade-off is processing time. I rented a GPU p2.xlarge instance to process real-time video and later, upgraded to g3.4xlarge instance, but it did not enhance very much. 

Gif 4. rcnn_pretrained
<br>
![RCNN_pretrained_p5]({{site.url}}/images/p5_rcnn_pretrained.gif){:height="600px" width="450px"}
<br>


## Presentation Slides for the Project   
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT44rKRmetEj5jS-RvvgjuTRE9Y3jRYAsEA14ht_BgH7CbzpCD8pXzedx12AQDQObJC2EZRF_tpMn0k/embed?start=false&loop=true&delayms=5000" frameborder="0" width="1440" height="839" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Future work

Make it accurate for different seasons. 

Make it accurate when people are really overlapped in the camera.

## Data
Videos were downloaded from EarthCam

## Reference
Real-time-object recognition

https://medium.com/towards-data-science/building-a-real-time-object-recognition-app-with-tensorflow-and-opencv-b7a2b4ebdc32

Background subtraction

http://docs.opencv.org/trunk/d1/dc5/tutorial_background_subtraction.html 
http://docs.opencv.org/trunk/db/d5c/tutorial_py_bg_subtraction.html

Foreground detection

https://www.youtube.com/watch?v=fSLDCKeM5YE

Meanshift / camshift

http://docs.opencv.org/3.2.0/db/df8/tutorial_py_meanshift.html

TensorFLow Models

https://softwaremill.com/counting-objects-with-faster-rcnn/
https://github.com/datitran/object_detector_app/blob/master/object_detection/g3doc/detection_model_zoo.md 
https://www.youtube.com/watch?v=YqoGPpFfQiA 