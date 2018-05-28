//Vertex shader program   
   //inicjacja shadera, dzieki temu wie jak narysowac
   function initShaderProgram(gl,vsSource,fsSource)
   {
        const vertexShader = loadShader(gl,gl.VERTEX_SHADER,vsSource);
        const fragmentShader = loadShader(gl,gl.FRAGMENT_SHADER,fsSource);
        //tworzenie shadera
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram,vertexShader);
        gl.attachShader(shaderProgram,fragmentShader);
        gl.linkProgram(shaderProgram);
   
        //Jesli tworzenie shadera nie powiodlo sie
   
        if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)){
            alert("Tworzenie shadera nie powiodlo sie");
            return null;
        }
   
        return shaderProgram;
   
   }
   //tworzy shader podanego typu, aktualizuje kod
   //kompiluje
   function loadShader(gl,type,source)
   {
    const shader = gl.createShader(type);
    
    //wysyla kod do obiektu shader
   
    gl.shaderSource(shader,source);
    
    //kompiluje
   
    gl.compileShader(shader);
   
    //zobaczy czy operacja zakonczyla sie sukcesem
   
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        alert("Blad przy kompilacji"+gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
   }