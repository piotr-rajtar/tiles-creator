# Tiles creator

Simple Tiles creator application.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Unit testing](#unit-testing)

## General info
This is simple tiles creator application.

In this application, users can create colorful tiles with randomly generated background colors. After creating the tiles, users can:
* Change their order through drag-and-drop
* Delete them
* Edit their colors

The tile color editing feature allows users to modify the background color of each tile. To do so, users can either use a native color picker or manually input a hex color value. To ensure the correct input of the color value, hex color input validation is implemented.

Minimum supported mobile width: 375px.

## Technologies
* vue.js - version 3.3.11
* pinia - version 2.1.7
* uuid - version 9.0.1

## Setup
After cloning project repository run `npm install` to install dependencies.

After that, run `npm run dev` to run project in development mode.

## Unit testing
To run unit tests with Vitest run `npm run test:unit`.
