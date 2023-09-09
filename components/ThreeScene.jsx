"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ThreeScene = () => {
    const containerRef = useRef();
    let model;
    const gltfLoader = new GLTFLoader();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const scene = new THREE.Scene();
            const canvas = document.querySelector("canvas.webgl");

            /**
             * Lights
             */
            const ambientLight = new THREE.AmbientLight(0xffffff, 3);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.shadow.camera.far = 15;
            directionalLight.shadow.camera.left = -7;
            directionalLight.shadow.camera.top = 7;
            directionalLight.shadow.camera.right = 7;
            directionalLight.shadow.camera.bottom = -7;
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);

            const pointLight = new THREE.PointLight(0xffffff, 1);
            pointLight.position.set(10, 10, 10);

            const pointLight2 = new THREE.PointLight(0xffffff, 1);
            pointLight.position.set(-10, -10, -10);

            scene.add(pointLight);
            scene.add(pointLight2);
            // --------------------------------------------------------------------

            const sizes = {
                width: window.innerWidth * 0.7,
                height: window.innerHeight * 0.7,
            };

            const camera = new THREE.PerspectiveCamera(
                75,
                sizes.width / sizes.height,
                1,
                15
            );
            camera.position.set(2, 3, 7);
            scene.add(camera);

            // const renderer = new THREE.WebGLRenderer();
            // renderer.setSize(sizes.width * 0.7, sizes.height * 0.7);
            // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            gltfLoader.load("/UnluckyFam/logoFamLights.glb", (gltf) => {
                model = gltf.scene.children[0];
                scene.add(gltf.scene.children[0]);
            });

            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
            });

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            let mouseX, lastMouseX;
            let mouseXDelta = Math.abs(mouseX - lastMouseX);

            // if (!isMobileDevice){
            canvas.addEventListener("mousemove", (event) => {
                mouseX = (event.clientX / sizes.width) * 2 - 1;
            });
            // }else {
            //     canvas.addEventListener('touchmove', (event) => {
            //         mouseX = (e.changedTouches[0].clientX / sizes.width) * 2 - 1
            //     })
            // }
            // containerRef.current?.appendChild(renderer.domElement);

            // Render the scene and camera
            // renderer.render(scene, camera);

            // // Add this function inside the useEffect hook
            // const renderScene = () => {
            //     if (model) {
            //         model.rotation.x += 0.01;
            //         model.rotation.y += 0.01;
            //     }
            //     renderer.render(scene, camera);
            //     requestAnimationFrame(renderScene);
            // };
            const controls = new OrbitControls(camera, canvas);
            controls.target.set(0, 3, 0);
            controls.enableDamping = true;
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.enableRotate = false;

            const clock = new THREE.Clock();
            let previousRotate = 0;
            let permanentRotation = 0.01;

            const tick = () => {
                const elapsedTime = clock.getElapsedTime();

                // Update controls
                controls.update();
                // console.log(mouseX)

                if (model) {
                    previousRotate = model.rotation.y;
                    mouseXDelta = mouseX - lastMouseX;

                    if (mouseX < 0.4 && mouseX > -0.4) {
                        if (mouseXDelta > 0.05 || mouseXDelta < -0.05) {
                            model.rotation.y += mouseXDelta * 2;
                        }
                    }
                    if (previousRotate != model.rotation.y) {
                        permanentRotation = mouseXDelta / 2;
                    } else if (
                        permanentRotation > 0.02 ||
                        permanentRotation < -0.02
                    ) {
                        permanentRotation =
                            permanentRotation > 0.02
                                ? permanentRotation - 0.02 * permanentRotation
                                : permanentRotation + 0.02 * -permanentRotation;
                        console.log(permanentRotation);
                    }
                    model.rotation.x = Math.sin(elapsedTime / 2) / 8;
                    model.rotation.y += permanentRotation;
                    lastMouseX = mouseX;
                }

                // Render
                renderer.render(scene, camera);

                // Call tick again on the next frame
                window.requestAnimationFrame(tick);
            };

            tick();

            const handleResize = () => {
                const width = window.innerWidth * 0.7;
                const height = window.innerHeight * 0.7;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.setSize(width, height);
            };

            window.addEventListener("resize", handleResize);

            // Clean up the event listener when the component is unmounted
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);
    return <canvas className="webgl" />;
};

export default ThreeScene;
