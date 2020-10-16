import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';
import SpendTable from './SpendTable'
import { Button, Modal } from 'antd';


class MainTab3Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        manageVisible: false,
        cart1: {
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
              colors: ['#FF9933','#FF6601'],
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
                  fontSize: '13px',
                  colors: ['#fff'],
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
                      colors: '#8E8E8E',
                      fontSize: '13px',
                  },
                },
                title: {
                  text: "Spend (€)",
                  style: {
                    color: '#DB1348',
                    fontWeight : 'bold',
                    fontSize : '14px',
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
                    fontSize: '13px',
                    color: '#373D3F',
                  },
                },
              },
              legend: {
                horizontalAlign: 'left',
                    position: 'bottom',
                    style: {
                      color: '#3D3D3D',
                      fontSize: '14px',
                    },
              }
            },
          },
          cart2: {
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
                stacked: true,
                stackType: '100%'
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
                  columnWidth: '90%',
                  dataLabels: {
                    position: 'center',
                  },
                }
              },
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  colors: ['#fff'],
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
                  formatter: function (value) {
                    
                    return Math.round(value);
                  },
                  style: {
                      colors: '#8E8E8E',
                      fontSize: '13px',
                  },
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
                    fontSize: '13px',
                    color: '#373D3F',
                  },
                },
              },
              legend: {
                horizontalAlign: 'left',
                    position: 'bottom',
                    style: {
                      color: '#3D3D3D',
                      fontSize: '14px',
                    },
              }
            },
          },
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
              colors: ['#E84518','#FF6601','#FFC000','#D1D105',
              '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
              '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
              '#994561','#CC3A8E'],
              labels: [],
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
                      fontSize: '14px',
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
              colors: ['#E84518','#FF6601','#FFC000','#D1D105',
              '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
              '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
              '#994561','#CC3A8E'],
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
                      fontSize: '14px',
                    },
                  }
                }
              }]
            },
          },
    }
  }

  showManageModal = () => {
    this.setState({
      manageVisible: true,
    });
  };

  handleManageOk = e => {
    this.setState({
      manageVisible: false,
    });
  };

  handleManageCancel = e => {
    this.setState({
      manageVisible: false,
    });
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props.graphData31, 'tttt')
    let { cart1, cart2, cart3, cart4 } = state
    
    if (props.graphData3 && props.graphData3.series) {

        cart1.series = props.graphData3.series
        cart1.options.xaxis.categories = props.graphData3.xValue
        
    }

  //   if (props.graphData31 && props.graphData31.series) {

  //     cart2.series = props.graphData31.series
  //     cart2.options.xaxis.categories = props.graphData31.xValue
      
  // }

  if (props.graphData31 && props.graphData31.currentYear) {
    cart3.series = props.graphData31.previousYear.series1
    cart3.options.labels = props.graphData31.previousYear.labels1
    cart4.series = props.graphData31.currentYear.series2
  cart4.options.labels = props.graphData31.currentYear.labels2

}


    return {
        cart1,
        cart2,
        cart3,
        cart4
    }
    
    //return { };
  }
  

    render() {
      return (
        

  <div id="chart">
      {
          this.props.graphData3 &&
            <div className="chartContent">
              <div className="downChart titleAdded">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Spend by Tactic
              <Button type="primary" className="createButtom setPadding" onClick={this.showManageModal}>View Spend Data</Button></div>
              <div className="scrollhor">
                <Chart
                        options={this.state.cart1.options}
                        series={this.state.cart1.series}
                        type="bar" 
                        height={400}
                        width={2500}
                        />
                        </div>
                </div>
                <div className="spaceBetween"></div>
                <div className="widthHalf titleAdded">
                <div className="chartTitle"><span className="smallLeftBorder"></span>2018</div>
              <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="donut" 
                        height={300}
                        />
              </div>
              <div className="widthHalfRight titleAdded">
              <div className="chartTitle"><span className="smallLeftBorder"></span>2019</div>
                <Chart
                        options={this.state.cart4.options}
                        series={this.state.cart4.series}
                        type="donut" 
                        height={300}
                        />
              </div>
              <div className="spaceBetween"></div>
            </div>
      }
      {
        this.state.manageVisible &&
          <Modal
            title="Spend Data"
            visible={this.state.manageVisible}
            onOk={this.handleManageOk}
            onCancel={this.handleManageCancel}
            className="managePopup"
          >
            <SpendTable 
              handleManageOk={this.handleManageOk} 
              handleManageCancel={this.handleManageCancel} 
              pageName="Spend Data"
              graphData32={this.props.graphData32}
              
            />
          </Modal>
      }

</div>


      );
    }
  }

  export default MainTab3Charts
  