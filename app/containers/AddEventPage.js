import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	TouchableOpacity,
	DatePickerIOS
} from 'react-native';

import{
	FormLabel,FormInput
} from 'react-native-elements'

import {
	Form,
	DatePickerField,
	Separator
} from 'react-native-form-generator'
import {connect} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import BackButton from './BackButton';
import Navbar from './Navbar';

import dismissKeyboard from 'react-native-dismiss-keyboard';


var moment = require('moment');

const monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

import Icon from 'react-native-vector-icons/Ionicons';

class AddEventPage extends Component{
	constructor(props){
		super(props);

		this.state={
			eventTitle: "",
			eventDate: new Date(),
			eventLocation: "",
			showDatePicker: false,
		}
	}
	componentDidMount(){
		this.props.hideTabBar(false);
	}
	render(){
		const datePicker = this.state.showDatePicker ?
		<View style={styles.datePicker_area}>
			<DatePickerIOS
				date={this.state.eventDate}
				onDateChange={(eventDate) => this.setState({eventDate})}
				mode="date">
			</DatePickerIOS>
			<TouchableOpacity
				onPress={() => this.setState({showDatePicker:false})}
			>
			<Text style={styles.done_datePicker_text}>Done</Text>
			</TouchableOpacity>
		</View>
		: <View></View>;

		const saveButton = !this.state.showDatePicker ?
		<View style={styles.saveButton_area}>
			<TouchableOpacity
				onPress={() =>
					{
						if (this.state.eventTitle.length == 0){
							AlertIOS.alert('Title cannot be empty');
							return 
						}

						if (this.state.eventLocation.length == 0){
							AlertIOS.alert('Location cannot be empty');
						}

						let theEvent = {
							eventDate: this.state.eventDate.getTime(),
							eventLocation: this.state.eventLocation,
							eventTitle: this.state.eventTitle,
							resumeScanned: 0
						}
						this.props.saveNewEvent(theEvent);
						this.props.navigatorWrapper(false).pop();
					}

				}
				>
				<View style={styles.save_add_event_button}>
					<Text style={styles.save_text}>Save</Text>
				</View>
			</TouchableOpacity>
		</View> : <View></View>

		return(
			<View style={{backgroundColor:"#FFF",flex:1}}>
				<Navbar navigatorWrapper = {this.props.navigatorWrapper} title={"Add Event"}></Navbar>

				<FormLabel labelStyle={styles.formLabel}>Name</FormLabel>
				<FormInput
					textInputRef={(component) => this.eventTitleField = component}
					placeholder="Enter the name of the event"
	                returnKeyType="next"
					onSubmitEditing={() => {this.eventLocationField.focus()}}
					onChangeText={(eventTitle) => this.setState({eventTitle: eventTitle})}></FormInput>

				<FormLabel labelStyle={styles.formLabel}>Location</FormLabel>
				<FormInput
					textInputRef={(component) => this.eventLocationField = component}
					placeholder="Enter the location of the event"
					onChangeText={(eventLocation) => this.setState({eventLocation: eventLocation})}></FormInput>

				<FormLabel labelStyle={styles.formLabel}>Date</FormLabel>
				<TouchableOpacity
					onPress={() =>
						{
							dismissKeyboard();
							this.setState({showDatePicker: true})
						}
				}
					style={styles.set_date_touchable}
				>
				<Text style={styles.date_text}>{this.state.eventDate? moment(this.state.eventDate).format('MM/DD/YYYY') : 'Set the date of the event'}</Text>
				</TouchableOpacity>
				{datePicker}
				{saveButton}
			</View>

		)
	}

	onDateChange = (eventDate) => {
    	this.setState({eventDate: eventDate});
  	};
}

const styles = StyleSheet.create({
	top_nav:{
		backgroundColor: '#1DBB96',
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		height:75
	},
	add_event_text:{
		color:"#FFF",
		alignSelf: 'center',
		fontWeight:"bold",
		fontSize: 25,
		marginLeft: 105,
	},
	formLabel:{
		color:"#1DBB96",
		marginTop:20
	},
	set_date_touchable:{
		marginLeft:20,
		marginTop:10,
	},
	date_text:{
		fontSize:20
	},
	done_datePicker_text:{
		color: '#1DBB96',
		marginLeft:150,
		fontWeight: 'bold',
		fontSize: 30
	},
	saveButton_area:{
		alignItems:'center'
	},
	save_add_event_button:{
		backgroundColor: '#1DBB96',
		paddingLeft:20,
		paddingRight:20,
		paddingTop:10,
		paddingBottom:10,
		borderRadius:20,
		width:150,
		alignItems:'center',
		marginTop:30
	},
	save_text:{
		color:"#FFF",
		fontSize:20,
		fontWeight:"600"
	}

})

function mapStateToProps(state){
	return {
		events: state.events
	};
}

export default connect(mapStateToProps)(AddEventPage);
