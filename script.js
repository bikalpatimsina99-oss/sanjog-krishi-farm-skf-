// ===============================
// MOBILE NAVIGATION
// ===============================

const menu = document.querySelector(".menu");

const nav = document.querySelector(".header nav");


// Open / close menu

menu.addEventListener("click", function () {

    nav.classList.toggle("open");

});


// Close menu when a navigation link is clicked

const navLinks = document.querySelectorAll(".header nav a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("open");

    });

});


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("open");

    });

});


// =====================================
// FARM GALLERY PHOTO DISPLAY
// =====================================

function showFarmPhoto(type) {

    const boxes = document.getElementById("farmBoxes");
    const photoView = document.getElementById("farmPhotoView");

    const image = document.getElementById("farmDisplayImage");
    const title = document.getElementById("farmPhotoTitle");
    const description = document.getElementById("farmPhotoDescription");

    const farmData = {

        "fresh-fields": {
            image: "fresh-fields.jpg",
            title: "Fresh Fields",
            description: "Our fresh fields are carefully cultivated with healthy and sustainable farming practices."
        },

        "daily-harvest": {
            image: "daily-harvest.jpg",
            title: "Daily Harvest",
            description: "Fresh vegetables harvested regularly from Sanjog Krishi Farm."
        },

        "seasonal-fruits": {
            image: "seasonal-fruits.jpg",
            title: "Seasonal Fruits",
            description: "Naturally grown seasonal fruits from our farm."
        },

        "farm-life": {
            image: "farm-life.jpg",
            title: "Farm Life",
            description: "Experience everyday life at Sanjog Krishi Farm."
        }

    };

    const selected = farmData[type];

    image.src = selected.image;
    title.textContent = selected.title;
    description.textContent = selected.description;

    boxes.style.display = "none";
    photoView.classList.add("active");
}


function backToGallery() {

    const boxes = document.getElementById("farmBoxes");
    const photoView = document.getElementById("farmPhotoView");

    boxes.style.display = "grid";
    photoView.classList.remove("active");
}/* =====================================================
   FLOATING LINES
   Vanilla JavaScript version of React Bits FloatingLines
===================================================== */


import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


/* =====================================================
   GET CONTAINER
===================================================== */

const container = document.getElementById("floating-lines");

if (!container) {
    console.error("Floating Lines container not found.");
}


/* =====================================================
   SETTINGS
===================================================== */

const settings = {

    enabledWaves: [
        "bottom",
        "middle",
        "top"
    ],

    lineCount: [
        10,
        15,
        20
    ],

    lineDistance: [
        8,
        6,
        4
    ],

    bendRadius: 5.0,

    bendStrength: -0.5,

    interactive: true,

    parallax: true,

    parallaxStrength: 0.2,

    animationSpeed: 1,

    mouseDamping: 0.05,

    opacity: 0.28
};


/* =====================================================
   SHADERS
===================================================== */

const vertexShader = `

precision highp float;

void main() {

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(position, 1.0);

}

`;


