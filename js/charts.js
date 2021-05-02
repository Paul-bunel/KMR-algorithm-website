const removeButton = document.querySelector('.remove-button');
const restoreButton = document.querySelector('.restore-button');

var ChartData1 = {
  labels  : [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '1000',
  ],
  datasets: [{
    label: 'algo KMR',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [],
  },
  {
    label: 'algo naif',
    backgroundColor: 'blue',
    borderColor: 'blue',
    data: [],
  }]
}
  
var ChartData2 = {
  labels: ['KMR', 'naif'],

  datasets: [{
    label: 'My First Dataset',
    data: [30, 59],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)'
    ],
    borderWidth: 1
  }]
}

var ChartLineOption = {
  color: 'black',
  borderColor: 'black',
  scales: {
    x: {
      title: {
        display: true,
        text: 'Taille du mot',
        color: 'black',
      }
    },
    y: {
      title: {
        display: true,
        text: 'Temps en millisecondes',
        color: 'black',
      }
    }
  }
};

const plugin = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#f9e1a7';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

const datastorage = [[0.33100000000558794,0.913999998010695	,1.2670000025536865,
  1.7859999847132713,1.8820000055711716,0.5559999961405993,0.6310000026132911,
  0.7310000015422702,0.7810000039171427,0.8789999992586672],
  [7.96900000423193,44.489000004250556,126.10700000077486,272.877999994671,
  527.3610000091139,926.1829999973997,1463.7889999954496,2222.7849999966566,
  3144.293999992078,4356.391000002623]];

chartPerf = new Chart(document.querySelector('.line').getContext("2d") , {
  type : "line",
  data : ChartData1,
  plugins: [plugin],
  options: ChartLineOption,
});
  
function ChangeData(chart, newData) {
  //chart.data.labels.push(label);
  let i = 0;
  chart.data.datasets.forEach((dataset) => {
      dataset.data = newData[i];
      i++;
  });
  chart.update();
}

function removeData() {
  if (chartPerf.data.datasets[0].data.length > 2) {
    chartPerf.data.labels.pop();
    
    chartPerf.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chartPerf.update();
  }
}


function restoreData() {
  let label = chartPerf.data.labels;

  console.log(chartPerf.data.datasets[0].data.length);
  if (chartPerf.data.datasets[0].data.length < datastorage[0].length
    && chartPerf.data.datasets[0].data.length > 0
  ) {
    label.push(parseInt(label[label.length - 1], 10) + 100);

    i = 0;
    chartPerf.data.datasets.forEach((dataset) => {
      dataset.data.push(datastorage[i][chartPerf.data.datasets[i].data.length]);
      i++;
    })
    chartPerf.update();
    //console.log("oui : ",chart.labels.length);
  }
}

removeButton.onclick = removeData;
restoreButton.onclick = restoreData;

function makeChart(){
  window.myLine = chartPerf;
  let dataChart = new Array();
  for (let i = 0; i < datastorage.length; ++i) {
    dataChart[i] = [...datastorage[i]];
  }
  ChangeData(chartPerf, dataChart);

  // var bar = document.getElementById('bar').getContext("2d");
  // window.myBar = new Chart(document.querySelector('.bar').getContext("2d") , {
  //   type : "bar",
  //   data : ChartData2,
  // });
}

window.onload = makeChart(); 
