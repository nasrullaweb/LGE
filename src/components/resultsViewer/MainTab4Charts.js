import React, { Component } from "react";
import Chart from "react-apexcharts";


class MainTab4Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        subBrandValue: '',
        // cart1: {
        //     series: [{
        //         data: []
        //       }],
        //       options: {
        //         chart: {
        //           type: 'bar',
        //           height: 250
        //         },
        //         colors: ['#c55b11', '#FEB019', '#3366ff', '#99ffcc', '#00ccff', '#00ffcc'],
        //         plotOptions: {
        //           bar: {
        //             horizontal: false,
        //             columnWidth: '90%',
        //           }
                  
        //         },
        //         dataLabels: {
        //           enabled: true
        //         },
        //         stroke: {
        //             show: true,
        //             width: 15,
        //             colors: ['transparent']
        //           },
        //         xaxis: {
        //           categories: [],
        //         },
        //         legend: {
        //             horizontalAlign: 'center',
        //             position: 'top',
        //             showForSingleSeries: true,
        //             offsetX: 40
        //           }
        //       },
        // },
      
        // cart2: {
        //     series: [{
        //         data: []
        //       }],
        //       options: {
        //         chart: {
        //           type: 'bar',
        //           height: 250
        //         },
        //         colors: ['#c55b11', '#FEB019', '#3366ff', '#99ffcc', '#00ccff', '#00ffcc'],
        //         plotOptions: {
        //           bar: {
        //             horizontal: false,
        //             columnWidth: '90%',
        //           }
        //         },
        //         dataLabels: {
        //           enabled: true
        //         },
        //         stroke: {
        //             show: true,
        //             width: 15,
        //             colors: ['transparent']
        //           },
        //         xaxis: {
        //           categories: [],
        //         },
        //         legend: {
        //             horizontalAlign: 'center',
        //             showForSingleSeries: true,
        //             position: 'top',
        //             offsetX: 40
        //           }
        //       },
        // },

        cart3: {
            series: [{
              name: 'Sales_Units',
              type: 'line',
              data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
            }, {
              name: 'Organic_Search_Vol (M)',
              type: 'line',
              data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5] 
            }],
              options: {
                chart: {
                  height: 400,
                  type: 'line',
                  fontFamily: '"Lato", sans-serif',
                  stacked: false,
                    zoom: {
                        enabled: false
                    },
                },
                grid: {
                  show: false,
                },
                colors: ['#DB1348', '#FF9933', '#303f9f', '#0288d1', '#00796b', '#689f38', '#afb42b', '#ffa000', '#e64a19', '#c2185b', '#512da8', '#1976d2', '#0097a7', '#5d4037', '#388e3c', '#fbc02d', '#616161', '#f57c00', '#455a64'],
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  width: [4, 2, 2, 2, 2],
                  curve: 'smooth',
                },
                xaxis: {
                  type: 'numeric',
                  tickAmount: 30,
                  categories: [1, 50, 100, 200, 300, 400, 500, 1000, 1500, 2000, 2500],
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999'
                  },
                  tooltip: {
                    enabled: false
                  },
                  title: {
                    text: "Spend (€)",
                    offsetY: 8,
                    style: {
                      color: '#333',
                      fontSize:  '14px',
                    }
                  },
                  labels: {
                    show: true,
                    rotate: -90,
                    rotateAlways: true,
                    hideOverlappingLabels: true,
                    style: {
                      fontSize: '12px',
                      color: '#373D3F',
                    },
                    offsetX: 0,
                    offsetY: 0,
                  },
                },
                yaxis: [
                  {
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#8E8E8E'
                    },
                    labels: {
                      style: {
                        colors: '#8E8E8E',
                        fontSize: '12px',
                      },
                      formatter: function (value) {
                        let val = value;
                        if(val < 999 && val > -1000) {
                          val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }

                        if(val < -1000) {
                          val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                      
                        if(val > 1000) {
                          val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                        return val;
                      },
                    },
                    // title: {
                    //   text: "Sales_Units",
                    //   style: {
                    //     color: '#008FFB',
                    //   }
                    // },
                    tooltip: {
                      enabled: false
                    },
                    title: {
                      text: "Incremental Sales (€)",
                      style: {
                        color: '#DB1348',
                        fontWeight : 'bold',
                        fontSize : '14px',
                      }
                    },
                  },
                  
                  {
                    seriesName: 'Cumulative ROI',
                    opposite: true,
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#8E8E8E'
                    },
                    title: {
                      text: "ROI (€)",
                      rotate: -90,
                      style: {
                        color: '#FF9933',
                        fontWeight : 'bold',
                        fontSize : '14px',
                      }
                    },
                    // title: {
                    // text: "Organic_Search_Vol (M)",
                    // style: {
                    //     color: '#FEB019',
                    // }
                    // },
                    labels: {
                      style: {
                        colors: '#8E8E8E',
                        fontSize: '12px',
                      },
                      formatter: function (value) {
                        return parseFloat(value).toFixed(2);
                      },
                    },
                  },
                  {
                    seriesName: 'Cumulative ROI',
                    show: false,
                  },
                ],
                tooltip: {
                  enabled: true,
                  style: {
                    fontSize: '14px',
                    background: '#fff',
                  },
                  x: {
                      show: true,
                      format: 'dd MMM',
                      formatter: function (value) {
                        let val = value;
                          val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        
                        return val;
                      },
                  },
                  y: {
                      title: {
                          formatter: (seriesName) => seriesName,
                      },
                      formatter: function (value) {
                        let val = value;
                          val = parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        
                        return val;
                      },
                  },
                  z: {
                      formatter: undefined,
                      title: 'Size: ',
                      
                  },
                  marker: {
                      show: true,
                  },
              },
                legend: {
                  horizontalAlign: 'center',
                  position: 'bottom',
                  offsetY: 10,
                  style: {
                    color: '#3D3D3D',
                    fontSize: '14px',
                  },
                },
                annotations: {
                  xaxis: [
                    {
                      x: new Date('26 Nov 2017').getTime(),
                      x2: new Date('28 Nov 2017').getTime(),
                      fillColor: '#B3F7CA',
                      label: {
                        text: 'Optimal Spend',
                        orientation: 'horizontal',
                        textAnchor: 'start',
                        position: 'top',
                        offsetX: 5,
                        style: {
                          fontSize: '12px',
                          color: '#333',
                          background: '#B3F7CA',
                        },
                      }
                    }
                  ],
                  points: 
                  [
                    {
                      x: new Date('01 Dec 2017').getTime(),
                      y: 8607.55,
                      marker: {
                        size: 8,
                        fillColor: '#fff',
                        strokeColor: 'red',
                        radius: 2,
                      },
                      label: {
                        borderColor: '#FF4560',
                        offsetY: 0,
                        style: {
                          color: '#fff',
                          background: '#FF4560',
                          fontSize: '12px',
                        },
                        text: 'Current Spend',
                        
                      }
                    }
                  ]
                }
              },
            },
          
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { cart3, subBrandValue } = state
    
    if (props.graphData4 && props.graphData4.series && subBrandValue !== props.subBrandValue) {
        cart3.series = props.graphData4.series
        cart3.options.xaxis.categories = props.graphData4.xValue
        cart3.options.annotations.xaxis[0].x = props.graphData4.optimalSpend1
        cart3.options.annotations.xaxis[0].x2 = props.graphData4.optimalSpend2
        cart3.options.annotations.points[0].x = props.graphData4.currentSpend1
        cart3.options.annotations.points[0].y = props.graphData4.currentSpend2
        //currentSpend

    }


    return {
        cart3,
        subBrandValue
    }
    
    //return { };
  }
  

    render() {
      return (
        

  <div id="chart">
      {
          this.props.graphData4 &&
            <div className="chartContent">
                <div className="downChart titleAdded">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Sufficiency & Efficiency: {this.props.tacticValue}</div>
                <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="line" 
                        height={400}
                        />
                  <p>Response curves are at overall level and will be the same across all Channel/Type.</p>
                </div>
                <div className="spaceBetween"></div>
                
            </div>
      }
      
</div>


      );
    }
  }

  export default MainTab4Charts
  