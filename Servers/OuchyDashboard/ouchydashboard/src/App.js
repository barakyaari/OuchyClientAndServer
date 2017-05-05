import React, { Component } from 'react';
import logo from './reut.png';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip  } from 'recharts';

const Home = () => (
    <div className="App">
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Ouchy</h1>
            <h2>אפליקציית מעקב הכאב המתקדמת בעולם</h2>

            <Link to="/about">
                <button to="/about">
                    כניסה
                </button>            </Link>
        </div>

    </div>
);

import axios from 'axios'
class Graph extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            medicationData: [
                { "date": "2017-05-01", "impact": 22},
                { "date": "2017-05-02", "impact": 25},
                { "date": "2017-05-03", "impact": 30},
                { "date": "2017-05-04", "impact": 16},
                { "date": "2017-05-05", "impact": 18},
                { "date": "2017-05-06", "impact": 17},
                { "date": "2017-05-07", "impact": 13},
                { "date": "2017-05-08", "impact": 7}
            ],
        }
    }


    componentDidMount() {
        var _this = this;
    this.serverRequest =
        axios
            .get("http://localhost:4000/paindata")
            .then(function(result) {
                console.log(result.data)
                _this.setState({
                    data: result.data,


                })
            })
            }

    render () {
        return (
            <div className="mainApp">
                <div className="rowClass">
                    <image className="mainImage" src={logo} height="40"/>
                    <h2 className="header">Ouchy</h2>
                </div>
                <h3 className="title">
                        Daily Pain
                    </h3>
                <div>
                    <AreaChart width={1200} height={300} data={this.state.data}
                               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="morning" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="noon" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        <Area type="monotone" dataKey="evening" stroke="#22cd9d" fillOpacity={1} fill="url(#colorPv)" />

                    </AreaChart>
                </div>
                <h3 className="title">
                    Medication Impact (%)
                </h3>
                <div>
                    <AreaChart width={1200} height={300} data={this.state.medicationData}
                               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF159d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#FF159d" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF159d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#FF159d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="impact" stroke="#FF159d" fillOpacity={1} fill="url(#colorPv)" />

                    </AreaChart>
                </div>
                <button>
                        Save to csv
                </button>
            </div>
        );
    }

}

class App extends Component {

  render() {
    return (
        <Router>
            <div>

                <Route exact path="/" component={Home}/>
                <Route path="/about" component={Graph} handler={Graph}/>
            </div>
        </Router>
    );
  }

  startApp(){

  }
}

export default App;
