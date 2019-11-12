import React, { Component } from 'react'
import {View, StyleSheet, Text,Modal,ActivityIndicator,Dimensions} from 'react-native'

export default class LoadingDialog extends Component {

    constructor(props){
        super(props);
        this.state ={
            modalVisible: false,
        }
      
    }
    componentWillMount(){
      this.setModalVisible(this.props.loading);
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible:visible});
      }
    
  render() {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.props.loading}
      
        
        >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
            size={60}
            onRequestClose={()=>alert("Modal Closed")}
            style={{marginLeft: 30}}
            animating={this.props.loading} />
            <Text style={{marginLeft: 20}}>Please wait...</Text>            
          </View>
        </View>
    </Modal>
    )
  }
}


const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000090'
  },
  activityIndicatorWrapper: {
    flexDirection:'row',
    backgroundColor: '#FFFFFF',
    height: 100,
    width: Dimensions.get('window').width - (Dimensions.get('window').width/8),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  }
});
