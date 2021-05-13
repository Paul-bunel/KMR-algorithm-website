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

dataStorage = [
  [
    0.33100005239248276,
    0.3399999812245369,
    0.4530000500380993,
    0.4970000125467777,
    0.5440001375973225,
    0.5870000459253788,
    0.6139999255537987,
    0.7440000772476196,
    0.7620000280439854,
    0.8399998769164085
  ],
  [
    5.646000057458878,
    36.08799995854497,
    115.88599998503923,
    272.2980000078678,
    530.2030000835657,
    911.5349999628961,
    1452.4410001002252,
    2168.569999933243,
    3053.597999922931,
    4195.750999916345
  ]
];

chartPerf = new Chart(document.querySelector('.line').getContext("2d") , {
  type : "line",
  data : ChartData1,
  plugins: [plugin],
  options: ChartLineOption,
});
  
function ChangeData(chart, newData) {
  //chart.data.labels.push(label);
  i = 0;
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
  if (chartPerf.data.datasets[0].data.length < dataStorage[0].length
    && chartPerf.data.datasets[0].data.length > 0
  ) {
    label.push(parseInt(label[label.length - 1], 10) + 100);

    i = 0;
    chartPerf.data.datasets.forEach((dataset) => {
      dataset.data.push(dataStorage[i][chartPerf.data.datasets[i].data.length]);
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
  for (let i = 0; i < dataStorage.length; ++i) {
    dataChart[i] = [...dataStorage[i]];
  }
  ChangeData(chartPerf, dataChart);

  // var bar = document.getElementById('bar').getContext("2d");
  // window.myBar = new Chart(document.querySelector('.bar').getContext("2d") , {
  //   type : "bar",
  //   data : ChartData2,
  // });
}

window.onload = makeChart(); 
