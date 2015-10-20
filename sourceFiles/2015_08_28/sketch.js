
var table;
var blobs = [];

function preload(){
    table = loadTable("SSA-SA-FYWL_modified.csv", "header");
}

function setup() {
  // uncomment this line to make the canvas the full size of the window
  //createCanvas(windowWidth, windowHeight);
  var myCanvas = createCanvas(800, 500);
  myCanvas.parent('p5exp');

  // drawingContext.shadowOffsetX = 5;
  // drawingContext.shadowOffsetY = -5;
  // drawingContext.shadowBlur = 10;
  // drawingContext.shadowColor = "black";
  // background(200);
  // ellipse(width/2, height/2, 50, 50);

  console.log(table);

    print(table.getColumnCount());
    print(table.columns);


    print(table.getColumn("State_Code"));
    for(var i=0; i<table.getRowCount(); i++){
    //for(var i=0; i<20; i++){
        var d = table.getRow(i).obj;

        print(d);
        print(d["State_Code"])
        print(d["Region_Code"])
        print(d["Date"])
        print('Population_age_18-64: ' + d['Population_age_18-64']);
        print('Population_under_age_18: ' + d['Population_under_age_18']);
        print('Percent_of_Population_under_age_18_Receiving_SSI_DC_Benefits: ' + d['Percent_of_Population_under_age_18_Receiving_SSI_DC_Benefits']);
    
        var kids = d['Population_under_age_18'];
        // var adults = d['Population_age_18-64'];
        // var state = d['State-Code'];
        // var region = d['Region_Code'];
        // var x = i*10;
        // var y = i*4;

        var x = i+10;
        var y = 500; //250; //i;

        var b = new Blob(x,y, kids);
        b.display();

        blobs.push(b);

        //blobs[i] = new Blob(x,y);
        //blobs[i].display();

        //blobs[i] = new Blob(x, y);
        // blobs[i].display();
    }
}

function draw() {
    // this is the timeline loop! 
  // draw stuff here
  //ellipse(width/2, height/2, 50, 50);
  
}

//--------------------------------------------------


Blob.prototype.display = function(){
  //   stroke(0);
  //   strokeWeight(2);
  //   fill(255,127);
  //   ellipse(this.position.x, this.position.y, this.kids/100, this.kids/100);

  // }

}



function Blob(x, y, kids){
    this.position = createVector(x,y);
    this.kids = kids;
}

Blob.prototype.display = function(){
    fill(255, 127);
    var w = 2; //12; //random(10,100);
    var h = Math.floor(this.kids/10000); // 20; //random(10,100);
    ellipse(this.position.x, this.position.y, w, h);
}

  // function Blob(x, y, kids, adults, state, region){
  //   this.position = creatVector(x,y)
  //   this.kids = kids;
  //   this.adults = adults;
  //   this.state = state;
  //   this.region = region;
  // }

  // Blob.prototype.display = function(){
  //   stroke(0);
  //   strokeWeight(2);
  //   fill(255,127);
  //   ellipse(this.position.x, this.position.y, this.kids/100, this.kids/100);

  // };