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
                colors: ['#DB1348', '#FF9933', '#303f9f', '#0288d1', '#00796b', '#689f38', '#afb42b', '#ffa000', '#e64a19', '#c2185b', '#512da8', '#1976d2', '#0097a7', '#5d4037', '#388e3c', '#fbc02d', '#616161', '#f57c00', '#455a64'],
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  width: [4, 2, 2, 2, 2],
                  curve: 'smooth',
                },
                xaxis: {
                  
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
              <div className="chartTitle"><span className="smallLeftBorder"></span>Sufficiency & Efficiency: {this.props.tacticValue}</div>
                <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="heatmap" 
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

  export default MainTab5Charts
  