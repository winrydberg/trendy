import React, { Component } from 'react'

export default class Comment extends Component {

  constructor(props){
      super(props);
      this.state ={
          comments:[]
      }
  }

  componentDidMount(){

  }

  
  render() {
    return (
      <Container>
        <Content  contentContainerStyle={styles.container}>
          <LoadingDialog loading={this.state.loading}/>
           <StatusBar barStyle="light-content" />
               <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{justifyContent: 'center',backgroundColor: 'rgba(52, 52, 52, 0.8)', flex:1,}}>
                   
               
               </ScrollView>  
        </Content>
      </Container>
    )
  }
}
