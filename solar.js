function init() {

    var stats = initStats();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var sceneBG = new THREE.Scene();
    var sceneSun = new THREE.Scene();
    var sceneEarth = new THREE.Scene();
   

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
   
    var cameraBG = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, -10000, 10000);
    cameraBG.position.z = 250;

    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    //sphere1 = ziemia
    var sphere1 = createPlanetMesh(new THREE.SphereGeometry(5,20,20),
    "../solarium/assets/textures/planets/8k_mercury.jpg","../solarium/assets/planets/Mars-normalmap_2k.png");
    sphere1.position.x = 85;
   
    //sphere2 = ksiezyc
    var sphere2 = createPlanetMesh(new THREE.SphereGeometry(50,70,70),
    "../solarium/assets/textures/planets/Earth.png","../solarium/assets/planets/Mars-normalmap_2k.png");
    sphere2.position.x = -10;

    
    sceneEarth.add(sphere1);
    //sceneSun.add(sphere1);
    //sceneEarth.add(sphere2);
    sceneSun.add(sphere2);

    // position and point the camera to the center of the scene
    camera.position.x = 10;
    camera.position.y = 25;
    camera.position.z = 35;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = true;
    var clock = new THREE.Clock();

    var ambi = new THREE.AmbientLight(0x181818,0.2);
    var ambi2 = new THREE.AmbientLight(0x181818,0.6);
    sceneSun.add(ambi2);
    sceneEarth.add(ambi);
  

    var spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(550, 100, 550);
    spotLight.intensity = 0.5;

    var spotLight2 = new THREE.DirectionalLight(0xffffff);
    spotLight2.position.set(-550, -100, -550);
    spotLight2.intensity = 0.7;
    var spotLight3 = new THREE.DirectionalLight(0xffffff);
    spotLight3.position.set(550, 100, 550);
    spotLight3.intensity = 0.7;
   

    var pointLight = new THREE.PointLight(0xccffcc,5);
    pointLight.distance = 500;
    
    sceneEarth.add(pointLight);
    sceneSun.add(pointLight);
    sceneEarth.add(spotLight);
    sceneSun.add(spotLight2);
    sceneSun.add(spotLight3);
    
    

  

    var materialColor = new THREE.MeshBasicMaterial({
        //map: THREE.ImageUtils.loadTexture("../solarium/assets/textures/galaxy.png"),
        depthTest: false
    });
    var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
    bgPlane.position.z = -100;
    bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);
    sceneBG.add(bgPlane);

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    var bgPass = new THREE.RenderPass(sceneBG, cameraBG);
    var renderPass = new THREE.RenderPass(sceneEarth, camera);
    renderPass.clear = false;
    var renderPass2 = new THREE.RenderPass(sceneSun,camera);
    renderPass2.clear = false;
    


    var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
    effectCopy.renderToScreen = true;


    var clearMask = new THREE.ClearMaskPass();
    //sun mask
    var sunMask = new THREE.MaskPass(sceneSun,camera);
    // earth mask
    var earthMask = new THREE.MaskPass(sceneEarth, camera);
//        earthMask.inverse = true;

    var effectSepia = new THREE.ShaderPass(THREE.SepiaShader);
    effectSepia.uniforms['amount'].value = 0.8;

    var effectColorify = new THREE.ShaderPass(THREE.ColorifyShader);
    effectColorify.uniforms['color'].value.setRGB(0.5, 0.5, 1);


    var composer = new THREE.EffectComposer(webGLRenderer);
    composer.renderTarget1.stencilBuffer = true;
    composer.renderTarget2.stencilBuffer = true;

    composer.addPass(bgPass);
    composer.addPass(renderPass);
    composer.addPass(renderPass2);
    composer.addPass(sunMask);
    composer.addPass(clearMask);
    composer.addPass(earthMask);
    //composer.addPass(effectColorify);
    composer.addPass(clearMask);
    //composer.addPass(effectSepia);
    composer.addPass(effectCopy);

    render();

   function createPlanetMesh(geom,material1,material2){
    var planetTexture = THREE.ImageUtils.loadTexture(material1);
    var normalTexture = THREE.ImageUtils.loadTexture(material2);
    
    var planetMaterial = new THREE.MeshPhongMaterial();
    planetMaterial.normalMap = normalTexture;
    planetMaterial.map = planetTexture;

    var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[planetMaterial]);
    return mesh;
}

    function createEarthMesh(geom) {
        var planetTexture = THREE.ImageUtils.loadTexture("../solarium/assets/textures/planets/Earth.png");
        var specularTexture = THREE.ImageUtils.loadTexture("../solarium/assets/textures/planets/EarthSpec.png");
        var normalTexture = THREE.ImageUtils.loadTexture("../solarium/assets/textures/planets/EarthNormal.png");


        var planetMaterial = new THREE.MeshPhongMaterial();
        planetMaterial.specularMap = specularTexture;
        planetMaterial.specular = new THREE.Color(0x4444aa);


        planetMaterial.normalMap = normalTexture;
        planetMaterial.map = planetTexture;
//               planetMaterial.shininess = 150;


        // create a multimaterial
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);

        return mesh;
    }

    function render() {

        webGLRenderer.autoClear = false;

        stats.update();


        //sphere.rotation.y=step+=0.01;
        var delta = clock.getDelta();
        orbitControls.update(delta);

        sphere1.rotation.y += 0.002;
        sphere2.rotation.y += 0.002;
        
        // render using requestAnimationFrame
        requestAnimationFrame(render);
//            webGLRenderer.render(scene, camera);
        composer.render(delta);
    }

    function initStats() {

        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.getElementById("Stats-output").appendChild(stats.domElement);

        return stats;
    }
}
window.onload = init;