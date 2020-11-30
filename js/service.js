var gProjs=creatrProjs()
// gProjs = [
//     {
//         id: "sokoban",
//         name: "Sokoban",
//         title: "Better push those boxes",
//         desc: "lorem ipsum lorem ipsum lorem ipsum",
//         url: "projs/sokoban",
//         publishedAt: 1448693940000,
//         labels: ["Matrixes", "keyboard events"],
//     },

// ]
function creatrProj(id, name, title, desc, url, label) {
    return {
        id,
        name,
        title,
        desc,
        url,
        date: Date.now(),
        label,
        
    }

}
function creatrProjs() {
     var projs=[]
     projs.push(creatrProj('minesweeper', 'minesweeper', 'board game ', 'lorem kfhf', "https://almog2139.github.io/mine-sweeper3/", ["Matrixes", "keyboard events"]))
     projs.push(creatrProj('Chess', 'Chess', 'board game ', 'lorem kfhf', "http://google.com", ["Matrixes", "keyboard events"]))
     projs.push(creatrProj('todos', 'todos', 'board game ', 'lorem kfhf', "http://google.com", ["Matrixes", "keyboard events"]))
     projs.push(creatrProj('picture game','picture game', 'board game ', 'lorem kfhf', "http://google.com", ["Matrixes", "keyboard events"]))
     projs.push(creatrProj('Touch Nums', 'Touch Nums', 'board game ', 'lorem kfhf', "http://google.com", ["Matrixes", "keyboard events"]))
     return projs;
     

}
function findProj(projId) {
    var proj = gProjs.find(function (currProj) {
        return projId === currProj.id
    })
    
   return proj;

}
function getProjectForDisplay(){
    return gProjs;
}
