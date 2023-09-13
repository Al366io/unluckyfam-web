"use client"
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { BarLoader } from "react-spinners";

export default function ThreeJSLogo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const details: string = navigator.userAgent;
        const regexp: RegExp = /android|iphone|kindle|ipad/i;
        const isMobileDevice: boolean = regexp.test(details);

        const canvas: HTMLCanvasElement = canvasRef.current;

        const scene: THREE.Scene = new THREE.Scene();

        /**
         * GLTF Loader
         */
        let model: THREE.Object3D | undefined;

        const gltfLoader: GLTFLoader = new GLTFLoader();

        gltfLoader.load(
            "./UnluckyFam/logoFamLights.glb",
            (gltf: GLTF) => {
                model = gltf.scene.children[0];
                scene.add(model);
                setIsModelLoaded(true);
            },
            undefined,
            (error) => console.error("An error occurred", error)
        );

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

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth * 0.65,
            height: window.innerHeight * 0.65,
        };

        window.addEventListener("resize", () => {
            // Update sizes
            sizes.width = window.innerWidth * 0.65;
            sizes.height = window.innerHeight * 0.65;

            // Update camera
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            canvas.style.width = `${sizes.width}px`;
            canvas.style.height = `${sizes.height}px`;
        });

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            1,
            15
        );
        camera.position.set(2, 3, 7);

        scene.add(camera);

        /**
         * Renderer
         */
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
            canvas: canvas,
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        let mouseX: number = 0;
        let lastMouseX: number = 0;
        let mouseXDelta = Math.abs(mouseX - lastMouseX);

        if (!isMobileDevice) {
            canvas.addEventListener("mousemove", (event) => {
                mouseX = (event.clientX / sizes.width) * 2 - 1;
            });
        } else {
            canvas.addEventListener("touchmove", (event) => {
                mouseX = (event.changedTouches[0].clientX / sizes.width) * 2 - 1;
            });
        }

        // Controls
        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 3, 0);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = false;

        /**
         * Animate
         */
        const clock: THREE.Clock = new THREE.Clock();
        let previousRotate = 0;
        let permanentRotation = 0.01;

        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            // Update controls
            controls.update();

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

        // Replace all the DOM manipulations with canvas, scene, and renderer

        // Start the animation
        const animationId = window.requestAnimationFrame(tick);

        // Cleanup function
        return () => {
            window.cancelAnimationFrame(animationId);
            // Dispose Three.js objects here
        };
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <canvas ref={canvasRef} className="webgl"></canvas>
            {!isModelLoaded && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <BarLoader color="hsla(168, 0%, 88%, 1)" />
                </div>
            )}
        </div>
    );
}