import React, { Component } from 'react';

const SideMenu = require('react-native-side-menu');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Tabs from 'react-native-tabs';

import MultiSlider from 'react-native-multi-slider';


const Basic = require('./App/basic');

AppRegistry.registerComponent('Project1', () => Basic);
