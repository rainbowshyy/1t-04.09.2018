var sliders = [50,50,50,50]

function updateSliders() {
    for (var i=0; i<4; i++) {
        sliders[i] = document.getElementById("slider" + i).value;
        console.log(sliders[i]);
    }
}

function song(name,values,tags,image,artist,album) {
    this.name = name;
    this.values = []
    for (var i=0;i<4;i++) {this.values.push(values[i]);}
    this.tags = tags;
    this.image = image;
    this.artist = artist;
    this.album = album;
}