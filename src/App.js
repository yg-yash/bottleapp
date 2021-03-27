import 'aframe';

import { Entity, Scene } from 'aframe-react';
import React, { createRef } from 'react';
import Bottle from './Bottle.glb';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: 'red' };
    this.model = createRef();
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  handleClick = () => {
    // this.model.current.Entity.scale = '3 3 3';
    console.log(this.model.current);
  };

  render() {
    return (
      <Scene
        xrextras-gesture-detector
        xrextras-almost-there
        xrextras-loading
        xrextras-runtime-error
        renderer="colorManagement: true"
        xrweb
      >
        <a-assets>
          <img
            id="groundTexture"
            src="https://cdn.aframe.io/a-painter/images/floor.jpg"
          />
          <img
            id="skyTexture"
            src="https://cdn.aframe.io/a-painter/images/sky.jpg"
          />

          <a-asset-item id="mod" src={Bottle}></a-asset-item>
        </a-assets>

        <Entity
          primitive="a-plane"
          src="#groundTexture"
          rotation="-90 0 0"
          height="100"
          width="100"
        />
        <Entity primitive="a-light" type="ambient" color="#445451" />
        <Entity
          primitive="a-light"
          type="point"
          intensity="2"
          position="2 4 4"
        />
        <Entity
          primitive="a-sky"
          height="2048"
          radius="30"
          src="#skyTexture"
          theta-length="90"
          width="2048"
        />
        <Entity particle-system={{ preset: 'snow', particleCount: 2000 }} />

        <Entity
          id="myMod"
          camera
          ref={this.model}
          look-controls
          orbit-controls="target: 0 1.6 -0.5; initialPosition: 0 5 15"
          gltf-model="#mod"
          // geometry={{ primitive: 'box', width: 5, height: 0 }}
          position="0 0 -3"
          xrextras-hold-drag
          xrextras-two-finger-rotate
          xrextras-pinch-scale
          scale="1 1 1"
          shadow="receive: false"
          events={{
            click: this.handleClick,
          }}
        />
        {/*
        <Entity
          text={{ value: 'Hello, A-Frame React!', align: 'center' }}
          position={{ x: 0, y: 2, z: -1 }}
        /> */}

        {/* <Entity id="box"
          geometry={{primitive: 'box'}}
          material={{color: this.state.color, opacity: 0.6}}
          animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
          animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          position={{x: 0, y: 1, z: -3}}
          events={{click: this.changeColor.bind(this)}}>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                  geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                  material={{color: '#24CAFF'}}/>
        </Entity> */}

        <Entity primitive="a-camera">
          <Entity
            primitive="a-cursor"
            id="cursor"
            animation__click="property: scale; from: 0.1 0.1 0.1; to: 1 1 1; easing: easeInCubic; dur: 150; startEvents: click"
            animation__clickreset="property: scale; to: 0.1 0.1 0.1; dur: 1; startEvents: animationcomplete__click"
            animation__fusing="property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 150; startEvents: fusing"
          ></Entity>
        </Entity>
      </Scene>
    );
  }
}