const fragmentShader = `

precision highp float;

uniform float iTime;
uniform vec3 iResolution;

uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;

uniform bool interactive;

uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;

uniform float parallaxStrength;
uniform vec2 parallaxOffset;


/* COLORS */

const vec3 GREEN =
    vec3(0.45, 0.80, 0.30);

const vec3 LIGHT_GREEN =
    vec3(0.65, 0.90, 0.45);

const vec3 SOFT_GREEN =
    vec3(0.30, 0.65, 0.35);


/* ROTATION */

mat2 rotate(float r) {

    return mat2(
        cos(r),
        sin(r),
        -sin(r),
        cos(r)
    );

}


/* =====================================================
   WAVE
===================================================== */

float wave(
    vec2 uv,
    float offset,
    vec2 screenUv,
    vec2 mouseUv,
    bool shouldBend
) {

    float time =
        iTime *
        animationSpeed;


    float xOffset =
        offset;


    float xMovement =
        time * 0.1;


    float amplitude =
        sin(
            offset +
            time * 0.2
        ) * 0.3;


    float y =
        sin(
            uv.x +
            xOffset +
            xMovement
        ) * amplitude;


    /* MOUSE BENDING */

    if (shouldBend) {

        vec2 d =
            screenUv -
            mouseUv;


        float influence =
            exp(
                -dot(d, d) *
                bendRadius
            );


        float bendOffset =
            (mouseUv.y - screenUv.y)
            *
            influence
            *
            bendStrength
            *
            bendInfluence;


        y += bendOffset;

    }


    float m =
        uv.y - y;


    return
        0.0175 /
        max(
            abs(m) + 0.01,
            0.001
        )
        + 0.01;

}


/* =====================================================
   MAIN
===================================================== */

void main() {

    vec2 baseUv =
        (
            2.0 *
            gl_FragCoord.xy -
            iResolution.xy
        )
        /
        iResolution.y;


    baseUv.y *= -1.0;


    /* PARALLAX */

    if (parallax) {

        baseUv +=
            parallaxOffset;

    }


    vec3 col =
        vec3(0.0);


    /* MOUSE */

    vec2 mouseUv =
        vec2(0.0);


    if (interactive) {

        mouseUv =
            (
                2.0 *
                iMouse -
                iResolution.xy
            )
            /
            iResolution.y;


        mouseUv.y *= -1.0;

    }


    /* =================================================
       BOTTOM WAVES
    ================================================= */

    if (enableBottom) {

        for (
            int i = 0;
            i < 20;
            i++
        ) {

            if (i >= bottomLineCount)
                break;


            float fi =
                float(i);


            float t =
                fi /
                max(
                    float(
                        bottomLineCount - 1
                    ),
                    1.0
                );


            vec3 lineColor =
                mix(
                    GREEN,
                    LIGHT_GREEN,
                    t
                );


            float angle =
                bottomWavePosition.z *
                log(
                    length(baseUv) + 1.0
                );


            vec2 ruv =
                baseUv *
                rotate(angle);


            col +=
                lineColor *
                wave(
                    ruv +
                    vec2(
                        bottomLineDistance * fi +
                        bottomWavePosition.x,

                        bottomWavePosition.y
                    ),

                    1.5 +
                    0.2 * fi,

                    baseUv,

                    mouseUv,

                    interactive

                )
                *
                0.2;

        }

    }


    /* =================================================
       MIDDLE WAVES
    ================================================= */

    if (enableMiddle) {

        for (
            int i = 0;
            i < 20;
            i++
        ) {

            if (i >= middleLineCount)
                break;


            float fi =
                float(i);


            float t =
                fi /
                max(
                    float(
                        middleLineCount - 1
                    ),
                    1.0
                );


            vec3 lineColor =
                mix(
                    SOFT_GREEN,
                    LIGHT_GREEN,
                    t
                );


            float angle =
                middleWavePosition.z *
                log(
                    length(baseUv) + 1.0
                );


            vec2 ruv =
                baseUv *
                rotate(angle);


            col +=
                lineColor *
                wave(
                    ruv +
                    vec2(
                        middleLineDistance * fi +
                        middleWavePosition.x,

                        middleWavePosition.y
                    ),

                    2.0 +
                    0.15 * fi,

                    baseUv,

                    mouseUv,

                    interactive

                );

        }

    }


    /* =================================================
       TOP WAVES
    ================================================= */

    if (enableTop) {

        for (
            int i = 0;
            i < 20;
            i++
        ) {

            if (i >= topLineCount)
                break;


            float fi =
                float(i);


            float t =
                fi /
                max(
                    float(
                        topLineCount - 1
                    ),
                    1.0
                );


            vec3 lineColor =
                mix(
                    LIGHT_GREEN,
                    GREEN,
                    t
                );


            float angle =
                topWavePosition.z *
                log(
                    length(baseUv) + 1.0
                );


            vec2 ruv =
                baseUv *
                rotate(angle);


            ruv.x *= -1.0;


            col +=
                lineColor *
                wave(
                    ruv +
                    vec2(
                        topLineDistance * fi +
                        topWavePosition.x,

                        topWavePosition.y
                    ),

                    1.0 +
                    0.2 * fi,

                    baseUv,

                    mouseUv,

                    interactive

                )
                *
                0.1;

        }

    }


    /* FINAL */

    gl_FragColor =
        vec4(
            col,
            1.0
        );

}

`;


/* =====================================================
   THREE.JS SCENE
===================================================== */

const scene =
    new THREE.Scene();


const camera =
    new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0,
        1
    );


camera.position.z = 1;


/* =====================================================
   RENDERER
===================================================== */

const renderer =
    new THREE.WebGLRenderer({

        antialias: true,

        alpha: true

    });


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio || 1,
        2
    )
);


renderer.setClearColor(
    0x000000,
    0
);


container.appendChild(
    renderer.domElement
);


renderer.domElement.style.width =
    "100%";


renderer.domElement.style.height =
    "100%";


renderer.domElement.style.display =
    "block";


/* =====================================================
   MOUSE
===================================================== */

const targetMouse =
    new THREE.Vector2(
        -1000,
        -1000
    );


const currentMouse =
    new THREE.Vector2(
        -1000,
        -1000
    );


const targetParallax =
    new THREE.Vector2(
        0,
        0
    );


const currentParallax =
    new THREE.Vector2(
        0,
        0
    );


let targetInfluence = 0;

let currentInfluence = 0;


/* =====================================================
   UNIFORMS
===================================================== */

