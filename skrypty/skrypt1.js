
var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera(125,window.innerWidth/window.innerHeight,0.01,10000);
camera.position.z = 145;
camera.position.y = 62;
camera.position.x = 54;


var camera2 = new THREE.PerspectiveCamera(105,window.innerWidth/window.innerHeight,0.01,10000);
				var cameraHelper = new THREE.CameraHelper(camera2);
				//scene.add(cameraHelper);

var light =new THREE.AmbientLight(0xffffff,0.8);
scene.add(light);
var pointColor = "#ccffcc";
var pointLight = new THREE.PointLight(pointColor,5);
pointLight.distance = 500;
scene.add(pointLight);


var renderer= new THREE.WebGLRenderer({antilias:true});
renderer.setClearColor("#000000");

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//ruch kamery
controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.screenSpacePanning = false;
controls.mixDistance = 100;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

//
//tworzenie planet
//
// sphere1 == slonce
var sphereGeometry = new THREE.SphereGeometry(21.4,10,10);
var sphereMaterial = new THREE.MeshLambertMaterial(
{color: "yellow",}); // wireframe: true
var sphere1 = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere1.position.x = 0;
sphere1.position.y = 0;
sphere1.position.z = 0;
scene.add(sphere1);

//sphere2 == merkury
sphereGeometry = new THREE.SphereGeometry(3.33,20,20);
sphereMaterial = new THREE.MeshLambertMaterial(
{color: "#c86f33"});
var sphere2 = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere2.position.x = 29.54 + 3.33;
sphere2.position.y = 3;
sphere2.position.z = 2.2;
scene.add(sphere2);

//sphere3 == wenus
sphereGeometry = new THREE.SphereGeometry(3.75,30,30);
sphereMaterial = new THREE.MeshLambertMaterial(
{color: "pink"});
var sphere3 = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere3.position.x = (-29.54-3.75)*1.5;
sphere3.position.y = 1.5;
sphere3.position.z = -2.4;
scene.add(sphere3);

//sphere4 == ziemia
sphereGeometry = new THREE.SphereGeometry(3.75,30,30);
sphereMaterial = new THREE.MeshLambertMaterial(
{color: "green"});
var sphere4 = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere4.position.x = (-29.54-3.65)*1.5;
sphere4.position.y = 0.5;
sphere4.position.z = 45.4;
scene.add(sphere4);

//sphere5 == ksiezyc ziemski


//sphere6 == mars
sphereGeometry = new THREE.SphereGeometry(3.35,40,40);
sphereMaterial = new THREE.MeshLambertMaterial({color:"red"});
var sphere6 = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere6.position.x= (29.54+0.42)*3.25;
sphere6.position.y = 0.35;
sphere6.position.z = 25.4;

scene.add(sphere6);

//sphere7 == jowisz
sphereGeometry = new THREE.SphereGeometry(6,60,60);
sphereMaterial = new THREE.MeshLambertMaterial({color:"#f5a672"});
var sphere7 = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere7.position.x = (29.54+4.2)*5.5;
sphere7.position.y = 0.64;
sphere7.position.z = -35.4;
scene.add(sphere7);

//sphere8 == saturn
sphereGeometry = new THREE.SphereGeometry(4.80,45,45);
sphereMaterial = new THREE.MeshLambertMaterial({color:"#f7ed95"});
var sphere8 = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere8.position.x = (29.54+12.4)*5.5;
sphere8.position.y = 1.05;
sphere8.position.z = 75.4;
scene.add(sphere8);

//sphere9 == uran
sphereGeometry = new THREE.SphereGeometry(4,30,30);
sphereMaterial = new THREE.MeshLambertMaterial({color:"#e5fff6"});
var sphere9 = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere9.position.x = (-29.54-2.4)*9.5;
sphere9.position.y = 1.15;
sphere9.position.z = -245;
scene.add(sphere9)

//sphere10 == neptun
sphereGeometry = new THREE.SphereGeometry(4.2,30,30);
sphereMaterial = new THREE.MeshLambertMaterial();
var sphere10 = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere10.position.x = (-29.54-12.4)*11.2;
sphere10.position.y = -0.6;
sphere10.position.z = -149.4;
scene.add(sphere10);

window.addEventListener('resize',onWindowsResize,false);

function onWindowsResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window,innerWidth,window.innerHeight);
}


//petla renderujaca
var render = function(){

    requestAnimationFrame(render);
    sphere1.rotation.y+=0.03;
    sphere2.rotation.y+=0.008;

    //renderowanie sceny
    renderer.render(scene,camera);
};
//tablica z orbitami planet
var orbitRadius = [40,//orbita merkurego
                   60,//orbita wenus
                   80,//orbita ziemi
                    5,//proponowana orbita dla ksiezyca
                   105,//oribita mars
                   185,//orbita jowisza
                   225,//orbita saturna
                   270,//orbita uranu
                   310//orbita neptuna
                ];
var date;
function animate(){
    //ruch planet
    requestAnimationFrame(animate);
    date = [Date.now()*0.0001,
            Date.now()*0.00008,
            Date.now()*0.000064,
            Date.now()*0.000044,
            Date.now()*0.000024,
            Date.now()*0.000014
        ] ;
    //ruch merkurego
    sphere2.position.set(Math.cos(date[0])*orbitRadius[0],0,Math.sin(date[0])*orbitRadius[0]);
    //ruch wenus
    sphere3.position.set(Math.cos(date[2])*orbitRadius[1],0,Math.sin(date[2])*orbitRadius[1]);
    //ruch ziemi
    sphere4.position.set(Math.cos(date[1])*orbitRadius[2],0,Math.sin(date[1])*orbitRadius[2]);
    //ruch marsa
    sphere6.position.set(Math.cos(date[2])*orbitRadius[4],0,Math.sin(date[2])*orbitRadius[4]);
    //ruch jowisza
    sphere7.position.set(Math.cos(date[2])*orbitRadius[5],0,Math.sin(date[2])*orbitRadius[5]);
    //ruch saturna
    sphere8.position.set(Math.cos(date[3])*orbitRadius[6],0,Math.sin(date[3])*orbitRadius[6]);
    //ruch urana
    sphere9.position.set(Math.cos(date[4])*orbitRadius[7],0,Math.sin(date[4])*orbitRadius[7]);
    //ruch neptuna
    sphere10.position.set(Math.cos(date[5])*orbitRadius[8],0,Math.sin(date[5])*orbitRadius[8]);
    render();
}
animate();
render(); 