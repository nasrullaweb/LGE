import React, { Component } from "react";
import Chart from "react-apexcharts";


class MainTab5Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        subBrandValue: '',
        cart3: {
            series: [
                {
                    "name": "GOOGLE SEARCH",
                    "data": [
                        {
                            "x": "GOOGLE SEARCH",
                            "y": null
                        },
                        {
                            "x": "YOUTUBE",
                            "y": 0.913239783
                        },
                        {
                            "x": "SELLOUT",
                            "y": 0.855347659
                        },
                        {
                            "x": "PROMOTER",
                            "y": 0.110042341
                        },
                        {
                            "x": "DSP",
                            "y": 0.206739325
                        },
                        {
                            "x": "FB",
                            "y": 2.221017162
                        },
                        {
                            "x": "GOOGLE SEARCH",
                            "y": null
                        },
                        {
                            "x": "YOUTUBE",
                            "y": null
                        },
                        {
                            "x": "SELLOUT",
                            "y": 0.956287268
                        },
                        {
                            "x": "PROMOTER",
                            "y": 1.587188903
                        },
                        {
                            "x": "DSP",
                            "y": null
                        },
                        {
                            "x": "FB",
                            "y": null
                        }
                    ]
                },
                {
                    "name": "YOUTUBE",
                    "data": [
                        {
                            "x": "GOOGLE SEARCH",
                            "y": null
                        },
                        {
                            "x": "YOUTUBE",
                            "y": 0.913239783
                        },
                        {
                            "x": "SELLOUT",
                            "y": 0.855347659
                        },
                        {
                            "x": "PROMOTER",
                            "y": 0.110042341
                        },
                        {
                            "x": "DSP",
                            "y": 0.206739325
                        },
                        {
                            "x": "FB",
                            "y": 2.221017162
                        },
                        {
                            "x": "GOOGLE SEARCH",
                            "y": null
                        },
                        {
                            "x": "YOUTUBE",
                            "y": null
                        },
                        {
                            "x": "SELLOUT",
                            "y": 0.956287268
                        },
                        {
                            "x": "PROMOTER",
                            "y": 1.587188903
                        },
                        {
                            "x": "DSP",
                            "y": null
                        },
                        {
                            "x": "FB",
                            "y": null
                        }
                    ]
                }
            ],
              options: {
                chart: {
                  height: 400,
                  type: 'heatmap',
                  fontFamily: '"Lato", sans-serif',
                  stacked: false,
                    zoom: {
                        enabled: false
                    },
                },
                grid: {
                  show: false,
                },
                colors: ['#DB1348'],
                dataLabels: {
                  enabled: true,
                  style: {
                    colors: ['#333']
                  },
                  formatter: function (value) {
                    let val = value;
                      //val = parseFloat(value).toFixed(4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    
                    return isNaN(value) ? "" : value === 0 ? "" : `${Math.round(value*1000)/10}%`;
                  },
                },
                stroke: {
                  width: [4, 2, 2, 2, 2],
                  curve: 'smooth',
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
                        fontSize: '13px',
                      },
                      
                    },
                  },
                ],
                xaxis: {
                  
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999999',
                    height: 2,
                    offsetY: 1
                },
                  tooltip: {
                    enabled: false
                  },
                  
                  labels: {
                    show: true,
                    style: {
                      fontSize: '13px',
                      color: '#373D3F',
                    },
                    offsetX: 0,
                    offsetY: 0,
                  },
                },
                
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
                        // let val = value;
                        //   val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        
                        return value;
                      },
                  },
                  y: {
                      title: {
                          formatter: (seriesName) => seriesName,
                      },
                      formatter: function (value) {
                        let val = value;
                          //val = parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        
                          return isNaN(val) ? "" :`${Math.round(val*1000)/10}%`;
                      },
                  },
                  
                  marker: {
                      show: true,
                  },
              },
                legend: {
                  horizontalAlign: 'center',
                  position: 'bottom',
                  style: {
                    color: '#3D3D3D',
                    fontSize: '14px',
                  },
                },
              },
            },
          
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { cart3, subBrandValue } = state
    
    if (props.graphData5 && props.graphData5.series && subBrandValue !== props.subBrandValue) {
        cart3.series = props.graphData5.series
        //cart3.options.xaxis.categories = props.graphData4.xValue
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
          this.props.graphData5 &&
            <div className="chartContent">
                <div className="downChart titleAdded">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Synergy Impact</div>
                <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="heatmap" 
                        height={400}
                        />
                  <p>Synergy Effect is at overall level and will be the same across all Channel/Type.</p>
                </div>
                <div className="spaceBetween"></div>
                
            </div>
      }
      
</div>


      );
    }
  }

  export default MainTab5Charts
  