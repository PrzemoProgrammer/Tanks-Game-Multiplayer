setUpPhysicBody() {
  const { width, height, offsetX, offsetY } = this.config.body;
  const body = this.body;

  body.width = width;
  body.height = height;
  body.offset.x = offsetX;
  body.offset.y = offsetY;
}



body: {
  width: 80,
  height: 110,
  offsetX: -40,
  offsetY: -55,
},