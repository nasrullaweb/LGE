import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';


class MainTab2Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        var1Value: '',
        var2Value: '',
        cart1: {
          titleValue: '',
            series: [{
                data: []
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 250,
                  fontFamily: '"Lato", sans-serif',
                },
                grid: {
                  show: false,
                },
                colors: ['#FF9933','#E84518','#FF6601','#FFC000','#D1D105',
                '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
                '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
                '#994561','#CC3A8E'],
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '70%',
                  }
                  
                },
                dataLabels: {
                  enabled: true,
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
                  style: {
                    colors: ['#333'],
                    fontSize: '13px',
                  },
                },
                stroke: {
                    show: true,
                    width: 15,
                    colors: ['transparent']
                  },
                xaxis: {
                  categories: [],
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999'
                  },
                  labels: {
                    show: false,
                    style: {
                      fontSize: '13px',
                      color: '#373D3F',
                    },
                  }
                },
                yaxis: [
                  {
                    // min: 0,
                    // max: 10,
                    type: 'numeric',
                  tickAmount: 5,
                 
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#8E8E8E'
                    },
                    labels: {
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
                      style: {
                        fontSize: '13px',
                        color: '#8E8E8E'
                      },
                    },
                  },
                ],
                legend: {
                    horizontalAlign: 'center',
                    position: 'bottom',
                    style: {
                      color: '#3D3D3D',
                      fontSize: '14px',
                    },
                  },
                  tooltip: {
                    enabled: true,
                    style: {
                      fontSize: '14px',
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
                  }
              },
        },
      
        cart2: {
          titleValue: '',
            series: [{
                data: []
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 250,
                  fontFamily: '"Lato", sans-serif',
                },
                grid: {
                  show: false,
                },
                colors: ['#FF9933','#E84518','#FF6601','#FFC000','#D1D105',
                '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
                '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
                '#994561','#CC3A8E'],
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '70%',
                    barHeight: '80%',
                  }
                },
                dataLabels: {
                  enabled: true,
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
                  style: {
                    colors: ['#333'],
                    fontSize: '13px',
                  },
                },
                stroke: {
                    show: true,
                    width: 15,
                    colors: ['transparent']
                  },
                xaxis: {
                  categories: [],
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999'
                  },
                  labels: {
                    show: false,
                    style: {
                      fontSize: '13px',
                      color: '#373D3F',
                    },
                  }
                },
                yaxis: [
                  {
                    // min: 0,
                    // max: 10,
                    type: 'numeric',
                    tickAmount: 5,
                    
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#8E8E8E'
                    },
                    labels: {
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
                      style: {
                        fontSize: '13px',
                        color: '#8E8E8E'
                      },
                    },
                  },
                ],
                legend: {
                    horizontalAlign: 'center',
                    position: 'bottom',
                    style: {
                      color: '#3D3D3D',
                      fontSize: '14px',
                    },
                  },
                  tooltip: {
                    enabled: true,
                    style: {
                      fontSize: '14px',
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
                  }
              },
        },

        cart3: {
            series: [{
                data: []
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 400,
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
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  width: [2, 2, 2, 2, 2],
                  curve: 'smooth',
                },
                xaxis: {
                  type: 'datetime',
                  tickAmount: 30,
                  categories: [],
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999'
                  },
                  labels: {
                    hideOverlappingLabels: true,
                    style: {
                      fontSize: '13px',
                      color: '#373D3F',
                    },
                    formatter: function(val) {
                      return moment(new Date(val)).format("DD MMM YY");
                    }
                  }
                },
                yaxis: [
                  {
                    min: 0,
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#8E8E8E'
                    },
                    title: {
                      text: "Tactic",
                      style: {
                        color: '#DB1348',
                        fontWeight : 'bold',
                        fontSize : '14px',
                      }
                    },
                    labels: {
                      style: {
                        colors: '#8E8E8E',
                        fontSize: '13px',
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
                  },
                  
                  {
                    seriesName: "Digital (All OLED)",
                    min: 0,
                    opposite: true,
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#8E8E8E'
                    },
                    title: {
                      text: "Tactic",
                      rotate: -90,
                      style: {
                        color: '#FF9933',
                        fontWeight : 'bold',
                        fontSize : '14px',
                      }
                    },
                    labels: {
                      style: {
                        colors: '#8E8E8E',
                        fontSize: '13px',
                      },
                      formatter: function (value) {
                        let val = value;
                        if(val < 999 && val > -1000) {
                          val = parseFloat(value).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }

                        if(val < -1000) {
                          val = parseFloat(value/1000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                      
                        if(val > 1000) {
                          val = parseFloat(value/1000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                        return val;
                      },
                    },
                  },
                  
                  
                ],
                // tooltip: {
                //   fixed: {
                //     enabled: true,
                //     position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                //     offsetY: 30,
                //     offsetX: 60
                //   },
                // },
                legend: {
                  horizontalAlign: 'center',
                  position: 'bottom',
                  style: {
                    color: '#3D3D3D',
                    fontSize: '14px',
                  },
                },
                tooltip: {
                  enabled: true,
                  style: {
                    fontSize: '14px',
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
                }
              },
            },
          
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { cart1, cart2, cart3, var2Value } = state
    
    if (props.graphData2 && props.graphData2.series && var2Value !== props.var2Value) {

      const obj = {
        seriesName: props.graphData1.series[1].name,
        show: false,
        max: props.graphData1.maxValue,
        min: 0,
      }
        cart1.series = props.graphData2.series
        cart1.options.xaxis.categories = props.graphData2.xValue
        cart1.titleValue = props.graphData2.xValue
        var2Value = props.var2Value
        cart3.series = props.graphData1.series
        cart3.options.xaxis.categories = props.graphData1.xValue
        cart2.series = props.graphData3.series
        cart2.options.xaxis.categories = props.graphData3.xValue
        cart2.titleValue = props.graphData3.xValue
        cart1.options.yaxis[0].max = props.graphData2.max >= props.graphData3.max ? props.graphData2.max : props.graphData3.max
        //cart2.options.yaxis[0].min = props.graphData2.min <= props.graphData3.min ? props.graphData2.min : props.graphData3.min
        cart2.options.yaxis[0].max = props.graphData2.max >= props.graphData3.max ? props.graphData2.max : props.graphData3.max
        cart3.options.yaxis[1].seriesName = props.graphData1.series[1].name
        cart3.options.yaxis[0].title.text = props.var1Value
        cart3.options.yaxis[1].max = props.graphData1.maxValue
        for (let i=2; i<=props.graphData1.series.length; i++ ) {
          cart3.options.yaxis.push(obj)
        }
        
    }


    return {
        cart1,
        cart2,
        cart3,
        var2Value
    }
    
    //return { };
  }
  

    render() {
      return (
        

  <div id="chart">
      {
          this.props.graphData1 &&
            <div className="chartContent">
                <div className="downChart titleAdded">
                <div className="chartTitle">
                <span className="smallLeftBorder"></span>
                KPI vs Tactics</div>
                <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="line" 
                        height={400}
                        />
                </div>
                <div className="spaceBetween"></div>
                <div className="widthHalf titleAdded">
                <div className="chartTitle"><span className="smallLeftBorder"></span>{this.state.cart1.titleValue}</div>
                    <Chart
                        options={this.state.cart1.options}
                        series={this.state.cart1.series}
                        type="bar" 
                        height={250}
                        />
                </div>
                <div className="widthHalfRight titleAdded">
                <div className="chartTitle"><span className="smallLeftBorder"></span>{this.state.cart2.titleValue}</div>
                    <Chart
                        options={this.state.cart2.options}
                        series={this.state.cart2.series}
                        type="bar" 
                        height={250}
                        />
                </div>
                <div className="spaceBetween"></div>
            </div>
      }
      
</div>


      );
    }
  }

  export default MainTab2Charts
  