const uniforms = {

    iTime: {
        value: 0
    },

    iResolution: {
        value:
            new THREE.Vector3(
                1,
                1,
                1
            )
    },

    animationSpeed: {
        value:
            settings.animationSpeed
    },


    enableTop: {
        value:
            settings.enabledWaves.includes(
                "top"
            )
    },

    enableMiddle: {
        value:
            settings.enabledWaves.includes(
                "middle"
            )
    },

    enableBottom: {
        value:
            settings.enabledWaves.includes(
                "bottom"
            )
    },


    topLineCount: {
        value:
            settings.lineCount[2]
    },

    middleLineCount: {
        value:
            settings.lineCount[1]
    },

    bottomLineCount: {
        value:
            settings.lineCount[0]
    },


    topLineDistance: {
        value:
            settings.lineDistance[2] *
            0.01
    },

    middleLineDistance: {
        value:
            settings.lineDistance[1] *
            0.01
    },

    bottomLineDistance: {
        value:
            settings.lineDistance[0] *
            0.01
    },


    topWavePosition: {
        value:
            new THREE.Vector3(
                10.0,
                0.5,
                -0.4
            )
    },


    middleWavePosition: {
        value:
            new THREE.Vector3(
                5.0,
                0.0,
                0.2
            )
    },


    bottomWavePosition: {
        value:
            new THREE.Vector3(
                2.0,
                -0.7,
                0.4
            )
    },


    iMouse: {
        value:
            new THREE.Vector2(
                -1000,
                -1000
            )
    },


    interactive: {
        value:
            settings.interactive
    },


    bendRadius: {
        value:
            settings.bendRadius
    },


    bendStrength: {
        value:
            settings.bendStrength
    },


    bendInfluence: {
        value: 0
    },


    parallax: {
        value:
            settings.parallax
    },


    parallaxStrength: {
        value:
            settings.parallaxStrength
    },


    parallaxOffset: {
        value:
            new THREE.Vector2(
                0,
                0
            )
    }

};


/* =====================================================
   MATERIAL
===================================================== */

const material =
    new THREE.ShaderMaterial({

        uniforms:

            uniforms,

        vertexShader:

            vertexShader,

        fragmentShader:

            fragmentShader,

        transparent:

            true

    });


/* =====================================================
   GEOMETRY
===================================================== */

const geometry =
    new THREE.PlaneGeometry(
        2,
        2
    );


const mesh =
    new THREE.Mesh(
        geometry,
        material
    );


scene.add(mesh);


/* =====================================================
   RESIZE
===================================================== */

function resize() {

    const width =
        container.clientWidth ||
        1;


    const height =
        container.clientHeight ||
        1;


    renderer.setSize(
        width,
        height,
        false
    );


    const canvasWidth =
        renderer.domElement.width;


    const canvasHeight =
        renderer.domElement.height;


    uniforms
        .iResolution
        .value
        .set(
            canvasWidth,
            canvasHeight,
            1
        );

}


resize();


window.addEventListener(
    "resize",
    resize
);


/* =====================================================
   MOUSE MOVE
===================================================== */

renderer.domElement.addEventListener(
    "pointermove",
    function (event) {

        const rect =
            renderer.domElement
                .getBoundingClientRect();


        const x =
            event.clientX -
            rect.left;


        const y =
            event.clientY -
            rect.top;


        const dpr =
            renderer.getPixelRatio();


        targetMouse.set(

            x * dpr,

            (
                rect.height -
                y
            ) * dpr

        );


        targetInfluence =
            1;


        if (
            settings.parallax
        ) {

            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const offsetX =
                (
                    x -
                    centerX
                ) /
                rect.width;


            const offsetY =
                -(
                    y -
                    centerY
                ) /
                rect.height;


            targetParallax.set(

                offsetX *
                settings.parallaxStrength,

                offsetY *
                settings.parallaxStrength

            );

        }

    }
);


/* =====================================================
   MOUSE LEAVE
===================================================== */

renderer.domElement.addEventListener(
    "pointerleave",
    function () {

        targetInfluence =
            0;

    }
);


/* =====================================================
   ANIMATION
===================================================== */

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    uniforms
        .iTime
        .value =
        clock.getElapsedTime();


    /* SMOOTH MOUSE */

    currentMouse.lerp(
        targetMouse,
        settings.mouseDamping
    );


    uniforms
        .iMouse
        .value
        .copy(
            currentMouse
        );


    /* BEND */

    currentInfluence +=
        (
            targetInfluence -
            currentInfluence
        )
        *
        settings.mouseDamping;


    uniforms
        .bendInfluence
        .value =
        currentInfluence;


    /* PARALLAX */

    if (
        settings.parallax
    ) {

        currentParallax.lerp(
            targetParallax,
            settings.mouseDamping
        );


        uniforms
            .parallaxOffset
            .value
            .copy(
                currentParallax
            );

    }


    renderer.render(
        scene,
        camera
    );

}


animate();
/* =========================================
   SKF SCROLL REVEAL
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const revealElements = document.querySelectorAll(
    ".skf-discover, .skf-produce, .skf-story, .skf-life, .skf-contact"
  );

  revealElements.forEach(function (element) {
    element.classList.add("skf-reveal");
  });


  const imageElements = document.querySelectorAll(
    ".skf-farm-image, .skf-produce-image, .skf-story-image, .skf-life-card"
  );

  imageElements.forEach(function (element) {
    element.classList.add("skf-reveal-image");
  });


  const observer = new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );


  document
    .querySelectorAll(".skf-reveal, .skf-reveal-image")
    .forEach(function (element) {

      observer.observe(element);

    });

});
