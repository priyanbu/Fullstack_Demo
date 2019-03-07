/**
 * Created by Aline on 9/26/2018.
 */
import React, { Component } from 'react';

import fetch from 'isomorphic-fetch';
import _forEach from 'lodash/forEach';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:'',
            showData:[],
        }
        this.handleChange = this.handleChange.bind(this);
    };
    
    handleChange(event){
        this.setState({value: event.target.value });
        console.log(this.state.value)
    };

    showClick(){
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(({ data }) => {
                console.log("datasss====>>",data);
                 this.setState({showData : data})
            })
            .catch(err => console.log(err))
        console.log("====",this.state.showData)
    }

    formSubmit(){
        var com = this.state.value;
        fetch('http://localhost:3000/todo', {
            method: 'POST',
            body: JSON.stringify({
                name: com,
            }),
            headers: new Headers({ "Content-Type": "application/json" })
        })
            .then(data => {
                console.log('Request success: ', data);
            })
            .catch(error => {
                console.log('Request failure: ', error);
            });
        alert('submitted successfully')
    };

    handleSubmit(e){
         e.preventDefault();
    }
    
    renderItems(){
        var a=[];
        _forEach(this.state.showData,((res, i)=> {
            a.push(<div>
                <li>
                {res.name}
                </li>
                </div>)
        }))
        return a;
    }

render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:<input type="text"
                                    value={this.state.value}
                                    onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" onClick={this.formSubmit.bind(this)}/>
                    <input type="submit" value="Show data" onClick={this.showClick.bind(this)}/>
                    <div>
                    {
                        this.renderItems()
                    }
                    </div>
                </form>
            </div>
        );
    }
}

export default App;
