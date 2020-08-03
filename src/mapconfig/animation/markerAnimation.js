import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { getVectorContext } from "ol/render";
import { createMarkerStyle } from "@/mapconfig/addlayer/mapStyle";
import { lineString } from "@turf/helpers";
import along from "@turf/along";
import length from "@turf/length";

let carImage = require("@/assets/car.png");

function markerAnimation(map, feature, vectorLayer, val) {
  this.speed = val;
  this.map = map;
  this.vectorLayer = vectorLayer;
  this.routeCoords = feature.getGeometry().getCoordinates();
  this.routeLength = this.routeCoords.length;
  let line = lineString(this.routeCoords);
  let options = { units: "miles" };
  this.along = [];
  let len = length(line, options);
  let distance = 0.2;
  for (let i = 0; i < len / distance; i++) {
    let turfPoint = along(line, i * distance, options);
    this.along.push(turfPoint.geometry.coordinates);
  }
  this.coordinatesLen = this.along.length;
  this.init();
}

markerAnimation.prototype.init = function() {
  this.geoMarker = new Feature({
    type: "geoMarker",
    geometry: new Point(this.routeCoords[0])
  });
  this.startMarker = new Feature({
    type: "icon",
    geometry: new Point(this.routeCoords[0])
  });
  this.endMarker = new Feature({
    type: "icon",
    geometry: new Point(this.routeCoords[this.routeLength - 1])
  });
  this.vectorLayer
    .getSource()
    .addFeatures([this.geoMarker, this.startMarker, this.endMarker]);
};

markerAnimation.prototype.startAnimation = function() {
  this.now = new Date().getTime();
  this.geoMarker.setStyle(null);
  this.vectorLayer.on("postrender", event => {
    this.moveFeature(event);
  });
  this.map.render();
};

markerAnimation.prototype.stopAnimation = function() {
  if (!this.vectorLayer) {
    return;
  }
  let coord = this.routeCoords[0];
  let geometry = this.geoMarker.getGeometry();
  geometry.setCoordinates(coord);
  this.vectorLayer.un("postrender", this.moveFeature);
};

markerAnimation.prototype.moveFeature = function(event) {
  let vectorContext = getVectorContext(event);
  let frameState = event.frameState;
  let elapsedTime = frameState.time - this.now;
  let index = Math.round((this.speed * elapsedTime) / 1000);
  if (index >= this.coordinatesLen) {
    this.stopAnimation();
    return;
  }
  let currentPoint = new Point(this.along[index]);
  let feature = new Feature(currentPoint);
  let k;
  if (index >= 1) {
    k =
      (this.along[index][1] - this.along[index - 1][1]) /
      (this.along[index][0] - this.along[index - 1][0]);
  }
  vectorContext.drawFeature(feature, createMarkerStyle(carImage, k + 2));

  this.map.render();
};

export default markerAnimation;
