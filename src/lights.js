import * as THREE from "three/webgpu";

export class Lights {
    constructor() {
        this.object = new THREE.Object3D();

        // Create a canvas texture for a square shape
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, 64, 64);
        context.fillStyle = 'white';
        context.fillRect(0, 0, 64, 64); // A white square in the middle
        const squareTexture = new THREE.CanvasTexture(canvas);

        const light = new THREE.SpotLight(0xffffff, 5, 10, Math.PI * 0.2, 0, 0); // Increased angle, penumbra to 0
        light.map = squareTexture; // Apply the square texture
        light.penumbra = 0; // Sharper edges

        const lightTarget = new THREE.Object3D();
        light.position.set(0., 1.2, -0.8);
        lightTarget.position.set(0,0.7,0);
        light.target = lightTarget;

        this.object.add(light);
        this.object.add(lightTarget);
        //this.object.add(new THREE.SpotLightHelper(light));

        light.castShadow = false; // default false
        light.shadow.mapSize.width = 512*2; // default
        light.shadow.mapSize.height = 512*2; // default
        light.shadow.bias = -0.005;
        light.shadow.camera.near = 0.5; // default
        light.shadow.camera.far = 5;

    }

    update(elapsed) {

    }
}