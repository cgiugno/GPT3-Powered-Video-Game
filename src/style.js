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
    backgroundSize: '1000px 200px',
    imageRendering: 'pixelated',
    backgroundRepeat: 'no-repeat',
    height: 200,
    width: 1000,
    position: 'absolute',
    zIndex: 20,
}

export const dialogTextStyle = {
    margin: 50,
    fontSize: 30,
    width: 900,
    height: 100,
    position: 'absolute',
    fontFamily: 'KenneyPixel',
}

export const csBox = {
    height: 200,
    width: 1000,
    display: 'flex'
};

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