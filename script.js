var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);

var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};

var options = {
    nodes: {
        color: {
            border: '#D3D3D3',
            background: '#D3D3D3',
            highlight: {
                border: '#D3D3D3',
                background: '#FFFFFF'
            }
        }
    },
    edges: {
        color: '#D3D3D3',
        highlight: '#D3D3D3'
    }
    };


var network = new vis.Network(container, data, options);

window.addEventListener('resize', function() {
    network.fit();
    var canvas = document.getElementById('map');
    canvas.style.position = 'fixed';
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight*0.8 + 'px';
    canvas.style.top = innerHeight*0.2 + 'px';
});

window.onload = function() {
    // Load data from localStorage
    var storedNodes = JSON.parse(localStorage.getItem('nodes'));
    var storedEdges = JSON.parse(localStorage.getItem('edges'));

    if (storedNodes && storedEdges) {
        nodes.add(storedNodes);
        edges.add(storedEdges);
    }
}

document.getElementById('addBtn').addEventListener('click', function() {
    var source = document.getElementById('source').value;
    var target = document.getElementById('target').value;
    var relation = document.getElementById('relation').value;

    if(source && target && relation) {
        addNameRelation(source, target, relation);
    }
});
      
function addNameRelation(source, target, relation) {
    if (!nodes.get(source)) {
        nodes.add({id: source, label: source});
    }

    if (!nodes.get(target)) {
        nodes.add({id: target, label: target});
    }

    edges.add({from: source, to: target, label: relation});

    // Save data to localStorage
    localStorage.setItem('nodes', JSON.stringify(nodes.get()));
    localStorage.setItem('edges', JSON.stringify(edges.get()));
}

document.getElementById('resetBtn').addEventListener('click', function() {
    // Fade out animation
    // Change the color of nodes and edges to match the background
    var nodesUpdate = nodes.get().map(function(node) {
      return {
        id: node.id,
        color: {
          background: '#131313',
          border: '#131313'
        }
      };
    });
    
    var edgesUpdate = edges.get().map(function(edge) {
      return {
        id: edge.id,
        color: '#131313'
      };
    });
    
    nodes.update(nodesUpdate);
    edges.update(edgesUpdate);
    
    // After the animation is done, clear the nodes and edges
    // Waiting duration should be same as the duration mentioned in CSS transition
    setTimeout(function() {
      nodes.clear();
      edges.clear();
      localStorage.removeItem('nodes');
      localStorage.removeItem('edges');
    }, 300);
  });
  

  