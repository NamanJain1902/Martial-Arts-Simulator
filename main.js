let c = document.getElementById("my-canvas");
let ctx = c.getContext("2d");

var background = new Image();
background.src = "images/background.jpg";

// background.onload = function(){
//   ctx.drawImage(background,0,0);   
// }


let loadImage = (src, callback) => {  
  var img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;  
};

let imagePath = (frameNumber, animation) => {
  return "https://github.com/nj1902/nj1902.github.io/tree/main/images" + animation + "/" +  frameNumber + ".png?raw=true";
};

let frames = {
  idle: [1,2,3,4,5,6,7,8],
  kick: [1,2,3,4,5,6,7],
  punch: [1,2,3,4,5,6,7],
};

let loadImages = (callback) => {
  // Callback with an array of loaded images.
  let images = {idle: [], kick: [], punch: []};
  let imagesToLoad = 8;

  ['idle', 'kick', 'punch'].forEach((animation) => {
    let animationFrames = frames[animation];
    imagesToLoad = imagesToLoad + animationFrames.length;

    animationFrames.forEach((frameNumber) => {
      let path = imagePath(frameNumber, animation);
    
      loadImage(path, (image) => {
        // Do something with that image.
        images[animation][frameNumber - 1] = image;
        imagesToLoad = imagesToLoad - 1;

        if (imagesToLoad === 0){
          callback(images);
        }
      });
    });
  });
};

let animate = (ctx, images, animation,  callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100); 
  });

  setTimeout(callback, images[animation].length * 800);
};

loadImages((images) => {
  let queuedAnimation = [];

  let aux = () => {
    let selectedAnimation;
    if(queuedAnimation.length === 0){
      selectedAnimation = "idle";
    }else{
      selectedAnimation = queuedAnimation.shift();
    }
    animate(ctx, images, queuedAnimation, aux);
  }
  aux();
  document.getElementById('kick').onclick = () =>  {
    queuedAnimation.push('kick');
  };

  document.getElementById('punch').onclick = () => {
    queuedAnimation.push('punch');
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key;

    if(key === "ArrowLeft"){
      queuedAnimation.push("kick");
    }else if(key === "ArrowRight"){
      queuedAnimation.push("punch");
    }
  })
});

// animate(ctx, images, "idle", () => {
//   console.log("Done");
// });

// ctx.drawImage(images[3], 0, 0, 200, 200);

/*
L1:

var img = document.createElement("img");
img.onload = () => {
  ctx.drawImage(img, 0, 0, 200, 200);
};
img.src = "idle.png";
*/
