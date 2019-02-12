import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
    Image,
    Dimensions,
    Button,
    CheckBox,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    Icon,
    Navigator,
    AsyncStorage,
} from 'react-native';

/*import all images needed on this app*/
import logo from '../images/Logo.png';
/*end importing images*/

import Home from '../components/Home';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const {width:WIDTH} = Dimensions.get('window');
const {width:HEIGHT} = Dimensions.get('window');

type Props = {};
class Login extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            email :'',
            password :'',
            emailErrorMessage: '' ,
            passwordErrorMessage: '' ,
            emailError: true,
            passwordError: true ,
            frmError: false ,
            rememberChecked: false,
            Checked: '',
            persistedEmail: '',
            persistedPassword: '',
        }

    };

    getInitialState() {
        return { text: "abc" };
    }

    /*this code is for validating Email on onChangeText*/
    validate_email = (name,value) =>{
        const { email, password, emailErrorMessage, passwordErrorMessage, emailError, passwordError, frmError } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

        this.setState(() => ({ [name]: value }));

        if(value == ""){
            this.state.emailError = true;
            this.setState({
                emailError: true,
                emailErrorMessage:'this field is required'
            })

        }else{
            if(reg.test(value) === false){
                this.state.emailError = true;
                this.setState({
                    emailError: true,
                    emailErrorMessage:'not correct format for email address'
                })
            }else{
                this.state.emailError = false;
                this.setState({
                    emailError: false,
                    emailErrorMessage:''
                })
            }
        }

        if(this.state.passwordError === false && this.state.emailError === false){
            this.state.frmError = false;
            //Alert.alert('Login Success');

        }else{

            this.state.frmError = true;
        }
    }

    /*this code is for validating Password on onChangeText*/
    validate_password = (name,value) =>{
        const { email, password, emailErrorMessage, passwordErrorMessage, emailError, passwordError, frmError } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

        this.setState(() => ({ [name]: value }));

        if(value == ""){
            this.state.passwordError = true;
            this.setState({
                passwordError: true,
                passwordErrorMessage:'this field is required'
            })
        }else{
            if(value.length >= 6 && value.length <= 12){
                this.state.passwordError = false;
                this.setState({
                    passwordError: false,
                    passwordErrorMessage:''
                })
            }else{
                this.state.passwordError = true;
                this.setState({
                    passwordError: true,
                    passwordErrorMessage:'please use at least 6 - 12 characters'
                })
            }
        }

        if(this.state.passwordError === false && this.state.emailError === false){
            this.state.frmError = false;
        }else{
            this.state.frmError = true;
        }
    }

    /*this code is for validating form on submit*/
    validate_on_submit = async(name,value) =>{
        const { email, password, emailErrorMessage, passwordErrorMessage, emailError, passwordError, frmError } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

        this.setState(() => ({ [name]: value }));

        /*validate email*/
        if(email == ""){
            this.state.emailError = true;
            this.setState({
                emailError: true,
                emailErrorMessage:'this field is required'
            })

        }else{
            if(reg.test(email) === false){
                this.state.emailError = true;
                this.setState({
                    emailError: true,
                    emailErrorMessage:'not correct format for email address'
                })
            }else{
                this.state.emailError = false;
                this.setState({
                    emailError: false,
                    emailErrorMessage:''
                })
            }
        }

        /*validate password*/
        if(password == ""){
            this.state.passwordError = true;
            this.setState({
                passwordError: true,
                passwordErrorMessage:'this field is required'
            })
        }else{
            if(password.length >= 6 && password.length <= 12){
                this.state.passwordError = false;
                this.setState({
                    passwordError: false,
                    passwordErrorMessage:''
                })
            }else{
                this.state.passwordError = true;
                this.setState({
                    passwordError: true,
                    passwordErrorMessage:'please use at least 6 - 12 characters'
                })
            }
        }

        if(this.state.passwordError === false && this.state.emailError === false){
            this.state.frmError = false;
            Alert.alert('Login Success!');
            /*do stuff here to redirect to page after login*/
        }else{

            this.state.frmError = true;
        }
    }

    remember_me = async()=>{
        const { email, password, rememberChecked, Checked } = this.state;

        this.setState({
            rememberChecked: !this.state.rememberChecked
        })

        if(!this.state.rememberChecked === true){
            this.state.rememberChecked = true;
            try{

                let email = this.state.email
                let password = this.state.password
                const Checked = 'true'
                AsyncStorage.setItem('email', email)
                AsyncStorage.setItem('password', password)
                AsyncStorage.setItem('Checked', Checked)

                this.setState({
                    email: email,
                    persistedEmail: email,
                    password: password,
                    persistedPassword: password,
                    Checked: Checked,
                })

            }catch(error){
                console.log(error);
            }

        }else{
            this.state.rememberChecked = false;
            try{
                await AsyncStorage.removeItem('email');
                await AsyncStorage.removeItem('password');
                await AsyncStorage.removeItem('Checked');

                const email = await AsyncStorage.getItem('email');
                const password = await AsyncStorage.getItem('password');
                const Checked = await AsyncStorage.getItem('Checked');

                this.setState({
                    email: email,
                    persistedEmail: email,
                    password: password,
                    persistedPassword: password,
                    Checked: Checked,
                })
            }catch(error){
                console.log(e);
            }

        }
    }

    /*this function if for testing session data upon clicking button*/
    showSessionData = async()=>{
        try{
            const email = await AsyncStorage.getItem('email');
            const password = await AsyncStorage.getItem('password');
            const Checked = await AsyncStorage.getItem('Checked');

            //this.state.email = email;
            //this.state.password = password;
            //this.state.Checked = Checked;
            Alert.alert("Email :"+this.state.email+" Password:"+password+" Checked:"+Checked);
        }catch(error){
            console.log(error);
        }
    }

    /*this function is for loading session data and persist its value to the email and password*/
    loadSession =async()=>{
        const { email, password, rememberChecked, Checked } = this.state;

        try{
            const email = await AsyncStorage.getItem('email');
            const password = await AsyncStorage.getItem('password');
            const Checked = await AsyncStorage.getItem('Checked');
            if(Checked == 'true'){
                this.state.email = email;
                this.state.password = password;
                this.state.Checked = Checked;
                //Alert.alert("Email :"+this.state.email+" Password:"+password+" Checked:"+Checked);

            }else{
                //Alert.alert("can't show data.");
            }

        }catch(error){
            console.log(error);
        }
    }

  render() {
    return (
      <ImageBackground style={styles.backgroundContainer} onLoad={this.loadSession}>
        <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />

            <View style={styles.frmLogin}>
                <Text style={styles.email}>Email</Text>
                <TextInput
                    value={this.state.email}
                    style={styles.input}
                    placeholder="Input email address"
                    placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red' }}
                    underlineColorAndroid='transparent'
                    onChangeText={(value) => this.validate_email('email',value)}
                />
                <Text style={styles.emailErr}>{this.state.emailErrorMessage}</Text>

                <View>
                  <Text style={styles.email}>Password</Text>
                  <TextInput
                        value={this.state.password}
                      style={styles.input}
                      secureTextEntry={true}
                      placeholder="Input password"
                      underlineColorAndroid='transparent'
                      onChangeText={(value) => this.validate_password('password',value)}
                  />
                  <Text style={styles.emailErr}>{this.state.passwordErrorMessage}</Text>
                </View>

                <View style={ styles.chkboxContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        value={this.state.rememberChecked}
                        onChange={()=>this.remember_me()}
                    />
                    <Text style={styles.rememberMe}> Remember me</Text>
                  </View>
                </View>

                <View style={styles.btnAlign}>
                    <TouchableHighlight
                      disabled={this.state.frmError}
                      style={this.state.frmError === true ? styles.submitError : styles.submit}
                      onPress={this.validate_on_submit}
                      underlayColor='#341769'>
                        <Text style={styles.submitText}>Sign In</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Login

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height:null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  frmLogin:{
    marginTop: 50,
  },
  logo:{
    /*width: 180,
    height: 180,*/
  },
  logoContainer:{
    alignItems: 'center',
    /*marginTop: -50,*/
  },
  logoText:{
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
  },
  input:{
    width: WIDTH -55,
    height: 50,
    borderRadius: 10,
    fontSize: 18,
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: '#714db2',
  },
  signIn:{
    backgroundColor: '#341769',
    borderRadius: 10,
    marginTop: 20,
    width: WIDTH -55,
    height: 10,
  },
  email:{
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
  },
  rememberMe:{
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 3,
  },
  chkboxContainer:{
    flexDirection: 'column',
    marginLeft: -5,
  },
  emailErr:{
    color: 'red',
    fontStyle: 'italic',
  },
  submit:{
      width: WIDTH -55,
      height: 50,
      backgroundColor:'#714db2',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#714db2',
    },
    submitError:{
        width: WIDTH -55,
        height: 50,
        backgroundColor:'#ccc',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    submitText:{
        paddingTop: 8,
        color:'white',
        textAlign:'center',
        fontSize: 22
    },
    btnAlign:{
        paddingTop: 20
    }
});
