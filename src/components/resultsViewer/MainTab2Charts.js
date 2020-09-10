import React, { Component } from "react";
import Chart from "react-apexcharts";
import ColoredScrollbars from '../common/ColoredScrollbars';


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
              type: 'donut',
              fontFamily: '"Lato", sans-serif',
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
            colors: ['#DB1348','#FF9933','#E84518','#FF6601','#FFC000','#D1D105',
            '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
            '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
            '#994561','#CC3A8E'],
            labels: [],
            tooltip: {
              enabled: true,
              style: {
                fontSize: '12px',
                background: '#fff',
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
                  width: 400,
                },
                
                legend: {
                  position: 'top',
                  horizontalAlign: 'right',
                  style: {
                    color: '#3D3D3D',
                    fontSize: '12px',
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
              type: 'donut',
              fontFamily: '"Lato", sans-serif',
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
            colors: ['#DB1348','#FF9933','#E84518','#FF6601','#FFC000','#D1D105',
            '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
            '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
            '#994561','#CC3A8E'],
            tooltip: {
              enabled: true,
              style: {
                fontSize: '12px',
                background: '#fff',
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
                    color: '#3D3D3D',
                    fontSize: '12px',
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
              fontFamily: '"Lato", sans-serif',
            },
            grid: {
              show: false,
            },
            colors: ['#DB1348','#FF9933','#E84518','#FF6601','#FFC000','#D1D105',
            '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
            '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
            '#994561','#CC3A8E'],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '90%',
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
                color: '#8E8E8E'
              },
              labels: {
                show: true,
                style: {
                    colors: '#8E8E8E',
                    fontSize: '10px',
                },
              },
              title: {
                text: "ROI (€)",
                style: {
                  color: '#DB1348',
                  fontWeight : 'bold',
                  fontSize : '13px',
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
                  fontSize: '10px',
                  color: '#373D3F',
                },
              },
            },
          },
        },
        cart6: {
          series: [{
            name: 'Marine Sprite',
            data: [44, 55, 41, 37, 22, 43, 21]
          }, {
            name: 'Striking Calf',
            data: [53, 32, 33, 52, 13, 43, 32]
          }, {
            name: 'Tank Picture',
            data: [12, 17, 11, 9, 15, 11, 20]
          }, {
            name: 'Bucket Slope',
            data: [9, 7, 5, 8, 6, 9, 4]
          }, {
            name: 'Reborn Kid',
            data: [25, 12, 19, 32, 25, 24, 10]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 800,
              fontFamily: '"Lato", sans-serif',
              stacked: true,
              stackedType: '100%',
                zoom: {
                    enabled: false
                },
            },
            grid: {
              show: false,
            },
            colors: ['#DB1348','#FF9933','#E84518','#FF6601','#FFC000','#D1D105',
                '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
                '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
                '#994561','#CC3A8E'],
            plotOptions: {
              bar: {
                horizontal: true,
                columnWidth: '100%',
              },
            },
            stroke: {
              width: [4, 4, 4, 4, 4],
              curve: 'smooth',
            },
            title: {
              text: 'Fiction Books Sales'
            },
            xaxis: {
              categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
              // labels: {
              //   formatter: function (val) {
              //     return val + "K"
              //   }
              // }
            },
            yaxis: {
              title: {
                text: undefined
              },
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            fill: {
              opacity: 1
            },
            legend: {
              horizontalAlign: 'center',
                  position: 'bottom',
                  style: {
                    color: '#3D3D3D',
                    fontSize: '12px',
                  },
            }
          },
        
        
        }
      }
  }

  static getDerivedStateFromProps(props, state) {
    let { cart3, subBrandValue, cart4, cart5, cart6 } = state
    
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

    if (props.graphData23 && props.graphData23.series && subBrandValue !== props.subBrandValue) {
      cart6.series = props.graphData23.series
      cart6.options.xaxis.categories = props.graphData23.xValue
    }


    return {
        cart3,
        cart4,
        cart5,
        cart6,
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
                <div className="chartTitle"><span className="smallLeftBorder"></span>Incremental vs Base</div>
              <Chart
                        options={this.state.cart4.options}
                        series={this.state.cart4.series}
                        type="donut" 
                        height={300}
                        />
              </div>
              <div className="widthHalfRight titleAdded">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Incremental Split</div>
                <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="donut" 
                        height={300}
                        />
              </div>
              <div className="spaceBetween"></div>
              <div className="downChart titleAdded">
              <div className="chartTitle"><span className="smallLeftBorder"></span>ROI YoY</div>
              <div className="scrollhor">
                <ColoredScrollbars>
                <Chart
                        options={this.state.cart5.options}
                        series={this.state.cart5.series}
                        type="bar" 
                        height={400}
                        width={2500}
                        />
                        </ColoredScrollbars>
                        </div>
                </div>
                <div className="spaceBetween"></div>
                <div className="downChart titleAdded">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Spend</div>
                <Chart
                        options={this.state.cart6.options}
                        series={this.state.cart6.series}
                        type="bar" 
                        height={800}
                        />
                </div>
            </div>
      }
      
</div>


      );
    }
  }

  export default MainTab2Charts
  