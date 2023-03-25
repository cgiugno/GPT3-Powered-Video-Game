import './kenney_fontpackage/Fonts/fonts.css';
import "./animations.css";

export const tileStyle = {
    backgroundSize: 'cover',
    imageRendering: 'pixelated',
    height: 200,
    width: 200,
    zIndex: 0,
    position: 'absolute',
};

export const playerStyle = {
    backgroundSize: 'cover',
    imageRendering: 'pixelated',
    height: 200,
    width: 200,
    zIndex: 10,
    position: 'absolute',

}

export const npcStyle = {
    backgroundSize: 'cover',
    imageRendering: 'pixelated',
    height: 200,
    width: 200,
    zIndex: 10,
    position: 'absolute',

}

export const charAnimStyle = {
    animation: 'char-anim 0.2s infinite alternate', 
    animationTimingFunction: 'linear',
}

export const objectStyle = {
    backgroundSize: 'cover',
    imageRendering: 'pixelated',
    height: 200,
    width: 200,
    zIndex: 10,
    position: 'absolute',
}

export const dialogStyle = {
    backgroundSize: '600px 200px',
    imageRendering: 'pixelated',
    backgroundRepeat: 'no-repeat',
    height: 200,
    width: 600,
    position: 'absolute',
    zIndex: 30,
}

export const dialogDefaultStyle = {
    backgroundSize: '1000px 200px',
    imageRendering: 'pixelated',
    backgroundRepeat: 'no-repeat',
    height: 200,
    width: 1000,
    position: 'absolute',
    zIndex: 30,
}

export const dialogChoiceContainer = {
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    width: 400,
    position: 'static',
    marginLeft: '600px',
}

export const dialogChoiceStyle = {
    backgroundSize: '400px 100px',
    imageRendering: 'pixelated',
    backgroundRepeat: 'no-repeat',
    height: 100,
    width: 400,
}

export const dialogTextStyle = {
    margin: 50,
    fontSize: 30,
    width: 500,
    height: 100,
    position: 'absolute',
    fontFamily: 'KenneyPixel',
}

export const csBox = {
    height: 200,
    width: 1000,
    display: 'flex'
};

export const dialogOutline = {
    position: 'absolute',
    zIndex: 10,
    height: 200,
    width: 1000,
    display: 'flex',
    flexDirection: 'horizontal',
}

export const box = {
    height: 200,
    width: 200,
    position: 'static'
};

export const screen = {
    margin: 'auto',
    width: 1000,
}

// const pixelFont = new FontFace("pixelfont", 'url("./kenney_fontpackage/Fonts/KenneyPixel.ttf")', {
//     style: 'normal',
// });

// pixelFont.load().then(function (loadedFace) {
//     document.fonts.add(loadedFace);
//     var pfFonts = document.getElementsByClassName("pf");
//     for (var i = 0; i < pfFonts.length; i++) {
//         pfFonts[i].style.fontFamily = 'pixelfont';
//     }
// });

export const headerStyle = {
    textAlign: 'center',
    fontFamily: 'KenneyHighSquare',
    fontSize: 60,
    margin: 0,
    color: 'rgb(153, 153, 153)', 
};