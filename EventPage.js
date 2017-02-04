import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	TouchableOpacity,
	Button
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import BackButton from './BackButton';
import Navbar from './Navbar';

import { Actions } from 'react-native-router-flux';

var Modal = require('react-native-modalbox');

import{
	FormLabel,FormInput
} from 'react-native-elements';




export default class EventPage extends Component
{

	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		this.state = {};
		var events = this.props.events ? this.props.events :[
			{
				eventTitle:"HackTX",
				eventLocation: "The University of Texas at Austin",
				eventDate:"February 20th 2017",
				resumeScanned: 2
			},
			{
				eventTitle:"UT Job Fair",
				eventLocation: "The University of Texas at Austin",
				eventDate:"February 25th 2017",
				resumeScanned: 2
			},
			{
				eventTitle:"PennApps",
				eventLocation: "The University of Pennsilvynia",
				eventDate:"March 20th 2017",
				resumeScanned: 2
			},
		] ;

		this.state.dataSource = ds.cloneWithRows(events);
		this.state.events = events;
		this.state.selectedEvent = null;
		this.state.isDisabled=false
		this.state.emailInputs = [];
	}

	_handleSendEmailClick(){
		this.refs.send_email_modal.open();
	}

	closeModal(){
		this.refs.send_email_modal.close()
	}

	addEmailInput(){
		var currentEmailInputs = this.state.emailInputs.splice();
		const newFormInput = <FormInput placeholder="Enter email" onPress={this.addEmailInput.bind(this)}></FormInput>
		currentEmailInputs.push(newFormInput);
		this.setState({emailInputs:currentEmailInputs});
	}

	render()
	{
		return(
			<View style={{flex:1}}>
				<Navbar navigator={this.props.navigator} title='Events' disableBackButton={true}></Navbar>
				<ListView
					// renderHeader={this._renderHeader.bind(this)}
					dataSource={this.state.dataSource}
					renderRow={(rowData) =>
						<EventCard
						eventTitle={rowData.eventTitle}
						eventDate={rowData.eventDate}
						eventLocation = {rowData.eventLocation}
						resumeScanned={rowData.resumeScanned}
						navigator={this.props.navigator}
						onSendEmailClick={() => this._handleSendEmailClick.bind(this)}
						></EventCard>
					}
					style = {styles.list_view}>
				</ListView>
				<Modal position={"center"}
				ref={"send_email_modal"} backdrop={true} style={{height:200,width:300}}>
					<View
						id="modal-container"
						style={{
							flex:1,
						}}
					>
						<FormLabel>Email</FormLabel>
						<FormInput placeholder="Enter email" onFocus={this.addEmailInput.bind(this)}></FormInput>
						<View
							style={{flex:1,justifyContent:'flex-end',padding:20}}
						>

						<View style={{flexDirection:'row',justifyContent:'space-around'}}>
							<TouchableOpacity onPress={this.closeModal.bind(this)}>
									<View
										id="cancel-button"
										style={[styles.shadow,{
																				padding:15,
																				backgroundColor:'#e74c3c',
																				borderRadius:30,
																				width:100,
																				alignItems:'center'
																			}]}
									>
										<Text style={{color:"#FFF",fontWeight:'600'}}>Cancel</Text>
									</View>
							</TouchableOpacity>

							<TouchableOpacity onPress={this.closeModal.bind(this)}>
									<View
										id="send-button"
										style={[styles.shadow,{
																				padding:15,
																				backgroundColor:'#1DBB96',
																				borderRadius:30,
																				width:100,
																				alignItems:'center'
																			}]}
									>
										<Text style={{color:"#FFF",fontWeight:'600'}}>Send</Text>
									</View>
							</TouchableOpacity>
						</View>


						</View>
					</View>
				</Modal>
				<ActionButton
				buttonColor="rgba(0,188,150,1)"
				backgroundTappable={true}
				onPress={this._goToAddEventPage.bind(this)}></ActionButton>
			</View>

		)
	}


	_handleAddEventPop(events){
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		this.setState({dataSource:ds.cloneWithRows(events),events:events});
	}

	_goToAddEventPage(){

		Actions.AddEventPage;
		// this.props.navigator.push({
		// 	id:"AddEventPage",
		// 	name:"Add Event Page",
		// 	events: this.state.events,
		// 	onAddEventPop: this._handleAddEventPop.bind(this)
		// })
	}
}

const styles = StyleSheet.create({
	list_view:{
		backgroundColor:"#FFF"
	},
	arrow_back_and_list:{
		flexDirection:"row",
		justifyContent: 'space-between',
	},
	shadow:{
		shadowOffset:{
          width:0,
          height:0
        },
   		shadowColor:'black',
    	shadowOpacity:0.2
	},
	top_nav:{
		backgroundColor: '#1DBB96',
		paddingTop: 30,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 10
	},
	header_title_and_action:{
		flexDirection:'row',
		alignItems:'flex-end',
		justifyContent:'space-between',
		marginTop:10
	},
	event_list:{
	},
	title:{
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 45,
		marginLeft: 10,
	},
	arrow_back:{
		marginBottom: 10,
	},
	options_more:{
		alignItems: 'flex-end'
	},
	header:{
		height: 75,
		backgroundColor: '#1DBB96',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	events:{
		alignSelf: 'center',
		marginTop: 10,
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
	},
})
