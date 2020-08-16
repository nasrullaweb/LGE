import React, { Component } from "react";
import Chart from "react-apexcharts";


class MainTab2Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        subBrandValue: '',
        cart3: {
          series: [],
          options: {
            chart: {
              width: 380,
              type: 'pie',
              fontFamily: '"futura-pt", sans-serif',
              toolbar: {
                show: true,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  customIcons: []
                },
              }
            },
            grid: {
              show: false,
            },
            colors: ['#d32f2f', '#7b1fa2', '#303f9f', '#0288d1', '#00796b', '#689f38', '#afb42b', '#ffa000', '#e64a19', '#c2185b', '#512da8', '#1976d2',
          '#0097a7', '#5d4037', '#388e3c', '#fbc02d', '#616161', '#f57c00', '#455a64'],
            labels: [],
            tooltip: {
              enabled: true,
              style: {
                fontSize: '12px',
                fontFamily: undefined,
                background: '#fff',
                fontFamily: '"futura-pt", sans-serif',
              },
              y: {
                title: {
                  formatter: (seriesName) => seriesName,
                },
                formatter: function (value) {
                  let val = value;
                    val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  
                  return val;
                },
              },
            },
            responsive: [{
              breakpoint: 180,
              options: {
                chart: {
                  width: 400
                },
                
                legend: {
                  position: 'top',
                  horizontalAlign: 'right',
                  style: {
                    fontSize: '12px',
                    fontFamily: '"futura-pt", sans-serif',
                  },
                }
              }
            }]
          },
        },
        cart4: {
          series: [],
          
          options: {
            chart: {
              width: 380,
              type: 'pie',
              fontFamily: '"futura-pt", sans-serif',
              toolbar: {
                show: true,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  customIcons: []
                },
              }
            },
            grid: {
              show: false,
            },
            colors: ['#388e3c', '#0097a7'],
            tooltip: {
              enabled: true,
              style: {
                fontSize: '12px',
                fontFamily: undefined,
                background: '#fff',
                fontFamily: '"futura-pt", sans-serif',
              },
              y: {
                title: {
                  formatter: (seriesName) => seriesName,
                },
                formatter: function (value) {
                  let val = value;
                    val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  
                  return val;
                },
              },
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom',
                  style: {
                    fontSize: '12px',
                    fontFamily: '"futura-pt", sans-serif',
                  },
                }
              }
            }]
          },
        },
        cart5: {
          series: [{
            data: [44, 55, 41, 64, 22, 43, 21]
          }, {
            data: [53, 32, 33, 52, 13, 44, 32]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 400,
              fontFamily: '"futura-pt", sans-serif',
            },
            grid: {
              show: false,
            },
            colors: ['#a8dadc', '#457b90'],
            plotOptions: {
              bar: {
                horizontal: false,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              style: {
                fontSize: '12px',
                colors: ['#fff'],
                fontFamily: '"futura-pt", sans-serif',
              },
              formatter: function (value) {
                
                return parseFloat(value).toFixed(2);
              },
            },
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            yaxis: [ {
              axisBorder: {
                show: true,
                color: '#999'
              },
              labels: {
                show: true,
                style: {
                    colors: '#666',
                    fontSize: '12px',
                    fontFamily: '"futura-pt", sans-serif',
                },
              },
              title: {
                text: "ROI (€)",
                style: {
                  color: '#333',
                  fontWeight:  'normal',
                  fontSize:  '12px',
                  fontFamily: '"futura-pt", sans-serif',
                }
              },
              }
            ],
            xaxis: {
              categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
              axisBorder: {
                show: true,
                color: '#999'
              },
              labels: {
                show: true,
                style: {
                    colors: '#666',
                    fontSize: '12px',
                    fontFamily: '"futura-pt", sans-serif',
                },
              },
            },
          },
        }
          
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { cart3, subBrandValue, cart4, cart5 } = state
    
    if (props.graphData1 && props.graphData1.series && subBrandValue !== props.subBrandValue) {
        cart3.series = props.graphData1.series
        cart3.options.labels = props.graphData1.labels

    }

    if (props.graphData21 && props.graphData21.series && subBrandValue !== props.subBrandValue) {
      cart4.series = props.graphData21.series
      cart4.options.labels = props.graphData21.labels
    }

    if (props.graphData22 && props.graphData22.series && subBrandValue !== props.subBrandValue) {
      cart5.series = props.graphData22.series
      cart5.options.xaxis.categories = props.graphData22.xValue
    }


    return {
        cart3,
        cart4,
        cart5,
        subBrandValue
    }
    
    //return { };
  }
  

    render() {
      return (
        

  <div id="chart">
      {
          this.props.graphData1 &&
            <div className="chartContent">
              <div className="widthHalf titleAdded">
                <div className="chartTitle">Incremental vs Base</div>
              <Chart
                        options={this.state.cart4.options}
                        series={this.state.cart4.series}
                        type="pie" 
                        height={300}
                        />
              </div>
              <div className="widthHalfRight titleAdded">
              <div className="chartTitle">Incremental Split</div>
                <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="pie" 
                        height={300}
                        />
              </div>
              <div className="spaceBetween"></div>
              <div className="downChart titleAdded">
              <div className="chartTitle">ROI YoY</div>
                <Chart
                        options={this.state.cart5.options}
                        series={this.state.cart5.series}
                        type="bar" 
                        height={400}
                        />
                </div>
            </div>
      }
      
</div>


      );
    }
  }

  export default MainTab2Charts
  