import React, { Component } from 'react';
import Record from './Record';
import * as RecordsAPI from '../utils/RecordsAPI';

class Records extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoaded:false,
      error:null,
      records:[]
    }
  }
  render() {
    const {error,isLoaded,records} =this.state;
    if(error){
      // 每个库获取错误信息的api是不一样的，axios是error.message
      return <div>Error:{error.message}</div>
      
    }else if(!isLoaded){
      return <div>Loading...</div>
    }else{
        return (
          <div>
            <h2>Records</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Amount</th>
                </tr>
              </thead> 
              <tbody>
                {
                  records.map(record=><Record key={record.id} {...record}/>)
                }
              </tbody>
            </table>
          </div>
        );
    }

  }
  componentDidMount(){
    // 发起请求fetch版本
    // fetch('https://5c66bbb324e2140014f9edd2.mockapi.io/api/v1/records/')
    // .catch(error=>{
    //   console.log('a '+error.toString())
    //   this.setState({
    //     isLoaded:true,
    //     error
    //   })
    // })
    // .then(res=>res.json())
    // .then(res=>{
    //   this.setState({
    //     isLoaded:true,
    //     records:res
    //   })
    // })

    // 发起请求axios版本老版本
    // axios.get('https://5c66bbb324e2140014f9edd2.mockapi.io/api/v1/records/').then(res=>{
    // 新版本,利用环境变量的方式
    RecordsAPI.getAll().then(res=>{
      this.setState({
        isLoaded:true,
        records:res.data
      })
    }).catch(error=>{
      this.setState({
        isLoaded:true,
        error
      })
    })
  }
}

export default Records;
